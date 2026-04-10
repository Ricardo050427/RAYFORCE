export default function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP || '526622151020';
  const message = encodeURIComponent('Hola, me interesa cotizar productos. ¿Me pueden ayudar?');
  
  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      💬
    </a>
  );
}
