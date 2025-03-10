// src/types/index.ts

export interface Categoria {
  id: number;
  nome: string;
  cor: string;
}

export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: string;
  data: string;
  categoria: string;
  categoriaId: number;
  mes: number;
  ano: number;
}

export interface BalanceData {
  name: string;
  receitas: number;
  despesas: number;
}

export interface GastoPorCategoria {
  name: string;
  valor: number;
  color: string;
}