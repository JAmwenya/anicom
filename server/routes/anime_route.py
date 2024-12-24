# server/routes/anime_route.py

from flask import Blueprint, request
from server.services.anime_service import AnimeService
from server.utils.helpers import create_response, custom_jwt_required

anime_bp = Blueprint("anime", __name__)


@anime_bp.route("/anime", methods=["POST"])
@custom_jwt_required
def add_anime():
    """Add a new anime to the platform."""
    try:
        data = request.get_json()
        title = data.get("title")
        description = data.get("description")
        genre = data.get("genre")
        release_date = data.get("release_date")

        anime = AnimeService.add_anime(title, description, genre, release_date)
        return create_response(
            data=anime.to_dict(), message="Anime added successfully", status=201
        )

    except Exception as e:
        print(f"Error occurred while adding anime: {str(e)}")  # Error message
        return create_response(message="Internal server error", status=500)


@anime_bp.route("/anime", methods=["GET"])
def get_all_animes():
    """Fetch all animes."""
    try:
        animes = AnimeService.get_all_animes()
        print(f"Fetched {len(animes)} animes.")  # Success message
        return create_response(
            data=[anime.to_dict() for anime in animes],
            message="Animes fetched",
            status=200,
        )

    except Exception as e:
        print(f"Error occurred while fetching animes: {str(e)}")  # Error message
        return create_response(message="Internal server error", status=500)


@anime_bp.route("/anime/<int:anime_id>", methods=["GET"])
def get_anime(anime_id):
    """Fetch details of a specific anime."""
    try:
        anime = AnimeService.get_anime(anime_id)
        if not anime:
            return create_response(message="Anime not found", status=404)
        return create_response(
            data=anime.to_dict(), message="Anime fetched", status=200
        )

    except Exception as e:
        print(f"Error occurred while fetching anime: {str(e)}")  # Error message
        return create_response(message="Internal server error", status=500)


@anime_bp.route("/anime/<int:anime_id>", methods=["PUT"])
@custom_jwt_required
def update_anime(anime_id):
    """Update details of an existing anime."""
    try:
        data = request.get_json()
        title = data.get("title")
        description = data.get("description")
        genre = data.get("genre")
        release_date = data.get("release_date")

        anime = AnimeService.update_anime(
            anime_id, title, description, genre, release_date
        )
        return create_response(
            data=anime.to_dict(), message="Anime updated successfully", status=200
        )

    except Exception as e:
        print(f"Error occurred while updating anime: {str(e)}")  # Error message
        return create_response(message="Internal server error", status=500)


@anime_bp.route("/anime/<int:anime_id>", methods=["PATCH"])
@custom_jwt_required
def patch_anime(anime_id):
    """Partially update details of an existing anime."""
    try:
        data = request.get_json()
        title = data.get("title")
        description = data.get("description")
        genre = data.get("genre")
        release_date = data.get("release_date")

        # Call the service to update the anime partially
        anime = AnimeService.patch_anime(
            anime_id, title, description, genre, release_date
        )
        return create_response(
            data=anime.to_dict(), message="Anime partially updated", status=200
        )

    except Exception as e:
        print(
            f"Error occurred while partially updating anime: {str(e)}"
        )  # Error message
        return create_response(message="Internal server error", status=500)


@anime_bp.route("/anime/<int:anime_id>", methods=["DELETE"])
@custom_jwt_required
def delete_anime(anime_id):
    """Delete an anime by ID."""
    try:
        success = AnimeService.delete_anime(anime_id)
        if not success:
            return create_response(message="Anime not found", status=404)
        return create_response(message="Anime deleted successfully", status=200)

    except Exception as e:
        print(f"Error occurred while deleting anime: {str(e)}")  # Error message
        return create_response(message="Internal server error", status=500)
