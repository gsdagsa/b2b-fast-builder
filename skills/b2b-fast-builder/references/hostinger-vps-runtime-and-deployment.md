# Hostinger VPS 运行与部署

用于 Hostinger VPS、Nginx、Node.js API 服务、SQLite/MySQL、Resend、Turnstile、域名和自动部署。Hostinger 面板、系统包和 Resend 的命令、限制、权限和计费会变化；执行前检索当前官方文档，并在 VPS 上核对实际系统版本。没有相应 Skill 时仍按本文和官方资料执行，不凭本文猜最新参数。

第一次配置客户账号、绑定域名、验证 Resend 发信域名或创建 API Key 时，先读 [账号与域名接入](account-and-domain-onboarding.md)。

完整上线任务必须按 [主动引导上线](guided-launch.md) 检查环境，缺少必要工具时从官方来源自动补齐，不等用户提出安装要求。以下命令均以已确认 VPS 可 SSH 登录、具备 sudo 权限的部署用户为前提。

## 1. 固定架构

```text
React 静态预生成 HTML/CSS/JS
        ↓
构建产物 dist/ 上传 VPS，Nginx 直接托管静态文件

访客提交询盘
        ↓
Nginx 把 /api/inquiry 反向代理到 Node.js API 服务
        ↓
Turnstile 与字段校验
        ↓
SQLite 先保存询盘（询盘真源）
        ↓
Resend API 发送通知（收件为 Hostinger 企业邮箱）
        ↓
数据库更新邮件状态
        ↓
前端跳转 /thank-you/
        ↓
触发一次广告转化事件
```

媒体是独立策略：

- `local`：图片进入静态构建产物，随 `dist/` 一起发布。
- `shared`：多站共享素材放在 VPS 独立媒体目录（Nginx alias 或子域），或客户自选的 S3 兼容对象存储；静态 HTML 引用正式媒体 URL。

使用共享媒体目录不会把页面变成动态页面，也不要求 CMS。

VPS 上不再有托管平台托管的构建与进程：构建在部署机或 CI 完成，静态文件与 API 服务的常驻、重启和 SSL 由本项目用 systemd、Nginx 和 certbot 负责。

## 2. 服务器与访问边界

VPS 由客户在 Hostinger 购买并拥有；客户在 hPanel 设置操作系统模板（推荐当前长期支持的 Ubuntu LTS 或 Debian）、创建部署用户并把 SSH 访问交给 Agent 使用的环境。

- SSH 密钥是默认认证方式；禁用 root 密码登录。SSH 私钥 passphrase 只进入安全渠道，不进入聊天和日志。
- 防火墙只放行 22、80、443；数据库不暴露公网。
- 客户密码、hPanel 登录和验证码不进入聊天；Agent 使用客户已配置的 SSH 密钥连接，不索要密码。
- 首次登录先核对系统版本、已装软件和磁盘空间，再安装缺失的系统依赖（Nginx、Node.js LTS、certbot），全部来自系统包管理器或 NodeSource/官方仓库。
- 多站共用一台 VPS 时，每个站点独立系统用户、独立目录、独立 systemd 服务和独立数据库文件；不共用运行用户，避免一处被攻破影响全部站。

无 SSH 的环境（无法持有密钥、无法出站连接 22 端口）不能假称能部署 VPS；改为引导用户在受控环境操作，或如实说明限制。

## 3. `local` 媒体模式

适用：单站、常规产品图片、无需运行时上传。

流程：

```text
原始图片
→ 校验版权与来源
→ 去除不必要元数据
→ 裁切/压缩/生成 WebP 或 AVIF
→ 规范文件名与 alt
→ 放入 public/assets 或框架约定目录
→ build
→ 随 dist/ 一起 rsync 到 VPS
```

要求：

