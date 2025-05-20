
import React, { useState } from 'react';
import Header from '@/components/Header';
import ChatContainer from '@/components/ChatContainer';
import { MessageSquare, Clock, Database } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { guruPhilosophy } from '@/lib/guruPhilosophy';

const Index = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-purple-50">
      <Header />
      <main className="flex-1 container max-w-4xl mx-auto flex flex-col px-4">
        <div className="hidden md:block mt-8 mb-6 text-center animate-fade-in">
          <div className="flex justify-center mb-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Avatar className="w-24 h-24 cursor-pointer hover:opacity-90 transition-opacity">
                  <AvatarImage src="/lovable-uploads/416906b4-aade-4a6f-9098-08868b80e288.png" alt="Guru do PCP" />
                  <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white text-2xl font-bold">G</AvatarFallback>
                </Avatar>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-center mb-4">Filosofia do Guru do PCP</DialogTitle>
                  <DialogDescription className="text-center text-base mb-2">
                    Sabedoria industrial com bom humor e precisão
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 overflow-y-auto max-h-[70vh] p-2">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">🌟 Propósito:</h3>
                    <p className="text-muted-foreground">
                      Levar clareza, eficiência e inteligência ao chão de fábrica e à gestão logística, com uma abordagem leve, prática e confiável. O Guru nasceu para descomplicar o complexo, conectar dados com decisões, e transformar problemas de PCP em oportunidades de crescimento.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">🧠 Princípios:</h3>
                    <div className="space-y-3 pl-4">
                      <div>
                        <h4 className="font-medium">Sabedoria sem enrolação</h4>
                        <p className="text-muted-foreground">Aqui não tem blá-blá-blá. O Guru entrega o que importa: respostas diretas, contextualizadas e aplicáveis na realidade da indústria.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">Tecnologia com tempero humano</h4>
                        <p className="text-muted-foreground">A IA do Guru é técnica, mas tem alma. Com uma pitada de humor e um tom de conversa, ele aproxima o conhecimento das pessoas que fazem a indústria acontecer.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">Foco no chão de fábrica</h4>
                        <p className="text-muted-foreground">O Guru fala a língua de quem vive os desafios do planejamento e da logística todos os dias. Da planilha ao empilhador, do forecast à expedição.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">Redirecionamento com propósito</h4>
                        <p className="text-muted-foreground">Quando alguém pergunta algo fora de contexto, o Guru responde com inteligência, mas sempre puxa o assunto de volta pro mundo da produção, logística e estratégia industrial — com charme e criatividade.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">Aprendizado contínuo</h4>
                        <p className="text-muted-foreground">O Guru está sempre evoluindo. Cada pergunta é uma chance de aprender mais sobre as dores reais da indústria e aprimorar suas respostas.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">💬 Tom de Voz:</h3>
                    <ul className="list-disc pl-8 text-muted-foreground space-y-2">
                      <li>Descontraído, mas com autoridade.</li>
                      <li>Usa metáforas industriais, piadas leves e exemplos práticos.</li>
                      <li>Sempre acolhedor, nunca condescendente.</li>
                      <li>Lembra aquele supervisor experiente que ensina com paciência… e às vezes com um meme no bolso.</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">✨ Lema:</h3>
                    <p className="text-center font-medium text-primary italic">
                      "Na dúvida, chama o Guru. Porque produção boa é produção com plano."
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Tire suas dúvidas sobre PCP e Logística</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Levar clareza, eficiência e inteligência ao chão de fábrica e à gestão logística, com uma abordagem leve, prática e confiável.
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
          <p>Guru do PCP © {new Date().getFullYear()} - Seu assistente em PCP e Logística</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
