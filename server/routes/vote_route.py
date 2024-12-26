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
        anime_id = data.get("anime_id")

        # Validate inputs
        if not all([episode_id, vote_value, anime_id]):
            return create_response(
                message="Missing required fields: episode_id, vote_value, anime_id",
                status=400,
            )

        if not isinstance(vote_value, int) or not (1 <= vote_value <= 5):
            return create_response(
                message="Invalid vote value. Must be an integer between 1 and 5.",
                status=400,
            )

        vote = VoteService.add_vote(user_id, episode_id, vote_value, anime_id)
        return create_response(
            data=vote.to_dict(), message="Vote recorded successfully", status=201
        )

    except Exception as e:
        print(f"Error occurred while adding vote: {str(e)}")
        return create_response(message="Internal server error", status=500)


@vote_bp.route("/vote/<int:vote_id>", methods=["PATCH"])
@custom_jwt_required
def update_vote(vote_id):
    """Allow a user to update their vote."""
    try:
        data = request.get_json()
        vote_value = data.get("vote_value")

        vote = VoteService.update_vote(vote_id, vote_value)
        return create_response(
            data=vote.to_dict(), message="Vote updated successfully", status=200
        )

    except Exception as e:
        print(f"Error occurred while updating vote: {str(e)}")

        return create_response(message="Internal server error", status=500)
    

@vote_bp.route("/vote", methods=["GET"])
def get_votes():
    """Fetch all votes."""
    try:
        votes = VoteService.get_votes()
        return create_response(
            data=[vote.to_dict() for vote in votes], message="Votes fetched", status=200
        )

    except Exception as e:
        print(f"Error occurred while fetching votes: {str(e)}")
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


@vote_bp.route("/vote/<int:vote_id>", methods=["DELETE"])
@custom_jwt_required
def delete_vote(vote_id):
    """Allow a user to delete their vote."""
    try:
        vote = VoteService.delete_vote(vote_id)
        return create_response(
            data=vote.to_dict(), message="Vote deleted successfully", status=200
        )

    except Exception as e:
        print(f"Error occurred while deleting vote: {str(e)}")
        return create_response(message="Internal server error", status=500)
    