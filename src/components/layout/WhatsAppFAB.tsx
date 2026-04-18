import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function WhatsAppFAB() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=5515974011072&text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Caminho%20da%20Luz."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full bg-[#25D366] shadow-lg hover:scale-110 transition-all duration-300 h-14 w-14 md:h-14 md:w-14 text-white"
      aria-label="Fale conosco no WhatsApp"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
