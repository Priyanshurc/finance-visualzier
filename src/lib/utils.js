import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getMonthlyTotals = (transactions) => {
  const map = {};

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const month = date.toLocaleString('default', { month: 'short', year: 'numeric' }); // e.g., "Jul 2025"

    if (!map[month]) map[month] = 0;
    map[month] += tx.amount;
  });

  // Return as array for Recharts
  return Object.entries(map).map(([month, total]) => ({ month, total }));
};

// src/lib/utils.js
export function getCategoryTotals(transactions) {
  const totals = {};

  transactions.forEach(({ category, amount }) => {
    if (!category || !amount) return;
    totals[category] = (totals[category] || 0) + amount;
  });

  return Object.entries(totals).map(([category, total]) => ({
    category,
    total,
  }));
}
export function getBudgetComparison(transactions, budgets) {
  const monthlyTotals = {};

  transactions.forEach((tx) => {
    const month = tx.date.slice(0, 7); // e.g., '2025-07'
    const key = `${month}-${tx.category}`;

    if (!monthlyTotals[key]) {
      monthlyTotals[key] = { actual: 0, category: tx.category, month };
    }
    monthlyTotals[key].actual += tx.amount;
  });

  const result = Object.values(monthlyTotals).map((entry) => {
    const matchingBudget = budgets.find(
      (b) => b.month === entry.month && b.category === entry.category
    );
    return {
      ...entry,
      budget: matchingBudget ? matchingBudget.amount : 0,
    };
  });

  return result;
}


export function getTotalExpenses(transactions) {
  return transactions.reduce((sum, tx) => sum + tx.amount, 0);
}
