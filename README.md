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
- Firebase (Auth & Database, if used)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/PankajPt/madgear-frontend.git
   ```
2. Navigate to the project directory:
   ```sh
   cd madgear-frontend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

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

