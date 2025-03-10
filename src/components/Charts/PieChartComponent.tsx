// src/components/Charts/PieChartComponent.tsx

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { GastoPorCategoria } from '../../types';

interface PieChartComponentProps {
  data: GastoPorCategoria[];
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          dataKey="valor"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;