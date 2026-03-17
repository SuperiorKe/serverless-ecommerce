# superiorKe E-commerce Frontend

A modern, responsive e-commerce frontend built with React, TypeScript, and Tailwind CSS. Features complete shopping cart, checkout, order management, and authentication systems.

## 🚀 Features

### 🛍️ **Shopping Experience**
- **Product Catalog**: Browse products with category filters and search functionality
- **Product Details**: Detailed product pages with images, pricing, and reviews
- **Shopping Cart**: Full cart management with quantity controls and persistent state
- **Wishlist**: Save favorite products for later

### 🛒 **Checkout & Orders**
- **Secure Checkout**: Multi-step checkout with shipping information
- **Payment Methods**: Support for Cash on Delivery, M-Pesa, and Card payments
- **Order History**: Complete order tracking and management
- **Order Status**: Real-time order status updates (Pending → Confirmed → Shipped → Delivered)

### 🔐 **Authentication**
- **User Accounts**: Complete registration and login system
- **Profile Management**: User profile with order history
- **Session Management**: Secure session handling with Django backend integration
- **Protected Routes**: Auth guards for checkout and account pages

### 🎨 **User Interface**
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Components**: Clean, accessible UI components
- **Loading States**: Smooth loading animations and error handling
- **Toast Notifications**: User-friendly feedback system

### 🔧 **Technical Stack**
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Lucide Icons
- **State Management**: Zustand + React Query
- **Routing**: React Router v6
- **Forms**: Controlled components with validation
- **Mock API**: MSW (Mock Service Worker) for development

## 📁 Project Structure

```
src/
├── api/                 # API layer and mock implementations
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── checkout/       # Checkout flow components
│   ├── layout/         # Layout components (Header, Footer, etc.)
│   ├── orders/         # Order management components
│   ├── products/       # Product-related components
│   └── ui/             # Base UI components
├── hooks/              # Custom React hooks
├── mocks/              # MSW mock data and handlers
├── pages/              # Page components
├── store/              # Zustand state management
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ecommerce-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.development` file:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_ENABLE_MOCKS=true
```

## 🧪 Development Features

### Mock API Layer
- **Complete API Mocking**: All endpoints mocked with MSW
- **Realistic Data**: Product, category, order, and user mock data
- **Network Simulation**: Built-in delays and error states
- **Offline Development**: No backend required for frontend development

### Hot Module Replacement
- Fast development with Vite HMR
- Instant component updates
- State persistence across reloads

## 📱 Responsive Design

- **Mobile**: 320px+ - Optimized for mobile devices
- **Tablet**: 768px+ - Tablet-optimized layouts  
- **Desktop**: 1024px+ - Full desktop experience

## 🔄 API Integration

### Mock Endpoints
```typescript
// Products
GET /api/products/           # Product listing with filters
GET /api/products/{slug}/    # Product details
GET /api/products/categories/ # Categories list
GET /api/products/featured/  # Featured products

// Cart
GET /api/cart/               # Get cart contents
POST /api/cart/items/        # Add item to cart
PATCH /api/cart/items/{id}/  # Update item quantity
DELETE /api/cart/items/{id}/  # Remove item
DELETE /api/cart/clear/      # Clear cart

// Orders
GET /api/orders/             # Order history
POST /api/orders/            # Create order
GET /api/orders/{id}/        # Order details

// Auth
POST /api/auth/login/        # User login
POST /api/auth/register/     # User registration
POST /api/auth/logout/       # User logout
GET /api/auth/me/            # Current user info
```

## 🎯 Key Components

### ProductCard
- Product image, name, price display
- Add to cart functionality
- Stock status indicators
- Rating and review display

### CartDrawer
- Slide-out cart interface
- Item quantity controls
- Real-time price calculations
- Checkout button

### CheckoutForm
- Multi-step checkout process
- Shipping address form
- Order summary
- Payment method selection

### OrderCard
- Order status badges
- Itemized order details
- Shipping information
- Action buttons (Cancel, Buy Again)

## 🔐 Authentication Flow

1. **Registration**: User creates account with email/password
2. **Login**: User authenticates and receives session
3. **Protected Routes**: Checkout and account pages require auth
4. **Session Management**: Automatic logout on session expiry

## 🚀 Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 Performance Features

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Lazy loading for product images
- **Bundle Analysis**: Optimized bundle sizes
- **Caching**: React Query for API response caching

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## 📝 Development Notes

### Mock vs Real API
- Development uses mock API (`VITE_ENABLE_MOCKS=true`)
- Production uses real backend API
- Easy toggle between environments

### State Management
- **Zustand**: Client-side state (auth, cart UI)
- **React Query**: Server state (products, orders, cart data)

### Styling Approach
- **Tailwind CSS**: Utility-first styling
- **Component-Scoped**: Scoped styles within components
- **Design System**: Consistent color palette and spacing

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

© 2026 superiorKe. All rights reserved. Made in Kenya.

---

## 🔗 Backend Integration

This frontend is designed to work with a Django backend featuring:
- Django REST Framework API
- Session-based authentication
- Product and order management
- Payment processing integration

The mock API layer provides complete frontend development capabilities without requiring backend setup.
