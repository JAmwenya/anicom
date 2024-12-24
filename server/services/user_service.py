# server/services/user_service.py

from server.models.user import User
from server.utils.db import db
from server.utils.helpers import create_response
from server.utils.validators import validate_username, validate_email


class UserService:
    @staticmethod
    def get_user(user_id):
        """Get user details by ID."""
        user = User.query.get(user_id)
        if user:
            return user.to_dict()
        return None

    @staticmethod
    def get_all_users():
        """Fetch all users from the database."""
        try:
            users = User.query.all()
            if not users:
                raise ValueError("No users found")

            # Ensure that the result is a list of dictionaries
            users_list = [user.to_dict() for user in users]
            print(f"Fetched users list: {users_list}")  # Success message
            return users_list, 200

        except Exception as e:
            print(f"Error fetching users: {str(e)}")  # Error message
            return create_response(
                message=f"Error fetching users: {str(e)}", status=500
            )

    @staticmethod
    def update_user(user_id, username=None, email=None):
        """Full update of user details (PUT)."""
        user = User.query.get(user_id)
        if not user:
            return create_response(message="User not found", status=404)

        if username:
            if validate_username(username):
                user.username = username
        if email:
            if validate_email(email):
                user.email = email

        db.session.commit()
        print(f"User with ID {user_id} updated successfully.")  # Success message
        return user.to_dict(), 200

    @staticmethod
    def patch_user(user_id, username=None, email=None):
        """Partial update of user details (PATCH)."""
        user = User.query.get(user_id)
        if not user:
            return create_response(message="User not found", status=404)

        if username:
            if validate_username(username):
                user.username = username
        if email:
            if validate_email(email):
                user.email = email

        db.session.commit()
        print(f"User with ID {user_id} patched successfully.")  # Success message
        return user.to_dict(), 200

    @staticmethod
    def delete_user(user_id):
        """Delete user by ID."""
        user = User.query.get(user_id)
        if not user:
            return create_response(message="User not found", status=404)

        db.session.delete(user)
        db.session.commit()
        print(f"User with ID {user_id} deleted successfully.")  # Success message
        return create_response(message="User deleted successfully", status=200)

    @staticmethod
    def update_user_avatar(user_id, avatar_url):
        """Update the user's avatar URL."""
        user = User.query.get(user_id)
        if not user:
            return create_response(message="User not found", status=404)

        user.set_avatar(avatar_url)
        db.session.commit()
        print(f"User with ID {user_id} avatar updated successfully.")  # Success message
        return user.to_dict(), 200
