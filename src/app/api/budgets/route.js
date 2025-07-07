import { Budget } from '@/models/budget.model';
import { connectDB } from '@/lib/db';

export async function GET() {
  await connectDB();
  const budgets = await Budget.find();
  return Response.json(budgets);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const newBudget = await Budget.create(body);
  return Response.json(newBudget);
}
