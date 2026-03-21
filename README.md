# Elites E-Commerce Frontend

Welcome to the **Elites** frontend repository. This is a modern, responsive, and production-ready e-commerce single-page application (SPA). Designed with a vibrant, ALX-inspired color palette (Spring Green & Blue Zodiac), Elites provides a seamless end-to-end shopping experience—from product discovery to checkout.

The project is architected to be connected to a robust Django/PostgreSQL backend infrastructure hosted on AWS.

## ✨ Key Features

- **Seamless Shopping Journey**: Fully interactive product catalogs, detail pages, and a persistent slide-out cart.
- **Production-Ready Checkout**: Multi-step checkout form with user-friendly validation, supporting local payment methods (M-Pesa, Cash on Delivery, Card). 
- **Order Success Flow**: Dedicated, polished success confirmations providing direct feedback and reference IDs immediately after purchase.
- **Mobile-First Responsive Design**: Beautiful UI powered by Tailwind CSS. Every grid, drawer, and action button dynamically stacks and scales for a flawless experience on smartphones and tablets.
- **Secure Authentication UI**: Pre-built Login, Registration, and Account Profile screens. Includes logic for `X-CSRFToken` handling, fully prepared for Django session cookies.

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Lucide Icons for clean, utility-first UI
- **State Management**: Zustand (UI state) + React Query (Server state)
- **Routing**: React Router v6
- **Mock Integration**: MSW (Mock Service Worker) for frontend-first isolated development

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Execution

```bash
# Clone the repository
git clone <repository-url>
cd ecommerce-frontend

# Install dependencies
npm install

# Start the Vite development server (runs with MSW mocks enabled)
npm run dev
```

### Environment Configuration

The application expects a `.env.development` file in the root for local testing:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_ENABLE_MOCKS=true
```

To connect to your live AWS Django backend, update the `VITE_API_BASE_URL` in your `.env.production` file and set `VITE_ENABLE_MOCKS=false`.

## 📦 Project Structure

```text
src/
├── api/          # Network layer (Axios config, Interceptors, Django CSRF handling)
├── components/   # Modular, reusable UI chunks (Products, Cart, Form Inputs, Auth)
├── hooks/        # Custom React Query & utility hooks
├── mocks/        # MSW offline data simulating the future PostgreSQL structure
├── pages/        # Top-level route components (Home, Checkout, Success, Orders)
├── store/        # Zustand global states (Cart open/close, Auth tokens)
├── types/        # TypeScript interfaces defining global domains (User, Product, Order)
└── utils/        # Price formatting and parsing utilities
```

## 🏗️ Building for Production

This application adheres to strict TypeScript checking and ESLint rules to guarantee stability.

```bash
# Validate types and generate production bundle
npm run build

# Preview the minified production output
npm run preview
```

## 🤝 Next Steps for Backend Integration

This frontend was explicitly prepared to be plugged into a Django REST Framework API. 
The Axios client in `src/api/client.ts` is pre-configured with `withCredentials: true` to seamlessly accept backend HttpOnly cookies and attach necessary CSRF validation headers for secure mutation requests.

## 📄 License

© 2026 Elites Marketplace. All rights reserved.
