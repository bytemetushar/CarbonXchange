import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CarbonCreditCard from "@/components/carbon-credit-card";
import PortfolioChart from "@/components/portfolio-chart";
import { portfolioChartData, recentActivities, portfolioData } from "@/lib/mock-data";
import type { CarbonCredit } from "@shared/schema";

export default function Home() {
  const { data: credits = [], isLoading } = useQuery<CarbonCredit[]>({
    queryKey: ["/api/carbon-credits"],
  });

  const { data: marketStats } = useQuery({
    queryKey: ["/api/market-stats"],
  });



  const featuredCredits = credits.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Trade Carbon Credits with Confidence
              </h2>
              <p className="text-xl mb-8 text-green-100">
                Connect with verified sellers, track your ESG impact, and build a sustainable 
                future through transparent carbon credit trading.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/marketplace">
                  <Button className="bg-white text-primary px-8 py-3 hover:bg-gray-100">
                    Start Trading
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" className="border-2 border-white text-white px-8 py-3 hover:bg-white hover:text-primary">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Sustainable office building"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {(marketStats as any)?.totalCredits || "2.4M"}
              </div>
              <div className="text-sm text-gray-600">Credits Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">
                {(marketStats as any)?.activeBuyers || "15,200"}
              </div>
              <div className="text-sm text-gray-600">Active Buyers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success">
                {(marketStats as any)?.verifiedSellers || "3,840"}
              </div>
              <div className="text-sm text-gray-600">Verified Sellers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">
                {(marketStats as any)?.carbonOffset || "890K"}
              </div>
              <div className="text-sm text-gray-600">Tons CO₂ Offset</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Carbon Credits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-3xl font-bold text-charcoal mb-2">Featured Carbon Credits</h3>
              <p className="text-gray-600">Browse verified carbon credits from trusted sellers worldwide</p>
            </div>
            <Link href="/marketplace">
              <Button variant="outline">View All Credits</Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="w-full h-48 bg-gray-300"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCredits.map((credit) => (
                <CarbonCreditCard
                  key={credit.id}
                  credit={credit}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Portfolio Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-charcoal mb-12 text-center">Portfolio Overview</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-charcoal mb-6">Portfolio Performance</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500">Total Credits Owned</div>
                      <div className="text-2xl font-bold text-primary">{portfolioData.totalCredits.toLocaleString()}</div>
                      <div className="text-sm text-success">+{portfolioData.monthlyGrowth}% this month</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500">Portfolio Value</div>
                      <div className="text-2xl font-bold text-secondary">${portfolioData.value.toLocaleString()}</div>
                      <div className="text-sm text-success">+{portfolioData.valueGrowth}% this month</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500">CO₂ Impact</div>
                      <div className="text-2xl font-bold text-success">{portfolioData.impact.toLocaleString()} tons</div>
                      <div className="text-sm text-gray-600">offset this year</div>
                    </div>
                  </div>
                  <PortfolioChart data={portfolioChartData.data} labels={portfolioChartData.labels} />
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-charcoal mb-6">Recent Activity</h4>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-charcoal">{activity.action}</div>
                          <div className="text-sm text-gray-500">{activity.project}</div>
                          <div className="text-xs text-gray-400">{activity.date}</div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold ${
                            activity.type === 'purchase' ? 'text-primary' :
                            activity.type === 'sale' ? 'text-accent' : 'text-success'
                          }`}>
                            {activity.amount}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="w-full mt-6">
                      View All Activity
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
