import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <div className="flex items-center justify-end px-6 py-4 bg-gray-100 border-b">
      <div className="flex items-center gap-4">
        <Search className="w-5 h-5 cursor-pointer" />
        <Bell className="w-5 h-5 cursor-pointer" />
        <Button variant="outline" className="px-4 py-1 text-sm">Vendor</Button>
      </div>
    </div>
  );
}
