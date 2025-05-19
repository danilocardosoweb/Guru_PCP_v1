
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { generateResponse } from '../lib/chat';
import { GroqMessage } from '../lib/groqApi';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Trash2, RefreshCw } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
  showTopicSuggestions?: boolean;
  timestamp?: number;
}

const personalityGreetings = {
  specialist: "Olá. Sou o Guro do PCP, especialista técnico em Planejamento e Controle da Produção e Logística. Como posso ajudar com questões técnicas hoje?",
  teacher: "Olá! Sou o Guro do PCP, professor de Planejamento e Controle da Produção e Logística. Estou aqui para explicar conceitos e tirar suas dúvidas com exemplos práticos. Como posso ajudar?",
  friendly: "Olá! Eu sou o Guro do PCP, especialista em Planejamento e Controle da Produção e Logística. Como posso ajudar você hoje? Se ainda não está familiarizado com esses temas, posso sugerir alguns tópicos para começarmos.",
  concise: "Guro do PCP aqui. Como posso ajudar?"
};

const ChatContainer: React.FC = () => {
  // Get the selected personality or default to friendly
  const personality = localStorage.getItem('guroPersonality') || 'friendly';
  const greeting = personalityGreetings[personality as keyof typeof personalityGreetings] || personalityGreetings.friendly;

  // Estado para armazenar as mensagens da conversa
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Estado para armazenar o histórico de mensagens para a API Groq
  const [messageHistory, setMessageHistory] = useState<GroqMessage[]>([]);
  
  // Carregar mensagens do localStorage quando o componente é montado
  useEffect(() => {
    const savedMessages = localStorage.getItem('guroMessages');
    const savedMessageHistory = localStorage.getItem('guroMessageHistory');
    
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages) as Message[];
        setMessages(parsedMessages);
      } catch (error) {
        console.error('Erro ao carregar mensagens salvas:', error);
        // Se houver erro, inicializa com a mensagem de saudação
        setMessages([
          {
            text: greeting,
            isUser: false,
            showTopicSuggestions: false,
            timestamp: Date.now()
          }
        ]);
      }
    } else {
      // Se não houver mensagens salvas, inicializa com a mensagem de saudação
      setMessages([
        {
          text: greeting,
          isUser: false,
          showTopicSuggestions: false,
          timestamp: Date.now()
        }
      ]);
    }
    
    if (savedMessageHistory) {
      try {
        const parsedHistory = JSON.parse(savedMessageHistory) as GroqMessage[];
        setMessageHistory(parsedHistory);
      } catch (error) {
        console.error('Erro ao carregar histórico de mensagens:', error);
        setMessageHistory([]);
      }
    }
  }, [greeting]);
  
  // Salvar mensagens no localStorage quando elas são atualizadas
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('guroMessages', JSON.stringify(messages));
    }
  }, [messages]);
  
  // Salvar histórico de mensagens para a API quando é atualizado
  useEffect(() => {
    if (messageHistory.length > 0) {
      localStorage.setItem('guroMessageHistory', JSON.stringify(messageHistory));
    }
  }, [messageHistory]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isLoading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 5;
          return newProgress >= 95 ? 95 : newProgress;
        });
      }, 300);
    } else {
      setProgress(100);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isLoading]);

  // Função para converter mensagens do formato Message para GroqMessage
  const convertToGroqMessages = (messages: Message[]): GroqMessage[] => {
    return messages
      .filter(msg => msg.text.trim() !== '') // Filtra mensagens vazias
      .map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text
      }));
  };

  // Função para limpar o histórico de conversas
  const clearConversationHistory = () => {
    // Manter apenas a mensagem de saudação
    const welcomeMessage = {
      text: greeting,
      isUser: false,
      showTopicSuggestions: false,
      timestamp: Date.now()
    };
    
    setMessages([welcomeMessage]);
    setMessageHistory([]);
    localStorage.removeItem('guroMessages');
    localStorage.removeItem('guroMessageHistory');
    
    toast({
      title: "Conversa reiniciada",
      description: "O histórico de conversas foi limpo.",
      duration: 3000,
    });
  };

  // Função para lidar com o envio de mensagens
  const handleSendMessage = async (text: string) => {
    // Adicionar timestamp à mensagem do usuário
    const userMessage: Message = { 
      text, 
      isUser: true,
      timestamp: Date.now()
    };
    
    // Adicionar mensagem do usuário ao estado
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      // Converter mensagens existentes para o formato da API Groq
      // Limitando a um número razoável de mensagens para evitar tokens excessivos
      const recentMessages = messages.slice(-10); // Usar apenas as 10 mensagens mais recentes
      const currentHistory = convertToGroqMessages(recentMessages);
      
      // Gerar resposta usando a API Groq com o histórico de mensagens
      const response = await generateResponse(text, currentHistory);
      
      // Detectar se a resposta indica que o usuário está saindo do tópico principal
      const isOffTopic = checkIfOffTopic(text, response);
      
      // Criar mensagem de resposta do bot
      const botMessage: Message = { 
        text: response, 
        isUser: false,
        showTopicSuggestions: isOffTopic,
        timestamp: Date.now()
      };
      
      // Adicionar resposta do bot com um pequeno atraso para parecer mais natural
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, botMessage]);
        
        // Atualizar o histórico de mensagens para a API
        const updatedHistory = [
          ...currentHistory,
          { role: 'user', content: text },
          { role: 'assistant', content: response }
        ];
        setMessageHistory(updatedHistory);
        
        setIsLoading(false);
      }, 300);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Mensagem de erro
      const errorMessage: Message = { 
        text: "Desculpe, tive um problema ao processar sua pergunta. Poderia tentar novamente?", 
        isUser: false,
        timestamp: Date.now()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
      setIsLoading(false);
    }
  };

  // Função para verificar se o usuário está saindo do tópico principal
  const checkIfOffTopic = (userMessage: string, botResponse: string): boolean => {
    // Palavras-chave relacionadas a PCP e Logística
    const pcpKeywords = [
      'pcp', 'planejamento', 'produção', 'estoque', 'inventário', 'demanda', 
      'logística', 'supply chain', 'cadeia de suprimentos', 'mrp', 'mps', 
      'kpi', 'indicador', 'manufatura', 'armazém'
    ];
    
    // Se a resposta do bot contém frases que indicam redirecionamento
    const redirectPhrases = [
      'como especialista em pcp', 
      'minha especialidade é', 
      'posso ajudar melhor com temas', 
      'vamos focar em temas',
      'prefiro falar sobre'
    ];
    
    // Verifica se o texto do usuário contém alguma palavra-chave de PCP
    const userMessageLowerCase = userMessage.toLowerCase();
    const containsPcpKeyword = pcpKeywords.some(keyword => 
      userMessageLowerCase.includes(keyword)
    );
    
    // Verifica se a resposta do bot contém alguma frase de redirecionamento
    const botResponseLowerCase = botResponse.toLowerCase();
    const containsRedirectPhrase = redirectPhrases.some(phrase => 
      botResponseLowerCase.includes(phrase)
    );
    
    // Determina se está fora do tópico: não tem palavras-chave de PCP ou bot está redirecionando
    return (!containsPcpKeyword || containsRedirectPhrase);
  };

  const handleTopicSelect = (topic: string) => {
    // Quando um tópico é selecionado, envia automaticamente como uma mensagem do usuário
    handleSendMessage(topic);
    toast({
      title: "Tópico selecionado",
      description: `Você escolheu: ${topic}`,
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="relative">
        {isLoading && (
          <div className="absolute top-0 left-0 right-0 z-10">
            <Progress value={progress} className="h-1 rounded-none bg-purple-100" />
          </div>
        )}
      </div>
      <div className="flex-1 overflow-hidden flex flex-col" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <div className="flex justify-end p-2 border-b">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearConversationHistory}
            className="text-xs flex items-center gap-1 text-muted-foreground hover:text-destructive"
          >
            <RefreshCw size={14} />
            <span>Reiniciar conversa</span>
          </Button>
        </div>
        <ScrollArea className="flex-1 pr-2" style={{ height: 'calc(100% - 40px)' }}>
          <div className="p-6 space-y-4">
            {messages.map((msg, index) => (
              <ChatMessage 
                key={index} 
                message={msg.text} 
                isUser={msg.isUser}
                animate={!msg.isUser && index === messages.length - 1}
                showTopicSuggestions={msg.showTopicSuggestions}
                onTopicSelect={handleTopicSelect}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatContainer;
