# server/models/anime.py

from datetime import datetime
from server.utils.db import db
from server.utils.validators import validate_anime_title


class Anime(db.Model):
    """Anime model representing an anime series on the platform."""

    __tablename__ = "anime"

    """Define the columns for the anime table"""
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(500))
    genre = db.Column(db.String(100))
    release_date = db.Column(db.Date)
    image = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    """Relationships"""
    content = db.relationship("Content", back_populates="anime", lazy=True)
    episodes = db.relationship("Episode", back_populates="anime", lazy=True)
    votes = db.relationship("Vote", back_populates="anime", lazy=True)

    def __repr__(self):
        """Represent the anime object in a readable format."""
        return f"<Anime {self.title}>"

    @classmethod
    def validate_anime(cls, title):
        """Validate the title input for the anime."""
        validate_anime_title(title)

    def to_dict(self, include_content=True, include_episodes=True, include_votes=True):
        """Converts the Anime object into a dictionary format for JSON serialization."""
        anime_dict = {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "genre": self.genre,
            "release_date": self.release_date.isoformat()
            if self.release_date
            else None,
            "image": self.image,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

        if include_content:
            """Include content if specified"""
            anime_dict["content"] = [
                content.to_dict(include_user=False, include_anime=False)
                for content in self.content
            ]

        if include_episodes:
            """Include episodes if specified"""
            anime_dict["episodes"] = [
                episode.to_dict(include_anime=False) for episode in self.episodes
            ]

        if include_votes:
            """If include_votes is True, include the votes data"""
            anime_dict["votes"] = [vote.to_dict() for vote in self.votes]

        return anime_dict
