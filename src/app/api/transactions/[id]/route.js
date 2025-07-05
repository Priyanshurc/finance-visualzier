import { connectDB } from '@/lib/db';
import Transaction from '@/models/transaction.model';

export async function DELETE(_, { params }) {
  try {
    await connectDB();
    await Transaction.findByIdAndDelete(params.id);
    return new Response('Deleted', { status: 200 });
  } catch (err) {
    console.error("❌ Delete error:", err);
    return new Response('Failed to delete', { status: 500 });
  }
}
