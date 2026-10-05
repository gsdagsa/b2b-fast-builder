import "../styles/tokens.css";

/* Progressive enhancement only: all content works without this script. */

function setupNavToggle(): void {
  const toggle = document.querySelector<HTMLButtonElement>("#nav-toggle");
  const nav = document.querySelector<HTMLElement>("#site-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("hidden");
    nav.classList.toggle("block");
  });
}

interface InquiryResponse {
  ok?: boolean;
  inquiryId?: string;
  redirectTo?: string;
  error?: string;
}

function setupRfqForm(): void {
  const form = document.querySelector<HTMLFormElement>("[data-inquiry-form]");
  const status = document.querySelector<HTMLElement>("#rfq-status");
  if (!form) return;

  const showStatus = (message: string, isError: boolean): void => {
    if (!status) return;
    status.textContent = message;
    status.classList.toggle("text-red-700", isError);
  };

  form.addEventListener("submit", (event) => {
    if (event.defaultPrevented) return;
    event.preventDefault();

    const honeypot = form.querySelector<HTMLInputElement>("#company_website");
    if (honeypot && honeypot.value.length > 0) {
      showStatus("Submission blocked.", true);
      return;
    }

    const submitButton = form.querySelector<HTMLButtonElement>("button[type=submit]");
    if (submitButton) submitButton.disabled = true;
    showStatus("Sending…", false);

    const payload = new FormData(form);
    const body: Record<string, string> = {};
    payload.forEach((value, key) => {
      body[key] = String(value);
    });
    body.submission_key = `sk_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;

    fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        const data = (await response.json().catch(() => ({}))) as InquiryResponse;
        if (response.ok && data.inquiryId && data.redirectTo) {
          try {
            sessionStorage.setItem("inquiry_id", data.inquiryId);
          } catch {
            /* storage unavailable; conversion event will be skipped */
          }
          window.location.assign(data.redirectTo);
          return;
        }
        if (response.status === 404 || response.status === 501 || response.status === 502) {
          showStatus("Preview mode: the inquiry service is not connected yet. Nothing was sent.", true);
        } else {
          showStatus(data.error ?? "Submission failed. Please check your input and try again.", true);
        }
      })
      .catch(() => {
        showStatus("Network error — your message was not sent. Please try again.", true);
      })
      .finally(() => {
        if (submitButton) submitButton.disabled = false;
      });
  });
}

function setupThankYouConversion(): void {
  const inquiryIdNode = document.querySelector<HTMLElement>("[data-inquiry-id]");
  if (!inquiryIdNode) return;

  let inquiryId: string | null = null;
  try {
    inquiryId = sessionStorage.getItem("inquiry_id");
  } catch {
    inquiryId = null;
  }
  if (!inquiryId) {
    inquiryIdNode.textContent = "is saved in our system";
    return;
  }
  inquiryIdNode.textContent = `#${inquiryId}`;

  const consumedKey = `conversion_sent_${inquiryId}`;
  try {
    if (sessionStorage.getItem(consumedKey)) return;
    const windowWithLayer = window as unknown as { dataLayer?: unknown[] };
    windowWithLayer.dataLayer = windowWithLayer.dataLayer ?? [];
    windowWithLayer.dataLayer.push({
      event: "inquiry_submit_success",
      transaction_id: inquiryId,
    });
    sessionStorage.setItem(consumedKey, "1");
  } catch {
    /* storage unavailable; skip conversion tracking silently */
  }
}

function main(): void {
  setupNavToggle();
  setupRfqForm();
  setupThankYouConversion();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}
