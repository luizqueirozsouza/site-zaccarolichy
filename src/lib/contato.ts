export interface DadosContato {
  nome: string;
  email: string;
  telefone: string;
  area: string;
  resumo: string;
  urgencia: string;
  consentimento: string;
  website: string;
}

export type ErrosContato = Partial<Record<keyof DadosContato, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validarContato(dados: DadosContato): ErrosContato {
  const erros: ErrosContato = {};
  if (!dados.nome || dados.nome.trim().length < 3) erros.nome = 'Informe seu nome completo.';
  if (!dados.email || !EMAIL.test(dados.email)) erros.email = 'Informe um e-mail válido.';
  if (!dados.telefone || dados.telefone.replace(/\D/g, '').length < 10) erros.telefone = 'Informe um telefone com DDD.';
  if (!dados.area) erros.area = 'Selecione a área de interesse.';
  if (!dados.resumo || dados.resumo.trim().length < 20) erros.resumo = 'Descreva o caso em pelo menos 20 caracteres.';
  if (!dados.consentimento) erros.consentimento = 'É necessário autorizar o contato.';
  if (dados.website) erros.website = 'Não foi possível enviar.';
  return erros;
}
