/// <reference types="@cloudflare/workers-types" />
import { validarContato, type DadosContato } from '../../src/lib/contato';

interface Env {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
  CONTATO_EMAIL: string;
  REMETENTE_EMAIL: string;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const form = await request.formData();
  const dados: DadosContato = {
    nome: String(form.get('nome') ?? ''),
    email: String(form.get('email') ?? ''),
    telefone: String(form.get('telefone') ?? ''),
    area: String(form.get('area') ?? ''),
    resumo: String(form.get('resumo') ?? ''),
    urgencia: String(form.get('urgencia') ?? 'normal'),
    consentimento: String(form.get('consentimento') ?? ''),
    website: String(form.get('website') ?? ''),
  };

  const erros = validarContato(dados);
  if (Object.keys(erros).length > 0) {
    return json({ ok: false, message: Object.values(erros)[0] }, 422);
  }

  if (!env.RESEND_API_KEY || !env.TURNSTILE_SECRET_KEY) {
    return json(
      { ok: false, message: 'Envio temporariamente indisponível. Fale com o escritório pelo WhatsApp.' },
      503,
    );
  }

  const token = String(form.get('cf-turnstile-response') ?? '');
  const verifica = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({
      secret: env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: request.headers.get('CF-Connecting-IP') ?? '',
    }),
  });
  const resultado = (await verifica.json()) as { success: boolean };
  if (!resultado.success) return json({ ok: false, message: 'Falha na verificação de segurança. Tente novamente.' }, 400);

  const envio = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: `Site Zaccaro Lichy <${env.REMETENTE_EMAIL}>`,
      to: [env.CONTATO_EMAIL],
      reply_to: dados.email,
      subject: `Novo contato pelo site — ${dados.area}`,
      text: [
        `Nome: ${dados.nome}`,
        `E-mail: ${dados.email}`,
        `Telefone: ${dados.telefone}`,
        `Área: ${dados.area}`,
        `Urgência: ${dados.urgencia}`,
        '',
        dados.resumo,
      ].join('\n'),
    }),
  });

  if (!envio.ok) return json({ ok: false, message: 'Não foi possível enviar agora. Tente novamente ou use o WhatsApp.' }, 502);
  return json({ ok: true, message: 'Mensagem enviada. O escritório retornará em até 24 horas úteis.' });
};
