# server/utils/helpers.py

import jwt
import os
from inspect import signature
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from flask import jsonify, session, request, g
from functools import wraps
from server.models.user import User
from server.config import config_by_name

# Access SECRET_KEY from the current configuration
config = config_by_name[os.getenv("FLASK_ENV", "development")]
SECRET_KEY = config.SECRET_KEY

ALGORITHM = "HS256"


def create_response(data=None, message="Success", status=200):
    """Utility function to create a standardized JSON response."""
    response_body = {"message": message}

    if data:
        try:
            # Ensure that data is serializable (either dict or list)
            if isinstance(data, dict) or isinstance(data, list):
                response_body["data"] = data
            else:
                raise ValueError("Data must be a dictionary or list.")
        except Exception as e:
            response_body["data_error"] = str(e)

    # Return the response as a JSON response with status code
    return jsonify(response_body), status


def handle_exception(e):
    """Handle unexpected exceptions and log error details."""
    print(f"Exception: {str(e)}")
    return create_response(message="An internal server error occurred", status=500)


def login_required(f):
    """Decorator to enforce session-based authentication."""

    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "user_id" not in session:
            return create_response(
                message="Unauthorized access. Please log in first.", status=401
            )
        return f(*args, **kwargs)

    return decorated_function


def paginate_query(query, page, per_page):
    """Paginate a query with SQLAlchemy."""
    paginated = query.paginate(page=page, per_page=per_page, error_out=False)
    return {
        "total_items": paginated.total,
        "total_pages": paginated.pages,
        "current_page": page,
        "items": [item.to_dict() for item in paginated.items],
    }


def custom_jwt_required(f):
    """Custom decorator to enforce JWT authentication and inject user_id into the request."""

    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get("Authorization")

        # Ensure the token is present and in the correct format
        if not token:
            return jsonify({"message": "Token is missing!"}), 403
        if not token.startswith("Bearer "):
            return jsonify(
                {"message": "Invalid token format! Expected 'Bearer <token>'"}
            ), 403

        try:
            # Extract and decode the token
            token = token.split(" ")[1]
            data = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_id = data.get("user_id")

            if not user_id:
                return jsonify({"message": "Token is invalid! Missing user_id"}), 403

            # Fetch the user from the database
            user = User.query.get(user_id)
            if user is None:
                return jsonify({"message": "User not found!"}), 403

            # Inject the user_id into Flask's global context
            g.user_id = user_id
            g.user = user  # Optional: Attach the full user object for convenience

        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired!"}), 403
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token!"}), 403
        except Exception as e:
            return jsonify({"message": f"An unexpected error occurred: {str(e)}"}), 500

        # Automatically pass `user_id` to the route if it's part of the function's parameters
        func_signature = signature(f)
        if "user_id" in func_signature.parameters:
            kwargs["user_id"] = user_id

        return f(*args, **kwargs)

    return decorated_function


def admin_required(f):
    """Decorator to enforce admin privileges."""

    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            # Verify that the token is present and valid
            verify_jwt_in_request()
            identity = get_jwt_identity()
        except Exception as e:
            return create_response(
                message=f"Token verification failed: {str(e)}", status=403
            )

        if not identity:
            return create_response(message="User ID not found in token", status=403)

        user_id = identity.get("user_id")
        role = identity.get("role")

        # Check if the user is an admin
        user = User.query.get(user_id)
        if not user or role != "admin":
            return create_response(message="Admin access required!", status=403)

        return f(*args, **kwargs)

    return decorated_function
