import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CarbonCreditCard from "@/components/carbon-credit-card";
import type { CarbonCredit } from "@shared/schema";

export default function Marketplace() {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("price");

  const { data: credits = [], isLoading } = useQuery<CarbonCredit[]>({
    queryKey: ["/api/carbon-credits"],
  });



  // Filter and sort credits
  const filteredCredits = credits
    .filter(credit => typeFilter === "all" || credit.type === typeFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price-desc":
          return parseFloat(b.price) - parseFloat(a.price);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const creditTypes = Array.from(new Set(credits.map(credit => credit.type)));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-charcoal mb-2">Carbon Credits Marketplace</h1>
            <p className="text-gray-600">Browse verified carbon credits from trusted sellers worldwide</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {creditTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="w-full h-48 bg-gray-300"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded"></div>
                  </div>
                  <div className="h-16 bg-gray-300 rounded mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-300 rounded w-20"></div>
                    <div className="h-8 bg-gray-300 rounded w-24"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredCredits.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCredits.map((credit) => (
                <CarbonCreditCard
                  key={credit.id}
                  credit={credit}
                />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" className="w-full sm:w-auto hover:bg-gray-700">Load More Credits</Button>
            </div>
          </>
        ) : (
          <Card className="p-12 text-center">
            <CardContent>
              <h3 className="text-xl font-semibold text-charcoal mb-2">No Credits Found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}
