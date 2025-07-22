# CarbonTrade Platform

## Overview

CarbonTrade is a full-stack web application for carbon credit trading and ESG compliance. It provides a marketplace where users can browse, purchase, and track carbon credits from verified sellers worldwide. The platform features a modern React frontend with a Node.js/Express backend, using PostgreSQL for data persistence and Drizzle ORM for database operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

- **Frontend**: React with TypeScript, using Vite for development and build tooling
- **Backend**: Express.js server with TypeScript 
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Architecture
- **React SPA**: Single-page application with component-based architecture
- **TypeScript**: Full type safety across the frontend codebase
- **Vite**: Fast development server and optimized production builds
- **Shadcn/ui**: Consistent, accessible UI components
- **TanStack Query**: Efficient data fetching, caching, and synchronization
- **Chart.js**: Data visualization for portfolio and market analytics

### Backend Architecture
- **Express.js**: RESTful API server with middleware-based request handling
- **TypeScript**: Type-safe server-side development
- **Drizzle ORM**: Type-safe database queries and schema management
- **In-memory Storage**: Development storage layer with interface for easy database swapping
- **Validation**: Zod schemas for request/response validation

### Database Design
- **Carbon Credits**: Core marketplace entities with pricing, availability, and verification info
- **Users**: User accounts and authentication (schema defined, implementation pending)
- **Orders**: Purchase transactions and order management
- **Portfolio**: User-owned credit tracking
- **Contact Requests**: Lead generation and customer inquiries

### UI/UX Features
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Dark Mode**: Built-in theme switching capability
- **Accessible Components**: ARIA-compliant UI components via Radix UI
- **Interactive Charts**: Real-time data visualization for trading insights
- **Form Handling**: React Hook Form with Zod validation

## Data Flow

1. **Client Requests**: Frontend makes API calls through TanStack Query
2. **API Layer**: Express routes handle requests with validation
3. **Business Logic**: Storage layer processes data operations
4. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
5. **Response Handling**: JSON responses with error handling middleware
6. **Client Updates**: TanStack Query updates UI state automatically

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router
- **zod**: Runtime type validation

### UI Dependencies
- **@radix-ui/***: Accessible component primitives
- **tailwindcss**: Utility-first CSS framework
- **chart.js**: Data visualization library
- **lucide-react**: Icon library

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development
- **Server**: Node.js with tsx for TypeScript execution
- **Client**: Vite development server with HMR
- **Database**: PostgreSQL with Drizzle migrations
- **Environment**: Local development with Replit integration

### Production
- **Build Process**: Vite builds client assets, esbuild bundles server code
- **Server Deployment**: Express.js server serving static files and API routes
- **Database**: PostgreSQL with connection pooling
- **Asset Serving**: Static file serving from Express for production builds

### Key Architectural Decisions

1. **Monorepo Structure**: Chosen for code sharing between client/server and simplified deployment
2. **Drizzle ORM**: Selected for type safety and PostgreSQL compatibility over traditional ORMs
3. **In-memory Development Storage**: Enables rapid development without database setup requirements
4. **Shadcn/ui**: Provides consistent, customizable components without vendor lock-in
5. **TanStack Query**: Handles complex server state management with caching and optimistic updates
6. **TypeScript Throughout**: Ensures type safety across the entire stack
7. **Vite + Express**: Combines fast development experience with production-ready server capabilities