# server/services/auth_service.py

import jwt
import os
from datetime import datetime, timedelta, timezone
from werkzeug.security import generate_password_hash, check_password_hash
from server.models.user import User
from server.utils.db import db
from server.utils.validators import validate_email, validate_password, validate_username
from server.utils.helpers import create_response
from server.config import config_by_name

# Access SECRET_KEY from the current configuration
config = config_by_name[os.getenv("FLASK_ENV", "development")]
SECRET_KEY = config.SECRET_KEY
ALGORITHM = "HS256"
TOKEN_EXPIRATION_MINUTES = 1440


class AuthService:
    @staticmethod
    def generate_jwt_token(user_id):
        """Generate a JWT token for a given user ID."""
        expiration = datetime.now(tz=timezone.utc) + timedelta(
            minutes=TOKEN_EXPIRATION_MINUTES
        )
        payload = {"user_id": user_id, "exp": int(expiration.timestamp())}
        token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
        print(f"[TOKEN] JWT token generated for user ID: {user_id}")
        return token

    @staticmethod
    def register_user(username, email, password, role="user"):
        """Register a new user with validated and hashed password."""
        if not validate_username(username):
            raise ValueError("Invalid username")
        if not validate_email(email):
            raise ValueError("Invalid email format")
        if not validate_password(password):
            raise ValueError("Password must be at least 6 characters long")

        # Check if user exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            raise ValueError("User with this email already exists")

        new_user = User(
            username=username,
            email=email,
            password_hash=generate_password_hash(password),
            role=role,
        )
        db.session.add(new_user)
        db.session.commit()
        return new_user

    @staticmethod
    def login_user(email, password):
        """Authenticate a user and generate a JWT token."""
        try:
            user = User.query.filter_by(email=email).first()
            if not user or not check_password_hash(user.password_hash, password):
                raise ValueError("Invalid email or password")

            token = AuthService.generate_jwt_token(user.id)
            return token, user
        except Exception as e:
            print(f"[LOGIN ERROR] {str(e)}")
            raise ValueError(
                "Error during login: " + str(e)
            )

    @staticmethod
    def logout():
        """Handle user logout. For JWT-based auth, client side removes the token."""
        return create_response(message="Logged out successfully", status=200)
