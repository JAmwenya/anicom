# server/app.py

import os
import sys
from flask import Flask
from flask_cors import CORS
from server.utils.db import db
from dotenv import load_dotenv
from server.config import Config
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from server.routes.auth_route import auth_bp
from server.routes.user_route import user_bp
from server.routes.vote_route import vote_bp
from server.routes.anime_route import anime_bp
from server.routes.content_route import content_bp
from server.routes.episode_route import episode_bp

# Load environment variables from .env
load_dotenv()

# Add the server directory to sys.path so we can properly reference modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))


# Application factory function
def create_app(config_name=None):
    """Application factory function to create the Flask app."""
    if not config_name:
        config_name = os.getenv("FLASK_ENV", "development")

    # Explicitly set the instance path
    instance_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "instance")
    if not os.path.exists(instance_path):
        os.makedirs(instance_path)

    # Create the Flask application
    app = Flask(__name__, instance_path=instance_path)

    # Load configuration from the config object
    app.config.from_object(Config)  # Corrected to load from the Config class

    # Initialize the database and migration tool
    db.init_app(app)
    migrate = Migrate(app, db)  # noqa

    # Initialize JWTManager with the app
    jwt = JWTManager(app)  # noqa

    # Initialize CORS (allow all origins for development)
    CORS(
        app,
        resources={r"/*": {"origins": "http://localhost:3000"}},
        supports_credentials=True,
    )

    # Register Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(content_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(anime_bp)
    app.register_blueprint(episode_bp)
    app.register_blueprint(vote_bp)

    return app


# Run the app locally in development mode
if __name__ == "__main__":
    app = create_app(config_name="development")
    app.run(debug=True)
