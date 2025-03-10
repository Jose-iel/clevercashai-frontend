// src/components/CategoriesView/CategoriesView.tsx

import React from 'react';
import { Transacao, Categoria } from '../../types';
import TransactionsTable from '../Transactions/TransactionsTable';

interface CategoriesViewProps {
  categorias: Categoria[];
  transacoes: Transacao[];
  onEdit: (transacao: Transacao) => void;
  onDelete: (id: number) => void;
}

const CategoriesView: React.FC<CategoriesViewProps> = ({ categorias, transacoes, onEdit, onDelete }) => {
  return (
    <div className="space-y-6">
      {categorias.map((categoria) => {
        const despesas = transacoes.filter(
          (t) => t.categoriaId === categoria.id && t.tipo === 'despesa'
        );
        const receitas = transacoes.filter(
          (t) => t.categoriaId === categoria.id && t.tipo === 'receita'
        );

        return (
          <div key={categoria.id} className="bg-white rounded-xl shadow overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                Categoria: {categoria.nome}
              </h3>
              <div
                className="h-2 w-12 rounded-full mt-2"
                style={{ backgroundColor: categoria.cor }}
              ></div>
            </div>

            {/* Tabela de Despesas */}
            {despesas.length > 0 && (
              <div className="p-6">
                <h4 className="text-md font-semibold text-gray-700 mb-4">Despesas</h4>
                <TransactionsTable transacoes={despesas} tipo="despesa" onEdit={onEdit} onDelete={onDelete}/>
              </div>
            )}

            {/* Tabela de Receitas */}
            {receitas.length > 0 && (
              <div className="p-6">
                <h4 className="text-md font-semibold text-gray-700 mb-4">Receitas</h4>
                <TransactionsTable transacoes={receitas} tipo="receita" onEdit={onEdit} onDelete={onDelete}/>
              </div>
            )}

            {/* Mensagem se não houver transações */}
            {despesas.length === 0 && receitas.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                Nenhuma transação encontrada para esta categoria.
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CategoriesView;