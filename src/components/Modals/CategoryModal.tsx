// src/components/Modals/CategoryModal.tsx

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Categoria } from '../../types';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (categoria: Categoria) => void;
  coresCategorias: string[];
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, onSave, coresCategorias }) => {
  const [nome, setNome] = useState('');
  const [cor, setCor] = useState(coresCategorias[0]);

  const handleSave = () => {
    if (!nome) {
      alert('Por favor, insira um nome para a categoria.');
      return;
    }

    const novaCategoria: Categoria = {
      id: Date.now(), // Usando timestamp como ID temporário
      nome,
      cor,
    };

    onSave(novaCategoria);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setNome('');
    setCor(coresCategorias[0]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Nova Categoria</h3>
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
              Nome
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome da categoria"
              aria-label="Nome da categoria"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cor
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
            >
              {coresCategorias.map((cor, index) => (
                <option key={index} value={cor}>
                  {cor}
                </option>
              ))}
            </select>
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
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              aria-label="Salvar"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;