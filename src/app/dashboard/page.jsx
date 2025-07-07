'use client';

import { useEffect, useState } from 'react';
import TotalExpenseCard from '@/components/cards/TotalExpenseCard';
import CategoryPieChart from '@/components/charts/CategoryPieChart';
import BudgetForm from '@/components/forms/BudgetForm';
import BudgetChart from '@/components/charts/BudgetChart';
import { getCategoryTotals, getTotalExpenses } from '@/lib/utils';

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await fetch('/api/transactions');
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error('❌ Failed to fetch transactions:', err);
    }
  };

  const fetchBudgets = async () => {
    try {
      const res = await fetch('/api/budgets');
      const data = await res.json();
      setBudgets(data);
    } catch (err) {
      console.error('❌ Failed to fetch budgets:', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, []);

  const handleAddBudget = async (form) => {
    try {
      await fetch('/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      fetchBudgets(); // Refresh after adding
      
    } catch (err) {
      console.error('❌ Failed to add budget:', err);
    }
  };

  const total = getTotalExpenses(transactions);
  const categoryData = getCategoryTotals(transactions);
  const recent = transactions.slice(-5).reverse();

  // Generate Budget vs Actual data for current month (e.g., "2025-07")
  const currentMonth = new Date().toISOString().slice(0, 7);

  const budgetVsActual = budgets
    .filter((b) => b.month === currentMonth)
    .map((b) => {
      const actual = transactions
        .filter((tx) => tx.category === b.category && tx.date.startsWith(currentMonth))
        .reduce((sum, tx) => sum + tx.amount, 0);

      return {
        category: b.category,
        budget: b.amount,
        actual,
      };
    });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <TotalExpenseCard total={total} />

      {/* Pie Chart */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Spending by Category</h2>
        <CategoryPieChart data={categoryData} />
      </div>

      {/* Budget vs Actual */}
      <div className="mt-6 border border-red-500 p-4">
  <h2 className="text-xl font-semibold mb-2">Budget vs Actual ({currentMonth})</h2>
  <BudgetChart data={budgetVsActual} />
</div>

      {/* Budget Form */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Set New Budget</h2>
        <BudgetForm onSubmit={handleAddBudget} />
      </div>

      {/* Recent Transactions */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
        <ul className="space-y-2">
          {recent.map((tx) => (
            <li key={tx._id} className="border p-3 rounded">
              <div className="flex justify-between">
                <span className="font-medium">{tx.description}</span>
                <span className="text-red-600">₹{tx.amount}</span>
              </div>
              <p className="text-sm text-gray-600">
                {new Date(tx.date).toLocaleDateString()} | {tx.category}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