- 单文件和构建包大小必须低于 VPS 磁盘与带宽的合理预算；Nginx 对静态资源开启 gzip 或 brotli。
- 首屏图与列表缩略图使用适合实际展示尺寸的版本。
- 文件名稳定、可读且避免碰撞。
- 不把原始超大摄影文件、视频或大型 PDF 塞进静态部署包；大文件走 `shared` 模式。
- 静态资源响应头由 Nginx 配置：带内容 hash 的资源使用长缓存，HTML 使用短缓存。

## 4. `shared` 媒体模式

适用：同一品牌多站共享、大量图片、PDF/视频、大文件或媒体与构建包解耦。

推荐边界：

- 每个客户/品牌一个媒体目录或命名空间，例如 `/srv/media/<brand>/`。
- 同一品牌的国家站和小语种站可共享该媒体库。
- 不同客户默认不共用目录，避免权限、迁移和误删除互相影响。
- 生产读取使用客户控制的 `assets.example.com` 子域或 Nginx alias；不使用临时预览地址。
- 对象 key 使用稳定业务路径和版本/hash，覆盖旧文件前考虑缓存与回滚。
- 代码保存媒体 key 或正式公共 URL；不把临时地址写入页面。
- 客户明确要求使用对象存储时，可选任意 S3 兼容服务；密钥只进入服务器环境变量或安全存储，不进入仓库和前端。

本方案没有 CMS，所以无需浏览器上传接口和运行时上传。只有用户明确要求运行时上传时才设计这些能力，并重新评估是否应切换完整 `$b2b-builder`。

## 5. SQLite 询盘真源

极速版默认使用 SQLite（Node 侧 `better-sqlite3`）：零独立服务、备份等于复制文件，原 D1 方案的 SQL 方言和表结构几乎原样迁移。多站集中查询或客户明确要求时改用 MariaDB/MySQL，连接信息进入服务器环境变量。

最小表结构：

```sql
CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  submission_key TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  country TEXT,
  message TEXT NOT NULL,
  source_url TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  inquiry_status TEXT NOT NULL DEFAULT 'new',
  email_status TEXT NOT NULL DEFAULT 'pending',
  resend_email_id TEXT,
  retry_count INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at
ON inquiries(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_inquiries_email_status
ON inquiries(email_status, retry_count);
```

实际字段根据合格询盘定义调整。不要保存没有业务必要的敏感信息；日志默认脱敏。

SQLite 运维要求：

- 数据库文件放在站点数据目录（例如 `/srv/data/<site>/inquiries.db`），不放进 Nginx 静态 root；确保该目录禁止 Web 直接访问。
- API 服务对该目录有读写权限，其他系统用户不可读。
- 每日备份复制数据库文件（配合 SQLite 备份 API 或在写入低峰复制 WAL 一致副本），保留到站点目录之外。
- 迁移脚本进入版本库；部署时先备份再执行迁移。

## 6. 询盘请求顺序

1. 检查 method、origin、content-type 与 body 大小。
2. 校验 Turnstile、honeypot、字段长度和邮箱格式。
3. 使用客户端本次提交生成的 `submission_key` 去重。
4. 生成询盘 ID，先插入 SQLite，`email_status=pending`。
5. 调用 Resend HTTPS API，使用询盘 ID 派生稳定 Idempotency-Key。
6. 成功记录 `sent` 与 Resend ID；失败记录 `failed`、错误和次数。
7. 只要数据库已保存，API 返回成功状态、非 PII 的询盘 ID 和 `redirectTo=/thank-you/`；邮件失败进入补发，不把记录删除。
8. 使用 `fetch` 的表单收到成功响应后再执行浏览器跳转；原生表单 POST 可在服务端返回 `303`。校验或数据库写入失败时不得跳转。

生产项目提供：

- 最近询盘查询。
- `failed`/长期 `pending` 查询。
- 有上限的补发命令或定时任务（systemd timer 或 cron）。
- 每日数据库与邮件发送状态对账。

## 7. 感谢页与广告转化

`/thank-you/` 是独立静态页面，也是询盘转化的确认页：

