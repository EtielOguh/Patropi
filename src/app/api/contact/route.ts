import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(8).max(30),
  email: z.string().trim().email().optional().or(z.literal("")),
  subject: z.enum(["Hospedagem", "Restaurante", "Reserva", "Evento", "Dúvida", "Outro"]),
  message: z.string().trim().min(10).max(2000),
  company: z.string().max(0).optional(),
});

const attempts = new Map<string, { count: number; expires: number }>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
  const now = Date.now();
  const record = attempts.get(ip);
  if (record && record.expires > now && record.count >= LIMIT) return NextResponse.json({ message: "Muitas tentativas. Aguarde alguns minutos e tente novamente." }, { status: 429 });
  attempts.set(ip, !record || record.expires <= now ? { count: 1, expires: now + WINDOW } : { ...record, count: record.count + 1 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ message: "Dados inválidos." }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: "Revise os campos obrigatórios e tente novamente." }, { status: 400 });
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ message: "O envio online ainda está em configuração. Por favor, ligue para (22) 2778-2061." }, { status: 503 });
  try {
    const response = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data), signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error("provider failure");
    return NextResponse.json({ message: "Mensagem enviada. A equipe responderá pelo contato informado." });
  } catch { return NextResponse.json({ message: "Não foi possível enviar agora. Tente novamente ou fale conosco por telefone." }, { status: 502 }); }
}
