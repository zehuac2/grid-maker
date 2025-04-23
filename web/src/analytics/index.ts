declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export function gtag(...args: unknown[]): void {
  window.dataLayer.push(args);
}

export function initializeGA() {
  if (import.meta.env.PROD) {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-JEYNQS62DG';
    script.async = true;
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', 'G-JEYNQS62DG');
}
