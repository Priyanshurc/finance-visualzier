'use client';

import { useEffect, useState } from 'react';
import TransactionForm from '@/components/forms/TransactionForm';
import MonthlyBarChart from '@/components/charts/MonthlyBarChart';
import { getMonthlyTotals } from '@/lib/utils';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  // Fetch all transactions from the API
  const fetchTransactions = async () => {
    try {
      const res = await fetch('/api/transactions');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      console.log('📦 Transactions loaded:', data);
      setTransactions(data);
    } catch (err) {
      console.error('❌ fetchTransactions error:', err);
    }
  };

  // Load data on page load
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Add a new transaction
  const handleAddTransaction = async (form) => {
    try {
      console.log('📤 Submitting form to API:', form);
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('❌ Failed to save transaction');
      console.log('✅ Transaction saved!');
      fetchTransactions(); // Refresh list
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a transaction
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('❌ Failed to delete transaction');
      fetchTransactions(); // Refresh list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      {/* Transaction Form */}
      <TransactionForm onSubmit={handleAddTransaction} />

      {/* Monthly Spending Bar Chart */}
      {transactions.length > 0 ? (
        <MonthlyBarChart data={getMonthlyTotals(transactions)} />
      ) : (
        <p className="text-gray-500 text-sm mt-4">No transactions yet to show chart.</p>
      )}

      {/* Transaction List */}
      <ul className="mt-6 space-y-4">
        {transactions.map((tx) => (
          <li
            key={tx._id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">₹{tx.amount} - {tx.description}</p>
              <p className="text-sm text-gray-600">
                {new Date(tx.date).toLocaleDateString()} | {tx.category}
              </p>
            </div>
            <button
              onClick={() => handleDelete(tx._id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
