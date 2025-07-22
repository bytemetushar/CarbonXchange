import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactRequestSchema, insertOrderSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all carbon credits
  app.get("/api/carbon-credits", async (req, res) => {
    try {
      const credits = await storage.getCarbonCredits();
      res.json(credits);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch carbon credits" });
    }
  });

  // Get specific carbon credit
  app.get("/api/carbon-credits/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const credit = await storage.getCarbonCredit(id);
      if (!credit) {
        return res.status(404).json({ error: "Carbon credit not found" });
      }
      res.json(credit);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch carbon credit" });
    }
  });

  // Create order
  app.post("/api/orders", async (req, res) => {
    try {
      const validatedOrder = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(validatedOrder);
      
      // Update credit availability
      const credit = await storage.getCarbonCredit(validatedOrder.creditId);
      if (credit && credit.available >= validatedOrder.quantity) {
        await storage.updateCarbonCredit(validatedOrder.creditId, {
          available: credit.available - validatedOrder.quantity
        });
      }
      
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid order data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  // Get orders for a user (using userId = 1 for demo)
  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getOrders(1); // Demo user ID
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  // Get portfolio items for a user (using userId = 1 for demo)
  app.get("/api/portfolio", async (req, res) => {
    try {
      const portfolioItems = await storage.getPortfolioItems(1); // Demo user ID
      res.json(portfolioItems);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch portfolio" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedRequest = insertContactRequestSchema.parse(req.body);
      const contactRequest = await storage.createContactRequest(validatedRequest);
      res.status(201).json({ message: "Contact request submitted successfully", id: contactRequest.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid contact data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to submit contact request" });
    }
  });

  // Get market statistics
  app.get("/api/market-stats", async (req, res) => {
    try {
      const credits = await storage.getCarbonCredits();
      const totalCredits = credits.reduce((sum, credit) => sum + credit.available, 0);
      const totalOffset = Math.floor(totalCredits * 0.36); // Mock calculation
      
      const stats = {
        totalCredits: `${(totalCredits / 1000000).toFixed(1)}M`,
        activeBuyers: "15,200",
        verifiedSellers: "3,840",
        carbonOffset: `${(totalOffset / 1000).toFixed(0)}K`
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch market stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
