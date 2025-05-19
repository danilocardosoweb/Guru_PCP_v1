
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Send, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: "Mensagem vazia",
        description: "Por favor, digite uma pergunta para o Guro do PCP.",
        variant: "destructive"
      });
      return;
    }

    onSendMessage(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full bg-white p-4 border-t border-purple-100 shadow-inner">
      <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full w-full">
        <Sparkles size={18} className="text-primary animate-pulse" />
        <Input
          type="text"
          placeholder="Digite sua pergunta sobre PCP ou Logística..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
          className="flex-1 border-none shadow-none bg-transparent focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          size="sm"
          className="rounded-full px-4 bg-primary hover:bg-secondary transition-colors"
        >
          {isLoading ? "Enviando..." : <Send size={16} />}
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
