# Anicom

Anicom is a Flask (Backend) and React (Frontend) application designed for ease of deployment, maintainability, and scalability.

```bash

/anicom
├── /client                           # React frontend
│   ├── /public                       # Public folder
│   │   └── index.html                # Main HTML file
│   ├── /src
│   │   ├── /assets                   # Images, icons, and other static files
│   │   ├── /components               # Reusable UI components
│   │   ├── /features                 # Feature-based structure for Redux slices
│   │   │   ├── auth                  # Authentication (login, registration)
│   │   │   ├── user                  # User profile management
│   │   │   ├── anime                 # Anime-related logic
│   │   │   ├── episode               # Episode-related logic
│   │   │   ├── vote                  # Vote-related logic (ratings)
│   │   │   └── content               # Content-related logic (reviews, fan art)
│   │   ├── /api                      # API utility functions and routes linking
│   │   ├── /routes                   # Route management and protected routes
│   │   ├── /store                    # Redux store configuration
│   │   ├── /styles                   # CSS Modules for component-level styling
│   │   ├── /utils                    # Utility functions
│   │   ├── /pages                    # Page components (views for different routes)
│   │   ├── App.js                    # Main entry point for the app
│   │   └── index.js                  # App's entry point (rendering into DOM)
│   ├── package.json                  # Project configuration (dependencies, scripts)
│   ├── .env                          # Environment variables (e.g., API base URL)
│   ├── createEnv.js                  # Generator file for the frontend environment variables
│   ├── .gitignore                    # Git ignore file for excluding node_modules, etc.
│   └── README.md                     # Documentation for the project
│
├── /server                           # Flask backend
│   ├── /models                       # Models folder
│   ├── /routes                       # API routes folder
│   ├── /services                     # API services folder
│   ├── /utils                        # Utility functions folder
│   ├── config.py                     # General app config
│   ├── /migrations                   # Flask-Migrate for DB migrations
│   ├── /instance                     # Flask instance folder
│   ├── app.py                        # Main entry for Flask app
│   ├── seed.py                       # Data sample file for seeding the database
│   ├── __init__.py                   # __init__ file
│   ├── generator.py                  # Generator file for the backend environment variables
│   ├── .env                          # Storage file for the backend environment variables
│   ├── README.md                     # Documentation for the backend
│   └── requirements.txt              # Backend dependencies
└── README.md                         # Documentation for the project
```

## Folder & File Content

**1. `/client`**

- This folder contains the frontend of the application. Make your way to the folder and read the `README.md` inside to find out more on its content and setup.

**2. `/server`**

- This folder contains the backend of the application. Make your way to the folder and read the `README.md` inside to find out more on its content and setup.

### Setting Up The Project

1.**Clone the repository**:

- Run the following command in your preferred terminal

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

Having read the documentation inside `/client` & `/server` folders and run the respective instructions, start by deploying the server with the following command:

- Server launch:

    ```bash
    python -m server.app
    ```

- Afterwards launch the client side by running:

    ```bash
    npm start --prefix client
    ```

The app will be available at <http://localhost:5000> for backend/server and <http://localhost:3000> for frontend/client by default.

### Conclusion

This Flask & React-based application is designed & structured for ease of deployment and maintainability, and can be extended as new features are added.
