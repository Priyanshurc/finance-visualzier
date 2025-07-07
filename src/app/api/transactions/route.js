import { connectDB } from '@/lib/db';
import Transaction from '@/models/transaction.model';

export async function GET() {
  try {
    await connectDB();
    const transactions = await Transaction.find().sort({ date: -1 });
    return Response.json(transactions);
  } catch (err) {
    console.error("Error in GET:", err);
    return new Response('Error fetching transactions', { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const newTx = await Transaction.create(body);
    return Response.json(newTx, { status: 201 });
  } catch (err) {
    console.error("Error in POST:", err);
    return new Response('Error creating transaction', { status: 500 });
  }
}
