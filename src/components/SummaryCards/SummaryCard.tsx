// src/components/SummaryCards/SummaryCard.tsx

import React from 'react';
//import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, color, subtitle }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h2 className="text-2xl font-bold text-gray-800">R$ {value.toLocaleString('pt-BR')}</h2>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`h-12 w-12 rounded-full bg-${color}-100 flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;