// aavira.made-by-ac.com serves the restaurant site at its root. On that host, links back to the
// studio have to be absolute, because "/" there is Aavira itself.
export const ON_AAVIRA_HOST = typeof window !== "undefined" && /^aavira\./.test(window.location.hostname);
export const MADE = ON_AAVIRA_HOST ? "https://www.made-by-ac.com" : "";
