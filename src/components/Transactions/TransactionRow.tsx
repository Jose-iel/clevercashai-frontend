import React from 'react';
import { Transacao } from '../../types';
import { ArrowUpRight, ArrowDownRight, Edit, Trash } from 'lucide-react';

interface TransactionRowProps {
  transacao: Transacao;
  tipo: 'receita' | 'despesa';
  onEdit: (transacao: Transacao) => void;
  onDelete: (id: number) => void;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transacao, tipo, onEdit, onDelete }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className={`h-8 w-8 rounded-full ${tipo === 'receita' ? 'bg-green-100' : 'bg-red-100'} flex items-center justify-center mr-3`}>
            {tipo === 'receita' ? (
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-600" />
            )}
          </div>
          <span className="text-sm text-gray-900">{transacao.descricao}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transacao.categoria}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transacao.data}</td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
        {tipo === 'receita' ? '+' : '-'} R$ {transacao.valor.toLocaleString('pt-BR')}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => onEdit(transacao)}
          className="text-blue-600 hover:text-blue-900"
          aria-label="Editar transação"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(transacao.id)}
          className="text-red-600 hover:text-red-900 ml-2"
          aria-label="Excluir transação"
        >
          <Trash className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
};

export default TransactionRow;