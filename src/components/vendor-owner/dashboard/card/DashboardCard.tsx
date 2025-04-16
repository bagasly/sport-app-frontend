import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  title: string;
  amount: string;
  percentage: number;
  isUp: boolean;
}

export default function DashboardCard({ title, amount, percentage, isUp }: Props) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {isUp ? <TrendingUp className="text-green-500" /> : <TrendingDown className="text-red-500" />}
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{amount}</p>
        <p className={`text-sm ${isUp ? "text-green-500" : "text-red-500"}`}>
          {isUp ? `+${percentage}%` : `-${percentage}%`} dibandingkan sebelumnya
        </p>
      </CardContent>
    </Card>
  );
}
