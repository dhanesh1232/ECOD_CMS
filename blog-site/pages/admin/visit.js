import dbConnect from "../api/lib/mongodb";
import Visitor from "../api/models/Visitor";

export default async function AdminPage() {
  await dbConnect();
  const visitors = await Visitor.find().sort({ time: -1 }).limit(50);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Visitor Logs</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">IP</th>
              <th className="py-2 px-4 border">Country</th>
              <th className="py-2 px-4 border">City</th>
              <th className="py-2 px-4 border">Time</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor) => (
              <tr key={visitor._id}>
                <td className="py-2 px-4 border">{visitor.ip}</td>
                <td className="py-2 px-4 border">{visitor.country}</td>
                <td className="py-2 px-4 border">{visitor.city}</td>
                <td className="py-2 px-4 border">
                  {new Date(visitor.time).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
