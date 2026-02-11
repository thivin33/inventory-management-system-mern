# 📦 Inventory Management System (IMS)

A **role-based Inventory Management System** built with the **MERN stack**, designed to manage products, stock movements, and inventory history in real time.

This project supports **Admin** and **Staff** roles with different permissions and provides a complete audit trail for inventory changes.

---

## 🚀 Features

### 🔐 Authentication & Roles
- User authentication using **JWT**
- Role-based access:
  - **Admin**
  - **Staff**
- Secure login & signup
- Auto redirect based on role

---

### 📦 Product Management (Admin)
- Add new products
- Edit product details
- Delete products
- View all products
- Set minimum stock level

---

### 🔄 Stock Management (Staff)
- Stock **IN** and **OUT**
- Quantity validation (prevents negative stock)
- Mandatory reason for stock changes
- Real-time product quantity updates

---

### ⚠️ Low Stock Alerts
- Automatically detects low stock items
- Displays only products below minimum stock level

---

### 📜 Inventory History (Admin)
- Complete transaction log
- Shows:
  - Product name
  - Stock IN / OUT
  - Quantity
  - Reason
  - **User name + role**
  - Date & time
- Real-time, no demo data

---

### 📊 Dashboards
- **Admin Dashboard**
  - Total products
  - Total stock
  - Low stock count
- **Staff Dashboard**
  - Current inventory overview
  - Stock status (In stock / Low stock)

---

## 🛠 Tech Stack

### Frontend
- React (JSX)
- React Router DOM
- Tailwind CSS
- Heroicons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- bcrypt (Password hashing)

---

## 👨‍💻 Author

**Thivin Prakash**