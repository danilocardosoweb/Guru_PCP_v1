
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import SuggestedTopics from './SuggestedTopics';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  animate?: boolean;
  showTopicSuggestions?: boolean;
  onTopicSelect?: (topic: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isUser, 
  animate = false, 
  showTopicSuggestions = false,
  onTopicSelect = () => {} 
}) => {
  // Alternar entre diferentes imagens do Guru com base no conteúdo da mensagem
  // Isso dará um pouco de variedade à interação
  const getGuruImage = () => {
    // Simplificando, vamos usar a primeira imagem para mensagens normais,
    // a segunda para mensagens mais explicativas (mais longas)
    // e a terceira para mensagens curtas/concisas
    if (message.length > 200) {
      return "/lovable-uploads/416906b4-aade-4a6f-9098-08868b80e288.png"; // Guru explicando
    } else if (message.length < 50) {
      return "/lovable-uploads/563c23d2-5a70-41a7-8a12-fba62e307f0b.png"; // Guru meditando
    }
    return "/lovable-uploads/112953cb-ad22-42b9-8cc5-80a48e065301.png"; // Guru padrão
  };
  
  // Função para renderizar mensagens com termos clicáveis entre asteriscos duplos
  const renderMessageWithClickableTerms = (text: string) => {
    if (!text) return null;
    
    // Expressão regular para identificar termos entre asteriscos duplos
    const regex = /\*\*(.*?)\*\*/g;
    
    // Dividir a mensagem em partes: texto normal e termos clicáveis
    const parts = [];
    let lastIndex = 0;
    let match;
    
    // Encontrar todos os termos entre asteriscos duplos
    while ((match = regex.exec(text)) !== null) {
      // Adicionar o texto antes do termo encontrado
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.substring(lastIndex, match.index)
        });
      }
      
      // Adicionar o termo encontrado (sem os asteriscos)
      const term = match[1];
      parts.push({
        type: 'term',
        content: term
      });
      
      lastIndex = match.index + match[0].length;
    }
    
    // Adicionar o texto restante após o último termo encontrado
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex)
      });
    }
    
    // Renderizar as partes da mensagem
    return parts.map((part, index) => {
      if (part.type === 'text') {
        // Texto normal
        return <span key={index}>{part.content}</span>;
      } else {
        // Termo clicável
        return (
          <Button
            key={index}
            variant="link"
            className="px-1 py-0 h-auto font-medium text-primary hover:text-primary/80 hover:underline"
            onClick={() => onTopicSelect(part.content)}
          >
            {part.content}
          </Button>
        );
      }
    });
  };

  return (
    <div className={cn(
      "flex items-start gap-3 mb-6",
      isUser ? "flex-row-reverse" : ""
    )}>
      <div className={cn("flex-shrink-0")}>
        {isUser ? (
          <div className={cn(
            "min-w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white"
          )}>
            <User size={16} />
          </div>
        ) : (
          <Avatar className="w-8 h-8 rounded-full bg-accent">
            <AvatarImage src={getGuruImage()} alt="Guru do PCP" />
            <AvatarFallback className="bg-accent text-primary">G</AvatarFallback>
          </Avatar>
        )}
      </div>
      
      <div 
        className={cn(
          "py-3 px-4 rounded-2xl max-w-[80%] shadow-sm",
          isUser ? "bg-primary text-white rounded-tr-none" : "bg-accent text-foreground rounded-tl-none",
          animate && !isUser && "animate-bounce-in",
        )}
      >
        <div className="text-sm md:text-base whitespace-pre-wrap">
          {renderMessageWithClickableTerms(message)}
        </div>
        
        {/* Sugestões de tópicos removidas conforme solicitado */}
      </div>
    </div>
  );
};

export default ChatMessage;
