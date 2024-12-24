# model/content.py

from server.utils.db import db
from server.utils.validators import validate_content_title


class Content(db.Model):
    """Content model representing user-generated content like reviews or fan art."""

    __tablename__ = "content"

    """Define the columns for the content table"""
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    body = db.Column(db.Text, nullable=False)
    content_type = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    anime_id = db.Column(db.Integer, db.ForeignKey("anime.id"), nullable=True)

    """Relationships"""
    user = db.relationship("User", back_populates="content")
    anime = db.relationship("Anime", back_populates="content")

    def __repr__(self):
        """Represent the content object in a readable format."""
        return f"<Content {self.title}>"

    @classmethod
    def validate_content(cls, title):
        """Validate the title input for the content."""
        validate_content_title(title)
        
    def to_dict(self, include_user=True, include_anime=True):
        """Converts the Content object into a dictionary format for JSON serialization."""
        content_dict = {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "content_type": self.content_type,
            "user_id": self.user_id,
            "anime_id": self.anime_id,
        }
        
        if include_user and self.user:
            """Include user data if specified"""
            content_dict["user"] = self.user.to_dict(
                include_content=False, include_anime=False
            )

        if include_anime and self.anime:
            """Include anime data if specified"""
            content_dict["anime"] = self.anime.to_dict(
                include_content=False, include_episodes=False
            )

        return content_dict
