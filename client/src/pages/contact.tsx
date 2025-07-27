import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import type { InsertContactRequest } from "@shared/schema";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<InsertContactRequest>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    interest: "",
    message: "",
  });

  const [chatMessage, setChatMessage] = useState("");

  const contactMutation = useMutation({
    mutationFn: (data: InsertContactRequest) =>
      apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        interest: "",
        message: "",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof InsertContactRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSendChatMessage = () => {
    if (chatMessage.trim()) {
      // Mock chat functionality
      console.log("Sending chat message:", chatMessage);
      setChatMessage("");
      toast({
        title: "Message Sent",
        description: "Our support team will respond shortly.",
      });
    }
  };

  const mockChatMessages = [
    {
      sender: "support",
      message: "Hi! I'm Anushka, your carbon credit specialist. How can I help you today?",
      time: "2:30 PM",
    },
    {
      sender: "user",
      message: "I'm interested in purchasing forestry credits for my company's ESG goals.",
      time: "2:31 PM",
    },
    {
      sender: "support",
      message: "Perfect! I can help you find verified forestry credits. What's your target volume?",
      time: "2:32 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h1 className="text-3xl font-bold text-charcoal mb-6">Get in Touch</h1>
            <p className="text-gray-600 mb-8">
              Ready to start trading? Have questions about our services? Contact our team of carbon credit experts.
            </p>
            
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company || ""}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <Label htmlFor="interest">Interest</Label>
                    <Select value={formData.interest} onValueChange={(value) => handleInputChange("interest", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buying">Buying Carbon Credits</SelectItem>
                        <SelectItem value="selling">Selling Carbon Credits</SelectItem>
                        <SelectItem value="consulting">ESG Consulting</SelectItem>
                        <SelectItem value="partnership">Platform Partnership</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us about your carbon credit needs..."
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="border-blue-800 text-white bg-blue-800 hover:bg-blue-900 hover:border-blue-900 hover:text-white w-full"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information & Chat */}
          <div>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-4">
                      <Phone className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <div className="font-medium text-charcoal">Phone</div>
                      <div className="text-gray-600">+91 8923988285</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-red-700" />
                    </div>
                    <div>
                      <div className="font-medium text-charcoal">Email</div>
                      <div className="text-gray-600">anushka@carbontrade.com</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="h-5 w-5 text-yellow-700" />
                    </div>
                    <div>
                      <div className="font-medium text-charcoal">Address</div>
                      <div className="text-gray-600">123 Green Street, Eco City, Moradabad 12345</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Chat Preview */}
            <Card>
              <CardHeader className="bg-primary text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                      <MessageCircle className="h-7 w-7 text-gray-900" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-900 mb-2">Live Chat Support</CardTitle>
                      <div className="text-sm text-green-700">Online now</div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-64 overflow-y-auto bg-gray-100 p-4">
                  <div className="space-y-3">
                    {mockChatMessages.map((msg, index) => (
                      <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'items-start'}`}>
                        {msg.sender === 'support' && (
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <MessageCircle className="h-4 w-4 text-gray-800" />
                          </div>
                        )}
                        <div className={`rounded-lg p-3 max-w-xs ${
                          msg.sender === 'user' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-white border border-gray-200'
                        }`}>
                          <div className="text-sm">{msg.message}</div>
                          <div className={`text-xs mt-1 ${
                            msg.sender === 'user' ? 'text-gray-300' : 'text-gray-500'
                          }`}>
                            {msg.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <div className="flex">
                    <Input
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 rounded-r-none"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendChatMessage()}
                    />
                    <Button
                      onClick={handleSendChatMessage}
                      className="bg-primary ml-1 text-white bg-yellow-600 hover:bg-yellow-800 rounded-l-none"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
