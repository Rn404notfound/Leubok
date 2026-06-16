# Leubok Database Schema

## Overview
PostgreSQL database schema for Leubok marketplace using Prisma ORM.

## Core Tables

### Users
Stores user account information for buyers and sellers.

```prisma
model User {
  id                String      @id @default(cuid())
  walletAddress     String      @unique
  email             String?     @unique
  name              String?
  avatar            String?
  bio               String?
  phoneNumber       String?
  isEmailVerified   Boolean     @default(false)
  isSeller          Boolean     @default(false)
  isAdmin           Boolean     @default(false)
  accountStatus     String      @default("active") // active, suspended, banned
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  
  // Relations
  profile           SellerProfile?
  products          Product[]
  orders            Order[]
  reviews           Review[]
  addresses         Address[]
  notifications     Notification[]
  adminLogs         AdminLog[]
}
```

### SellerProfile
Detailed seller information and settings.

```prisma
model SellerProfile {
  id                String      @id @default(cuid())
  userId            String      @unique
  storeName         String
  storeDescription  String?
  logo              String?
  banner            String?
  isVerified        Boolean     @default(false)
  verificationDate  DateTime?
  rating            Float       @default(0)
  totalSales        Int         @default(0)
  totalRevenue      Float       @default(0)
  trustScore        Int         @default(0)
  responseTime      Int?        // in minutes
  returnRate        Float       @default(0)
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  
  user              User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}
```

### Products
Product listings on marketplace.

```prisma
model Product {
  id                String      @id @default(cuid())
  sellerId          String
  title             String
  description       String
  price             Float
  priceUSDC         Float       // Locked USDC price
  category          String
  images            String[]    // Array of IPFS hashes
  thumbnail         String      // Primary image
  stock             Int
  sku               String?
  weight            Float?
  dimensions        String?
  shippingCost      Float?
  isFeatured        Boolean     @default(false)
  isApproved        Boolean     @default(true)
  isActive          Boolean     @default(true)
  views             Int         @default(0)
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  
  seller            User        @relation(fields: [sellerId], references: [id], onDelete: Cascade)
  reviews           Review[]
  orderItems        OrderItem[]
  cart              CartItem[]
  
  @@index([sellerId])
  @@index([category])
  @@fulltext([title, description])
}
```

### Categories
Product categories.

```prisma
model Category {
  id                String      @id @default(cuid())
  name              String      @unique
  slug              String      @unique
  description       String?
  icon              String?
  image             String?
  order             Int
  isActive          Boolean     @default(true)
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
}
```

### Cart
Shopping cart items.

```prisma
model Cart {
  id                String      @id @default(cuid())
  userId            String      @unique
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  
  items             CartItem[]
}

model CartItem {
  id                String      @id @default(cuid())
  cartId            String
  productId         String
  quantity          Int
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  
  cart              Cart        @relation(fields: [cartId], references: [id], onDelete: Cascade)
  product           Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  @@unique([cartId, productId])
  @@index([cartId])
  @@index([productId])
}
```

### Orders
Customer orders.

```prisma
model Order {
  id                String      @id @default(cuid())
  buyerId           String
  sellerId          String
  orderNumber       String      @unique
  status            String      @default("pending") // pending, confirmed, shipped, delivered, cancelled
  totalAmount       Float
  platformFee       Float
  escrowAmount      Float
  paymentStatus     String      @default("pending") // pending, locked, released, refunded
  escrowTxHash      String?
  notes             String?
  shippingAddress   String
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  completedAt       DateTime?
  
  buyer             User        @relation("BuyerOrders", fields: [buyerId], references: [id])
  items             OrderItem[]
  payments          Payment[]
  dispute           Dispute?
  reviews           Review[]
  tracking          OrderTracking?
  
  @@index([buyerId])
  @@index([sellerId])
  @@index([status])
}

model OrderItem {
  id                String      @id @default(cuid())
  orderId           String
  productId         String
  quantity          Int
  pricePerUnit      Float
  totalPrice        Float
  createdAt         DateTime    @default(now())
  
  order             Order       @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product           Product     @relation(fields: [productId], references: [id])
  
  @@index([orderId])
  @@index([productId])
}
```

### Payments
Payment and escrow information.

```prisma
model Payment {
  id                String      @id @default(cuid())
  orderId           String
  amount            Float
  currency          String      @default("USDC")
  status            String      @default("pending") // pending, locked, released, refunded
  txHash            String?
  fromAddress       String
  toAddress         String?
  escrowAddress     String?
  releaseDate       DateTime?
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  
  order             Order       @relation(fields: [orderId], references: [id], onDelete: Cascade)
  
  @@index([orderId])
  @@index([status])
  @@index([txHash])
}
```

