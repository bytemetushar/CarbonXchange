import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StockChart from "./stock-chart";
import type { CarbonCredit } from "@shared/schema";

interface CarbonCreditCardProps {
  credit: CarbonCredit;
  onAddToCart: (creditId: number) => void;
}

export default function CarbonCreditCard({ credit, onAddToCart }: CarbonCreditCardProps) {
  // Generate mock chart data based on credit price
  const basePrice = parseFloat(credit.price);
  const mockData = [
    basePrice * 0.95,
    basePrice * 1.02,
    basePrice * 0.98,
    basePrice * 1.05,
    basePrice * 0.99,
    basePrice,
  ];

  const getVerificationColor = (verification: string) => {
    switch (verification) {
      case "VCS Verified":
        return "bg-success text-white";
      case "Gold Standard":
        return "bg-secondary text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getChartColor = (type: string) => {
    switch (type) {
      case "Forestry":
        return "hsl(99, 37%, 25%)";
      case "Solar Energy":
        return "hsl(208, 73%, 59%)";
      case "Wind Energy":
        return "hsl(142, 56%, 42%)";
      default:
        return "hsl(36, 77%, 49%)";
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={credit.imageUrl}
        alt={credit.name}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-semibold text-lg text-charcoal">{credit.name}</h4>
          <Badge className={getVerificationColor(credit.verification)}>
            {credit.verification}
          </Badge>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{credit.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-500">Type:</span>
            <span className="font-medium ml-1">{credit.type}</span>
          </div>
          <div>
            <span className="text-gray-500">Location:</span>
            <span className="font-medium ml-1">{credit.location}</span>
          </div>
          <div>
            <span className="text-gray-500">Available:</span>
            <span className="font-medium text-success ml-1">
              {credit.available.toLocaleString()} tons
            </span>
          </div>
          <div>
            <span className="text-gray-500">Vintage:</span>
            <span className="font-medium ml-1">{credit.vintage}</span>
          </div>
        </div>

        <div className="mb-4">
          <StockChart data={mockData} color={getChartColor(credit.type)} />
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-primary">${credit.price}</span>
            <span className="text-gray-500 text-sm">/ton CO₂</span>
          </div>
          <Button
            onClick={() => onAddToCart(credit.id)}
            className="bg-primary text-white hover:bg-primary/90"
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
