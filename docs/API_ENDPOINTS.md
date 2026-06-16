# Leubok API Endpoints Documentation

## Base URL
```
http://localhost:3500/api/v1
```

## Authentication

All endpoints (except auth) require JWT token in header:
```
Authorization: Bearer <token>
```

## Auth Endpoints

### Get Message to Sign
```http
POST /auth/wallet-message

Request:
{
  "walletAddress": "cosmos1xxxx..."
}

Response:
{
  "message": "Sign this message to login...",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Verify Wallet Signature
```http
POST /auth/verify-wallet

Request:
{
  "walletAddress": "cosmos1xxxx...",
  "signature": "<signed message>"
}

Response:
{
  "token": "eyJhbGc...",
  "user": {
    "id": "user123",
    "walletAddress": "cosmos1xxxx...",
    "isSeller": false,
    "isAdmin": false
  }
}
```

### Logout
```http
POST /auth/logout

Response:
{
  "message": "Logged out successfully"
}
```

## User Endpoints

### Get User Profile
```http
GET /users/profile

Response:
{
  "id": "user123",
  "walletAddress": "cosmos1xxxx...",
  "email": "user@example.com",
  "name": "John Doe",
  "avatar": "ipfs://...",
  "bio": "Crypto enthusiast",
  "isSeller": false,
  "isAdmin": false,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Update User Profile
```http
PUT /users/profile

Request:
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "bio": "Updated bio",
  "avatar": "ipfs://..."
}

Response: Updated user object
```

### Get User Stats
```http
GET /users/stats

Response:
{
  "totalOrders": 25,
  "totalSpent": 5000,
  "averageRating": 4.8,
  "totalReviews": 20,
  "memberSince": "2024-01-01"
}
```

### Get User Reputation
```http
GET /users/:userId/reputation

Response:
{
  "rating": 4.8,
  "trustScore": 950,
  "totalReviews": 20,
  "positiveReviews": 19,
  "neutralReviews": 1,
  "negativeReviews": 0,
  "isVerified": true
}
```

## Product Endpoints

### List Products
```http
GET /products?page=1&limit=20&category=electronics&sort=newest

Query Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 20)
- category: Filter by category
- sort: newest, trending, price-low, price-high
- search: Search term

Response:
{
  "data": [
    {
      "id": "prod123",
      "title": "Laptop",
      "price": 1000,
      "priceUSDC": 1000,
      "thumbnail": "ipfs://...",
      "seller": {
        "id": "seller123",
        "storeName": "Tech Store",
        "rating": 4.8
      },
      "rating": 4.7,
      "reviews": 45
    }
  ],
  "pagination": {
    "total": 500,
    "page": 1,
    "limit": 20,
    "pages": 25
  }
}
```

### Get Product Details
```http
GET /products/:productId

Response:
{
  "id": "prod123",
  "title": "Laptop",
  "description": "High-performance laptop...",
  "price": 1000,
  "priceUSDC": 1000,
  "category": "electronics",
  "images": ["ipfs://..."],
  "stock": 10,
  "seller": {
    "id": "seller123",
    "storeName": "Tech Store",
    "avatar": "ipfs://...",
    "rating": 4.8,
    "verified": true
  },
  "rating": 4.7,
  "reviews": [
    {
      "id": "review123",
      "rating": 5,
      "comment": "Excellent product!",
      "buyer": "John D.",
      "date": "2024-01-15"
    }
  ],
  "views": 1250
}
```

### Create Product (Seller)
```http
POST /products

Headers:
- Content-Type: multipart/form-data

Request:
{
  "title": "Laptop",
  "description": "High-performance laptop...",
  "price": 1000,
  "category": "electronics",
  "images": [file1, file2],
  "stock": 10,
  "sku": "LAP-001",
  "weight": 1.5,
  "shippingCost": 25
}

Response: Created product object
```

### Update Product (Seller)
```http
PUT /products/:productId

Request:
{
  "title": "Updated Laptop",
  "price": 950,
  "stock": 8
}

Response: Updated product object
```

### Delete Product (Seller)
```http
DELETE /products/:productId

Response:
{
  "message": "Product deleted"
}
```

## Cart Endpoints

### Get Cart
```http
GET /cart

Response:
{
  "id": "cart123",
  "items": [
    {
      "id": "item123",
      "product": { /* product object */ },
      "quantity": 2,
      "subtotal": 2000
    }
  ],
  "total": 2000,
  "itemCount": 2
}
```

### Add to Cart
```http
POST /cart/items

Request:
{
  "productId": "prod123",
  "quantity": 2
}

Response: Updated cart object
```

### Update Cart Item
```http
PUT /cart/items/:itemId

Request:
{
  "quantity": 3
}

Response: Updated cart object
```

### Remove from Cart
```http
DELETE /cart/items/:itemId

Response: Updated cart object
```

## Order Endpoints

### Create Order
```http
POST /orders

Request:
{
  "items": [
    { "productId": "prod123", "quantity": 2 }
  ],
  "shippingAddressId": "addr123"
}

Response:
{
  "id": "order123",
  "orderNumber": "ORD-2024-001",
  "status": "pending",
  "items": [...],
  "totalAmount": 2000,
  "platformFee": 50,
  "escrowAmount": 2050
}
```

### Get Orders
```http
GET /orders?status=pending&page=1

Response:
{
  "data": [ /* order objects */ ],
  "pagination": { /* pagination info */ }
}
```

### Get Order Details
```http
GET /orders/:orderId

Response: Order object with all details
```

### Update Order Status (Seller)
```http
PUT /orders/:orderId/status

Request:
{
  "status": "shipped",
  "trackingNumber": "TRK-123456",
  "carrier": "DHL"
}

Response: Updated order object
```

### Confirm Receipt (Buyer)
```http
POST /orders/:orderId/confirm

Response:
{
  "message": "Order confirmed",
  "order": { /* updated order */ }
}
```

## Payment Endpoints

### Create Escrow Payment
```http
POST /payments/create-escrow

Request:
{
  "orderId": "order123",
  "amount": 2050,
  "currency": "USDC"
}

Response:
{
  "id": "payment123",
  "escrowAddress": "cosmos1escrow...",
  "amount": 2050,
  "status": "pending",
  "message": "Complete payment in your wallet"
}
```

### Get Payment Status
```http
GET /payments/:paymentId

Response:
{
  "id": "payment123",
  "status": "locked",
  "amount": 2050,
  "txHash": "0x...",
  "confirmedAt": "2024-01-15T10:30:00Z"
}
```

### Release Escrow (After Confirmation)
```http
POST /payments/:paymentId/release

Response:
{
  "message": "Escrow released",
  "txHash": "0x..."
}
```

### Refund (Dispute Resolution)
```http
POST /payments/:paymentId/refund

Request:
{
  "reason": "Refund reason"
}

Response:
{
  "message": "Refund processed",
  "txHash": "0x..."
}
```

## Review Endpoints

### Create Review
```http
POST /ratings

Request:
{
  "orderId": "order123",
  "rating": 5,
  "title": "Great product!",
  "comment": "Arrived quickly and in perfect condition",
  "images": [file1, file2]
}

Response: Created review object
```

### Get Product Reviews
```http
GET /ratings/:productId?page=1&limit=10&sort=newest

Response:
{
  "data": [ /* review objects */ ],
  "pagination": { /* pagination info */ }
}
```

## Search Endpoints

### Full-Text Search
```http
GET /search?q=laptop&category=electronics&minPrice=500&maxPrice=2000

Query Parameters:
- q: Search query
- category: Filter by category
- minPrice: Minimum price
- maxPrice: Maximum price
- seller: Filter by seller
- rating: Minimum rating (0-5)
- sort: relevance, newest, price-low, price-high

Response:
{
  "results": [ /* product objects */ ],
  "count": 45
}
```

### Search Suggestions
```http
GET /search/suggestions?q=lapt

Response:
{
  "suggestions": ["laptop", "laptop bag", "laptop stand"]
}
```

## Admin Endpoints

### Get Dashboard Stats
```http
GET /admin/dashboard

Response:
{
  "totalUsers": 1500,
  "totalSellers": 250,
  "totalTransactions": 5000,
  "totalRevenue": 500000,
  "platformFees": 12500,
  "activeOrders": 150,
  "chartData": { /* chart data */ }
}
```

### List Users (Admin)
```http
GET /admin/users?page=1&status=active&search=john

Response:
{
  "data": [ /* user objects */ ],
  "pagination": { /* pagination info */ }
}
```

### Suspend User (Admin)
```http
PUT /admin/users/:userId

Request:
{
  "status": "suspended",
  "reason": "Suspicious activity"
}

Response: Updated user object
```

## Error Responses

### Standard Error Format
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid input",
    "details": [
      { "field": "email", "message": "Invalid email format" }
    ]
  }
}
```

### Common Error Codes
- `UNAUTHORIZED` (401): Missing or invalid token
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `INVALID_REQUEST` (400): Bad request
- `CONFLICT` (409): Resource already exists
- `RATE_LIMITED` (429): Too many requests
- `SERVER_ERROR` (500): Internal server error

## Rate Limiting

- Public endpoints: 100 requests per 15 minutes
- Authenticated endpoints: 300 requests per 15 minutes
- Admin endpoints: 500 requests per 15 minutes

Rate limit info in response headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642254000
```
