'use client';
import { useState } from 'react';

export default function TransactionForm({ onSubmit }) {
  const [form, setForm] = useState({
    amount: '',
    description: '',
    category: 'Misc',
    date: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ amount: '', description: '', category: 'Misc', date: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} required className="border px-3 py-2 w-full" />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="border px-3 py-2 w-full" />
      <input type="date" name="date" value={form.date} onChange={handleChange} required className="border px-3 py-2 w-full" />
      <select name="category" value={form.category} onChange={handleChange} className="border px-3 py-2 w-full">
        {['Food', 'Rent', 'Travel', 'Utilities', 'Shopping', 'Health', 'Misc'].map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}
