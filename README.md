# 🛒 AE-Shop - E-Commerce Frontend

AE-Shop is a modern, fast, and fully responsive E-Commerce web application frontend built with **React.js**, **Redux Toolkit (RTK Query)**, and **Vite**. It seamlessly connects with a RESTful API backend to deliver a complete online shopping experience.

---

## 🚀 Key Features

- 🔐 **Authentication:** User registration, JWT login, and protected routes.
- 🛍️ **Product Catalog:** Interactive product listings, category filters, real-time search, and rating reviews.
- 🛒 **Cart & Wishlist:** Real-time state synchronization using RTK Query for instant updates.
- 💳 **Checkout Flow:** Integrated payment management via Stripe.
- 📱 **Fully Responsive:** Customized layout and sliding navigation drawer for mobile and desktop screens.

---

## 🛠️ Tech Stack

- **Core & Build Tool:** React.js, Vite
- **State Management:** Redux Toolkit & RTK Query
- **Routing:** React Router DOM
- **Styling & UI:** Pure CSS3, React Icons, Swiper.js
- **Code Quality:** ESLint

---

## 📂 Project Structure

```text
├── public/
├── src/
│   ├── api/          # RTK Query API endpoints & services
│   ├── app/          # Redux store configuration
│   ├── components/   # Reusable UI components (Header, Product, Spinner, etc.)
│   ├── features/     # Redux slices and state management features
│   ├── pages/        # Main application routes & views (Home, Cart, Products, etc.)
│   ├── utils/        # API notification handlers & utility helpers
│   ├── App.jsx       # App layout & route definitions
│   ├── index.css     # Global styling rules
│   └── main.jsx      # React root entry point
├── .env              # Environment variables
├── .gitignore
├── eslint.config.js  # ESLint code style config
└── index.html        # HTML entry template
```
