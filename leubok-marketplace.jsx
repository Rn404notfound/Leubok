import { useState, useEffect, useRef } from "react";

// ============================================================
// DESIGN TOKENS & GLOBAL STYLES
// ============================================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --navy: #0A0F1E;
      --navy-800: #0F1629;
      --navy-700: #151E35;
      --navy-600: #1C2845;
      --indigo: #4F46E5;
      --indigo-400: #6D64F7;
      --indigo-300: #8B85FF;
      --teal: #26A17B;
      --teal-400: #34C99A;
      --amber: #F59E0B;
      --rose: #F43F5E;
      --white: #F8FAFC;
      --slate-300: #CBD5E1;
      --slate-400: #94A3B8;
      --slate-500: #64748B;
      --slate-600: #475569;
      --glass: rgba(255,255,255,0.04);
      --glass-border: rgba(255,255,255,0.08);
      --glow-indigo: 0 0 40px rgba(79,70,229,0.3);
      --glow-teal: 0 0 40px rgba(38,161,123,0.3);
      --font-display: 'Space Grotesk', sans-serif;
      --font-body: 'Inter', sans-serif;
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --radius-xl: 24px;
      --transition: 0.2s cubic-bezier(0.4,0,0.2,1);
    }

    body {
      font-family: var(--font-body);
      background: var(--navy);
      color: var(--white);
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    h1,h2,h3,h4,h5,h6 { font-family: var(--font-display); font-weight: 600; }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--navy-800); }
    ::-webkit-scrollbar-thumb { background: var(--navy-600); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--indigo); }

    @keyframes float {
      0%,100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    @keyframes pulse-glow {
      0%,100% { box-shadow: 0 0 20px rgba(79,70,229,0.4); }
      50% { box-shadow: 0 0 40px rgba(79,70,229,0.8); }
    }
    @keyframes slide-up {
      from { opacity:0; transform:translateY(20px); }
      to { opacity:1; transform:translateY(0); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes ping {
      0% { transform: scale(1); opacity: 1; }
      75%,100% { transform: scale(2); opacity: 0; }
    }

    .animate-float { animation: float 3s ease-in-out infinite; }
    .animate-slide-up { animation: slide-up 0.5s ease forwards; }
    .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
    .animate-spin { animation: spin 1s linear infinite; }
    .animate-ping { animation: ping 1s cubic-bezier(0,0,0.2,1) infinite; }

    .glass-card {
      background: var(--glass);
      border: 1px solid var(--glass-border);
      backdrop-filter: blur(20px);
      border-radius: var(--radius-lg);
    }

    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 24px; border-radius: var(--radius-md);
      background: var(--indigo); color: white; font-weight: 600;
      font-family: var(--font-display); font-size: 14px;
      border: none; cursor: pointer;
      transition: all var(--transition);
    }
    .btn-primary:hover { background: var(--indigo-400); transform: translateY(-1px); box-shadow: var(--glow-indigo); }

    .btn-secondary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 24px; border-radius: var(--radius-md);
      background: transparent; color: var(--white); font-weight: 600;
      font-family: var(--font-display); font-size: 14px;
      border: 1px solid var(--glass-border); cursor: pointer;
      transition: all var(--transition);
    }
    .btn-secondary:hover { background: var(--glass); border-color: var(--indigo); }

    .btn-teal {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 24px; border-radius: var(--radius-md);
      background: var(--teal); color: white; font-weight: 600;
      font-family: var(--font-display); font-size: 14px;
      border: none; cursor: pointer;
      transition: all var(--transition);
    }
    .btn-teal:hover { background: var(--teal-400); transform: translateY(-1px); box-shadow: var(--glow-teal); }

    .tag {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.05em;
    }
    .tag-indigo { background: rgba(79,70,229,0.15); color: var(--indigo-300); border: 1px solid rgba(79,70,229,0.3); }
    .tag-teal { background: rgba(38,161,123,0.15); color: var(--teal-400); border: 1px solid rgba(38,161,123,0.3); }
    .tag-amber { background: rgba(245,158,11,0.15); color: var(--amber); border: 1px solid rgba(245,158,11,0.3); }
    .tag-rose { background: rgba(244,63,94,0.15); color: var(--rose); border: 1px solid rgba(244,63,94,0.3); }

    .input-field {
      width: 100%; padding: 12px 16px; border-radius: var(--radius-md);
      background: var(--navy-600); border: 1px solid var(--glass-border);
      color: var(--white); font-family: var(--font-body); font-size: 14px;
      transition: all var(--transition); outline: none;
    }
    .input-field::placeholder { color: var(--slate-500); }
    .input-field:focus { border-color: var(--indigo); box-shadow: 0 0 0 3px rgba(79,70,229,0.15); }

    .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
  `}</style>
);

// ============================================================
// ICONS (inline SVG)
// ============================================================
const Icon = ({ name, size = 18, color = "currentColor", className = "" }) => {
  const paths = {
    home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
    search: "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0",
    cart: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0",
    wallet: "M21 4H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h13a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z M16 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M3 6l1-2",
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    package: "M16.5 9.4l-9-5.18 M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12",
    trending: "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
    grid: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
    list: "M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01",
    filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
    bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
    settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
    user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
    check: "M20 6L9 17l-5-5",
    x: "M18 6L6 18 M6 6l12 12",
    plus: "M12 5v14 M5 12h14",
    minus: "M5 12h14",
    arrow_right: "M5 12h14 M12 5l7 7-7 7",
    arrow_left: "M19 12H5 M12 19l-7-7 7-7",
    external: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6 M10 14L21 3",
    copy: "M20 9H11a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2z M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1",
    globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
    lock: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4",
    eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    refresh: "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0 1 14.85-3.36L23 10 M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
    activity: "M22 12h-4l-3 9L9 3l-3 9H2",
    bar_chart: "M18 20V10 M12 20V4 M6 20v-6",
    pie_chart: "M21.21 15.89A10 10 0 1 1 8 2.83 M22 12A10 10 0 0 0 12 2v10z",
    dollar: "M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    tag: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z M7 7h.01",
    box: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
    message: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
    cpu: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
    layers: "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
    award: "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M8.21 13.89L7 23l5-3 5 3-1.21-9.12",
    map_pin: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    close: "M18 6L6 18 M6 6l12 12",
    menu: "M3 12h18 M3 6h18 M3 18h18",
    chevron_down: "M6 9l6 6 6-6",
    chevron_right: "M9 18l6-6-6-6",
    sparkles: "M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z M5 3v4 M19 17v4 M3 5h4 M17 19h4",
    robot: "M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h2a7 7 0 0 1 7 7v2a2 2 0 0 1-2 2h-1v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1H4a2 2 0 0 1-2-2v-2a7 7 0 0 1 7-7h2V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z M9 14h.01 M15 14h.01 M9.5 18c.83.83 2.17.83 3 0",
    flag: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z M4 22v-7",
    trash: "M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2",
    edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      {paths[name]?.split(" M").map((d, i) => (
        <path key={i} d={i === 0 ? d : "M" + d} />
      ))}
    </svg>
  );
};

// ============================================================
// MOCK DATA
// ============================================================
const CATEGORIES = [
  { id: 1, name: "Electronics", icon: "cpu", count: 2847 },
  { id: 2, name: "Fashion", icon: "tag", count: 5621 },
  { id: 3, name: "Home & Living", icon: "home", count: 3204 },
  { id: 4, name: "Sports", icon: "activity", count: 1893 },
  { id: 5, name: "Collectibles", icon: "award", count: 967 },
  { id: 6, name: "Art & Design", icon: "layers", count: 1234 },
];

const PRODUCTS = [
  { id: 1, name: "Quantum Noise-Canceling Headphones", price: 189, category: "Electronics", seller: "TechVault", sellerRating: 4.9, sellerVerified: true, rating: 4.8, reviews: 342, image: "🎧", description: "Premium ANC headphones with 40hr battery. Spatial audio, touch controls, and wireless charging.", stock: 45, sales: 1203, tags: ["trending", "verified"] },
  { id: 2, name: "Handcrafted Leather Crossbody Bag", price: 245, category: "Fashion", seller: "ArtisanLeather", sellerRating: 4.7, sellerVerified: true, rating: 4.9, reviews: 187, image: "👜", description: "Full-grain vegetable-tanned leather bag. Handstitched, brass hardware, lifetime guarantee.", stock: 12, sales: 892, tags: ["premium", "handmade"] },
  { id: 3, name: "Smart Home Hub Pro", price: 129, category: "Electronics", seller: "SmartLiving", sellerRating: 4.6, sellerVerified: false, rating: 4.5, reviews: 521, image: "🏠", description: "Control 200+ devices. Matter protocol, voice AI, energy monitoring dashboard.", stock: 78, sales: 2341, tags: ["new"] },
  { id: 4, name: "Ultra-Light Carbon Fiber Bike", price: 1899, category: "Sports", seller: "VeloTech", sellerRating: 4.95, sellerVerified: true, rating: 4.9, reviews: 64, image: "🚲", description: "7.2kg road bike with Shimano Ultegra groupset. Aero geometry, tubeless ready.", stock: 5, sales: 127, tags: ["premium", "verified", "limited"] },
  { id: 5, name: "Vintage Mechanical Watch", price: 3200, category: "Collectibles", seller: "TimePiece", sellerRating: 5.0, sellerVerified: true, rating: 5.0, reviews: 28, image: "⌚", description: "1968 Swiss movement, fully restored. Certificate of authenticity included.", stock: 1, sales: 47, tags: ["rare", "verified"] },
  { id: 6, name: "Ergonomic Office Chair Elite", price: 599, category: "Home & Living", seller: "ComfortWork", sellerRating: 4.8, sellerVerified: true, rating: 4.7, reviews: 1204, image: "🪑", description: "12-way adjustable lumbar, 4D armrests, breathable mesh. 10yr warranty.", stock: 23, sales: 3782, tags: ["bestseller"] },
  { id: 7, name: "Digital Art Print — Aurora", price: 89, category: "Art & Design", seller: "NeonCanvas", sellerRating: 4.6, sellerVerified: false, rating: 4.6, reviews: 93, image: "🎨", description: "Limited edition 1/100 art print. Archival pigment on 300gsm cotton rag.", stock: 8, sales: 345, tags: ["limited"] },
  { id: 8, name: "Wireless Mechanical Keyboard", price: 159, category: "Electronics", seller: "KeyForge", sellerRating: 4.8, sellerVerified: true, rating: 4.8, reviews: 876, image: "⌨️", description: "Hot-swap switches, 3-mode connectivity, RGB per-key, aluminum chassis.", stock: 34, sales: 1893, tags: ["trending"] },
  { id: 9, name: "Premium Yoga Mat + Strap Set", price: 78, category: "Sports", seller: "ZenFlow", sellerRating: 4.7, sellerVerified: false, rating: 4.7, reviews: 432, image: "🧘", description: "Natural rubber 6mm mat, alignment lines, carrying strap. Non-toxic, non-slip.", stock: 67, sales: 4201, tags: ["eco"] },
];

const SELLERS = [
  { id: 1, name: "TechVault", avatar: "🔮", rating: 4.9, sales: 12403, verified: true, country: "Singapore", joined: "2022", products: 234 },
  { id: 2, name: "ArtisanLeather", avatar: "🌿", rating: 4.7, sales: 3892, verified: true, country: "Italy", joined: "2021", products: 67 },
  { id: 3, name: "VeloTech", avatar: "⚡", rating: 4.95, sales: 891, verified: true, country: "Germany", joined: "2023", products: 45 },
  { id: 4, name: "ComfortWork", avatar: "🏔️", rating: 4.8, sales: 8234, verified: true, country: "Japan", joined: "2020", products: 156 },
];

const ADMIN_STATS = {
  totalUsers: 142863,
  totalSellers: 8924,
  totalTransactions: 289401,
  totalRevenue: 4720891,
  platformFees: 236044,
  activeOrders: 3847,
  pendingDisputes: 23,
  flaggedListings: 7,
};

const ORDERS = [
  { id: "ORD-001", product: "Quantum Headphones", buyer: "cosmos1abc...def", seller: "TechVault", amount: 189, status: "in_escrow", date: "2024-01-15" },
  { id: "ORD-002", product: "Leather Bag", buyer: "cosmos1xyz...123", seller: "ArtisanLeather", amount: 245, status: "completed", date: "2024-01-14" },
  { id: "ORD-003", product: "Carbon Bike", buyer: "cosmos1qwe...789", seller: "VeloTech", amount: 1899, status: "disputed", date: "2024-01-13" },
  { id: "ORD-004", product: "Vintage Watch", buyer: "cosmos1rty...456", seller: "TimePiece", amount: 3200, status: "pending", date: "2024-01-12" },
];

const TRANSACTIONS = [
  { hash: "cosmos1A3B5...F9", type: "Escrow Lock", amount: 189, status: "confirmed", time: "2 min ago" },
  { hash: "cosmos2B4C6...A1", type: "Seller Payout", amount: 240.1, status: "confirmed", time: "8 min ago" },
  { hash: "cosmos3C5D7...B2", type: "Buyer Refund", amount: 78, status: "pending", time: "15 min ago" },
  { hash: "cosmos4D6E8...C3", type: "Escrow Lock", amount: 1899, status: "confirmed", time: "23 min ago" },
];

// ============================================================
// COMPONENTS
// ============================================================

const StarRating = ({ rating, size = 14 }) => (
  <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
    {[1,2,3,4,5].map(i => (
      <svg key={i} width={size} height={size} viewBox="0 0 24 24"
        fill={i <= Math.floor(rating) ? "var(--amber)" : "none"}
        stroke="var(--amber)" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
    <span style={{ fontSize: 12, color: "var(--slate-400)", marginLeft: 4 }}>{rating}</span>
  </div>
);

const Badge = ({ text, color = "indigo" }) => (
  <span className={`tag tag-${color}`}>{text}</span>
);

const WalletAddress = ({ address = "cosmos1abc...def9" }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6,
    background: "var(--navy-600)", padding: "4px 10px", borderRadius: "var(--radius-sm)",
    fontSize: 12, color: "var(--slate-300)", fontFamily: "monospace" }}>
    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)" }}/>
    {address}
  </div>
);

const EscrowBadge = ({ status }) => {
  const config = {
    in_escrow: { label: "🔒 In Escrow", color: "indigo" },
    completed: { label: "✅ Released", color: "teal" },
    disputed: { label: "⚠️ Disputed", color: "amber" },
    pending: { label: "⏳ Pending", color: "rose" },
    refunded: { label: "↩️ Refunded", color: "rose" },
  };
  const c = config[status] || config.pending;
  return <Badge text={c.label} color={c.color} />;
};

const Navbar = ({ page, setPage, cartCount, walletConnected, setWalletConnected, notifCount }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "marketplace", label: "Marketplace" },
    { id: "seller", label: "Sell" },
    { id: "admin", label: "Admin" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(10,15,30,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid var(--glass-border)" : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
          onClick={() => setPage("home")}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, var(--indigo), var(--teal))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "white"
          }}>L</div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20,
            background: "linear-gradient(90deg, #fff, var(--slate-300))", WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent" }}>Leubok</span>
          <span className="tag tag-teal" style={{ fontSize: 9 }}>Web3</span>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setPage(item.id)}
              style={{
                padding: "8px 16px", borderRadius: "var(--radius-sm)", border: "none",
                background: page === item.id ? "rgba(79,70,229,0.15)" : "transparent",
                color: page === item.id ? "var(--indigo-300)" : "var(--slate-400)",
                fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500,
                cursor: "pointer", transition: "all var(--transition)",
              }}>
              {item.label}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Notifications */}
          <div style={{ position: "relative", cursor: "pointer" }}>
            <div style={{ width: 36, height: 36, borderRadius: "var(--radius-sm)",
              background: "var(--glass)", border: "1px solid var(--glass-border)",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="bell" size={16} color="var(--slate-400)" />
            </div>
            {notifCount > 0 && (
              <div style={{ position: "absolute", top: -4, right: -4, width: 18, height: 18,
                borderRadius: "50%", background: "var(--rose)", fontSize: 10, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                {notifCount}
              </div>
            )}
          </div>

          {/* Cart */}
          <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setPage("checkout")}>
            <div style={{ width: 36, height: 36, borderRadius: "var(--radius-sm)",
              background: "var(--glass)", border: "1px solid var(--glass-border)",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="cart" size={16} color="var(--slate-400)" />
            </div>
            {cartCount > 0 && (
              <div style={{ position: "absolute", top: -4, right: -4, width: 18, height: 18,
                borderRadius: "50%", background: "var(--indigo)", fontSize: 10, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                {cartCount}
              </div>
            )}
          </div>

          {/* Wallet Button */}
          {walletConnected ? (
            <WalletAddress />
          ) : (
            <button className="btn-primary" onClick={() => setWalletConnected(true)}
              style={{ padding: "8px 16px", fontSize: 13 }}>
              <Icon name="wallet" size={14} />
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const ProductCard = ({ product, onClick, onAddToCart }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--navy-800)", border: `1px solid ${hovered ? "rgba(79,70,229,0.4)" : "var(--glass-border)"}`,
        borderRadius: "var(--radius-lg)", overflow: "hidden", cursor: "pointer",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 12px 40px rgba(79,70,229,0.15)" : "none",
      }}>
      {/* Image */}
      <div style={{ position: "relative", height: 180,
        background: `linear-gradient(135deg, var(--navy-700), var(--navy-600))`,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}
        onClick={onClick}>
        {product.image}
        {product.tags?.includes("trending") && (
          <div style={{ position: "absolute", top: 12, left: 12 }}>
            <Badge text="🔥 Trending" color="rose" />
          </div>
        )}
        {product.tags?.includes("verified") && (
          <div style={{ position: "absolute", top: 12, right: 12 }}>
            <Badge text="✓ Verified" color="teal" />
          </div>
        )}
        {product.stock <= 5 && (
          <div style={{ position: "absolute", bottom: 12, right: 12 }}>
            <Badge text={`Only ${product.stock} left`} color="amber" />
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "16px" }} onClick={onClick}>
        <div style={{ fontSize: 12, color: "var(--slate-500)", marginBottom: 6,
          textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {product.category}
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600,
          color: "var(--white)", marginBottom: 8, lineHeight: 1.4,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {product.name}
        </h3>
        <StarRating rating={product.rating} />
        <div style={{ fontSize: 11, color: "var(--slate-500)", marginTop: 4 }}>
          {product.reviews.toLocaleString()} reviews • {product.sales.toLocaleString()} sold
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
          <span style={{ fontSize: 11, color: "var(--slate-500)" }}>by</span>
          <span style={{ fontSize: 12, color: "var(--indigo-300)", fontWeight: 500 }}>
            {product.seller}
          </span>
          {product.sellerVerified && (
            <Icon name="shield" size={12} color="var(--teal)" />
          )}
        </div>
      </div>

      {/* Price + Add to Cart */}
      <div style={{ padding: "0 16px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--white)" }}>
            {product.price} <span style={{ fontSize: 13, color: "var(--teal)", fontWeight: 600 }}>USDC</span>
          </div>
        </div>
        <button className="btn-primary" style={{ padding: "8px 14px", fontSize: 12 }}
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}>
          <Icon name="plus" size={14} />
          Add
        </button>
      </div>
    </div>
  );
};

const SellerCard = ({ seller }) => (
  <div className="glass-card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12,
    transition: "all var(--transition)", cursor: "pointer" }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(79,70,229,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--glass-border)"; e.currentTarget.style.transform = "none"; }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 52, height: 52, borderRadius: 14,
        background: "linear-gradient(135deg, var(--navy-600), var(--navy-700))",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>
        {seller.avatar}
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15 }}>{seller.name}</span>
          {seller.verified && <Icon name="shield" size={14} color="var(--teal)" />}
        </div>
        <div style={{ fontSize: 12, color: "var(--slate-500)" }}>{seller.country} • Joined {seller.joined}</div>
      </div>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--white)" }}>{seller.rating}</div>
        <div style={{ fontSize: 11, color: "var(--slate-500)" }}>Rating</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--white)" }}>{seller.sales.toLocaleString()}</div>
        <div style={{ fontSize: 11, color: "var(--slate-500)" }}>Sales</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--white)" }}>{seller.products}</div>
        <div style={{ fontSize: 11, color: "var(--slate-500)" }}>Products</div>
      </div>
    </div>
  </div>
);

const StatCard = ({ icon, label, value, delta, color = "indigo" }) => {
  const colorMap = { indigo: "var(--indigo)", teal: "var(--teal)", amber: "var(--amber)", rose: "var(--rose)" };
  return (
    <div className="glass-card" style={{ padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10,
          background: `rgba(${color === "indigo" ? "79,70,229" : color === "teal" ? "38,161,123" : color === "amber" ? "245,158,11" : "244,63,94"},0.15)`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={icon} size={18} color={colorMap[color]} />
        </div>
        {delta && (
          <span style={{ fontSize: 12, color: delta > 0 ? "var(--teal)" : "var(--rose)", fontWeight: 600 }}>
            {delta > 0 ? "↑" : "↓"} {Math.abs(delta)}%
          </span>
        )}
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, marginBottom: 4 }}>
        {value}
      </div>
      <div style={{ fontSize: 13, color: "var(--slate-500)" }}>{label}</div>
    </div>
  );
};

// ============================================================
// PAGES
// ============================================================

// --- HOME PAGE ---
const HomePage = ({ setPage, onAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);

  const filteredProducts = PRODUCTS.filter(p =>
    (!searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!activeCategory || p.category === activeCategory)
  );

  return (
    <div>
      {/* Hero */}
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", textAlign: "center", padding: "120px 24px 80px",
        background: `
          radial-gradient(ellipse 80% 60% at 50% -10%, rgba(79,70,229,0.25) 0%, transparent 70%),
          radial-gradient(ellipse 60% 40% at 80% 80%, rgba(38,161,123,0.15) 0%, transparent 60%),
          var(--navy)
        `,
        position: "relative", overflow: "hidden",
      }}>
        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: Math.random() * 4 + 2, height: Math.random() * 4 + 2,
            borderRadius: "50%", background: i % 2 === 0 ? "var(--indigo)" : "var(--teal)",
            opacity: 0.4,
            left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 20}%`,
            animation: `float ${3 + i}s ease-in-out ${i * 0.5}s infinite`,
          }} />
        ))}

        {/* Live transaction ticker */}
        <div className="glass-card animate-slide-up" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          padding: "8px 16px", marginBottom: 32, fontSize: 13,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--teal)",
            boxShadow: "0 0 10px var(--teal)", animation: "pulse-glow 2s infinite" }} />
          <span style={{ color: "var(--slate-400)" }}>Live:</span>
          <span style={{ color: "var(--teal-400)", fontWeight: 500 }}>
            189 USDC locked in escrow
          </span>
          <span style={{ color: "var(--slate-500)" }}>• 2 min ago</span>
        </div>

        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(36px, 6vw, 72px)",
          fontWeight: 700, lineHeight: 1.1, marginBottom: 20, maxWidth: 800,
          background: "linear-gradient(135deg, #fff 30%, var(--slate-300) 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Global Commerce,<br />
          <span style={{
            background: "linear-gradient(90deg, var(--indigo-400), var(--teal))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>On-Chain.</span>
        </h1>

        <p style={{ fontSize: 18, color: "var(--slate-400)", maxWidth: 520, lineHeight: 1.7, marginBottom: 40 }}>
          Buy and sell physical goods using USDC. Every payment protected by smart contract escrow — no middlemen, no trust required.
        </p>

        {/* Search Bar */}
        <div style={{ width: "100%", maxWidth: 600, position: "relative", marginBottom: 48 }}>
          <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", zIndex: 1 }}>
            <Icon name="search" size={18} color="var(--slate-500)" />
          </div>
          <input
            className="input-field"
            style={{ paddingLeft: 48, paddingRight: 130, height: 56, fontSize: 16,
              borderRadius: 28, background: "var(--navy-800)",
              border: "1px solid var(--glass-border)" }}
            placeholder="Search products, sellers, categories..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button className="btn-primary"
            style={{ position: "absolute", right: 6, top: 6, height: 44, borderRadius: 22 }}
            onClick={() => setPage("marketplace")}>
            Search
          </button>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn-primary" style={{ padding: "14px 28px", fontSize: 15 }}
            onClick={() => setPage("marketplace")}>
            <Icon name="grid" size={18} />
            Explore Marketplace
          </button>
          <button className="btn-secondary" style={{ padding: "14px 28px", fontSize: 15 }}
            onClick={() => setPage("seller")}>
            <Icon name="trending" size={18} />
            Start Selling
          </button>
        </div>

        {/* Stats bar */}
        <div style={{ display: "flex", gap: 40, marginTop: 60, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { v: "142K+", l: "Active Users" },
            { v: "$4.7M", l: "Volume Traded" },
            { v: "8.9K", l: "Verified Sellers" },
            { v: "100%", l: "Escrow Protected" },
          ].map(s => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700,
                color: "var(--indigo-300)" }}>{s.v}</div>
              <div style={{ fontSize: 12, color: "var(--slate-500)", marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 24px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700 }}>
            Shop by Category
          </h2>
          <button className="btn-secondary" style={{ fontSize: 13, padding: "8px 16px" }}
            onClick={() => setPage("marketplace")}>
            View All <Icon name="arrow_right" size={14} />
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
          {CATEGORIES.map(cat => (
            <div key={cat.id}
              onClick={() => { setActiveCategory(activeCategory === cat.name ? null : cat.name); }}
              style={{
                background: activeCategory === cat.name ? "rgba(79,70,229,0.15)" : "var(--navy-800)",
                border: `1px solid ${activeCategory === cat.name ? "var(--indigo)" : "var(--glass-border)"}`,
                borderRadius: "var(--radius-md)", padding: "20px 16px", cursor: "pointer",
                transition: "all var(--transition)", textAlign: "center",
              }}
              onMouseEnter={e => { if (activeCategory !== cat.name) e.currentTarget.style.borderColor = "rgba(79,70,229,0.3)"; }}
              onMouseLeave={e => { if (activeCategory !== cat.name) e.currentTarget.style.borderColor = "var(--glass-border)"; }}>
              <div style={{ marginBottom: 10 }}>
                <Icon name={cat.icon} size={24} color={activeCategory === cat.name ? "var(--indigo-300)" : "var(--slate-400)"} />
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13, marginBottom: 4,
                color: activeCategory === cat.name ? "var(--indigo-300)" : "var(--white)" }}>
                {cat.name}
              </div>
              <div style={{ fontSize: 11, color: "var(--slate-500)" }}>
                {cat.count.toLocaleString()} items
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Products */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700 }}>
            {activeCategory ? `${activeCategory}` : "🔥 Trending Now"}
          </h2>
          <button className="btn-secondary" style={{ fontSize: 13, padding: "8px 16px" }}
            onClick={() => setPage("marketplace")}>
            All Products <Icon name="arrow_right" size={14} />
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {filteredProducts.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product}
              onClick={() => {}} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>

      {/* Trusted Sellers */}
      <div style={{ background: "var(--navy-800)", padding: "60px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
              Trusted Sellers
            </h2>
            <p style={{ color: "var(--slate-500)", fontSize: 15 }}>
              Verified merchants with on-chain reputation and escrow history
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {SELLERS.map(seller => <SellerCard key={seller.id} seller={seller} />)}
          </div>
        </div>
      </div>

      {/* Escrow CTA */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(79,70,229,0.15), rgba(38,161,123,0.1))",
          border: "1px solid rgba(79,70,229,0.25)",
          borderRadius: "var(--radius-xl)", padding: "48px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 32,
        }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <Icon name="shield" size={24} color="var(--teal)" />
              <span className="tag tag-teal">CosmWasm Smart Contract</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, marginBottom: 12, lineHeight: 1.2 }}>
              Every transaction is<br />escrow-protected.
            </h2>
            <p style={{ color: "var(--slate-400)", lineHeight: 1.7, maxWidth: 420 }}>
              Your USDC is locked in an audited CosmWasm smart contract until you confirm delivery. No trust required — the contract enforces it.
            </p>
          </div>
          <div style={{ flex: 1, minWidth: 280 }}>
            {/* Live Escrow Visualization */}
            <div className="glass-card" style={{ padding: 24 }}>
              <div style={{ fontSize: 13, color: "var(--slate-500)", marginBottom: 16, fontWeight: 500 }}>
                Live Transactions
              </div>
              {TRANSACTIONS.map((tx, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 0", borderBottom: i < TRANSACTIONS.length - 1 ? "1px solid var(--glass-border)" : "none" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{tx.type}</div>
                    <div style={{ fontSize: 11, color: "var(--slate-500)", fontFamily: "monospace" }}>{tx.hash}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--teal)" }}>{tx.amount} USDC</div>
                    <div style={{ fontSize: 11, color: "var(--slate-500)" }}>{tx.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: "var(--navy-800)", borderTop: "1px solid var(--glass-border)", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex",
          justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8,
              background: "linear-gradient(135deg, var(--indigo), var(--teal))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "white" }}>L</div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Leubok</span>
            <span style={{ color: "var(--slate-500)", fontSize: 13 }}>— Web3 Global Commerce</span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Docs", "GitHub", "Discord", "Terms"].map(l => (
              <span key={l} style={{ fontSize: 13, color: "var(--slate-500)", cursor: "pointer",
                transition: "color var(--transition)" }}
                onMouseEnter={e => e.target.style.color = "var(--white)"}
                onMouseLeave={e => e.target.style.color = "var(--slate-500)"}>
                {l}
              </span>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "var(--slate-600)" }}>
            Built on Cosmos · Powered by CosmWasm
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- MARKETPLACE PAGE ---
const MarketplacePage = ({ onAddToCart }) => {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [sortBy, setSortBy] = useState("trending");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  const allCats = ["All", ...CATEGORIES.map(c => c.name)];
  const filtered = PRODUCTS.filter(p =>
    (selectedCat === "All" || p.category === selectedCat) &&
    (!search || p.name.toLowerCase().includes(search.toLowerCase())) &&
    p.price >= priceRange[0] && p.price <= priceRange[1]
  ).sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return b.sales - a.sales;
  });

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 24px 60px" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
          Marketplace
        </h1>
        <p style={{ color: "var(--slate-500)" }}>
          {PRODUCTS.length.toLocaleString()}+ products • All payments via USDC escrow
        </p>
      </div>

      {/* Search + Controls */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 240, position: "relative" }}>
          <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}>
            <Icon name="search" size={16} color="var(--slate-500)" />
          </div>
          <input className="input-field" style={{ paddingLeft: 42 }}
            placeholder="Search products..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input-field" style={{ width: "auto", paddingRight: 12, cursor: "pointer" }}
          value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="trending">🔥 Trending</option>
          <option value="rating">⭐ Top Rated</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
        <button className={`btn-secondary`} style={{ padding: "10px 16px", fontSize: 13,
          background: showFilters ? "rgba(79,70,229,0.15)" : "transparent" }}
          onClick={() => setShowFilters(!showFilters)}>
          <Icon name="filter" size={15} />
          Filters
        </button>
        <div style={{ display: "flex", gap: 4, background: "var(--navy-800)",
          border: "1px solid var(--glass-border)", borderRadius: "var(--radius-md)", padding: 4 }}>
          {["grid", "list"].map(v => (
            <button key={v} onClick={() => setViewMode(v)}
              style={{ width: 36, height: 36, borderRadius: "var(--radius-sm)",
                background: viewMode === v ? "var(--indigo)" : "transparent",
                border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                color: viewMode === v ? "white" : "var(--slate-500)", transition: "all var(--transition)" }}>
              <Icon name={v} size={15} />
            </button>
          ))}
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, overflowX: "auto" }} className="scrollbar-hide">
        {allCats.map(cat => (
          <button key={cat} onClick={() => setSelectedCat(cat)}
            style={{
              padding: "8px 16px", borderRadius: 20, border: "1px solid",
              borderColor: selectedCat === cat ? "var(--indigo)" : "var(--glass-border)",
              background: selectedCat === cat ? "rgba(79,70,229,0.15)" : "transparent",
              color: selectedCat === cat ? "var(--indigo-300)" : "var(--slate-400)",
              fontSize: 13, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap",
              transition: "all var(--transition)",
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="glass-card" style={{ padding: 24, marginBottom: 24, display: "flex", gap: 32, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 13, color: "var(--slate-400)", marginBottom: 12, fontWeight: 500 }}>
              Price Range (USDC)
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <input type="number" className="input-field" style={{ width: 100 }}
                value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])} />
              <span style={{ color: "var(--slate-500)" }}>—</span>
              <input type="number" className="input-field" style={{ width: 100 }}
                value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, color: "var(--slate-400)", marginBottom: 12, fontWeight: 500 }}>
              Seller Type
            </div>
            {["Verified Only", "All Sellers"].map(opt => (
              <label key={opt} style={{ display: "flex", alignItems: "center", gap: 8,
                marginBottom: 8, cursor: "pointer", fontSize: 13, color: "var(--slate-300)" }}>
                <input type="radio" name="seller_type" defaultChecked={opt === "All Sellers"} />
                {opt}
              </label>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 13, color: "var(--slate-400)", marginBottom: 12, fontWeight: 500 }}>
              Minimum Rating
            </div>
            {[4.5, 4.0, 3.5, "Any"].map(r => (
              <label key={r} style={{ display: "flex", alignItems: "center", gap: 8,
                marginBottom: 8, cursor: "pointer", fontSize: 13, color: "var(--slate-300)" }}>
                <input type="radio" name="min_rating" defaultChecked={r === "Any"} />
                {r === "Any" ? "Any Rating" : `${r}+ Stars`}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      <div style={{ marginBottom: 16, fontSize: 13, color: "var(--slate-500)" }}>
        {filtered.length} products found
        {selectedCat !== "All" && <span> in <strong style={{ color: "var(--indigo-300)" }}>{selectedCat}</strong></span>}
      </div>

      {viewMode === "grid" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product}
              onClick={() => {}} onAddToCart={onAddToCart} />
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map(product => (
            <div key={product.id} className="glass-card" style={{ padding: 20, display: "flex", gap: 20, alignItems: "center" }}>
              <div style={{ width: 64, height: 64, background: "var(--navy-700)",
                borderRadius: "var(--radius-md)", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 32, flexShrink: 0 }}>
                {product.image}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: 4 }}>
                  {product.name}
                </div>
                <StarRating rating={product.rating} />
                <div style={{ fontSize: 12, color: "var(--slate-500)", marginTop: 4 }}>
                  by {product.seller} {product.sellerVerified && "✓"} · {product.reviews} reviews
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--font-display)" }}>
                  {product.price} <span style={{ fontSize: 13, color: "var(--teal)" }}>USDC</span>
                </div>
                <button className="btn-primary" style={{ marginTop: 8, padding: "8px 16px", fontSize: 12 }}
                  onClick={() => onAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- CHECKOUT PAGE ---
const CheckoutPage = ({ cart, setCart }) => {
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const fee = total * 0.025;
  const finalTotal = total + fee;

  const handleCheckout = () => {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setSuccess(true); setCart([]); }, 3000);
  };

  if (success) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, flexDirection: "column", textAlign: "center", gap: 24 }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%",
        background: "rgba(38,161,123,0.15)", border: "2px solid var(--teal)",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>
        ✅
      </div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700 }}>
        Payment Locked in Escrow
      </h2>
      <p style={{ color: "var(--slate-400)", maxWidth: 400, lineHeight: 1.7 }}>
        Your USDC has been securely locked in the smart contract. The seller will be notified to ship your order. Funds release automatically upon delivery confirmation.
      </p>
      <div className="glass-card" style={{ padding: 20, maxWidth: 400, width: "100%", textAlign: "left" }}>
        <div style={{ fontSize: 12, color: "var(--slate-500)", marginBottom: 12 }}>Transaction Details</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: "var(--slate-400)", fontSize: 13 }}>Tx Hash</span>
          <span style={{ fontFamily: "monospace", fontSize: 12, color: "var(--indigo-300)" }}>cosmos1A3B5...F9E2</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: "var(--slate-400)", fontSize: 13 }}>Status</span>
          <Badge text="🔒 Escrow Active" color="teal" />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "var(--slate-400)", fontSize: 13 }}>Est. Delivery</span>
          <span style={{ fontSize: 13, color: "var(--white)" }}>5–10 business days</span>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "100px 24px 60px" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, marginBottom: 32 }}>
        Checkout
      </h1>

      {/* Step indicator */}
      <div style={{ display: "flex", gap: 0, marginBottom: 40 }}>
        {["Cart Review", "Shipping", "Payment"].map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%",
                background: step > i + 1 ? "var(--teal)" : step === i + 1 ? "var(--indigo)" : "var(--navy-600)",
                border: `2px solid ${step >= i + 1 ? "transparent" : "var(--glass-border)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, color: "white" }}>
                {step > i + 1 ? <Icon name="check" size={14} /> : i + 1}
              </div>
              <span style={{ fontSize: 13, color: step === i + 1 ? "var(--white)" : "var(--slate-500)", fontWeight: step === i + 1 ? 600 : 400 }}>
                {s}
              </span>
            </div>
            {i < 2 && <div style={{ flex: 1, height: 1, background: step > i + 1 ? "var(--teal)" : "var(--glass-border)", margin: "0 12px" }} />}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>
        {/* Main */}
        <div>
          {step === 1 && (
            <div className="glass-card" style={{ padding: 24 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 20 }}>Your Cart</h3>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: 40, color: "var(--slate-500)" }}>
                  Your cart is empty
                </div>
              ) : (
                cart.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "16px 0", borderBottom: i < cart.length - 1 ? "1px solid var(--glass-border)" : "none" }}>
                    <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                      <div style={{ width: 56, height: 56, background: "var(--navy-700)",
                        borderRadius: "var(--radius-md)", display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: 28 }}>{item.image}</div>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}>{item.name}</div>
                        <div style={{ fontSize: 12, color: "var(--slate-500)" }}>by {item.seller}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8,
                        background: "var(--navy-700)", borderRadius: "var(--radius-sm)", padding: "4px 8px" }}>
                        <button onClick={() => setCart(c => c.map((it, j) => j === i ? {...it, qty: Math.max(1, it.qty - 1)} : it))}
                          style={{ background: "none", border: "none", color: "var(--slate-400)", cursor: "pointer" }}>-</button>
                        <span style={{ fontSize: 14, fontWeight: 600, minWidth: 16, textAlign: "center" }}>{item.qty}</span>
                        <button onClick={() => setCart(c => c.map((it, j) => j === i ? {...it, qty: it.qty + 1} : it))}
                          style={{ background: "none", border: "none", color: "var(--slate-400)", cursor: "pointer" }}>+</button>
                      </div>
                      <div style={{ fontWeight: 700, fontFamily: "var(--font-display)", minWidth: 80, textAlign: "right" }}>
                        {(item.price * item.qty).toFixed(2)} <span style={{ fontSize: 11, color: "var(--teal)" }}>USDC</span>
                      </div>
                      <button onClick={() => setCart(c => c.filter((_, j) => j !== i))}
                        style={{ background: "none", border: "none", color: "var(--rose)", cursor: "pointer" }}>
                        <Icon name="trash" size={15} />
                      </button>
                    </div>
                  </div>
                ))
              )}
              {cart.length > 0 && (
                <button className="btn-primary" style={{ marginTop: 24, width: "100%", justifyContent: "center" }}
                  onClick={() => setStep(2)}>
                  Continue to Shipping <Icon name="arrow_right" size={16} />
                </button>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="glass-card" style={{ padding: 24 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 20 }}>Shipping Details</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {["Full Name", "Email", "Phone", "Country", "Address", "City", "State", "Postal Code"].map(f => (
                  <div key={f} style={{ gridColumn: ["Address", "Email"].includes(f) ? "1/-1" : "auto" }}>
                    <label style={{ fontSize: 12, color: "var(--slate-500)", display: "block", marginBottom: 6 }}>{f}</label>
                    <input className="input-field" placeholder={f} />
                  </div>
                ))}
              </div>
              <button className="btn-primary" style={{ marginTop: 24, width: "100%", justifyContent: "center" }}
                onClick={() => setStep(3)}>
                Continue to Payment <Icon name="arrow_right" size={16} />
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="glass-card" style={{ padding: 24 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 8 }}>
                On-Chain Payment
              </h3>
              <p style={{ fontSize: 13, color: "var(--slate-500)", marginBottom: 24 }}>
                Your USDC will be locked in a CosmWasm escrow contract. Funds are only released when you confirm delivery.
              </p>

              <div style={{ background: "rgba(38,161,123,0.08)", border: "1px solid rgba(38,161,123,0.25)",
                borderRadius: "var(--radius-md)", padding: 20, marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <Icon name="shield" size={18} color="var(--teal)" />
                  <span style={{ fontWeight: 600, color: "var(--teal)" }}>Escrow Protection Active</span>
                </div>
                {[
                  "Your USDC is locked, not sent to seller",
                  "Seller receives payment only after delivery confirmed",
                  "Full refund if item doesn't arrive or match description",
                  "Dispute resolution within 72 hours",
                ].map(item => (
                  <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start",
                    marginBottom: 6, fontSize: 13, color: "var(--slate-400)" }}>
                    <Icon name="check" size={13} color="var(--teal)" />
                    {item}
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: "var(--slate-500)", marginBottom: 8 }}>Payment Wallet</div>
                <WalletAddress address="cosmos1abc...def9 (Connected)" />
              </div>

              <button className="btn-teal" style={{ width: "100%", justifyContent: "center", padding: "14px" }}
                onClick={handleCheckout} disabled={processing}>
                {processing ? (
                  <>
                    <div style={{ width: 16, height: 16, borderRadius: "50%",
                      border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white",
                      animation: "spin 0.8s linear infinite" }} />
                    Signing transaction...
                  </>
                ) : (
                  <>
                    <Icon name="lock" size={16} />
                    Lock {finalTotal.toFixed(2)} USDC in Escrow
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, marginBottom: 20 }}>Order Summary</h3>
          {cart.map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between",
              marginBottom: 12, fontSize: 13 }}>
              <span style={{ color: "var(--slate-400)", flex: 1 }}>{item.name} ×{item.qty}</span>
              <span style={{ fontWeight: 500 }}>{(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--glass-border)", marginTop: 16, paddingTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
              <span style={{ color: "var(--slate-400)" }}>Subtotal</span>
              <span>{total.toFixed(2)} USDC</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
              <span style={{ color: "var(--slate-400)" }}>Platform fee (2.5%)</span>
              <span>{fee.toFixed(2)} USDC</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16,
              paddingTop: 16, borderTop: "1px solid var(--glass-border)" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Total</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--teal)" }}>
                {finalTotal.toFixed(2)} USDC
              </span>
            </div>
          </div>
          <div style={{ marginTop: 16, padding: 12, background: "rgba(38,161,123,0.06)",
            borderRadius: "var(--radius-sm)", fontSize: 12, color: "var(--slate-500)" }}>
            <Icon name="lock" size={12} color="var(--teal)" /> Protected by CosmWasm escrow
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SELLER DASHBOARD ---
const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const tabs = ["overview", "products", "orders", "analytics", "ai-tools"];

  const salesData = [
    { month: "Aug", value: 4200 },
    { month: "Sep", value: 5800 },
    { month: "Oct", value: 4900 },
    { month: "Nov", value: 7200 },
    { month: "Dec", value: 9100 },
    { month: "Jan", value: 6800 },
  ];
  const maxVal = Math.max(...salesData.map(d => d.value));

  const handleAI = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setAiResponse("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: "You are an AI commerce assistant for Leubok, a Web3 marketplace. Help sellers write compelling product descriptions, marketing copy, and sales strategies. Be concise, specific, and persuasive. Format your response well.",
          messages: [{ role: "user", content: aiPrompt }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(c => c.text || "").join("") || "Sorry, I couldn't generate a response.";
      setAiResponse(text);
    } catch (err) {
      setAiResponse("⚠️ AI service unavailable. Please try again.");
    }
    setAiLoading(false);
  };

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 24px 60px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12,
              background: "linear-gradient(135deg, var(--navy-600), var(--navy-700))",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🔮</div>
            <div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700 }}>TechVault</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <WalletAddress address="cosmos1abc...def9" />
                <Badge text="✓ Verified Seller" color="teal" />
              </div>
            </div>
          </div>
        </div>
        <button className="btn-primary">
          <Icon name="plus" size={16} />
          Add Product
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 32, borderBottom: "1px solid var(--glass-border)",
        paddingBottom: 0, overflowX: "auto" }} className="scrollbar-hide">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 20px", border: "none", background: "transparent",
              color: activeTab === tab ? "var(--white)" : "var(--slate-500)",
              fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500,
              cursor: "pointer", borderBottom: `2px solid ${activeTab === tab ? "var(--indigo)" : "transparent"}`,
              marginBottom: -1, transition: "all var(--transition)", whiteSpace: "nowrap",
              textTransform: "capitalize",
            }}>
            {tab.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
            <StatCard icon="dollar" label="Total Revenue" value="$12,403 USDC" delta={18} color="teal" />
            <StatCard icon="package" label="Products Listed" value="234" delta={5} color="indigo" />
            <StatCard icon="trending" label="Total Sales" value="1,203" delta={12} color="indigo" />
            <StatCard icon="star" label="Avg Rating" value="4.9 / 5.0" delta={2} color="amber" />
          </div>

          {/* Sales Chart */}
          <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600 }}>Revenue (6 months)</h3>
              <Badge text="USDC" color="teal" />
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 160 }}>
              {salesData.map((d, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ fontSize: 11, color: "var(--slate-500)" }}>{d.value.toLocaleString()}</div>
                  <div style={{
                    width: "100%", height: `${(d.value / maxVal) * 120}px`,
                    background: i === salesData.length - 1
                      ? "linear-gradient(180deg, var(--indigo), var(--indigo-400))"
                      : "var(--navy-600)",
                    borderRadius: "4px 4px 0 0",
                    transition: "all 0.3s ease",
                  }}
                    onMouseEnter={e => { if (i !== salesData.length - 1) e.target.style.background = "var(--navy-500)"; }}
                    onMouseLeave={e => { if (i !== salesData.length - 1) e.target.style.background = "var(--navy-600)"; }}
                  />
                  <div style={{ fontSize: 11, color: "var(--slate-500)" }}>{d.month}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="glass-card" style={{ padding: 24 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
              Recent Orders
            </h3>
            {ORDERS.map(order => (
              <div key={order.id} style={{ display: "flex", justifyContent: "space-between",
                alignItems: "center", padding: "14px 0",
                borderBottom: "1px solid var(--glass-border)" }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}>{order.product}</div>
                  <div style={{ fontSize: 12, color: "var(--slate-500)", fontFamily: "monospace" }}>
                    {order.id} · {order.buyer}
                  </div>
                </div>
                <div style={{ display: "flex", align: "center", gap: 16, alignItems: "center" }}>
                  <EscrowBadge status={order.status} />
                  <div style={{ fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--teal)" }}>
                    {order.amount} USDC
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === "products" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
            {PRODUCTS.slice(0, 6).map(product => (
              <div key={product.id} className="glass-card" style={{ overflow: "hidden" }}>
                <div style={{ height: 120, background: "var(--navy-700)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>
                  {product.image}
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8,
                    fontFamily: "var(--font-display)", lineHeight: 1.4 }}>
                    {product.name}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: "var(--teal)" }}>
                      {product.price} USDC
                    </span>
                    <span style={{ fontSize: 12, color: "var(--slate-500)" }}>
                      Stock: {product.stock}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn-secondary" style={{ flex: 1, justifyContent: "center", padding: "8px" }}>
                      <Icon name="edit" size={13} /> Edit
                    </button>
                    <button className="btn-secondary" style={{ flex: 1, justifyContent: "center", padding: "8px" }}>
                      <Icon name="eye" size={13} /> View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Tools Tab */}
      {activeTab === "ai-tools" && (
        <div>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
              AI Commerce Assistant
            </h2>
            <p style={{ color: "var(--slate-500)", fontSize: 14 }}>
              Powered by Claude · Generate product descriptions, marketing copy, pricing strategies, and more.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 24 }}>
            {[
              { icon: "sparkles", title: "Write Product Description", prompt: "Write a compelling product description for wireless noise-canceling headphones with 40hr battery. Target premium buyers." },
              { icon: "trending", title: "Pricing Strategy", prompt: "What's the optimal pricing strategy for a new mechanical keyboard brand entering a competitive market?" },
              { icon: "message", title: "Marketing Copy", prompt: "Write 3 social media captions for promoting a limited edition leather bag collection on a Web3 marketplace." },
              { icon: "robot", title: "Customer Response", prompt: "Write a professional response to a customer asking about shipping times and escrow protection on my products." },
            ].map(tool => (
              <button key={tool.title}
                onClick={() => { setAiPrompt(tool.prompt); }}
                className="glass-card"
                style={{ padding: 16, cursor: "pointer", textAlign: "left", border: "1px solid var(--glass-border)",
                  transition: "all var(--transition)", background: "var(--glass)" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(79,70,229,0.4)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--glass-border)"}>
                <Icon name={tool.icon} size={20} color="var(--indigo-300)" />
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13, marginTop: 10 }}>
                  {tool.title}
                </div>
              </button>
            ))}
          </div>

          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, color: "var(--slate-400)", display: "block", marginBottom: 8 }}>
                Your prompt
              </label>
              <textarea
                className="input-field"
                style={{ minHeight: 100, resize: "vertical", fontFamily: "var(--font-body)" }}
                placeholder="Describe what you need — product description, marketing copy, pricing advice..."
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value)}
              />
            </div>
            <button className="btn-primary" onClick={handleAI} disabled={aiLoading || !aiPrompt.trim()}>
              {aiLoading ? (
                <>
                  <div style={{ width: 14, height: 14, borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white",
                    animation: "spin 0.8s linear infinite" }} />
                  Generating...
                </>
              ) : (
                <><Icon name="sparkles" size={15} /> Generate with AI</>
              )}
            </button>

            {aiResponse && (
              <div style={{ marginTop: 24, padding: 20, background: "rgba(79,70,229,0.05)",
                border: "1px solid rgba(79,70,229,0.2)", borderRadius: "var(--radius-md)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 13, color: "var(--indigo-300)", fontWeight: 500 }}>
                    ✨ AI Response
                  </span>
                  <button onClick={() => navigator.clipboard?.writeText(aiResponse)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--slate-500)" }}>
                    <Icon name="copy" size={14} />
                  </button>
                </div>
                <div style={{ fontSize: 14, color: "var(--slate-300)", lineHeight: 1.8,
                  whiteSpace: "pre-wrap" }}>
                  {aiResponse}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          <div className="glass-card" style={{ padding: 24 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, marginBottom: 20 }}>
              Top Products by Sales
            </h3>
            {PRODUCTS.slice(0, 5).map((p, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                  <span>{p.name.slice(0, 28)}...</span>
                  <span style={{ color: "var(--teal)", fontWeight: 600 }}>{p.sales}</span>
                </div>
                <div style={{ height: 4, background: "var(--navy-700)", borderRadius: 2 }}>
                  <div style={{ height: "100%", borderRadius: 2, background: "var(--indigo)",
                    width: `${(p.sales / PRODUCTS[0].sales) * 100}%`, transition: "width 0.5s ease" }} />
                </div>
              </div>
            ))}
          </div>
          <div className="glass-card" style={{ padding: 24 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, marginBottom: 20 }}>
              Revenue Breakdown
            </h3>
            {[
              { label: "Product Sales", value: "11,940 USDC", pct: 96 },
              { label: "Platform Fees", value: "463 USDC", pct: 4 },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}>
                  <span style={{ color: "var(--slate-400)" }}>{item.label}</span>
                  <span style={{ fontWeight: 600 }}>{item.value}</span>
                </div>
                <div style={{ height: 8, background: "var(--navy-700)", borderRadius: 4 }}>
                  <div style={{ height: "100%", borderRadius: 4,
                    background: i === 0 ? "var(--teal)" : "var(--indigo)",
                    width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- ADMIN DASHBOARD ---
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiReport, setAiReport] = useState("");

  const tabs = ["overview", "users", "products", "orders", "payments", "moderation"];

  const generateAiReport = async () => {
    setAiLoading(true);
    setAiReport("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: "You are an AI moderation system for Leubok, a Web3 marketplace. Analyze marketplace data and provide security/moderation insights. Be concise and actionable.",
          messages: [{
            role: "user",
            content: `Analyze this marketplace data and provide a brief moderation report with risk assessment and recommendations:\n- Total Users: ${ADMIN_STATS.totalUsers.toLocaleString()}\n- Active Orders: ${ADMIN_STATS.activeOrders}\n- Pending Disputes: ${ADMIN_STATS.pendingDisputes}\n- Flagged Listings: ${ADMIN_STATS.flaggedListings}\n- Total Revenue: $${ADMIN_STATS.totalRevenue.toLocaleString()}\n\nProvide: risk level, top concerns, and 3 specific action items.`
          }]
        })
      });
      const data = await res.json();
      setAiReport(data.content?.map(c => c.text || "").join("") || "Unable to generate report.");
    } catch (err) {
      setAiReport("⚠️ AI moderation service unavailable.");
    }
    setAiLoading(false);
  };

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 24px 60px" }}>
      {/* Admin Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <Icon name="shield" size={24} color="var(--indigo-300)" />
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700 }}>
              Admin Dashboard
            </h1>
            <Badge text="Super Admin" color="indigo" />
          </div>
          <p style={{ color: "var(--slate-500)", fontSize: 14 }}>
            Leubok Marketplace Control Center
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-secondary" style={{ fontSize: 13, padding: "8px 16px" }}>
            <Icon name="refresh" size={14} /> Refresh
          </button>
          <button className="btn-primary" onClick={generateAiReport} disabled={aiLoading} style={{ fontSize: 13 }}>
            {aiLoading ? (
              <><div style={{ width: 14, height: 14, borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white",
                animation: "spin 0.8s linear infinite" }} /> Analyzing...</>
            ) : (
              <><Icon name="robot" size={14} /> AI Moderation Report</>
            )}
          </button>
        </div>
      </div>

      {/* AI Report */}
      {aiReport && (
        <div style={{ marginBottom: 24, padding: 20,
          background: "rgba(79,70,229,0.08)", border: "1px solid rgba(79,70,229,0.25)",
          borderRadius: "var(--radius-md)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Icon name="robot" size={16} color="var(--indigo-300)" />
            <span style={{ color: "var(--indigo-300)", fontWeight: 600, fontSize: 14 }}>
              AI Moderation Report
            </span>
          </div>
          <div style={{ fontSize: 13, color: "var(--slate-300)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
            {aiReport}
          </div>
        </div>
      )}

      {/* Alert Banners */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200, padding: "12px 16px",
          background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.25)",
          borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--rose)" }} />
            <div style={{ position: "absolute", top: 0, left: 0, width: 8, height: 8,
              borderRadius: "50%", background: "var(--rose)", animation: "ping 1s infinite" }} />
          </div>
          <span style={{ fontSize: 13, color: "var(--rose)" }}>
            {ADMIN_STATS.pendingDisputes} disputes awaiting review
          </span>
        </div>
        <div style={{ flex: 1, minWidth: 200, padding: "12px 16px",
          background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)",
          borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name="flag" size={14} color="var(--amber)" />
          <span style={{ fontSize: 13, color: "var(--amber)" }}>
            {ADMIN_STATS.flaggedListings} listings flagged for review
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 32, borderBottom: "1px solid var(--glass-border)",
        overflowX: "auto" }} className="scrollbar-hide">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 20px", border: "none", background: "transparent",
              color: activeTab === tab ? "var(--white)" : "var(--slate-500)",
              fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500,
              cursor: "pointer", borderBottom: `2px solid ${activeTab === tab ? "var(--indigo)" : "transparent"}`,
              marginBottom: -1, whiteSpace: "nowrap", transition: "all var(--transition)",
              textTransform: "capitalize",
            }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
            <StatCard icon="users" label="Total Users" value={ADMIN_STATS.totalUsers.toLocaleString()} delta={8} color="indigo" />
            <StatCard icon="award" label="Verified Sellers" value={ADMIN_STATS.totalSellers.toLocaleString()} delta={12} color="teal" />
            <StatCard icon="activity" label="Total Transactions" value={ADMIN_STATS.totalTransactions.toLocaleString()} delta={23} color="indigo" />
            <StatCard icon="dollar" label="Total Volume" value={`$${(ADMIN_STATS.totalRevenue / 1000).toFixed(0)}K`} delta={31} color="teal" />
            <StatCard icon="trending" label="Platform Fees" value={`$${(ADMIN_STATS.platformFees / 1000).toFixed(0)}K`} delta={28} color="amber" />
            <StatCard icon="box" label="Active Orders" value={ADMIN_STATS.activeOrders.toLocaleString()} delta={5} color="indigo" />
          </div>

          {/* Recent Transactions */}
          <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
              On-Chain Transaction Feed
            </h3>
            {TRANSACTIONS.map((tx, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 0", borderBottom: i < TRANSACTIONS.length - 1 ? "1px solid var(--glass-border)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%",
                    background: tx.status === "confirmed" ? "var(--teal)" : "var(--amber)" }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{tx.type}</div>
                    <div style={{ fontSize: 11, color: "var(--slate-500)", fontFamily: "monospace" }}>{tx.hash}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <Badge text={tx.status === "confirmed" ? "✓ Confirmed" : "⏳ Pending"}
                    color={tx.status === "confirmed" ? "teal" : "amber"} />
                  <div style={{ fontWeight: 700, color: "var(--teal)", fontFamily: "var(--font-display)" }}>
                    {tx.amount} USDC
                  </div>
                  <div style={{ fontSize: 12, color: "var(--slate-500)", minWidth: 80, textAlign: "right" }}>
                    {tx.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Users */}
      {activeTab === "users" && (
        <div>
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <input className="input-field" placeholder="Search users..." style={{ maxWidth: 300 }} />
            <select className="input-field" style={{ width: "auto" }}>
              <option>All Users</option>
              <option>Buyers</option>
              <option>Sellers</option>
              <option>Banned</option>
            </select>
          </div>
          <div className="glass-card" style={{ overflow: "hidden" }}>
            <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--glass-border)",
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 150px",
              fontSize: 12, color: "var(--slate-500)", fontWeight: 600,
              textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <span>User</span><span>Type</span><span>Joined</span><span>Transactions</span><span>Actions</span>
            </div>
            {SELLERS.map((seller, i) => (
              <div key={i} style={{ padding: "16px 24px", borderBottom: "1px solid var(--glass-border)",
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 150px", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--navy-700)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                    {seller.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{seller.name}</div>
                    <div style={{ fontSize: 11, color: "var(--slate-500)" }}>{seller.country}</div>
                  </div>
                </div>
                <div>
                  {seller.verified ? <Badge text="Verified Seller" color="teal" /> : <Badge text="Seller" color="indigo" />}
                </div>
                <div style={{ fontSize: 13, color: "var(--slate-400)" }}>{seller.joined}</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{seller.sales.toLocaleString()}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn-secondary" style={{ padding: "6px 12px", fontSize: 11 }}>
                    View
                  </button>
                  <button style={{ padding: "6px 12px", fontSize: 11, borderRadius: "var(--radius-sm)",
                    background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.3)",
                    color: "var(--rose)", cursor: "pointer" }}>
                    Suspend
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders */}
      {activeTab === "orders" && (
        <div>
          <div className="glass-card" style={{ overflow: "hidden" }}>
            <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--glass-border)",
              display: "grid", gridTemplateColumns: "120px 1fr 1fr 130px 120px 120px",
              fontSize: 12, color: "var(--slate-500)", fontWeight: 600, textTransform: "uppercase" }}>
              <span>Order ID</span><span>Product</span><span>Buyer</span><span>Amount</span><span>Status</span><span>Actions</span>
            </div>
            {ORDERS.map((order, i) => (
              <div key={i} style={{ padding: "16px 24px", borderBottom: "1px solid var(--glass-border)",
                display: "grid", gridTemplateColumns: "120px 1fr 1fr 130px 120px 120px", alignItems: "center" }}>
                <div style={{ fontFamily: "monospace", fontSize: 12, color: "var(--indigo-300)" }}>
                  {order.id}
                </div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{order.product}</div>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: "var(--slate-500)" }}>
                  {order.buyer}
                </div>
                <div style={{ fontWeight: 700, color: "var(--teal)", fontFamily: "var(--font-display)" }}>
                  {order.amount} USDC
                </div>
                <EscrowBadge status={order.status} />
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="btn-secondary" style={{ padding: "6px 10px", fontSize: 11 }}>
                    View
                  </button>
                  {order.status === "disputed" && (
                    <button style={{ padding: "6px 10px", fontSize: 11, borderRadius: "var(--radius-sm)",
                      background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)",
                      color: "var(--amber)", cursor: "pointer" }}>
                      Resolve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Moderation */}
      {activeTab === "moderation" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 24 }}>
            <StatCard icon="flag" label="Flagged Listings" value={ADMIN_STATS.flaggedListings.toString()} color="rose" />
            <StatCard icon="activity" label="Pending Disputes" value={ADMIN_STATS.pendingDisputes.toString()} color="amber" />
            <StatCard icon="shield" label="Scam Reports" value="3" color="rose" />
          </div>

          <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>Flagged Listings</h3>
              <button className="btn-primary" style={{ fontSize: 12, padding: "8px 14px" }}
                onClick={generateAiReport} disabled={aiLoading}>
                <Icon name="robot" size={13} />
                {aiLoading ? "Scanning..." : "AI Scan"}
              </button>
            </div>
            {["Suspicious pricing on vintage electronics", "Duplicate listing detected", "Missing product images"].map((issue, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "14px 0", borderBottom: i < 2 ? "1px solid var(--glass-border)" : "none" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Icon name="flag" size={16} color="var(--amber)" />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{issue}</div>
                    <div style={{ fontSize: 12, color: "var(--slate-500)" }}>Flagged by AI • 2h ago</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn-secondary" style={{ padding: "6px 12px", fontSize: 11 }}>Review</button>
                  <button style={{ padding: "6px 12px", fontSize: 11, borderRadius: "var(--radius-sm)",
                    background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.3)",
                    color: "var(--rose)", cursor: "pointer" }}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {aiReport && (
            <div style={{ padding: 20, background: "rgba(79,70,229,0.06)",
              border: "1px solid rgba(79,70,229,0.2)", borderRadius: "var(--radius-md)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <Icon name="robot" size={16} color="var(--indigo-300)" />
                <span style={{ color: "var(--indigo-300)", fontWeight: 600, fontSize: 14 }}>AI Moderation Report</span>
              </div>
              <div style={{ fontSize: 13, color: "var(--slate-300)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
                {aiReport}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Products management */}
      {activeTab === "products" && (
        <div>
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <input className="input-field" placeholder="Search products..." style={{ maxWidth: 300 }} />
            <select className="input-field" style={{ width: "auto" }}>
              <option>All Products</option>
              <option>Active</option>
              <option>Flagged</option>
              <option>Removed</option>
            </select>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
            {PRODUCTS.map(product => (
              <div key={product.id} className="glass-card" style={{ overflow: "hidden" }}>
                <div style={{ height: 100, background: "var(--navy-700)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>
                  {product.image}
                </div>
                <div style={{ padding: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {product.name}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{ fontSize: 14, color: "var(--teal)", fontWeight: 700 }}>{product.price} USDC</span>
                    <Badge text={product.sellerVerified ? "Verified" : "Pending"} color={product.sellerVerified ? "teal" : "amber"} />
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn-secondary" style={{ flex: 1, justifyContent: "center", padding: "6px", fontSize: 11 }}>
                      Approve
                    </button>
                    <button style={{ flex: 1, padding: "6px", fontSize: 11, borderRadius: "var(--radius-sm)",
                      background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.3)",
                      color: "var(--rose)", cursor: "pointer" }}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payments */}
      {activeTab === "payments" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
            <StatCard icon="dollar" label="Total Volume" value="$4.72M USDC" delta={31} color="teal" />
            <StatCard icon="trending" label="Platform Fees" value="$236K USDC" delta={28} color="indigo" />
            <StatCard icon="lock" label="In Escrow" value="$48K USDC" color="amber" />
            <StatCard icon="refresh" label="Pending Refunds" value="$2.1K USDC" color="rose" />
          </div>
          <div className="glass-card" style={{ padding: 24 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 20 }}>
              All USDC Transactions
            </h3>
            {[...TRANSACTIONS, ...TRANSACTIONS].map((tx, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 0", borderBottom: i < 7 ? "1px solid var(--glass-border)" : "none" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%",
                    background: tx.status === "confirmed" ? "var(--teal)" : "var(--amber)", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{tx.type}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 11, color: "var(--slate-500)" }}>{tx.hash}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <Badge text={tx.status} color={tx.status === "confirmed" ? "teal" : "amber"} />
                  <div style={{ fontWeight: 700, color: "var(--teal)", fontFamily: "var(--font-display)", minWidth: 80, textAlign: "right" }}>
                    {tx.amount} USDC
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [walletConnected, setWalletConnected] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleConnect = () => {
    if (!walletConnected) setShowWalletModal(true);
    else setWalletConnected(false);
  };

  return (
    <>
      <GlobalStyles />
      <div style={{ minHeight: "100vh", background: "var(--navy)" }}>
        <Navbar
          page={page} setPage={setPage}
          cartCount={cart.reduce((s, i) => s + i.qty, 0)}
          walletConnected={walletConnected}
          setWalletConnected={handleConnect}
          notifCount={3}
        />

        {/* Wallet Connect Modal */}
        {showWalletModal && (
          <div style={{ position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(8px)" }}
            onClick={() => setShowWalletModal(false)}>
            <div className="glass-card" style={{ padding: 32, maxWidth: 380, width: "90%",
              animation: "slide-up 0.3s ease" }}
              onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700 }}>Connect Wallet</h3>
                <button onClick={() => setShowWalletModal(false)}
                  style={{ background: "none", border: "none", color: "var(--slate-500)", cursor: "pointer" }}>
                  <Icon name="x" size={18} />
                </button>
              </div>
              <p style={{ color: "var(--slate-500)", fontSize: 13, marginBottom: 24, lineHeight: 1.6 }}>
                Connect your Cosmos wallet to buy, sell, and trade on Leubok. Your identity is your wallet.
              </p>
              {[
                { name: "Keplr Wallet", icon: "🔵", desc: "Most popular Cosmos wallet" },
                { name: "Leap Wallet", icon: "🟣", desc: "Next-gen Cosmos experience" },
                { name: "WalletConnect", icon: "🔗", desc: "Connect via QR code" },
              ].map(wallet => (
                <button key={wallet.name}
                  onClick={() => { setWalletConnected(true); setShowWalletModal(false); }}
                  style={{ width: "100%", padding: "14px 16px", borderRadius: "var(--radius-md)",
                    background: "var(--navy-700)", border: "1px solid var(--glass-border)",
                    cursor: "pointer", display: "flex", alignItems: "center", gap: 14,
                    marginBottom: 10, transition: "all var(--transition)", textAlign: "left" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--indigo)"; e.currentTarget.style.background = "rgba(79,70,229,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--glass-border)"; e.currentTarget.style.background = "var(--navy-700)"; }}>
                  <span style={{ fontSize: 24 }}>{wallet.icon}</span>
                  <div>
                    <div style={{ color: "var(--white)", fontWeight: 600, fontSize: 14 }}>{wallet.name}</div>
                    <div style={{ color: "var(--slate-500)", fontSize: 12 }}>{wallet.desc}</div>
                  </div>
                  <Icon name="arrow_right" size={16} color="var(--slate-500)" style={{ marginLeft: "auto" }} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pages */}
        {page === "home" && <HomePage setPage={setPage} onAddToCart={handleAddToCart} />}
        {page === "marketplace" && <MarketplacePage onAddToCart={handleAddToCart} />}
        {page === "checkout" && <CheckoutPage cart={cart} setCart={setCart} />}
        {page === "seller" && <SellerDashboard />}
        {page === "admin" && <AdminDashboard />}
      </div>
    </>
  );
}
