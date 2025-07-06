# 💸 Personal Finance Visualizer

A simple, modern web application to track personal finances — add transactions, visualize expenses, and set monthly budgets — **without login or signup**.

Built with **Next.js**, **React**, **TailwindCSS (via shadcn/ui)**, **MongoDB**, and **Recharts**.

---

## 🚀 Live Demo

👉 [Live on Vercel](https://your-vercel-link.vercel.app) *(Replace with your deployment URL)*

---

## 📦 Tech Stack

- **Next.js (App Router, JS)**
- **React**
- **TailwindCSS** + `shadcn/ui`
- **MongoDB Atlas** (via Mongoose)
- **Recharts** for visualizations

---

## 🧱 Features by Stage

### ✅ Stage 1: Basic Transaction Tracker

- Add / Edit / Delete expenses
- List all transactions
- Bar chart showing monthly spending

### ✅ Stage 2: Categories

- Predefined categories (Food, Rent, Travel, etc.)
- Pie chart for category-wise spending
- Dashboard cards: Total spend, recent transactions, category % breakdown

### ✅ Stage 3: Budgeting

- Set monthly budget per category
- Budget vs Actual comparison
- Basic spending insights (e.g., Overspent, Safe, Under Budget)

---

## 🖼 Screenshots (Coming Soon)

---

## 📁 Project Structure

```bash
finance-visualizer/
├── src/
│   ├── app/
│   │   ├── dashboard/            # Dashboard charts & cards
│   │   ├── transactions/         # Transaction list & form
│   │   └── api/                  # API routes for MongoDB
│   ├── components/
│   │   ├── charts/               # Bar, Pie, Budget charts
│   │   ├── forms/                # Transaction & Budget Forms
│   │   ├── layout/               # Navbar, Wrapper
│   │   └── cards/                # Summary Cards
│   ├── lib/                      # DB connector, utils
│   ├── models/                   # Mongoose models
│   ├── services/                 # Reusable service logic
├── .env.local                    # MongoDB URI
├── styles/                       # Tailwind base styles
├── public/
├── README.md
