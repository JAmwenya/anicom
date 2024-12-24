# server/services/content_service.py

from server.models.content import Content
from server.utils.db import db
from server.utils.helpers import create_response
from server.utils.validators import validate_content_title


class ContentService:
    @staticmethod
    def create_content(title, body, content_type, user_id, anime_id=None):
        """Create new content (review, article, fan art)."""
        try:
            # Validate content title
            validate_content_title(title)

            # Create the content
            content = Content(
                title=title,
                body=body,
                content_type=content_type,
                user_id=user_id,
                anime_id=anime_id,
            )
            db.session.add(content)
            db.session.commit()

            # Success message
            print(f"Content created successfully with title: {title}")
            return content.to_dict(), 201

        except Exception as e:
            db.session.rollback()
            print(f"Error creating content: {str(e)}")  # Error message
            return create_response(
                message=f"Error creating content: {str(e)}", status=500
            )

    @staticmethod
    def get_all_content():
        """Fetch all content."""
        try:
            content_list = Content.query.all()


            return [content.to_dict() for content in content_list], 200
        except Exception as e:
            print(f"Error fetching content: {str(e)}")  # Error message
            return create_response(
                message=f"Error fetching content: {str(e)}", status=500
            )

    @staticmethod
    def get_content_by_id(content_id):
        """Fetch content by ID."""
        try:
            content = Content.query.get(content_id)
            if not content:
                return create_response(message="Content not found", status=404)

            # Success message
            print(f"Fetched content with ID: {content_id}")
            return content.to_dict(), 200

        except Exception as e:
            print(f"Error fetching content: {str(e)}")  # Error message
            return create_response(
                message=f"Error fetching content: {str(e)}", status=500
            )

    @staticmethod
    def patch_content(content_id, title=None, body=None, content_type=None):
        """Patch (partially update) content."""
        try:
            content = Content.query.get(content_id)
            if not content:
                return create_response(message="Content not found", status=404)

            # Update only the provided fields
            if title:
                content.title = title
            if body:
                content.body = body
            if content_type:
                content.content_type = content_type

            db.session.commit()

            # Success message
            print(f"Content with ID {content_id} patched successfully.")
            return content.to_dict(), 200

        except Exception as e:
            db.session.rollback()
            print(f"Error patching content: {str(e)}")  # Error message
            return create_response(
                message=f"Error patching content: {str(e)}", status=500
            )

    @staticmethod
    def update_content(content_id, title=None, body=None, content_type=None):
        """Update existing content."""
        try:
            content = Content.query.get(content_id)
            if not content:
                return create_response(message="Content not found", status=404)

            # Update the fields if provided
            if title:
                content.title = title
            if body:
                content.body = body
            if content_type:
                content.content_type = content_type

            db.session.commit()

            # Success message
            print(f"Content with ID {content_id} updated successfully.")
            return content.to_dict(), 200

        except Exception as e:
            db.session.rollback()
            print(f"Error updating content: {str(e)}")  # Error message
            return create_response(
                message=f"Error updating content: {str(e)}", status=500
            )

    @staticmethod
    def delete_content(content_id):
        """Delete content by ID."""
        try:
            content = Content.query.get(content_id)
            if not content:
                return create_response(message="Content not found", status=404)

            db.session.delete(content)
            db.session.commit()

            # Success message
            print(f"Content with ID {content_id} deleted successfully.")
            return create_response(message="Content deleted successfully", status=200)

        except Exception as e:
            db.session.rollback()
            print(f"Error deleting content: {str(e)}")  # Error message
            return create_response(
                message=f"Error deleting content: {str(e)}", status=500
            )
