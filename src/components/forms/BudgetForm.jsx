'use client';
import { useState } from 'react';

export default function BudgetForm({ onSubmit }) {
  const [form, setForm] = useState({
    category: 'Food',
    month: '',
    amount: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select name="category" value={form.category} onChange={handleChange} className="border p-2 w-full">
        {['Food', 'Rent', 'Travel', 'Utilities', 'Shopping', 'Health', 'Misc'].map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>
      <input type="month" name="month" value={form.month} onChange={handleChange} className="border p-2 w-full" />
      <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Set Budget</button>
    </form>
  );
}
