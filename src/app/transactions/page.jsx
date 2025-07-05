'use client';

import { useEffect, useState } from 'react';
import TransactionForm from '@/components/forms/TransactionForm';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  // Fetch all transactions from API
  const fetchTransactions = async () => {
  try {
    const res = await fetch('/api/transactions');
    if (!res.ok) throw new Error('Failed to fetch');

    const data = await res.json();
    console.log("📦 Transactions loaded:", data);
    setTransactions(data);
  } catch (err) {
    console.error("❌ fetchTransactions error:", err);
  }
};


  useEffect(() => {
    fetchTransactions();
  }, []);

  // Add new transaction
  const handleAddTransaction = async (form) => {
    console.log("📤 Submitting form to API:", form);
    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      console.log("✅ Transaction saved!");
      fetchTransactions(); // Refresh list
    } else {
      console.error("❌ Failed to save transaction");
    }
  };

  // Delete a transaction
  const handleDelete = async (id) => {
    const res = await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchTransactions();
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      <TransactionForm onSubmit={handleAddTransaction} />

      <ul className="mt-6 space-y-4">
        {transactions.map((tx) => (
          <li key={tx._id} className="border p-3 rounded flex justify-between items-center">
            <div>
              <p className="font-medium">₹{tx.amount} - {tx.description}</p>
              <p className="text-sm text-gray-600">{new Date(tx.date).toLocaleDateString()} | {tx.category}</p>
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
