# generator.py

import os
import secrets


def generate_or_update_env_file():
    """
    Generates or updates the .env file inside the 'server' folder with necessary environment variables.
    """
    # Path to the .env file
    env_file_path = os.path.join(os.path.dirname(__file__), ".env")

    # Generate random values for sensitive information
    secret_key = secrets.token_urlsafe(50)
    db_uri = "sqlite:///animes.db"
    jwt_secret_key = secrets.token_urlsafe(50)

    # Prepare the environment variables as key-value pairs
    env_variables = {
        "SECRET_KEY": secret_key,
        "FLASK_ENV": "development",
        "JWT_SECRET_KEY": jwt_secret_key,
        "SQLALCHEMY_DATABASE_URI": db_uri,
        "JWT_ACCESS_TOKEN_EXPIRES": "86400",
        "SQLALCHEMY_TRACK_MODIFICATIONS": "False",
    }

    # If .env file exists, update it; otherwise, create a new one
    if os.path.exists(env_file_path):
        print(".env file found. Updating values...")

        # Read the existing .env file and store its contents in a dictionary
        with open(env_file_path, "r") as f:
            existing_vars = dict(
                line.strip().split("=", 1) for line in f if line.strip() and "=" in line
            )

        # Update or add new environment variables
        with open(env_file_path, "w") as f:
            for key, value in env_variables.items():
                # Update existing variables, otherwise add new ones
                if key in existing_vars:
                    f.write(f"{key}={existing_vars[key]}\n")
                else:
                    f.write(f"{key}={value}\n")
            print(".env file updated successfully!")

    else:
        # Create a new .env file and add all environment variables
        print(".env file not found. Creating a new file...")

        with open(env_file_path, "w") as f:
            for key, value in env_variables.items():
                f.write(f"{key}={value}\n")

        print(".env file generated successfully!")


if __name__ == "__main__":
    generate_or_update_env_file()
