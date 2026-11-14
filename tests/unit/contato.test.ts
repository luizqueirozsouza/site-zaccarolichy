import { describe, expect, it } from 'vitest';
import { validarContato } from '../../src/lib/contato';

const base = {
  nome: 'Maria Silva',
  email: 'maria@exemplo.com',
  telefone: '(11) 99999-9999',
  area: 'Direito Civil & Contratos',
  resumo: 'Preciso revisar um contrato de prestação de serviços com urgência.',
  urgencia: 'normal',
  consentimento: 'on',
  website: '',
};

describe('validarContato', () => {
  it('aceita dados válidos', () => {
    expect(validarContato(base)).toEqual({});
  });

  it('rejeita nome curto', () => {
    expect(validarContato({ ...base, nome: 'M' }).nome).toBeDefined();
  });

  it('rejeita e-mail inválido', () => {
    expect(validarContato({ ...base, email: 'maria@' }).email).toBeDefined();
  });

  it('rejeita telefone com menos de 10 dígitos', () => {
    expect(validarContato({ ...base, telefone: '119999' }).telefone).toBeDefined();
  });

  it('rejeita resumo com menos de 20 caracteres', () => {
    expect(validarContato({ ...base, resumo: 'curto' }).resumo).toBeDefined();
  });

  it('rejeita ausência de consentimento', () => {
    expect(validarContato({ ...base, consentimento: '' }).consentimento).toBeDefined();
  });

  it('rejeita quando o honeypot está preenchido', () => {
    expect(validarContato({ ...base, website: 'spam' }).website).toBeDefined();
  });
});
