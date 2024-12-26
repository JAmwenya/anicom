# server/services/vote_service.py

from server.models.vote import Vote
from server.utils.db import db
from server.utils.validators import validate_vote_value


class VoteService:
    @staticmethod
    def add_vote(user_id, episode_id, vote_value, anime_id):
        """Allow a user to vote on an episode."""
        if not validate_vote_value(vote_value):
            raise ValueError("Invalid vote value")

        new_vote = Vote(user_id=user_id, episode_id=episode_id, vote=vote_value, anime_id=anime_id)
        db.session.add(new_vote)
        db.session.commit()
        return new_vote

    @staticmethod
    def get_vote(vote_id):
        """Fetch a specific vote by its ID."""
        vote = Vote.query.get(vote_id)
        return vote
