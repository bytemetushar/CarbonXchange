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
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import type { CarbonCredit, InsertOrder } from "@shared/schema";

interface CartItem {
  credit: CarbonCredit;
  quantity: number;
  duration: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (creditId: number, quantity: number) => void;
  onUpdateDuration: (creditId: number, duration: string) => void;
  onRemoveItem: (creditId: number) => void;
  onClearCart: () => void;
}

const durationOptions = [
  { value: "immediate", label: "Immediate Delivery" },
  { value: "1-year", label: "1 Year Forward" },
  { value: "2-year", label: "2 Year Forward" },
  { value: "5-year", label: "5 Year Forward" },
  { value: "10-year", label: "10 Year Forward" },
];

export default function CartModal({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onUpdateDuration,
  onRemoveItem,
  onClearCart,
}: CartModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);

  const purchaseAllMutation = useMutation({
    mutationFn: async (orders: InsertOrder[]) => {
      const results = [];
      for (const order of orders) {
        const result = await apiRequest("POST", "/api/orders", order);
        results.push(result);
      }
      return results;
    },
    onSuccess: () => {
      toast({
        title: "Bulk Purchase Successful",
        description: `Successfully purchased ${cartItems.length} carbon credit packages!`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/carbon-credits"] });
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      onClearCart();
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Purchase Failed",
        description: "Some items could not be purchased. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handlePurchaseAll = async () => {
    if (cartItems.length === 0) return;

    setIsProcessing(true);
    
    const orders: InsertOrder[] = cartItems.map((item) => {
      const unitPrice = parseFloat(item.credit.price);
      const totalPrice = unitPrice * item.quantity;

      return {
        userId: 1, // Demo user ID
        creditId: item.credit.id,
        quantity: item.quantity,
        unitPrice: item.credit.price,
        totalPrice: totalPrice.toFixed(2),
        duration: item.duration,
      };
    });

    try {
      await purchaseAllMutation.mutateAsync(orders);
    } finally {
      setIsProcessing(false);
    }
  };

  const totalValue = cartItems.reduce((sum, item) => {
    return sum + parseFloat(item.credit.price) * item.quantity;
  }, 0);

  const totalCredits = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({cartItems.length} items)
          </DialogTitle>
          <DialogDescription>
            Review and customize your carbon credit purchases before checkout
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col h-full max-h-[60vh]">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center py-12">
              <div className="text-center">
                <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500">Add some carbon credits to get started</p>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-6">
                {cartItems.map((item) => (
                  <Card key={item.credit.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={item.credit.imageUrl}
                          alt={item.credit.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-lg">{item.credit.name}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRemoveItem(item.credit.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label className="text-sm">Quantity</Label>
                              <div className="flex items-center gap-2 mt-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => onUpdateQuantity(item.credit.id, Math.max(1, item.quantity - 1))}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <Input
                                  type="number"
                                  min="1"
                                  max={item.credit.available}
                                  value={item.quantity}
                                  onChange={(e) => onUpdateQuantity(item.credit.id, Math.max(1, parseInt(e.target.value) || 1))}
                                  className="w-20 text-center"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => onUpdateQuantity(item.credit.id, Math.min(item.credit.available, item.quantity + 1))}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            <div>
                              <Label className="text-sm">Duration</Label>
                              <Select
                                value={item.duration}
                                onValueChange={(value) => onUpdateDuration(item.credit.id, value)}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {durationOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="text-right">
                              <div className="text-sm text-gray-500">Unit Price</div>
                              <div className="text-lg font-semibold">${item.credit.price}/ton</div>
                              <div className="text-sm text-gray-500">
                                Total: ${(parseFloat(item.credit.price) * item.quantity).toLocaleString()}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mt-3">
                            <Badge variant="secondary">{item.credit.type}</Badge>
                            <Badge variant="outline">{item.credit.location}</Badge>
                            <Badge className="bg-success text-white">{item.credit.verification}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <Card className="border-primary">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Items:</span>
                      <span className="font-medium">{cartItems.length} packages</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Credits:</span>
                      <span className="font-medium">{totalCredits.toLocaleString()} tons CO₂</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-semibold">Total Value:</span>
                        <span className="text-2xl font-bold text-primary">
                          ${totalValue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={onClearCart}
                      className="flex-1"
                      disabled={isProcessing}
                    >
                      Clear Cart
                    </Button>
                    <Button
                      onClick={handlePurchaseAll}
                      className="flex-1 bg-primary text-white hover:bg-primary/90"
                      disabled={isProcessing || cartItems.length === 0}
                    >
                      {isProcessing ? "Processing..." : `Purchase All (${cartItems.length} items)`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}