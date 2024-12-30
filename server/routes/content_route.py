# server/routes/content_route.py

from flask import Blueprint, request
from server.services.content_service import ContentService
from server.utils.helpers import create_response, custom_jwt_required

content_bp = Blueprint("content", __name__)


@content_bp.route("/content", methods=["GET"])
def get_all_content():
    """Fetch all content."""
    try:
        content, status = ContentService.get_all_content()
        print(f"Fetched {len(content)} content.")

        if not isinstance(content, list):
            raise TypeError("Content data should be a list of dictionaries")

        return create_response(data=content, status=status)
    except Exception as e:
        print(f"Error occurred while fetching content: {str(e)}")
        return create_response(message=f"Error: {str(e)}", status=500)


@content_bp.route("/content/<int:content_id>", methods=["GET"])
def get_content(content_id):
    """Fetch content by ID."""
    try:
        content, status = ContentService.get_content_by_id(content_id)
        return create_response(data=content, status=status)
    except Exception as e:
        print(
            f"Error occurred while fetching content with ID {content_id}: {str(e)}"
        )  # Error message
        return create_response(message=str(e), status=500)


@content_bp.route("/content", methods=["POST"])
@custom_jwt_required
def create_new_content(user_id):
    """Create new content (review, article, fan art)."""
    try:
        data = request.get_json()
        title = data.get("title")
        body = data.get("body")
        content_type = data.get("content_type")
        anime_id = data.get("anime_id", None)

        # Call the ContentService to create the content
        content, status = ContentService.create_content(
            title, body, content_type, user_id, anime_id
        )
        return create_response(data=content, status=status)

    except Exception as e:
        print(f"Error occurred while creating new content: {str(e)}")  # Error message
        return create_response(message=str(e), status=500)


@content_bp.route("/content/<int:content_id>", methods=["PATCH"])
@custom_jwt_required
def patch_content(content_id):
    """Patch (partially update) content."""
    try:
        data = request.get_json()
        title = data.get("title")
        body = data.get("body")
        content_type = data.get("content_type")

        content, status = ContentService.patch_content(
            content_id, title, body, content_type
        )
        return create_response(data=content, status=status)

    except Exception as e:
        print(
            f"Error occurred while patching content with ID {content_id}: {str(e)}"
        )  # Error message
        return create_response(message=str(e), status=500)


@content_bp.route("/content/<int:content_id>", methods=["PUT"])
@custom_jwt_required
def update_content(content_id):
    """Update content."""
    try:
        data = request.get_json()
        title = data.get("title")
        body = data.get("body")
        content_type = data.get("content_type")

        content, status = ContentService.update_content(
            content_id, title, body, content_type
        )
        return create_response(data=content, status=status)

    except Exception as e:
        print(
            f"Error occurred while updating content with ID {content_id}: {str(e)}"
        )  # Error message
        return create_response(message=str(e), status=500)


@content_bp.route("/content/<int:content_id>", methods=["DELETE"])
@custom_jwt_required
def delete_content(content_id):
    """Delete content by ID."""
    try:
        content, status = ContentService.delete_content(content_id)
        return create_response(data=content, status=status)
    except Exception as e:
        print(
            f"Error occurred while deleting content with ID {content_id}: {str(e)}"
        )  # Error message
        return create_response(message=str(e), status=500)
