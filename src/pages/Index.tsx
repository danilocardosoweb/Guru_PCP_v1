
import React from 'react';
import Header from '@/components/Header';
import ChatContainer from '@/components/ChatContainer';
import { MessageSquare, Clock, Database } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-purple-50">
      <Header />
      <main className="flex-1 container max-w-4xl mx-auto flex flex-col px-4">
        <div className="mt-8 mb-6 text-center animate-fade-in">
          <div className="flex justify-center mb-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/lovable-uploads/416906b4-aade-4a6f-9098-08868b80e288.png" alt="Guro do PCP" />
              <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white text-2xl font-bold">G</AvatarFallback>
            </Avatar>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Tire suas dúvidas sobre PCP e Logística</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Estou aqui para ajudar com conhecimento especializado em Planejamento e Controle da Produção
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-sm text-primary">
              <div className="p-2 rounded-full bg-accent">
                <MessageSquare size={16} className="text-primary" />
              </div>
              <span>Respostas Precisas</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary">
              <div className="p-2 rounded-full bg-accent">
                <Clock size={16} className="text-primary" />
              </div>
              <span>Resposta Rápida</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary">
              <div className="p-2 rounded-full bg-accent">
                <Database size={16} className="text-primary" />
              </div>
              <span>Conhecimento Especializado</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col mt-4 mb-8 border border-purple-100" style={{ height: '500px' }}>
          <ChatContainer />
        </div>
      </main>
      
      <footer className="py-4 text-center text-sm text-muted-foreground bg-white border-t border-purple-100">
        <div className="container mx-auto">
          <p>Guro do PCP © {new Date().getFullYear()} - Seu assistente em PCP e Logística</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
