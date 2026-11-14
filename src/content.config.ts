import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const areas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/areas' }),
  schema: z.object({
    title: z.string(),
    ordem: z.number().int().min(1).max(7),
    resumo: z.string().max(180),
    description: z.string().max(160),
    frentes: z.array(z.object({ titulo: z.string(), texto: z.string() })).min(4).max(6),
    cenarios: z.array(z.string()).min(4),
    faqs: z.array(z.object({ pergunta: z.string(), resposta: z.string() })).length(4),
  }),
});

const publicacoes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publicacoes' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    area: z.string(),
    date: z.coerce.date(),
    resumo: z.string().max(200),
    tempoLeitura: z.number().int().positive(),
  }),
});

export const collections = { areas, publicacoes };
