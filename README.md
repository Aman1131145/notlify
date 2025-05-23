# Notlify

A modern notification management application built with React.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Aman1131145/notlify.git
cd notlify
```

2. Install dependencies:
```bash
npm install
```

If you encounter any peer dependency issues, use:
```bash
npm install --legacy-peer-deps
```

## Running the Application

The application consists of two parts: the frontend and the mock database server.

### Frontend

To start the frontend development server:
```bash
npm start
```
This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Mock Database Server

In a separate terminal window, start the mock database server:
```bash
npx json-server --watch mock-api/db.json --port 3001
```
This will run the mock API server on port 3001.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Project Structure

```
notlify/
├── mock-api/          # Mock database and API endpoints
│   └── db.json       # JSON database file
├── public/           # Public assets
├── src/             # Source code
│   ├── components/  # React components
│   ├── pages/      # Page components
│   └── ...
└── package.json     # Project dependencies and scripts
```

## Features

- Real-time notifications
- User authentication
- Notification management
- Responsive design
- Mock API integration

## Technologies Used

- React.js
- JSON Server (for mock API)
- CSS/SCSS
- Modern JavaScript (ES6+)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Aman - [@Aman1131145](https://github.com/Aman1131145)

Project Link: [https://github.com/Aman1131145/notlify.git](https://github.com/Aman1131145/notlify.git)
