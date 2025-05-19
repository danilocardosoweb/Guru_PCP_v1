
import React, { useState } from 'react';
import Header from '@/components/Header';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SettingsIcon, MessageSquare } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ModelOption {
  id: string;
  name: string;
  description: string;
}

interface PersonalityOption {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  imageUrl: string;
}

const Settings = () => {
  const { toast } = useToast();
  
  // LLM Model options
  const modelOptions: ModelOption[] = [
    {
      id: "llama-3.3-70b-versatile",
      name: "LLaMA 3.3 70B (Versatile)",
      description: "Modelo avançado e equilibrado para respostas precisas"
    },
    {
      id: "llama-3.1-8b-instant",
      name: "LLaMA 3.1 8B (Rápido)",
      description: "Modelo menor e mais rápido para respostas instantâneas"
    },
    {
      id: "mixtral-8x7b-instruct",
      name: "Mixtral 8x7B",
      description: "Modelo alternativo com boa relação custo-benefício"
    }
  ];

  // Personality options com prompts atualizados para incluir PNL e redirecionamento para tópicos de PCP
  const personalityOptions: PersonalityOption[] = [
    {
      id: "specialist",
      name: "Especialista",
      description: "Respostas técnicas e precisas para profissionais da área",
      systemPrompt: "Você é o Guro do PCP, um especialista técnico em Planejamento e Controle da Produção e Logística. Forneça respostas precisas e técnicas, usando terminologia específica da área. Mantenha suas respostas concisas e focadas nos fatos técnicos. Se o usuário fizer perguntas não relacionadas a PCP ou Logística, use técnicas de PNL para gentilmente redirecioná-lo para um dos seguintes temas principais: Planejamento e Controle da Produção Integrado, Gestão de Estoques e Materiais, Previsão de Demanda e S&OP, Logística e Distribuição, ou Indicadores de Desempenho (KPIs) e Melhoria Contínua. Por exemplo, diga 'Entendo seu interesse em [tema fora do escopo], mas como especialista em PCP, posso ajudá-lo melhor com temas como...' e então ofereça opções relacionadas a PCP e Logística. Se o usuário parece não ter muito conhecimento sobre o assunto, apresente opções clicáveis para facilitar a escolha.",
      imageUrl: "/lovable-uploads/416906b4-aade-4a6f-9098-08868b80e288.png"
    },
    {
      id: "teacher",
      name: "Professor",
      description: "Explicações didáticas com exemplos e analogias",
      systemPrompt: "Você é o Guro do PCP, um professor de Planejamento e Controle da Produção e Logística. Explique conceitos de forma didática, usando exemplos e analogias para facilitar o entendimento. Seja paciente e estruture suas respostas em tópicos quando necessário. Se o usuário perguntar sobre temas não relacionados a PCP ou Logística, utilize PNL para redirecionar a conversa de maneira educativa, dizendo algo como: 'Essa é uma pergunta interessante! Embora não seja minha especialidade, posso compartilhar como esse conceito se relaciona com o mundo do PCP...' e então faça uma ponte para um dos temas principais: Planejamento e Controle da Produção Integrado, Gestão de Estoques e Materiais, Previsão de Demanda e S&OP, Logística e Distribuição, ou Indicadores de Desempenho. Se perceber que o usuário tem pouco conhecimento do assunto, apresente opções clicáveis organizadas por nível de complexidade.",
      imageUrl: "/lovable-uploads/112953cb-ad22-42b9-8cc5-80a48e065301.png"
    },
    {
      id: "friendly",
      name: "Amigável",
      description: "Conversação casual e amigável, ideal para iniciantes",
      systemPrompt: "Você é o Guro do PCP, um assistente amigável e acessível para assuntos de Planejamento e Controle da Produção e Logística. Use linguagem simples e conversacional, evitando jargões técnicos quando possível. Seja encorajador e positivo em suas respostas. Quando o usuário perguntar sobre temas fora do escopo de PCP e Logística, use PNL para redirecionar a conversa de forma natural e amigável: 'Entendo sua curiosidade sobre [tema]! Embora eu seja especializado em PCP e Logística, posso compartilhar como isso se conecta com...' e então faça uma conexão com um dos temas centrais: Planejamento e Controle da Produção, Gestão de Estoques, Previsão de Demanda, Logística ou KPIs. Para usuários iniciantes, sempre ofereça opções clicáveis e pergunte sobre seu nível de conhecimento para adaptar as explicações.",
      imageUrl: "/lovable-uploads/112953cb-ad22-42b9-8cc5-80a48e065301.png"
    },
    {
      id: "concise",
      name: "Conciso",
      description: "Respostas curtas e diretas para economizar tempo",
      systemPrompt: "Você é o Guro do PCP, especializado em Planejamento e Controle da Produção e Logística. Forneça respostas extremamente concisas e diretas, sem informações supérfluas. Priorize brevidade e clareza acima de tudo. Se o usuário fizer perguntas não relacionadas a PCP ou Logística, use técnicas de PNL para redirecionar brevemente: 'Para otimizar nossa conversa, posso ajudar com temas de PCP como...' e então liste algumas opções relacionadas aos temas principais: Planejamento da Produção, Gestão de Estoques, Previsão de Demanda, Logística ou KPIs. Mesmo sendo conciso, quando o usuário demonstrar pouco conhecimento, ofereça opções clicáveis de forma objetiva para facilitar a navegação pelos temas.",
      imageUrl: "/lovable-uploads/563c23d2-5a70-41a7-8a12-fba62e307f0b.png"
    }
  ];

  const [selectedModel, setSelectedModel] = useState<string>(localStorage.getItem('guroModel') || "llama-3.3-70b-versatile");
  const [selectedPersonality, setSelectedPersonality] = useState<string>(localStorage.getItem('guroPersonality') || "friendly");

  const handleSaveSettings = () => {
    // In a real app, you would save these settings to localStorage or a database
    localStorage.setItem('guroModel', selectedModel);
    localStorage.setItem('guroPersonality', selectedPersonality);
    
    const personality = personalityOptions.find(p => p.id === selectedPersonality);
    localStorage.setItem('guroSystemPrompt', personality?.systemPrompt || '');

    toast({
      title: "Configurações salvas",
      description: "Suas preferências foram atualizadas com sucesso!",
      duration: 3000,
    });
  };

  const selectedPersonalityData = personalityOptions.find(p => p.id === selectedPersonality);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-purple-50">
      <Header />
      <main className="flex-1 container max-w-4xl mx-auto flex flex-col px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Configurações</h1>
        
        <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-purple-100">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage src={selectedPersonalityData?.imageUrl} alt={`Guro do PCP - ${selectedPersonalityData?.name}`} />
              <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white text-2xl font-bold">G</AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-medium text-center">{selectedPersonalityData?.name}</h2>
            <p className="text-sm text-muted-foreground text-center mt-1">{selectedPersonalityData?.description}</p>
          </div>
          
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="model" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="model" className="flex items-center gap-2">
                  <SettingsIcon size={16} />
                  <span>Modelo LLM</span>
                </TabsTrigger>
                <TabsTrigger value="personality" className="flex items-center gap-2">
                  <MessageSquare size={16} />
                  <span>Personalidade</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="model">
                <Card>
                  <CardHeader>
                    <CardTitle>Modelo de Linguagem</CardTitle>
                    <CardDescription>
                      Escolha o modelo de IA para gerar as respostas do Guro do PCP
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={selectedModel} 
                      onValueChange={setSelectedModel}
                      className="space-y-4"
                    >
                      {modelOptions.map(model => (
                        <div key={model.id} className="flex items-start space-x-2 border rounded-lg p-3 hover:bg-accent transition-colors">
                          <RadioGroupItem value={model.id} id={model.id} />
                          <div className="grid gap-1.5">
                            <Label htmlFor={model.id} className="font-medium">{model.name}</Label>
                            <p className="text-sm text-muted-foreground">{model.description}</p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="personality">
                <Card>
                  <CardHeader>
                    <CardTitle>Personalidade do Assistente</CardTitle>
                    <CardDescription>
                      Escolha como você prefere que o Guro do PCP se comunique
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={selectedPersonality} 
                      onValueChange={setSelectedPersonality}
                      className="space-y-4"
                    >
                      {personalityOptions.map(personality => (
                        <div key={personality.id} className="flex items-start space-x-2 border rounded-lg p-3 hover:bg-accent transition-colors">
                          <RadioGroupItem value={personality.id} id={personality.id} />
                          <div className="grid gap-1.5 flex-grow">
                            <div className="flex items-center justify-between">
                              <Label htmlFor={personality.id} className="font-medium">{personality.name}</Label>
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={personality.imageUrl} alt={`${personality.name}`} />
                                <AvatarFallback>G</AvatarFallback>
                              </Avatar>
                            </div>
                            <p className="text-sm text-muted-foreground">{personality.description}</p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSaveSettings} className="bg-primary">
                Salvar Configurações
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
