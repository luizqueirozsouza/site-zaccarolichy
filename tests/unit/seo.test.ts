import { describe, expect, it } from 'vitest';
import { urlAbsoluta, legalServiceJsonLd } from '../../src/lib/seo';

describe('urlAbsoluta', () => {
  it('normaliza barras', () => {
    expect(urlAbsoluta('/contato/', 'https://exemplo.com')).toBe('https://exemplo.com/contato/');
  });
  it('não duplica a barra final da base', () => {
    expect(urlAbsoluta('areas-de-atuacao/', 'https://exemplo.com/')).toBe('https://exemplo.com/areas-de-atuacao/');
  });
});

describe('legalServiceJsonLd', () => {
  it('monta LegalService com endereço e OAB', () => {
    const ld = legalServiceJsonLd();
    expect(ld['@type']).toBe('LegalService');
    expect(JSON.stringify(ld)).toContain('361.591');
    expect(JSON.stringify(ld)).toContain('Av. Paulista');
  });
});
