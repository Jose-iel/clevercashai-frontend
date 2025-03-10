// src/components/Header/Header.tsx

import React from 'react';
//import { Activity, BarChart3 } from 'lucide-react';

interface HeaderProps {
  view: string;
  setView: (view: "overview" | "transactions" | "categories") => void;
}

const Header: React.FC<HeaderProps> = ({ view, setView }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
  <h1 className="text-2xl font-bold text-gray-800">Dashboard Financeiro</h1>
  <div className="flex space-x-2">
    <button
      className={`px-4 py-2 rounded-lg ${
        view === 'overview' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
      }`}
      onClick={() => setView('overview')}
      aria-label="Visão Geral"
    >
      Visão Geral
    </button>
    <button
      className={`px-4 py-2 rounded-lg ${
        view === 'transactions' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
      }`}
      onClick={() => setView('transactions')}
      aria-label="Transações"
    >
      Transações
    </button>
    <button
      className={`px-4 py-2 rounded-lg ${
        view === 'categories' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
      }`}
      onClick={() => setView('categories')}
      aria-label="Categorias"
    >
      Categorias
    </button>
  </div>
</div>
  );
};

export default Header;