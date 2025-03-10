// src/components/Transactions/TransactionsTable.tsx

import React from 'react';
import TransactionRow from './TransactionRow';
import { Transacao } from '../../types';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface TransactionsTableProps {
  transacoes: Transacao[];
  tipo: 'receita' | 'despesa';
  onEdit: (transacao: Transacao) => void;
  onDelete: (id: number) => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transacoes, tipo, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-6 border-b bg-green-50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            {tipo === 'receita' ? 'Receitas do Mês' : 'Despesas do Mês'}
          </h3>
          {tipo === 'receita' ? (
            <ArrowUpRight className="h-5 w-5 text-green-600" />
          ) : (
            <ArrowDownRight className="h-5 w-5 text-red-600" />
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        {transacoes.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transacoes.map((transacao) => (
                <TransactionRow
                  key={transacao.id}
                  transacao={transacao}
                  tipo={tipo}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 text-center text-gray-500">
            Nenhuma {tipo === 'receita' ? 'receita' : 'despesa'} encontrada para este mês.
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsTable;