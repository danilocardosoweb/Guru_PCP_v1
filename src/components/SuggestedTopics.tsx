
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, BookOpen, Sparkles, Brain,
  Lightbulb, Target, Gauge, HeartHandshake, Scale
} from 'lucide-react';

interface SuggestedTopicsProps {
  onTopicSelect: (topic: string) => void;
}

const SuggestedTopics: React.FC<SuggestedTopicsProps> = ({ onTopicSelect }) => {
  // Opções de personalidade e técnicas de PNL para o Guru do PCP
  const pnlOptions = [
    {
      title: "Personalidades do Guru",
      icon: <MessageSquare size={16} />,
      options: [
        { text: "Como você pode me ajudar como especialista técnico em PCP?", icon: <Gauge size={14} /> },
        { text: "Prefiro que você explique de forma didática, como um professor", icon: <BookOpen size={14} /> },
        { text: "Gostaria que você fosse mais amigável e conversacional", icon: <HeartHandshake size={14} /> },
        { text: "Preciso de respostas mais concisas e diretas", icon: <Target size={14} /> }
      ]
    },
    {
      title: "Técnicas de PNL",
      icon: <Brain size={16} />,
      options: [
        { text: "Como você usa ancoragem para associar ideias em suas explicações?", icon: <Lightbulb size={14} /> },
        { text: "Que técnicas de rapport você utiliza para criar conexão na conversa?", icon: <HeartHandshake size={14} /> },
        { text: "Como você adapta sua linguagem ao meu modelo de mundo?", icon: <Sparkles size={14} /> },
        { text: "Quais padrões de linguagem você usa para redirecionar perguntas?", icon: <MessageSquare size={14} /> }
      ]
    },
    {
      title: "Abordagens de Coaching",
      icon: <Target size={16} />,
      options: [
        { text: "Como você equilibra informação técnica com perguntas reflexivas?", icon: <Scale size={14} /> },
        { text: "Que técnicas você usa para me ajudar a descobrir soluções por conta própria?", icon: <Lightbulb size={14} /> },
        { text: "Como você estrutura suas respostas para promover aprendizado?", icon: <BookOpen size={14} /> },
        { text: "De que forma você me ajuda a aplicar o conhecimento na prática?", icon: <Target size={14} /> }
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[180px] pr-2">
        <div className="space-y-4">
          {pnlOptions.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 rounded-full bg-accent text-primary">{section.icon}</div>
                <h3 className="text-sm font-medium">{section.title}</h3>
              </div>
              <div className="grid grid-cols-1 gap-1.5 pl-7">
                {section.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="justify-start text-left text-xs h-auto py-2 pl-2 pr-3"
                    onClick={() => onTopicSelect(option.text)}
                  >
                    <div className="mr-2 text-primary">{option.icon}</div>
                    {option.text}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SuggestedTopics;
