// src/components/Filters/Filters.tsx

import React from 'react';
import { Filter } from 'lucide-react';

interface FiltersProps {
  filtroMes: number;
  setFiltroMes: (mes: number) => void;
  filtroAno: number;
  setFiltroAno: (ano: number) => void;
  meses: string[];
}

const Filters: React.FC<FiltersProps> = ({ filtroMes, setFiltroMes, filtroAno, setFiltroAno, meses }) => {
  return (
    <div className="flex items-center bg-white rounded-lg shadow px-3 py-2">
      <Filter className="h-4 w-4 text-gray-500 mr-2" />
      <select
        className="bg-transparent border-none focus:ring-0 text-sm"
        value={filtroMes}
        onChange={(e) => setFiltroMes(parseInt(e.target.value))}
        aria-label="Selecione o mês"
      >
        {meses.map((mes, index) => (
          <option key={index} value={index}>
            {mes}
          </option>
        ))}
      </select>
      <span className="mx-1">/</span>
      <select
        className="bg-transparent border-none focus:ring-0 text-sm"
        value={filtroAno}
        onChange={(e) => setFiltroAno(parseInt(e.target.value))}
      >
        {[2023, 2024, 2025].map((ano) => (
          <option key={ano} value={ano}>
            {ano}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;