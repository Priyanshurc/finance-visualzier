'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { CATEGORIES } from '@/lib/constants';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57', '#8dd1e1'];

export default function CategoryPieChart({ data }) {
  const hasData = data && data.length > 0;

  return (
    <div className="w-full bg-white rounded shadow p-4 border border-gray-200">
      <h3 className="text-md font-semibold mb-4 text-gray-700">Category-wise Spending</h3>

      {!hasData ? (
        <p className="text-sm text-gray-500">No spending data available.</p>
      ) : (
        <div style={{ width: '100%', height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
