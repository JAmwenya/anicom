# server/services/episode_service.py

from server.utils.db import db
from server.models.episode import Episode
from server.utils.helpers import create_response


class EpisodeService:
    @staticmethod
    def add_episode(title, description, anime_id, episode_number, rating):
        """Add a new episode to the database."""
        try:
            new_episode = Episode(
                title=title,
                description=description,
                anime_id=anime_id,
                episode_number=episode_number,
                rating=rating,
            )
            db.session.add(new_episode)
            db.session.commit()
            return new_episode.to_dict()

        except Exception as e:
            db.session.rollback()
            return create_response(
                message=f"Error adding episode: {str(e)}", status=500
            )

    @staticmethod
    def get_episode(episode_id):
        """Fetch an episode by its ID."""
        episode = Episode.query.get(episode_id)
        if episode:
            return episode.to_dict()
        return None

    @staticmethod
    def get_all_episodes():
        """Fetch all episodes."""
        try:
            episodes = Episode.query.all()  # Querying episodes from the database
            return [
                episode.to_dict() for episode in episodes
            ], 200  # Return a list of dictionaries, not Response
        except Exception as e:
            return {"message": f"Error fetching episodes: {str(e)}"}, 500

    @staticmethod
    def update_episode(
        episode_id, title=None, description=None, episode_number=None, rating=None
    ):
        """Full update of episode details (PUT)."""
        try:
            episode = Episode.query.get(episode_id)
            if not episode:
                return create_response(message="Episode not found", status=404)

            if title:
                episode.title = title
            if description:
                episode.description = description
            if episode_number:
                episode.episode_number = episode_number
            if rating:
                episode.rating = rating

            db.session.commit()
            return episode.to_dict(), 200
        except Exception as e:
            db.session.rollback()
            return create_response(
                message=f"Error updating episode: {str(e)}", status=500
            )

    @staticmethod
    def patch_episode(
        episode_id, title=None, description=None, episode_number=None, rating=None
    ):
        """Partial update of episode details (PATCH)."""
        try:
            episode = Episode.query.get(episode_id)
            if not episode:
                return create_response(message="Episode not found", status=404)

            if title:
                episode.title = title
            if description:
                episode.description = description
            if episode_number:
                episode.episode_number = episode_number
            if rating:
                episode.rating = rating

            db.session.commit()
            return episode.to_dict(), 200
        except Exception as e:
            db.session.rollback()
            return create_response(
                message=f"Error patching episode: {str(e)}", status=500
            )

    @staticmethod
    def delete_episode(episode_id):
        """Delete an episode by its ID."""
        try:
            episode = Episode.query.get(episode_id)
            if not episode:
                return create_response(message="Episode not found", status=404)

            db.session.delete(episode)
            db.session.commit()
            return create_response(message="Episode deleted successfully", status=200)
        except Exception as e:
            db.session.rollback()
            return create_response(
                message=f"Error deleting episode: {str(e)}", status=500
            )
