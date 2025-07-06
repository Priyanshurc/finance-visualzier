'use client';

import { useEffect, useState } from 'react';
import TotalExpenseCard from '@/components/cards/TotalExpenseCard';
import CategoryPieChart from '@/components/charts/CategoryPieChart';
import { getCategoryTotals, getTotalExpenses } from '@/lib/utils';

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await fetch('/api/transactions');
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error('❌ Failed to fetch transactions:', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const total = getTotalExpenses(transactions);
  const categoryData = getCategoryTotals(transactions);
  const recent = transactions.slice(-5).reverse();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <TotalExpenseCard total={total} />

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Spending by Category</h2>
        <CategoryPieChart data={categoryData} />
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
        <ul className="space-y-2">
          {recent.map((tx) => (
            <li key={tx._id} className="border p-3 rounded">
              <div className="flex justify-between">
                <span className="font-medium">{tx.description}</span>
                <span className="text-red-600">₹{tx.amount}</span>
              </div>
              <p className="text-sm text-gray-600">{new Date(tx.date).toLocaleDateString()} | {tx.category}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
