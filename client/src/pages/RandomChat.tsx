import { MessageCircle } from 'lucide-react';
import { ComingSoon } from '@/components/ComingSoon';

function RandomChat() {
  return (
    <ComingSoon
      title="Chat Aleatorio"
      icon={<MessageCircle className="h-5 w-5" />}
      description="Conéctate instantáneamente con personas al azar de todo el mundo. Un sistema de matchmaking que te empareja con otros usuarios para conversaciones espontáneas y efímeras."
    />
  );
}

export default RandomChat;