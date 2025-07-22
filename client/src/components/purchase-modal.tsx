import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Calendar, Clock, DollarSign, Package } from "lucide-react";
import type { CarbonCredit, InsertOrder } from "@shared/schema";

interface PurchaseModalProps {
  credit: CarbonCredit | null;
  isOpen: boolean;
  onClose: () => void;
}

interface DurationOption {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const durationOptions: DurationOption[] = [
  {
    value: "immediate",
    label: "Immediate Delivery",
    description: "Credits delivered within 24 hours",
    icon: <Package className="h-4 w-4" />,
  },
  {
    value: "1-year",
    label: "1 Year Forward",
    description: "Locked-in price, delivered in 1 year",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    value: "2-year",
    label: "2 Year Forward",
    description: "Long-term commitment, delivered in 2 years",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    value: "5-year",
    label: "5 Year Forward",
    description: "Strategic planning, delivered in 5 years",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    value: "10-year",
    label: "10 Year Forward",
    description: "Long-term ESG commitment, delivered in 10 years",
    icon: <Clock className="h-4 w-4" />,
  },
];

export default function PurchaseModal({ credit, isOpen, onClose }: PurchaseModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(1);
  const [duration, setDuration] = useState("immediate");

  const purchaseMutation = useMutation({
    mutationFn: (orderData: InsertOrder) =>
      apiRequest("POST", "/api/orders", orderData),
    onSuccess: () => {
      toast({
        title: "Purchase Successful",
        description: "Your carbon credit order has been placed successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/carbon-credits"] });
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      onClose();
      setQuantity(1);
      setDuration("immediate");
    },
    onError: (error: any) => {
      const message = error?.error || "Failed to complete purchase";
      toast({
        title: "Purchase Failed",
        description: message,
        variant: "destructive",
      });
    },
  });

  const handlePurchase = () => {
    if (!credit) return;

    const unitPrice = parseFloat(credit.price);
    const totalPrice = unitPrice * quantity;

    const orderData: InsertOrder = {
      userId: 1, // Demo user ID
      creditId: credit.id,
      quantity,
      unitPrice: credit.price,
      totalPrice: totalPrice.toFixed(2),
      duration,
    };

    purchaseMutation.mutate(orderData);
  };

  if (!credit) return null;

  const unitPrice = parseFloat(credit.price);
  const totalPrice = unitPrice * quantity;
  const selectedDuration = durationOptions.find(opt => opt.value === duration);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Purchase Carbon Credits</DialogTitle>
          <DialogDescription>
            Complete your purchase of verified carbon credits from {credit.name}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Credit Information */}
          <Card>
            <CardContent className="p-4">
              <img
                src={credit.imageUrl}
                alt={credit.name}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h4 className="font-semibold text-lg mb-2">{credit.name}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Type:</span>
                  <span className="font-medium">{credit.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location:</span>
                  <span className="font-medium">{credit.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Verification:</span>
                  <Badge variant="secondary">{credit.verification}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Available:</span>
                  <span className="font-medium text-success">
                    {credit.available.toLocaleString()} tons
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purchase Form */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="quantity">Quantity (tons CO₂)</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={credit.available}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                Maximum available: {credit.available.toLocaleString()} tons
              </p>
            </div>

            <div>
              <Label htmlFor="duration">Delivery Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select delivery duration" />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        {option.icon}
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-gray-500">{option.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Summary */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Unit Price:</span>
                    <span className="font-medium">${unitPrice.toFixed(2)}/ton</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span className="font-medium">{quantity.toLocaleString()} tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{selectedDuration?.label}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total:</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          ${totalPrice.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {quantity.toLocaleString()} tons CO₂
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            {selectedDuration && (
              <Card className="bg-blue-50 dark:bg-blue-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                      {selectedDuration.icon}
                    </div>
                    <div>
                      <h5 className="font-medium text-blue-900 dark:text-blue-100">
                        {selectedDuration.label}
                      </h5>
                      <p className="text-sm text-blue-700 dark:text-blue-200">
                        {selectedDuration.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={purchaseMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePurchase}
                className="flex-1 bg-primary text-white hover:bg-primary/90"
                disabled={purchaseMutation.isPending}
              >
                {purchaseMutation.isPending ? "Processing..." : "Complete Purchase"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}