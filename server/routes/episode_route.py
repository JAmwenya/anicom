# server/routes/episode_route.py

from flask import Blueprint, request
from server.services.episode_service import EpisodeService
from server.utils.helpers import create_response, custom_jwt_required

episode_bp = Blueprint("episode", __name__)


@episode_bp.route("/episode", methods=["POST"])
@custom_jwt_required
def add_episode():
    """Add a new episode for an anime."""
    try:
        data = request.get_json()
        title = data.get("title")
        description = data.get("description")
        anime_id = data.get("anime_id")
        episode_number = data.get("episode_number")
        rating = data.get("rating")

        episode = EpisodeService.add_episode(
            title, description, anime_id, episode_number, rating
        )
        return create_response(
            data=episode, message="Episode added successfully", status=201
        )

    except Exception as e:
        print(f"Error occurred while adding episode: {str(e)}")  # Error message
        return create_response(message="Internal server error", status=500)


@episode_bp.route("/episode", methods=["GET"])
def get_all_episodes():
    """Fetch all episodes."""
    try:
        episodes, status = EpisodeService.get_all_episodes()
        print(f"Fetched {len(episodes)} episodes.")  # Success message
        return create_response(data=episodes, status=status)
    except Exception as e:
        print(f"Error occurred while fetching episodes: {str(e)}")  # Error message
        return create_response(message="Internal server error", status=500)


@episode_bp.route("/episode/<int:episode_id>", methods=["GET"])
def get_episode(episode_id):
    """Fetch details of a specific episode."""
    try:
        episode = EpisodeService.get_episode(episode_id)
        if not episode:
            return create_response(message="Episode not found", status=404)
        return create_response(data=episode, message="Episode fetched", status=200)

    except Exception as e:
        print(f"Error occurred while fetching episode: {str(e)}")  # Error message
        return create_response(message="Internal server error", status=500)


@episode_bp.route("/episode/<int:episode_id>", methods=["PUT"])
@custom_jwt_required
def update_episode(episode_id):
    """Update an episode with new data (full update)."""
    try:
        data = request.get_json()
        title = data.get("title")
        description = data.get("description")
        episode_number = data.get("episode_number")
        rating = data.get("rating")

        episode, status = EpisodeService.update_episode(
            episode_id, title, description, episode_number, rating
        )
        return create_response(data=episode, status=status)

    except Exception as e:
        print(f"Error occurred while updating episode: {str(e)}")  # Error message
        return create_response(message="Internal server error", status=500)


@episode_bp.route("/episode/<int:episode_id>", methods=["PATCH"])
@custom_jwt_required
def patch_episode(episode_id):
    """Patch (partially update) an episode."""
    try:
        data = request.get_json()
        title = data.get("title")
        description = data.get("description")
        episode_number = data.get("episode_number")
        rating = data.get("rating")

        episode, status = EpisodeService.patch_episode(
            episode_id, title, description, episode_number, rating
        )
        return create_response(data=episode, status=status)

    except Exception as e:
        print(f"Error occurred while patching episode: {str(e)}")  # Error message
        return create_response(message="Internal server error", status=500)


@episode_bp.route("/episode/<int:episode_id>", methods=["DELETE"])
@custom_jwt_required
def delete_episode(episode_id):
    """Delete an episode by ID."""
    try:
        episode, status = EpisodeService.delete_episode(episode_id)
        return create_response(data=episode, status=status)
    except Exception as e:
        print(f"Error occurred while deleting episode: {str(e)}")  # Error message
        return create_response(message="Internal server error", status=500)
