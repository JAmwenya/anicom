# server/routes/auth_route.py

from flask import Blueprint, request, jsonify
from server.services.auth_service import AuthService
from server.utils.helpers import create_response, custom_jwt_required, handle_exception
from server.utils.validators import validate_email, validate_password, validate_username


auth_bp = Blueprint("auth", __name__)


# Route to register a new user
@auth_bp.route("/register", methods=["POST"])
def register():
    """Register a new user."""
    try:
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        # Validate username, email and password
        validate_username(username)
        validate_email(email)
        validate_password(password)

        # Validate input
        if not username or not email or not password:
            return create_response(message="Missing required fields", status=400)

        # Register the user
        user = AuthService.register_user(username, email, password)

        # Generate a JWT token for the new user
        token = AuthService.generate_jwt_token(user.id)

        # Return response with token
        return jsonify(
            {
                "token": token,
                "user": user.to_dict(),
                "message": "User registered successfully",
            }
        ), 201

    except ValueError as e:
        return create_response(message=str(e), status=400)
    except Exception as e:
        print(f"[REGISTER] Unexpected error: {e}")
        return handle_exception(e)


# Route to log in a user and generate a JWT token
@auth_bp.route("/login", methods=["POST"])
def login():
    """Login a user."""
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        # Validate input
        if not email or not password:
            return create_response(
                message="Email and password are required", status=400
            )

        # Authenticate the user
        token, user = AuthService.login_user(email, password)
        if not token:
            return create_response(message="Invalid credentials", status=401)

        return jsonify({"token": token, "user": user.to_dict()}), 200

    except ValueError as e:
        return create_response(message=str(e), status=401)
    except Exception as e:
        print(f"[LOGIN] Unexpected error: {e}")
        return handle_exception(e)


# Route to log out the user (if needed)
@auth_bp.route("/logout", methods=["POST"])
@custom_jwt_required
def logout(user_id):
    """Log out the current user."""
    return create_response(message="Logout successful", status=200)
