import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  category: String,
  month: String, // Format: "2025-07"
  amount: Number,
});

export const Budget = mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);
