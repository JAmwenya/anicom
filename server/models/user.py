# server/models/user.py

from datetime import datetime
from server.utils.db import db
from server.utils.validators import validate_email, validate_username
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    """User model representing the user of the platform."""

    __tablename__ = "users"

    """Define the columns for the users table"""
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False, default="user")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    avatar = db.Column(db.String(255), nullable=True)

    """Relationships"""
    votes = db.relationship("Vote", back_populates="user", lazy=True)
    content = db.relationship("Content", back_populates="user", lazy=True)

    def __repr__(self):
        """Represent the user object in a readable format."""
        return f"<User {self.username}>"

    def set_password(self, password):
        """Set the password hash for the user."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Check if the provided password matches the stored password hash."""
        return check_password_hash(self.password_hash, password)

    def set_avatar(self, avatar_url):
        """Set the avatar URL for the user."""
        self.avatar = avatar_url

    @classmethod
    def validate_user(cls, username, email):
        """Validate the username and email inputs for the user."""
        validate_username(username)
        validate_email(email)

    def to_dict(self, include_votes=True, include_content=True, include_anime=True):
        """Converts the User object into a dictionary format for JSON serialization."""
        user_dict = {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "role": self.role,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "avatar": self.avatar,
        }

        if include_votes:
            """Include votes if specified"""
            user_dict["votes"] = [
                vote.to_dict(include_user=False, include_episode=False)
                for vote in self.votes
            ]

        if include_content:
            """Include content if specified"""
            user_dict["content"] = [
                content.to_dict(include_user=False, include_anime=False)
                for content in self.content
            ]

        return user_dict
