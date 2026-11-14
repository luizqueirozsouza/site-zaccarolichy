import { SITE } from './site';

export function urlAbsoluta(path: string, base: string): string {
  return new URL(path.replace(/^\/+/, '/'), base.endsWith('/') ? base : `${base}/`).toString();
}

export function legalServiceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: SITE.nome,
    description: SITE.descricao,
    telephone: SITE.telefone,
    email: SITE.email,
    areaServed: 'BR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.endereco.rua,
      addressLocality: SITE.endereco.cidade,
      addressRegion: SITE.endereco.uf,
      postalCode: SITE.endereco.cep,
      addressCountry: 'BR',
    },
    identifier: SITE.oab,
  };
}

export function attorneyJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    name: 'Davi Zaccaro Lichy',
    worksFor: { '@type': 'LegalService', name: SITE.nome },
    identifier: SITE.oab,
    knowsAbout: [
      'Direito Civil',
      'Direito Empresarial',
      'Direito Penal',
      'Direito Imobiliário',
      'Direito Tributário',
      'Direito do Trabalho',
      'Direito de Família e Sucessões',
    ],
  };
}
