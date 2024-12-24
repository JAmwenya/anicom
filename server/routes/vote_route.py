# server/routes/vote_route.py

from flask import Blueprint, request
from server.services.vote_service import VoteService
from server.utils.helpers import create_response, custom_jwt_required

vote_bp = Blueprint("vote", __name__)


@vote_bp.route("/vote", methods=["POST"])
@custom_jwt_required
def add_vote():
    """Allow a user to vote on an episode."""
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        episode_id = data.get("episode_id")
        vote_value = data.get("vote_value")

        vote = VoteService.add_vote(user_id, episode_id, vote_value)
        return create_response(
            data=vote.to_dict(), message="Vote recorded successfully", status=201
        )

    except Exception as e:
        print(f"Error occurred while adding vote: {str(e)}")  # Error message
        return create_response(message="Internal server error", status=500)


@vote_bp.route("/vote/<int:vote_id>", methods=["GET"])
def get_vote(vote_id):
    """Fetch a specific vote by its ID."""
    try:
        vote = VoteService.get_vote(vote_id)
        if not vote:
            return create_response(message="Vote not found", status=404)
        return create_response(data=vote.to_dict(), message="Vote fetched", status=200)

    except Exception as e:
        print(f"Error occurred while fetching vote: {str(e)}")  # Error message
        return create_response(message="Internal server error", status=500)
