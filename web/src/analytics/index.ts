import gtag from './gtag';

export function initializeGA() {
  if (import.meta.env.PROD) {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-JEYNQS62DG';
    script.async = true;
    document.body.appendChild(script);
  }

  gtag('js', new Date());
  gtag('config', 'G-JEYNQS62DG');
}
