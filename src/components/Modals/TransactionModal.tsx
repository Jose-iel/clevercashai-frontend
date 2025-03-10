import React, { useState } from 'react';
import { X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Estilos do calendário
import { Transacao, Categoria } from '../../types';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transacao: Transacao) => void;
  categorias: Categoria[];
  tipo: string;
  transacaoEditada?: Transacao | null; // Adicionado para suportar edição
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  categorias,
  tipo,
  transacaoEditada, // Recebe a transação a ser editada
}) => {
  const [descricao, setDescricao] = useState(transacaoEditada?.descricao || '');
  const [valor, setValor] = useState<number | string>(transacaoEditada?.valor || '');
  const [categoriaId, setCategoriaId] = useState<number>(transacaoEditada?.categoriaId || 1);
  const [data, setData] = useState(
    transacaoEditada ? new Date(transacaoEditada.data) : new Date()
  );

  const handleSave = () => {
    if (!descricao || !valor || isNaN(Number(valor))) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const novaTransacao: Transacao = {
      id: transacaoEditada?.id || Date.now(), // Mantém o ID se estiver editando
      descricao,
      valor: Number(valor),
      tipo,
      data: data.toLocaleDateString('pt-BR'),
      categoria: categorias.find((cat) => cat.id === categoriaId)?.nome || '',
      categoriaId,
      mes: data.getMonth(),
      ano: data.getFullYear(),
    };

    onSave(novaTransacao);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setDescricao('');
    setValor('');
    setCategoriaId(1);
    setData(new Date());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {transacaoEditada ? 'Editar Transação' : tipo === 'receita' ? 'Nova Receita' : 'Nova Despesa'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Digite a descrição"
              aria-label="Descrição da transação"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Valor
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="0,00"
              step="0.01"
              aria-label="Valor da transação"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={categoriaId}
              onChange={(e) => setCategoriaId(Number(e.target.value))}
              aria-label="Selecione a categoria"
            >
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data
            </label>
            <DatePicker
              selected={data}
              onChange={(date: Date | null) => date && setData(date)}
              dateFormat="dd/MM/yyyy"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Selecione a data"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              aria-label="Cancelar"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded-md text-white ${
                tipo === 'receita' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
              }`}
              aria-label="Salvar transação"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;