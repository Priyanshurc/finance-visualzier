export default function TotalExpenseCard({ total }) {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <h2 className="text-lg font-semibold mb-2">Total Expenses</h2>
      <p className="text-2xl font-bold text-red-600">₹{total}</p>
    </div>
  );
}
