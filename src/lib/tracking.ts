function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

function getUrlParam(name: string): string | null {
  if (typeof window === "undefined") return null;
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

export function gatherTrackingData() {
  return {
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
    gclid: getUrlParam("gclid"),
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    page_url: typeof window !== "undefined" ? window.location.href : null,
  };
}

export function buildWebhookPayload(
  leadData: Record<string, string | null>,
  origem: string
) {
  return {
    lead_data: leadData,
    tracking_data: gatherTrackingData(),
    metadata: {
      origem,
      plataforma: "Lovable",
    },
  };
}
