import { Link2 } from 'lucide-react';
import { ComingSoon } from '@/components/ComingSoon';

function PrivateChat() {
  return (
    <ComingSoon
      title="Chat Privado"
      icon={<Link2 className="h-5 w-5" />}
      description="Crea enlaces únicos para chatear de forma privada con quien quieras. Comparte el enlace y cualquier persona podrá unirse a tu sala personal y efímera."
    />
  );
}

export default PrivateChat;