# server/models/episode.py

from datetime import datetime
from server.utils.db import db
from server.utils.validators import validate_episode_title


class Episode(db.Model):
    """Episode model representing an episode of an anime show."""

    __tablename__ = "episodes"

    """Define the columns for the episodes table"""
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(500))
    anime_id = db.Column(db.Integer, db.ForeignKey("anime.id"), nullable=False)
    episode_number = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    """Relationships"""
    anime = db.relationship("Anime", back_populates="episodes")
    votes = db.relationship("Vote", back_populates="episode", lazy=True)

    def __repr__(self):
        """Represent the episode object in a readable format."""
        return f"<Episode {self.title} ({self.episode_number})>"

    @classmethod
    def validate_episode(cls, title):
        """Validate the title input for the episode."""
        validate_episode_title(title)

    def to_dict(self, include_anime=True, include_votes=True):
        """Converts the Episode object into a dictionary format for JSON serialization."""
        episode_dict = {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "episode_number": self.episode_number,
            "rating": self.rating,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "anime_id": self.anime_id,
        }

        if include_anime and self.anime:
            """Include anime data if specified"""
            episode_dict["anime"] = self.anime.to_dict(
                include_content=False, include_episodes=False, include_votes=False
            )

        if include_votes:
            """Include anime data if specified"""
            episode_dict["votes"] = [
                vote.to_dict(include_user=False, include_episode=False)
                for vote in self.votes
            ]

        return episode_dict
