// src/components/Charts/BarChartComponent.tsx

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BalanceData } from '../../types';

interface BarChartComponentProps {
  data: BalanceData[];
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
        <Legend />
        <Bar dataKey="receitas" fill="#10B981" name="Receitas" />
        <Bar dataKey="despesas" fill="#EF4444" name="Despesas" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;