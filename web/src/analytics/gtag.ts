declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export default function gtag(...args: unknown[]): void {
  window.dataLayer.push(args);
}

window.dataLayer = window.dataLayer || [];
window.gtag = gtag;
