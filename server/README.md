# Server-Side Overview

- This folder contains the backend of the application, which is built using Flask. The structure is organized into different folders for models, routes, services, and utilities to ensure clean separation of concerns. The following sections outline the structure and the purpose of each folder/file.

## Backend Structure

```bash
/server                           # Flask backend
├── /models                       # Models folder
├── /routes                       # API routes folder
├── /services                     # API services folder
├── /utils                        # Utility functions folder
├── config.py                     # General app config
├── /migrations                   # Flask-Migrate for DB migrations
├── /instance                     # Flask instance folder
├── app.py                        # Main entry for Flask app
├── seed.py                       # Data sample file for seeding the database
├── __init__.py                   # Initializes the app module
├── generator.py                  # Generator file for the backend environment variables
├── .env                          # Storage file for the backend environment variables
├── requirements.txt              # Backend dependencies
└── README.md                     # Documentation for the backend
```

### Folders & Files Overview

**1. `/models`:**

This folder contains all the database models used in the application. Each model corresponds to a table in the database.

**2. `/routes`:**

This folder contains the API routes, which define the endpoints that the frontend will interact with.

**3. `/services`:**

This folder contains the logic behind each route. Each service corresponds to a specific functionality related to a route.

**4. `/utils`:**

This folder contains utility files used across the application.

**5. `config.py`:**

This file contains the general configuration for the Flask app, such as environment settings and configuration options.

**6. `/migrations`:**

This folder is used for Flask-Migrate to manage database migrations. It allows you to version control database schema changes.

**7. `/instance`**:

This folder holds the instance-specific configurations for the Flask app, including the actual database file (e.g., `anime.db`).

**8. `app.py`:**

The main entry point for the Flask app. It initializes the Flask application, sets up the routes, and connects to the database.

**9. `__init__.py`:**

This file marks the directory as a Python package and initializes the app and other components.

**10. `generator.py`:**

A script for generating backend environment variables, such as API keys or secret keys.

**11. `.env`:**

This file contains environment variables for the Flask app, such as database URLs and secret keys.

**12. `requirements.txt`:**

A file that lists the dependencies required to run the Flask application. It is used to install the necessary Python packages via pip.

### Setting Up the Backend

**1. Change directory:**

- Change directory into server using:

    ```bash
    cd server
    ```

2.**Install dependencies**:

- Ensure you have the requirements file having all the dependencies before running the following command:

    ```bash
    pip install -r requirements.txt
    ```

3.**Set up environment variables**:

- Create a .env file in the root directory with the necessary environment variables, such as SECRET_KEY and database connection strings:

    ```bash
    python generator.py
    ```

4.**Run database migrations**:

- Initialize and migrate the database using Flask-Migrate

    ```bash
    flask db init
    flask db migrate -m "Initial Migration"
    flask db upgrade
    ```

5.**Run the application**:

- First go back to the root directory, seed the database before starting the Flask application.

    ```bash
    cd ..
    python -m server.seed
    ```
