import { 
  CarbonCredit, 
  InsertCarbonCredit, 
  PortfolioItem, 
  InsertPortfolioItem,
  Order,
  InsertOrder,
  ContactRequest,
  InsertContactRequest,
  User,
  InsertUser 
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Carbon Credits
  getCarbonCredits(): Promise<CarbonCredit[]>;
  getCarbonCredit(id: number): Promise<CarbonCredit | undefined>;
  createCarbonCredit(credit: InsertCarbonCredit): Promise<CarbonCredit>;
  updateCarbonCredit(id: number, updates: Partial<CarbonCredit>): Promise<CarbonCredit | undefined>;

  // Portfolio
  getPortfolioItems(userId: number): Promise<PortfolioItem[]>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;

  // Orders
  getOrders(userId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;

  // Contact Requests
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private carbonCredits: Map<number, CarbonCredit>;
  private portfolioItems: Map<number, PortfolioItem>;
  private orders: Map<number, Order>;
  private contactRequests: Map<number, ContactRequest>;
  private currentUserId: number;
  private currentCreditId: number;
  private currentPortfolioId: number;
  private currentOrderId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.carbonCredits = new Map();
    this.portfolioItems = new Map();
    this.orders = new Map();
    this.contactRequests = new Map();
    this.currentUserId = 1;
    this.currentCreditId = 1;
    this.currentPortfolioId = 1;
    this.currentOrderId = 1;
    this.currentContactId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample carbon credits
    const sampleCredits: CarbonCredit[] = [
      {
        id: this.currentCreditId++,
        name: "Amazon Rainforest Protection",
        description: "Protecting 50,000 hectares of Amazon rainforest through community conservation initiatives",
        type: "Forestry",
        location: "Brazil",
        verification: "VCS Verified",
        price: "45.00",
        available: 12500,
        vintage: 2023,
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        sellerId: 1,
        createdAt: new Date(),
      },
      {
        id: this.currentCreditId++,
        name: "Solar Farm India",
        description: "100MW solar installation providing clean energy to rural communities",
        type: "Solar Energy",
        location: "India",
        verification: "Gold Standard",
        price: "38.00",
        available: 8200,
        vintage: 2023,
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        sellerId: 2,
        createdAt: new Date(),
      },
      {
        id: this.currentCreditId++,
        name: "Offshore Wind Farm",
        description: "250MW offshore wind installation generating clean electricity",
        type: "Wind Energy",
        location: "Denmark",
        verification: "VCS Verified",
        price: "52.00",
        available: 15750,
        vintage: 2023,
        imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        sellerId: 3,
        createdAt: new Date(),
      },
      {
        id: this.currentCreditId++,
        name: "Methane Capture Project",
        description: "Capturing methane emissions from agricultural waste and converting to energy",
        type: "Methane Reduction",
        location: "United States",
        verification: "VCS Verified",
        price: "42.00",
        available: 9800,
        vintage: 2023,
        imageUrl: "https://images.unsplash.com/photo-1581089778245-3ce67677f718?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        sellerId: 4,
        createdAt: new Date(),
      },
      {
        id: this.currentCreditId++,
        name: "Reforestation Kenya",
        description: "Large-scale tree planting initiative restoring degraded forest land",
        type: "Forestry",
        location: "Kenya",
        verification: "Gold Standard",
        price: "35.00",
        available: 18600,
        vintage: 2023,
        imageUrl: "https://images.unsplash.com/photo-1574263867128-f5d55a4fa68b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        sellerId: 5,
        createdAt: new Date(),
      },
      {
        id: this.currentCreditId++,
        name: "Hydroelectric Power",
        description: "Small-scale hydroelectric project providing clean energy to remote communities",
        type: "Hydro Energy",
        location: "Costa Rica",
        verification: "VCS Verified",
        price: "41.00",
        available: 6750,
        vintage: 2023,
        imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        sellerId: 6,
        createdAt: new Date(),
      }
    ];

    sampleCredits.forEach(credit => {
      this.carbonCredits.set(credit.id, credit);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Carbon Credit methods
  async getCarbonCredits(): Promise<CarbonCredit[]> {
    return Array.from(this.carbonCredits.values());
  }

  async getCarbonCredit(id: number): Promise<CarbonCredit | undefined> {
    return this.carbonCredits.get(id);
  }

  async createCarbonCredit(insertCredit: InsertCarbonCredit): Promise<CarbonCredit> {
    const id = this.currentCreditId++;
    const credit: CarbonCredit = {
      ...insertCredit,
      id,
      createdAt: new Date(),
    };
    this.carbonCredits.set(id, credit);
    return credit;
  }

  async updateCarbonCredit(id: number, updates: Partial<CarbonCredit>): Promise<CarbonCredit | undefined> {
    const existing = this.carbonCredits.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.carbonCredits.set(id, updated);
    return updated;
  }

  // Portfolio methods
  async getPortfolioItems(userId: number): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values()).filter(item => item.userId === userId);
  }

  async createPortfolioItem(insertItem: InsertPortfolioItem): Promise<PortfolioItem> {
    const id = this.currentPortfolioId++;
    const item: PortfolioItem = {
      ...insertItem,
      id,
      purchaseDate: new Date(),
    };
    this.portfolioItems.set(id, item);
    return item;
  }

  // Order methods
  async getOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(order => order.userId === userId);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    
    // Calculate delivery date based on duration
    const deliveryDate = new Date();
    switch (insertOrder.duration) {
      case "immediate":
        deliveryDate.setDate(deliveryDate.getDate() + 1);
        break;
      case "1-year":
        deliveryDate.setFullYear(deliveryDate.getFullYear() + 1);
        break;
      case "2-year":
        deliveryDate.setFullYear(deliveryDate.getFullYear() + 2);
        break;
      case "5-year":
        deliveryDate.setFullYear(deliveryDate.getFullYear() + 5);
        break;
      case "10-year":
        deliveryDate.setFullYear(deliveryDate.getFullYear() + 10);
        break;
      default:
        deliveryDate.setDate(deliveryDate.getDate() + 7);
    }
    
    const order: Order = {
      ...insertOrder,
      id,
      status: "pending",
      deliveryDate,
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const existing = this.orders.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, status };
    this.orders.set(id, updated);
    return updated;
  }

  // Contact Request methods
  async createContactRequest(insertRequest: InsertContactRequest): Promise<ContactRequest> {
    const id = this.currentContactId++;
    const request: ContactRequest = {
      ...insertRequest,
      id,
      company: insertRequest.company || null,
      createdAt: new Date(),
    };
    this.contactRequests.set(id, request);
    return request;
  }
}

export const storage = new MemStorage();
