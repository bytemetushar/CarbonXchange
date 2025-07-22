import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { services } from "@/lib/mock-data";
import { ExternalLink } from "lucide-react";

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-charcoal mb-4">
            Comprehensive Carbon Trading Services
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need for successful carbon credit trading and ESG compliance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                  <span className="text-white text-xl">{service.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" className="text-primary hover:text-primary/80 p-0">
                  Learn More <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-primary text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-8 text-green-100">
                Join thousands of organizations already using our platform for their carbon trading needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-primary hover:bg-gray-100">
                  Start Trading Today
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Schedule a Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
