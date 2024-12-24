# server/routes/user_route.py

from flask import Blueprint, request
from server.services.user_service import UserService
from server.utils.helpers import create_response, custom_jwt_required
from server.utils.db import db

user_bp = Blueprint("user", __name__)


@user_bp.route("/users", methods=["GET"])
def get_all_users():
    """Fetch all users."""
    try:
        users, status = UserService.get_all_users()
        print(f"Fetched {len(users)} users.")  # Success message

        if not isinstance(users, list):
            raise TypeError("User data should be a list of dictionaries")

        return create_response(data=users, status=status)
    except Exception as e:
        print(f"Error occurred while fetching users: {str(e)}")  # Error message
        return create_response(message=f"Error: {str(e)}", status=500)


@user_bp.route("/user/<int:user_id>", methods=["GET"])
@custom_jwt_required
def get_user(user_id):
    """Fetch user details by user ID."""
    try:
        user = UserService.get_user(user_id)
        if not user:
            return create_response(message="User not found", status=404)
        return create_response(
            data=user.to_dict(), message="User details fetched", status=200
        )

    except Exception as e:
        print(f"Error occurred while fetching user: {str(e)}")  # Error message
        return create_response(message="Internal server error", status=500)


@user_bp.route("/user/<int:user_id>", methods=["PUT"])
@custom_jwt_required
def update_user(user_id):
    """Update user details (full update)."""
    try:
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")

        user = UserService.update_user(user_id, username, email)
        return create_response(
            data=user.to_dict(), message="User updated successfully", status=200
        )

    except Exception as e:
        print(f"Error occurred while updating user: {str(e)}")  # Error message
        return create_response(message="Internal server error", status=500)


@user_bp.route("/user/<int:user_id>", methods=["PATCH"])
@custom_jwt_required
def patch_user(user_id):
    """Patch (partially update) user details."""
    try:
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")

        user = UserService.patch_user(user_id, username, email)
        return create_response(
            data=user.to_dict(),
            message="User partially updated successfully",
            status=200,
        )

    except Exception as e:
        print(f"Error occurred while patching user: {str(e)}")  # Error message
        return create_response(message="Internal server error", status=500)


@user_bp.route("/user/<int:user_id>/avatar", methods=["PATCH"])
@custom_jwt_required
def update_user_avatar(user_id):
    """Update user avatar (URL)."""
    try:
        data = request.get_json()
        avatar_url = data.get("avatar")

        user = UserService.get_user(user_id)
        if not user:
            return create_response(message="User not found", status=404)

        user.set_avatar(avatar_url)
        db.session.commit()
        return create_response(
            data=user.to_dict(), message="User avatar updated successfully", status=200
        )
    except Exception as e:
        print(f"Error occurred while updating user avatar: {str(e)}")  # Error message
        return create_response(message="Internal server error", status=500)


@user_bp.route("/user/<int:user_id>", methods=["DELETE"])
@custom_jwt_required
def delete_user(user_id):
    """Delete a user by ID."""
    try:
        success = UserService.delete_user(user_id)
        if not success:
            return create_response(message="User not found", status=404)
        return create_response(message="User deleted successfully", status=200)

    except Exception as e:
        print(f"Error occurred while deleting user: {str(e)}")  # Error message
        return create_response(message="Internal server error", status=500)
