import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Booking {
  field: string;
  bookingId: string;
  date: string;
  customer: string;
  status: string;
  price: number;
}

interface Props {
  bookings: Booking[];
}

const statusStyles: Record<string, string> = {
  Delivered: "text-green-500",
  Canceled: "text-red-500",
  Pending: "text-yellow-500",
};

export default function RecentBookings({ bookings }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookingan Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Wrapper dengan overflow-x-auto agar bisa scroll horizontal di perangkat kecil */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-max w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="p-3 text-left"><input type="checkbox" /></th>
                <th className="p-3 text-left">Lapangan</th>
                <th className="p-3 text-left">Booking ID</th>
                <th className="p-3 text-left">Tanggal</th>
                <th className="p-3 text-left">Nama Customer</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Harga</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3"><input type="checkbox" /></td>
                  <td className="p-3">{booking.field}</td>
                  <td className="p-3">{booking.bookingId}</td>
                  <td className="p-3">{booking.date}</td>
                  <td className="p-3">{booking.customer}</td>
                  <td className={`p-3 font-semibold ${statusStyles[booking.status]}`}>
                    {booking.status}
                  </td>
                  <td className="p-3 font-semibold">Rp {booking.price.toLocaleString("id-ID")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
