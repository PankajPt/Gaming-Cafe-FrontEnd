# Madgear Gaming Cafe - Frontend

Madgear Gaming Cafe is a web application for managing gaming cafe operations, including user registration, membership, event management, and game catalog browsing.

## Project Structure

```
- src/
  - .env
  - .gitignore
  - eslint.config.js
  - index.html
  - package.json
  - package-lock.json
  - postcss.config.js
  - README.md
  - tailwind.config.js
  - vercel.json
  - vite.config.js
  - src/
    - App.css
    - App.jsx
    - index.css
    - Layout.jsx
    - main.jsx
    - assets/
    - components/
    - context/
    - hooks/
    - pages/
    - routes/
    - services/
```

## Technologies Used
- React.js (Frontend Framework)
- Tailwind CSS (Styling)
- Vite (Build Tool)
- React Router (Routing)

# Madgear Gaming Cafe - Frontend Setup Guide

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/PankajPt/madgear-frontend.git
cd madgear-frontend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

## 🎨 Setting Up Tailwind CSS

### 3️⃣ Install Tailwind CSS and Related Packages
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 4️⃣ Configure Tailwind Content Paths
Open `tailwind.config.js` and set the `content` property:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 5️⃣ Add Tailwind Directives in CSS
In `src/index.css`, add:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🛠️ Running the Project
```bash
npm run dev
```

## ❗ Troubleshooting
If Tailwind commands are not recognized:
```bash
rm -rf node_modules package-lock.json
tnpm cache clean --force
npm install
```

If styles are not applied, check:
- Tailwind is imported correctly in `index.css`
- The `content` paths in `tailwind.config.js` are correct
- Restart the development server after changes

---
This setup ensures Tailwind works correctly with your **Madgear Gaming Cafe** frontend. 🚀



## Environment Variables
Create a `.env` file in the root directory and add the necessary environment variables.

### Example `.env` File
```
VITE_BACKEND_BASE_URI=https://your-backend-uri/api/v1
```
Create a `.env` file in the root directory and add the necessary environment variables.

## Features
- User authentication & profile management
- Membership & subscription system
- Game catalog browsing & booking
- Admin dashboard for event & user management

## Deployment
This project is configured for deployment on **Vercel**.
To deploy, run:
```sh
vercel deploy
```

## Contributing
Feel free to fork and submit pull requests.

## License
MIT License

