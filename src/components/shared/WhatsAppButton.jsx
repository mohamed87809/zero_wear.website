// src/components/shared/WhatsAppButton.jsx

import { MessageCircle } from 'lucide-react';

const PHONE_NUMBER = '213555123456'; // digits only, international format
const DEFAULT_MESSAGE = 'Hi! I have a question about Zero Wear DZ products.';

function WhatsAppButton() {
  const href = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
    DEFAULT_MESSAGE
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 left-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 sm:bottom-8 sm:left-8"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40" />
      <MessageCircle size={22} className="relative fill-white" />
    </a>
  );
}

export default WhatsAppButton;