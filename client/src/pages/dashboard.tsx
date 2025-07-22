import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PortfolioChart from "@/components/portfolio-chart";
import { portfolioChartData, recentActivities, portfolioData } from "@/lib/mock-data";
import type { Order, PortfolioItem } from "@shared/schema";

export default function Dashboard() {
  const { data: orders = [], isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
  });

  const { data: portfolio = [], isLoading: portfolioLoading } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-charcoal mb-8">Trading Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio Overview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Overview</CardTitle>
              </CardHeader>
              <CardContent>
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

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Orders Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {ordersLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-32"></div>
                        <div className="h-3 bg-gray-300 rounded w-24"></div>
                      </div>
                      <div className="h-6 bg-gray-300 rounded w-16"></div>
                    </div>
                  ))}
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-charcoal">Order #{order.id}</div>
                        <div className="text-sm text-gray-500">
                          {order.quantity.toLocaleString()} credits • ${parseFloat(order.totalPrice).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-400">
                          Ordered: {new Date(order.createdAt!).toLocaleDateString()}
                        </div>
                        {order.deliveryDate && (
                          <div className="text-xs text-blue-600">
                            Delivery: {new Date(order.deliveryDate).toLocaleDateString()} • {order.duration}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          order.status === 'delivered' ? 'default' : 
                          order.status === 'processing' ? 'secondary' :
                          order.status === 'confirmed' ? 'outline' : 'secondary'
                        }>
                          {order.status}
                        </Badge>
                        <div className="text-sm text-gray-500 mt-1">
                          ${parseFloat(order.unitPrice).toFixed(2)}/ton
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No orders found. Start trading to see your order history here.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Holdings */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              {portfolioLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-40"></div>
                        <div className="h-3 bg-gray-300 rounded w-28"></div>
                      </div>
                      <div className="h-6 bg-gray-300 rounded w-20"></div>
                    </div>
                  ))}
                </div>
              ) : portfolio.length > 0 ? (
                <div className="space-y-4">
                  {portfolio.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-charcoal">Credit ID #{item.creditId}</div>
                        <div className="text-sm text-gray-500">
                          {item.quantity} credits • Purchased at ${item.purchasePrice}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(item.purchaseDate!).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-success">
                          ${(parseFloat(item.purchasePrice) * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No portfolio holdings found. Purchase some carbon credits to build your portfolio.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
