# server/services/anime_service.py

from server.models.anime import Anime
from server.utils.db import db
from server.utils.validators import validate_anime_title


class AnimeService:
    @staticmethod
    def get_all_animes():
        """Fetch all animes from the database."""
        try:
            # Query to fetch all animes from the database
            return Anime.query.all()
        except Exception as e:
            # Log or handle exception if needed
            raise Exception(f"Error fetching animes: {str(e)}")
        
    @staticmethod
    def add_anime(title, description, genre, release_date):
        """Add a new anime to the database."""
        if not validate_anime_title(title):
            raise ValueError("Invalid anime title")

        new_anime = Anime(
            title=title, description=description, genre=genre, release_date=release_date
        )
        db.session.add(new_anime)
        db.session.commit()
        return new_anime

    @staticmethod
    def get_anime(anime_id):
        """Fetch details of an anime by its ID."""
        anime = Anime.query.get(anime_id)
        return anime

    @staticmethod
    def update_anime(
        anime_id, title=None, description=None, genre=None, release_date=None
    ):
        """Update details of an existing anime."""
        anime = Anime.query.get(anime_id)
        if not anime:
            raise ValueError("Anime not found")

        if title:
            anime.title = title
        if description:
            anime.description = description
        if genre:
            anime.genre = genre
        if release_date:
            anime.release_date = release_date

        db.session.commit()
        return anime

    @staticmethod
    def delete_anime(anime_id):
        """Delete an anime by ID."""
        anime = Anime.query.get(anime_id)
        if not anime:
            return False

        db.session.delete(anime)
        db.session.commit()
        return True