- 只在数据库已成功保存询盘后进入；不要在点击提交按钮时提前跳转。
- 页面明确告知“需求已收到”、预计响应方式与下一步，并提供返回产品或首页的入口。
- 设置 `noindex, follow`，不进入 sitemap、主导航或站内搜索结果。
- 表单成功后把唯一询盘 ID 暂存到同源 `sessionStorage`，感谢页读取后向 GTM、Google Ads 或分析工具发送一次事件，再清除已消费标记。
- 使用唯一询盘 ID 作为 `transaction_id` 或等价去重字段；不得把姓名、邮箱、电话、留言等 PII 放进 URL、dataLayer 或广告事件。
- 直接打开感谢页、刷新、后退再前进或重复回放同一询盘，不应再次计为新转化。
- 如果客户只配置“访问该 URL 即转化”的基础规则，也要说明它无法可靠排除手动访问和刷新；生产方案优先使用成功标记与唯一 ID 去重。

## 8. VPS 部署

部署不得直接绕过项目质量闸门。代表性流程：

```bash
# 部署机
npm run quality
npm run build

# 同步静态产物（保留权限、原子替换由发布目录 + 软链接完成）
rsync -av --delete dist/ deploy@example.com:/var/www/example.com/releases/$RELEASE_ID/

# 首次配置 VPS（只执行一次）
ssh deploy@example.com
sudo apt install nginx certbot python3-certbot-nginx
# 安装 Node.js LTS、创建站点用户与目录、写入 systemd 单元

# API 服务
sudo systemctl enable --now inquiry-api.service
sudo systemctl restart inquiry-api.service

# SSL（首次）
sudo certbot --nginx -d example.com -d www.example.com
```

`quality` 必须串行执行 typecheck、lint、可用测试、build 和带 route manifest 的静态 SEO 验证。任一步返回非零退出码，部署必须停止。

代表性 Nginx 站点配置边界：

- 静态 `root` 指向当前 release 目录；`/api/` 反向代理到本机 Node 服务端口，不经过公开网络。
- 未知路径返回真正的 404（`try_files` 指向 404 页或返回 404），不回退成 200 首页。
- 开启 gzip/brotli、合理的缓存头和安全响应头。
- `/api/` 限速，防止脚本刷接口。
- HTTP 301 到 HTTPS；`www` 与裸域名选定一个 canonical host 并重定向。

不要用 root 身份运行 Node 服务；systemd 单元使用专用站点用户，配置 `Restart=on-failure`。服务端口只监听 `127.0.0.1`，由 Nginx 对外。

Resend Key、Turnstile Secret 写入 systemd 环境文件（`EnvironmentFile`）或等效安全存储，权限 `0600`、归属服务用户；普通收件地址和已确认的非敏感设置可放版本库配置。Secret 更新后重启服务再测试，不能只看文件已保存就认为旧进程生效。

Turnstile 由 Agent 在已授权账户创建/复用，核对正式主机名和测试主机名；公开 Site Key 可进前端，私有 Secret 只进服务器环境。不在正式网站使用测试密钥，未接通时不静默关闭反垃圾校验。

## 9. Agent 自动化边界

取得授权后，Agent 可以自动：

- 通过 SSH 连接客户 VPS，安装和更新 Nginx、Node.js、certbot 等站点依赖。
- 执行数据库迁移、同步媒体、写配置和管理 systemd 服务。
- 构建、部署、查询数据库和运行 smoke。
- 配置已授权域名的 DNS 记录（A/AAAA、CNAME、发信验证记录）。

仍需用户完成或明确：

- 第一次 hPanel/SSH 访问配置和服务器开机设置。
- 目标服务器、域名、收件邮箱和付费范围。
- SSH 密钥的注入或部署用户的创建。
- 最终域名切换与真实收件测试。

自动化脚本必须幂等：重复运行时先读取现状，复用正确资源；不得重复创建数据库文件、systemd 单元、Nginx 配置和 API Key。
