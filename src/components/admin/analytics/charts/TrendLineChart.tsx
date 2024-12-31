import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { TrendData } from '../../../../types/analytics';

interface TrendLineChartProps {
  data: TrendData[];
  dataKey: string;
  valueFormatter?: (value: number) => string;
}

export function TrendLineChart({ data, dataKey, valueFormatter = String }: TrendLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={valueFormatter} />
        <Tooltip formatter={(value) => valueFormatter(value as number)} />
        <Line type="monotone" dataKey={dataKey} stroke="#6366f1" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}