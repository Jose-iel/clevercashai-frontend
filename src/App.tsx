import React, { useState, useEffect } from 'react';
import mockData from './mockData.json';
import { Transacao, Categoria, BalanceData } from './types';
import Header from './components/Header/Header';
import Filters from './components/Filters/Filters';
import SummaryCards from './components/SummaryCards/SummaryCards';
import BarChartComponent from './components/Charts/BarChartComponent';
import PieChartComponent from './components/Charts/PieChartComponent';
import LineChartComponent from './components/Charts/LineChartComponent';
import TransactionsTable from './components/Transactions/TransactionsTable';
import TransactionModal from './components/Modals/TransactionModal';
import CategoryModal from './components/Modals/CategoryModal';
import CategoriesView from './components/CategoriesView/CategoriesView';
import { Activity, BarChart3, CircleDollarSign, Plus } from 'lucide-react';

const App: React.FC = () => {
  const meses = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
  ];

  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth();
  const anoAtual = dataAtual.getFullYear();

  const [view, setView] = useState<'overview' | 'transactions' | 'categories'>('overview');
  const [filtroMes, setFiltroMes] = useState(mesAtual);
  const [filtroAno, setFiltroAno] = useState(anoAtual);
  const [transacoes, setTransacoes] = useState<Transacao[]>(mockData.transacoes);
  const [categorias, setCategorias] = useState<Categoria[]>(mockData.categorias);
  const [balanceData, setBalanceData] = useState<BalanceData[]>(mockData.balanceData);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalCategoria, setModalCategoria] = useState(false);
  const [transacaoEditada, setTransacaoEditada] = useState<Transacao | null>(null);
  const [tipoTransacao, setTipoTransacao] = useState<'receita' | 'despesa'>('despesa'); // Estado para o tipo da transação

  // Função para abrir o modal
  const abrirModal = (tipo: 'receita' | 'despesa', transacao?: Transacao) => {
    setTipoTransacao(tipo); // Define o tipo da transação
    setTransacaoEditada(transacao || null); // Define a transação em edição (se houver)
    setModalAberto(true); // Abre o modal
  };

  // Filtrar transações pelo mês e ano selecionados
  const transacoesFiltradas = transacoes.filter(
    (t) => t.mes === filtroMes && t.ano === filtroAno
  );

  // Separar transações por tipo
  const receitas = transacoesFiltradas.filter((t) => t.tipo === 'receita');
  const despesas = transacoesFiltradas.filter((t) => t.tipo === 'despesa');

  // Calcular valores totais
  const totalReceitas = receitas.reduce((acc, t) => acc + t.valor, 0);
  const totalDespesas = despesas.reduce((acc, t) => acc + t.valor, 0);
  const saldo = totalReceitas - totalDespesas;
  const percentualGasto =
    totalReceitas > 0 ? ((totalDespesas / totalReceitas) * 100).toFixed(1) : '0';

  // Criar dados para o gráfico de pizza
  const gastosPorCategoria = categorias
    .filter((cat) => cat.nome !== 'Renda')
    .map((categoria) => {
      const totalCategoria = despesas
        .filter((t) => t.categoriaId === categoria.id)
        .reduce((acc, t) => acc + t.valor, 0);

      return {
        name: categoria.nome,
        valor: totalCategoria,
        color: categoria.cor,
      };
    })
    .filter((cat) => cat.valor > 0);

  // Adicionar nova transação
  const adicionarTransacao = (transacao: Transacao) => {
    setTransacoes([...transacoes, transacao]);
  };

  // Editar transação
  const editarTransacao = (transacaoEditada: Transacao) => {
    const novasTransacoes = transacoes.map((t) =>
      t.id === transacaoEditada.id ? transacaoEditada : t
    );
    setTransacoes(novasTransacoes);
    setModalAberto(false);
    setTransacaoEditada(null); // Limpar a transação em edição
  };

  // Excluir transação
  const excluirTransacao = (id: number) => {
    const novasTransacoes = transacoes.filter((t) => t.id !== id);
    setTransacoes(novasTransacoes);
  };

  // Atualizar dados baseados no filtro de mês
  useEffect(() => {
    const novoBalanceData = meses.map((mes, index) => {
      const transacoesMes = transacoes.filter(
        (t) => t.mes === index && t.ano === filtroAno
      );
      const receitasMes = transacoesMes
        .filter((t) => t.tipo === 'receita')
        .reduce((acc, t) => acc + t.valor, 0);
      const despesasMes = transacoesMes
        .filter((t) => t.tipo === 'despesa')
        .reduce((acc, t) => acc + t.valor, 0);

      return {
        name: mes,
        receitas: receitasMes,
        despesas: despesasMes,
      };
    });

    setBalanceData(novoBalanceData);
  }, [transacoes, filtroAno]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-6">
        <Header view={view} setView={setView} />
        <div className="flex justify-between items-center mb-6">
          <Filters
            filtroMes={filtroMes}
            setFiltroMes={setFiltroMes}
            filtroAno={filtroAno}
            setFiltroAno={setFiltroAno}
            meses={meses}
          />
        </div>

        <SummaryCards
          totalReceitas={totalReceitas}
          totalDespesas={totalDespesas}
          saldo={saldo}
          percentualGasto={percentualGasto}
          filtroMes={filtroMes}
          filtroAno={filtroAno}
          meses={meses}
        />

        {view === 'overview' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Receitas vs Despesas
                  </h3>
                  <BarChart3 className="h-5 w-5 text-gray-500" />
                </div>
                <BarChartComponent data={balanceData} />
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Distribuição de Despesas
                  </h3>
                  <div className="flex items-center">
                    <CircleDollarSign className="h-5 w-5 text-gray-500 mr-2" />
                    <button
                      className="text-xs text-blue-600 hover:underline"
                      onClick={() => setModalCategoria(true)}
                    >
                      Gerenciar Categorias
                    </button>
                  </div>
                </div>
                <PieChartComponent data={gastosPorCategoria} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Evolução Financeira
                </h3>
                <Activity className="h-5 w-5 text-gray-500" />
              </div>
              <LineChartComponent data={balanceData} />
            </div>
          </>
        ) : view === 'transactions' ? (
          <div className="space-y-6">
            <div className="flex space-x-4">
              <button
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
                onClick={() => abrirModal('receita')} // Abrir modal para nova receita
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova Receita
              </button>
              <button
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
                onClick={() => abrirModal('despesa')} // Abrir modal para nova despesa
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova Despesa
              </button>
            </div>

            <TransactionsTable
              transacoes={receitas}
              tipo="receita"
              onEdit={(transacao) => abrirModal('receita', transacao)} // Abrir modal para editar receita
              onDelete={excluirTransacao}
            />

            <TransactionsTable
              transacoes={despesas}
              tipo="despesa"
              onEdit={(transacao) => abrirModal('despesa', transacao)} // Abrir modal para editar despesa
              onDelete={excluirTransacao}
            />
          </div>
        ) : (
          // Tela de Categorias
          <CategoriesView 
            categorias={categorias} 
            transacoes={transacoesFiltradas}
            onEdit={editarTransacao}
            onDelete={excluirTransacao}
          />
        )}

        {/* Modal de Nova Transação */}
        <TransactionModal
          isOpen={modalAberto}
          onClose={() => {
            setModalAberto(false);
            setTransacaoEditada(null); // Limpar a transação em edição ao fechar o modal
          }}
          onSave={transacaoEditada ? editarTransacao : adicionarTransacao}
          categorias={categorias}
          tipo={tipoTransacao} // Passar o tipo da transação
          transacaoEditada={transacaoEditada} // Passar a transação em edição
        />

        {/* Modal de Nova Categoria */}
        <CategoryModal
          isOpen={modalCategoria}
          onClose={() => setModalCategoria(false)}
          onSave={(categoria) => {
            setCategorias([...categorias, categoria]);
            setModalCategoria(false);
          }}
          coresCategorias={[
            '#FF8042', '#00C49F', '#0088FE', '#FFBB28', '#8884d8', '#82ca9d',
          ]}
        />
      </div>
    </div>
  );
};

export default App;