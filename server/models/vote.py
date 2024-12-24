# server/models/vote.py

from server.utils.db import db


class Vote(db.Model):
    """Vote model representing a vote given by a user for an episode."""

    __tablename__ = "votes"

    """Define the columns for the votes table"""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    episode_id = db.Column(db.Integer, db.ForeignKey("episodes.id"), nullable=False)
    vote = db.Column(db.Integer, nullable=False)
    anime_id = db.Column(db.Integer, db.ForeignKey("anime.id"), nullable=False)

    """Relationships"""
    user = db.relationship("User", back_populates="votes")
    episode = db.relationship("Episode", back_populates="votes")
    anime = db.relationship("Anime", back_populates="votes")

    def __repr__(self):
        """Represent the vote object in a readable format."""
        return f"<Vote {self.vote} on Episode {self.episode_id}>"

    def to_dict(self, include_user=True, include_episode=True):
        """Converts the Vote object into a dictionary format for JSON serialization."""
        vote_dict = {
            "id": self.id,
            "user_id": self.user_id,
            "anime_id": self.anime_id,
            "episode_id": self.episode_id,
            "vote": self.vote,
        }

        
        if include_user and self.user:
            """Include user data if specified"""
            vote_dict["user"] = self.user.to_dict(
                include_content=False, include_anime=False
            )

        if include_episode and self.episode:
            """Include episode data if specified"""
            vote_dict["episode"] = self.episode.to_dict(
                include_anime=False, include_votes=False
            )

        return vote_dict
