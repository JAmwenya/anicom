# Client-Side Overview

- This folder contains the frontend of the application, which is built using React. The structure is organized into multiple folders for assets, components, features, API, utilities, and pages, following best practices for scalable and maintainable React applications. Below is an explanation of the folder structure and its contents.

## Frontend Structure

```bash
/client                           # React frontend
├── /public                       # Public folder
│   └── index.html                # Main HTML file
├── /src
│   ├── /assets                   # Images, fonts, and other static files
│   ├── /components               # Reusable UI components
│   ├── /features                 # Feature-based structure for Redux slices
│   │   ├── auth                  # Authentication (login, registration)
│   │   ├── user                  # User profile management
│   │   ├── anime                 # Anime-related logic
│   │   ├── episode               # Episode-related logic
│   │   ├── vote                  # Vote-related logic (ratings)
│   │   └── content               # Content-related logic (reviews, fan art)
│   ├── /api                      # API utility functions and routes linking
│   ├── /routes                   # Route management and protected routes
│   ├── /store                    # Redux store configuration
│   ├── /styles                   # CSS Modules for component-level styling
│   ├── /utils                    # Utility functions
│   ├── /pages                    # Page components (views for different routes)
│   ├── App.js                    # Main entry point for the app
│   └── index.js                  # App's entry point (rendering into DOM)
├── package.json                  # Project configuration (dependencies, scripts)
├── createEnv.js                  # Generator file for the frontend environment variables
├── .env                          # Environment variables (e.g., API base URL)
├── .gitignore                    # Git ignore file for excluding node_modules, etc.
└── README.md                     # Documentation for the frontend
```

### Folder and File Contents

**1. `/public`**

This folder contains the static assets for the frontend application.

- `index.html`: The main HTML file that is used to render the React app.

**2. `/src`**

This folder contains the source code for the React app.It has the following folders & files:

- `/assets`: Contains static files like images, icons, and placeholder avatars used in the application.
- `/images`: Includes images like anime characters or placeholders.
- `/icons`: Includes icon files used in the app.
- `/placeholder-avatars`: Placeholder images for anime character avatars.
- `/components`: Contains reusable UI components used throughout the app.
- `/features`: Contains feature-based Redux slices for state management.
- `/api`: Contains utility functions and API calls used across the app to interact with the backend.
- `/routes`: Contains route management and handles protected routes for user authentication and authorization.
- `/store`: Contains the Redux store configuration, including root reducers and middlewares.
- `/styles`: Includes CSS Modules for component-level styling. Each component can have its own .module.css file for isolated styles.
- `/utils`: Contains utility functions that are used throughout the application (e.g., date formatting, data manipulation).
- `/pages`: Contains the main page components, which represent the different views in the app (e.g., home page, profile page).
- `App.js`: The main entry point for the React application. It sets up routing and renders the overall layout.
- `index.js`: The entry point for rendering the React app into the DOM.

**3. `package.json`**

Contains project configuration, including the list of dependencies and scripts used for building, testing, and running the app.

**4. `.env`**
Contains environment variables for the frontend application, such as the base URL for API requests and other environment-specific configurations.

**5. `.gitignore`**
Specifies which files and folders should be ignored by Git, typically used to exclude node_modules, build files, and other sensitive data.

**6. `README.md`**
The file you are currently reading. This file contains documentation and information about the frontend application, its structure, and how to set up and use it.

### Setting Up the Frontend

**1. Change directory:**

- Change directory into client using:

    ```bash
    cd client
    ```

**2. Install dependencies:**

- Make sure you have Node.js and npm installed. Then install the necessary dependencies:

    ```bash
    npm install
    ```

**3. Set up environment variables:**

- Create a `.env` file in the root directory and set up environment variables like the `REACT_APP_API_BASE_URL` to point to the backend API with the following command:

    ```bash
    node createEnv.js
    ```

**4. Run the application**:

- First go back to the root directory then start the React application.

    ```bash
    cd ..
    npm start --prefix client
    ```

### Conclusion

This React-based frontend application is designed with a modular and scalable architecture. It follows best practices such as feature-based organization, reusable components, and state management with Redux. The application is structured for ease of development and maintenance, and can be extended as new features are added.
