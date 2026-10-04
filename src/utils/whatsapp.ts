export const AGB_WHATSAPP_NUMBER = "224628187100";

export interface WhatsAppContact {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timeline?: string;
}

export function buildWhatsAppMessage(c: WhatsAppContact): string {
  const lines = [
    "Bonjour AGB,",
    "",
    "Je souhaite vous contacter au sujet d'un projet.",
    "",
    `Nom : ${c.name.trim()}`,
    `Email : ${c.email.trim()}`,
    `Téléphone : ${c.phone.trim()}`,
    `Sujet : ${c.subject.trim()}`,
  ];
  if (c.timeline) lines.push(`Délai souhaité : ${c.timeline.trim()}`);
  lines.push("", "Message :", c.message.trim().replace(/\r\n?/g, "\n"), "", "Merci.");
  return lines.join("\n");
}

export function buildWhatsAppUrl(
  text: string,
  number: string = AGB_WHATSAPP_NUMBER,
): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
