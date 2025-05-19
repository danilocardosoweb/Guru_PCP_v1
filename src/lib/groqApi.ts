// Groq API Integration Service
import { incorporatePhilosophy } from "./guruPhilosophy";

// Definição dos tipos
export interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

const GROQ_API_KEY = "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";
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

export interface GroqResponse {
  text: string;
  isUser: boolean;
}

export const generateGroqResponse = async (userInput: string, messageHistory: GroqMessage[] = []): Promise<string> => {
  try {
    const model = localStorage.getItem('guruModel') || "llama-3.3-70b-versatile";
    const baseSystemPrompt = localStorage.getItem('guruSystemPrompt') || "Você é o Guru do PCP, um assistente especializado em Planejamento e Controle da Produção e Logística. Forneça respostas úteis, precisas e educativas sobre esses temas.";
    
    // Incorporar a filosofia do Guru do PCP no prompt do sistema
    const systemPrompt = incorporatePhilosophy(baseSystemPrompt);

    // Lista de tópicos principais para contexto
    const mainTopics = `
      Os principais tópicos em que sou especialista são:
      
      1. Planejamento e Controle da Produção (PCP) Integrado
         - MPS (Planejamento Mestre da Produção)
         - MRP (Planejamento das Necessidades de Materiais)
         - Sequenciamento e balanceamento de linhas
         - Gestão de capacidade produtiva

      2. Gestão de Estoques e Materiais
         - Classificação ABC e curva XYZ
         - Estoque mínimo e ponto de ressuprimento
         - Inventário cíclico e rotativo
         - Otimização do almoxarifado e layout

      3. Previsão de Demanda e S&OP
         - Modelos de previsão quantitativos e qualitativos
         - S&OP (Sales and Operations Planning)
         - Análise de sazonalidade e tendências
         - Indicadores de acuracidade (MAPE, WAPE)

      4. Logística e Distribuição
         - Logística inbound e outbound
         - Roteirização e programação de cargas
         - Gestão de transportadoras e fretes
         - Last mile e lead time logístico

      5. Indicadores de Desempenho (KPIs) e Melhoria Contínua
         - OTIF, OEE, Lead Time, Fill Rate, DIFOT
         - Dashboards e BI para gestão visual
         - Ciclo PDCA e metodologia Lean
         - Auditorias de processos e planos de ação
    `;
    
    // Instruções de PNL para redirecionamento
    const pnlInstructions = `
      Se o usuário fizer perguntas não relacionadas aos temas acima, use técnicas de PNL para gentilmente redirecioná-lo:
      1. Reconheça o interesse do usuário: "Entendo sua curiosidade sobre [tema fora do escopo]..."
      2. Faça uma ponte para seus temas principais: "...isso me lembra um conceito interessante em PCP que é..."
      3. Sugira alternativas relevantes: "Se você está interessado em [conceito relacionado], posso explicar como funciona o [tema de PCP relacionado]."
      4. Para usuários com pouco conhecimento, sugira: "Seria útil explorarmos alguns tópicos fundamentais de PCP? Posso sugerir algumas opções para começarmos."
      
      Mantenha um tom amigável e respostas técnicas precisas, sempre dentro do escopo de PCP e Logística.
    `;

    // Combinar o prompt do sistema com as instruções adicionais
    const enhancedSystemPrompt = `${systemPrompt}\n\n${mainTopics}\n\n${pnlInstructions}`;

    // Construir a lista de mensagens com o histórico
    const messages: GroqMessage[] = [
      {
        role: "system",
        content: enhancedSystemPrompt
      }
    ];
    
    // Adicionar histórico de mensagens se existir
    const allMessages = messageHistory && messageHistory.length > 0 
      ? [...messages, ...messageHistory, { role: "user", content: userInput }]
      : [...messages, { role: "user", content: userInput }];

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: model,
        messages: allMessages
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from Groq API:", errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Failed to generate response:", error);
    return "Desculpe, tive um problema ao processar sua pergunta. Poderia tentar novamente?";
  }
};
