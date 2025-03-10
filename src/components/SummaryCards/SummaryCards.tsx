// src/components/SummaryCards/SummaryCards.tsx

import React from 'react';
import SummaryCard from './SummaryCard';
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';

interface SummaryCardsProps {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  percentualGasto: string;
  filtroMes: number;
  filtroAno: number;
  meses: string[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalReceitas,
  totalDespesas,
  saldo,
  percentualGasto,
  filtroMes,
  filtroAno,
  meses,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <SummaryCard
        title="Receitas Totais"
        value={totalReceitas}
        icon={<ArrowUpRight className="h-6 w-6 text-green-600" />}
        color="green"
        subtitle={`${meses[filtroMes]}/${filtroAno}`}
      />
      <SummaryCard
        title="Despesas Totais"
        value={totalDespesas}
        icon={<ArrowDownRight className="h-6 w-6 text-red-600" />}
        color="red"
        subtitle={`${meses[filtroMes]}/${filtroAno}`}
      />
      <SummaryCard
        title="Saldo Atual"
        value={saldo}
        icon={<DollarSign className="h-6 w-6 text-blue-600" />}
        color="blue"
        subtitle={`${percentualGasto}% do seu orçamento foi gasto`}
      />
    </div>
  );
};

export default SummaryCards;