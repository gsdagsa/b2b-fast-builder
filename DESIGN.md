# DESIGN.md — topaluminumwindow

## 方向

`professional-premium-b2b-corporate`：面向北美/澳洲/中东进口商与承包商的制造型企业站。目标是让买家在 10 秒内确认"这是有工厂、有出口经验的铝系统制造商，可以发 RFQ"。

参考逻辑（获客参考，不复制视觉）：出口型铝系统制造商站的常见信息顺序——定位 → 产品系统入口 → 工厂/证据 → RFQ。

## 买家任务优先级

1. 进口商/经销商：产品线广度、起订与定制能力、出口经验。
2. 承包商/开发商：项目型供货、规格/认证、交期。
3. OEM 品牌方：工艺、型材/表面处理选项、贴牌能力。
4. 终端业主：从分类页引导到"找当地经销商/发需求"，不承诺零售价格。

## 设计 Token（来源：src/styles/tokens.css，单一真源）

配色参考 wanjiawindows.com（2026-10-05 用户指定）：**黑 + 白 + 暖黄**，白色页头 + 黑色页脚/深色区块结构。

- 色彩：
  - `--color-brand` #000000：深色区块（hero、页脚、CTA band）背景
  - `--color-brand-deep` #1a1a1a：深色区块 hover 态
  - `--color-gold` #ffcd57：品牌强调/CTA（参考站主色 #FFCD57）
  - `--color-gold-strong` #ffdc14：CTA hover（参考站亮黄）
  - `--color-canvas` #f2f5f7：浅灰区块背景
  - `--color-surface` #ffffff：页面/卡片背景
  - `--color-heading` #1e293b：标题深板岩色（参考站标题色）
  - `--color-ink` #000000：正文；`--color-ink-muted` #6b6b6b：次要文字
  - `--color-line` #e7e7e7：边框/分隔
- 字体：系统无衬线栈，不引第三方字体（性能优先，首版不加外部请求）。
- 间距/圆角/阴影/容器宽度：全部走 token，页面组件不得散落任意值。

注意：CTA 按钮为黄底黑字（gold 背景 + brand-deep/ink 文字），与参考站对比逻辑一致。

## 图片规则

- 首版无客户真实图片：使用**明确标记的预览占位**（中性底 + "Preview placeholder" 标签），不使用 SVG 伪产品图冒充实拍。
- 占位组件 `Placeholder` 统一管理标签与 `aria-hidden` 语义；替换真实图片时按 media manifest 走。
- 首屏不放占位大图轮播；首屏以文案 + 结构化证据为主，避免占位图损害样板观感。

## 已确认选择

- 2026-10-05：方向按默认 `professional-premium-b2b-corporate` 提案，等用户对样板确认后更新本节与 `directionStatus`。
- 表单：简单字段为主 + 可选项目字段，不强制注册。
- 语言：英语单语首版；hreflang 待多语言计划确认后再加。

## 边界

- 样式确认 ≠ 内容确认：产品图、认证、案例在正式发布前必须替换为真实素材。
- 未核验声明（认证型号、产能数字）不得出现在正式页面上。
