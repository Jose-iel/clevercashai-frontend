// src/components/Charts/LineChartComponent.tsx

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BalanceData } from '../../types';

interface LineChartComponentProps {
  data: BalanceData[];
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
        <Legend />
        <Line type="monotone" dataKey="receitas" stroke="#10B981" name="Receitas" strokeWidth={2} />
        <Line type="monotone" dataKey="despesas" stroke="#EF4444" name="Despesas" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;