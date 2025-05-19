/**
 * Tipos utilizados na aplicação do Guru do PCP
 */

export interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}