### Reviews & Ratings
Product and seller reviews.

```prisma
model Review {
  id                String      @id @default(cuid())
  orderId           String      @unique
  productId         String
  buyerId           String
  sellerId          String
  rating            Int         // 1-5
  title             String?
  comment           String?
  images            String[]    // Review photos
  isApproved        Boolean     @default(true)
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  
  order             Order       @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product           Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  buyer             User        @relation(fields: [buyerId], references: [id])
  
  @@index([productId])
  @@index([buyerId])
  @@index([sellerId])
}
```

### Disputes
Order disputes and resolutions.

```prisma
model Dispute {
  id                String      @id @default(cuid())
  orderId           String      @unique
  reportedBy        String
  reason            String
  description       String
  status            String      @default("open") // open, investigating, resolved, closed
  resolution        String?
  evidence          String[]    // File URLs
  adminNotes        String?
  decidedAt         DateTime?
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  
  order             Order       @relation(fields: [orderId], references: [id], onDelete: Cascade)
  
  @@index([orderId])
  @@index([status])
}
```

### OrderTracking
Shipment tracking information.

```prisma
model OrderTracking {
  id                String      @id @default(cuid())
  orderId           String      @unique
  carrier           String?
  trackingNumber    String?
  status            String      @default("not_shipped") // not_shipped, in_transit, out_for_delivery, delivered
  shippedAt         DateTime?
  deliveredAt       DateTime?
  lastUpdate        DateTime    @updatedAt
  
  order             Order       @relation(fields: [orderId], references: [id], onDelete: Cascade)
}
```

### Addresses
User delivery addresses.

```prisma
model Address {
  id                String      @id @default(cuid())
  userId            String
  fullName          String
  phoneNumber       String
  street            String
  city              String
  state             String
  postalCode        String
  country           String
  isDefault         Boolean     @default(false)
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  
  user              User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}
```

### Notifications
User notifications.

```prisma
model Notification {
  id                String      @id @default(cuid())
  userId            String
  type              String      // order_created, payment_received, item_shipped, etc
  title             String
  message           String
  data              Json?
  isRead            Boolean     @default(false)
  createdAt         DateTime    @default(now())
  
  user              User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([isRead])
}
```

### AdminLog
Administrator action logs.

```prisma
model AdminLog {
  id                String      @id @default(cuid())
  adminId           String
  action            String      // suspend_user, remove_product, resolve_dispute, etc
  targetType        String      // user, product, order, dispute
  targetId          String
  reason            String?
  details           Json?
  createdAt         DateTime    @default(now())
  
  admin             User        @relation(fields: [adminId], references: [id])
  
  @@index([adminId])
  @@index([createdAt])
}
```

### SellerSubscription
Seller subscription plans.

```prisma
model SellerSubscription {
  id                String      @id @default(cuid())
  userId            String      @unique
  planType          String      // basic, pro, enterprise
  status            String      @default("active") // active, expired, cancelled
  monthlyFee        Float
  startDate         DateTime
  endDate           DateTime
  autoRenew         Boolean     @default(true)
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  
  @@index([userId])
  @@index([status])
}
```

## Database Indexes

```sql
-- Performance indexes
CREATE INDEX idx_products_seller_id ON "Product"("sellerId");
CREATE INDEX idx_products_category ON "Product"("category");
CREATE INDEX idx_orders_buyer_id ON "Order"("buyerId");
CREATE INDEX idx_orders_status ON "Order"("status");
CREATE INDEX idx_payments_status ON "Payment"("status");
CREATE INDEX idx_reviews_product_id ON "Review"("productId");
CREATE INDEX idx_notifications_user_id ON "Notification"("userId");

-- Full-text search indexes
CREATE INDEX idx_products_search ON "Product" USING GIN (to_tsvector('english', "title" || ' ' || "description"));
```

## Relationships Overview

```
User
  ├─ SellerProfile (1-1)
  ├─ Products (1-many)
  ├─ Orders (as Buyer) (1-many)
  ├─ Reviews (1-many)
  ├─ Addresses (1-many)
  └─ Notifications (1-many)

Product
  ├─ User (Seller) (many-1)
  ├─ Reviews (1-many)
  ├─ OrderItems (1-many)
  └─ CartItems (1-many)

Order
  ├─ User (Buyer) (many-1)
  ├─ OrderItems (1-many)
  ├─ Payments (1-many)
  ├─ Reviews (1-many)
  ├─ Dispute (1-1)
  └─ OrderTracking (1-1)
```
