import { useState } from "react";
import { Link, useLocation } from "wouter";
import { MessageCircle, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartModal from "@/components/cart-modal";
import { useCartContext } from "@/contexts/cart-context";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [location] = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, updateDuration, clearCart, getCartItemCount } = useCartContext();
  const navigate = useNavigate();

  const navigation = [
    { name: "Marketplace", href: "/marketplace" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-gray-700 text-white text-3xl">
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-primary cursor-pointer">CarbonTrade</h1>
              </Link>
            </div>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    location === item.href
                      ? "text-primary border-b-2 border-primary"
                      : "text-charcoal hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/contact")}
              className="text-charcoal hover:text-primary transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCartOpen(true)}
              className="text-charcoal hover:text-primary relative transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Button>
            {/* <Button className="bg-blue-400 text-white hover:bg-danger/90 transition-colors"> */}
            <Button className="bg-transparent border border-primary text-white hover:bg-danger/90 transition-colors">
              <User className="h-4 w-4 mr-2" />
              My Account
            </Button>
          </div>
        </div>
      </div>
      
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onUpdateDuration={updateDuration}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />
    </nav>
  );
}
