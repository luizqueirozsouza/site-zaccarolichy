export const SITE = {
  nome: 'Zaccaro Lichy Advocacia',
  nomeCurto: 'Zaccaro Lichy',
  titulo: 'Zaccaro Lichy Advocacia | Advocacia Preventiva e Contenciosa',
  descricao:
    'Escritório de advocacia em São Paulo com atuação consultiva e contenciosa em direito civil, empresarial, tributário, imobiliário, trabalhista, de família e penal empresarial.',
  oab: 'OAB/SP nº 361.591',
  cnpj: '61.922.954/0001-46',
  endereco: {
    rua: 'Av. Paulista, nº 1.000, Conj. 82',
    bairro: 'Bela Vista',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '01310-100',
  },
  telefone: '(11) 3456-7890',
  whatsapp: '(11) 98765-4321',
  whatsappNumero: '5511987654321',
  email: 'contato@zaccarolichy.com.br',
  atendimento: 'Presencial em São Paulo e online em todo o território nacional',
} as const;

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsappNumero}?text=${encodeURIComponent(
  'Olá, gostaria de informações sobre atendimento jurídico.'
)}`;

export const NAV = [
  { label: 'O Escritório', href: '/o-escritorio/' },
  { label: 'Áreas de Atuação', href: '/areas-de-atuacao/' },
  { label: 'Equipe', href: '/equipe/davi-zaccaro-lichy/' },
  { label: 'Publicações', href: '/publicacoes/' },
  { label: 'Contato', href: '/contato/' },
] as const;

export const AREAS = [
  { slug: 'direito-civil-e-contratos', titulo: 'Direito Civil & Contratos' },
  { slug: 'direito-empresarial-e-societario', titulo: 'Direito Empresarial & Societário' },
  { slug: 'familia-e-planejamento-sucessorio', titulo: 'Família e Planejamento Sucessório' },
  { slug: 'direito-do-trabalho', titulo: 'Direito do Trabalho Estratégico' },
  { slug: 'direito-tributario-e-defesa-fiscal', titulo: 'Direito Tributário & Defesa Fiscal' },
  { slug: 'direito-imobiliario', titulo: 'Direito Imobiliário & Regularização' },
  { slug: 'direito-penal-tributario-e-empresarial', titulo: 'Direito Penal Tributário e Empresarial' },
] as const;
