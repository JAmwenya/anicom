# utils/validators.py

import re
from werkzeug.exceptions import BadRequest


def validate_email(email):
    """Validate email format."""
    if not isinstance(email, str):
        raise ValueError("Email must be a string")
    email = email.strip()
    email_regex = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    if not re.match(email_regex, email):
        raise ValueError("Invalid email format")
    return True


def validate_password(password):
    """Validate password length and complexity."""
    if not isinstance(password, str):
        raise ValueError("Password must be a string")
    if len(password) < 6:
        raise ValueError("Password must be at least 6 characters long")

    # Optional: Check for password complexity
    if not re.search(r"\d", password):
        raise ValueError("Password must contain at least one digit")
    if not re.search(r"[A-Z]", password):
        raise ValueError("Password must contain at least one uppercase letter")
    if not re.search(r"[a-z]", password):
        raise ValueError("Password must contain at least one lowercase letter")
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        raise ValueError("Password must contain at least one special character")

    return True


def validate_username(username):
    """Validate username length and type."""
    if not isinstance(username, str):
        raise ValueError("Username must be a string")
    if len(username) < 3:
        raise ValueError("Username must be at least 3 characters long")
    if not re.match(r"^[a-zA-Z0-9_]+$", username):
        raise ValueError("Username can only contain letters, numbers, and underscores")
    return True


def validate_vote_value(value):
    """Validate vote value (upvote or downvote)."""
    if not isinstance(value, int):
        raise ValueError("Vote value must be an integer")
    if value not in [-1, 1]:
        raise ValueError("Vote value must be either 1 (upvote) or -1 (downvote)")
    return True


def validate_anime_title(title):
    """Validate the anime title to ensure it meets length requirements."""
    if len(title) < 3 or len(title) > 100:
        raise BadRequest("Anime title must be between 3 and 100 characters.")


def validate_episode_title(title):
    """Validate the episode title to ensure it meets length requirements."""
    if len(title) < 3 or len(title) > 150:
        raise BadRequest("Episode title must be between 3 and 150 characters.")


def validate_content_title(title):
    """Validate the content title to ensure it meets length requirements."""
    if len(title) < 3 or len(title) > 120:
        raise BadRequest("Content title must be between 3 and 120 characters.")


