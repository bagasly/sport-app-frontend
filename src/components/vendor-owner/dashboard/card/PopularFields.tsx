import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Field {
  name: string;
  price: number;
}

interface Props {
  fields: Field[];
}

export default function PopularFields({ fields }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Lapangan Terpopuler <span>🔥</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {fields.map((field, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-2"
            >
              <span className="truncate w-2/3">{field.name}</span>
              <span className="font-bold text-right w-1/3">
                Rp {field.price.toLocaleString("id-ID")}
              </span>
            </div>
          ))}
        </div>
        <Button className="mt-4 w-full">Lihat Laporan</Button>
      </CardContent>
    </Card>
  );
}
