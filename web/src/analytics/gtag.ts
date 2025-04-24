declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export default function gtag(..._args: unknown[]): void {
  window.dataLayer.push(arguments);
}

window.dataLayer = window.dataLayer || [];
window.gtag = gtag;
