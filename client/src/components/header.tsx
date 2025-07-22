import { Link, useLocation } from "wouter";
import { MessageCircle, ShoppingCart, User } from "lucide-react";

export default function Header() {
  const [location] = useLocation();

  const navigation = [
    { name: "Marketplace", href: "/marketplace" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <button className="text-charcoal hover:text-primary transition-colors">
              <MessageCircle className="h-5 w-5" />
            </button>
            <button className="text-charcoal hover:text-primary relative transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
              <User className="h-4 w-4" />
              My Account
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
