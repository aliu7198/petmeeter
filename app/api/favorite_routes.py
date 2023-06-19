from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Animal, SavedSearch, AnimalImage, User
from app.forms import AnimalForm
from .AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from .auth_routes import validation_errors_to_error_messages


favorite_routes = Blueprint('favorites', __name__)

# GET USER FAVORITES
@favorite_routes.route('/')
@login_required
def user_favorites():
    """
    Query for all user favorites and return them in a list of dictionaries
    """
    user = User.query.get(current_user.id)

    favorited_animals = user.favorites

    animals_list = []
    for animal in favorited_animals:
        animal_dict = animal.to_dict()

        images = animal.animal_images

        previewImage = animal.animal_images[0].to_dict()
        animal_dict["previewImage"] = previewImage["imageUrl"]

        user_favorites = animal.favorites
        animal_dict["favoritedBy"] = []
        for user in user_favorites:
            animal_dict["favoritedBy"].append(user.id)


        animal_dict["images"] = []
        for image in images:
            animal_dict["images"].append(image.to_dict())

        animals_list.append(animal_dict)

    return animals_list

# FAVORITE AN ANIMAL
@favorite_routes.route('/animals/<int:id>', methods=['POST'])
@login_required
def create_favorite(id):
    """
    Add an animal to favorites
    """
    print("🚀 ~ file: favorite_routes.py:52 ~  HITTING BACKEND:")
    user = User.query.get(current_user.id)
    animal = Animal.query.get(id)

    user.favorites.append(animal)
    db.session.commit()
    return animal.to_dict()

# REMOVE ANIMAL FROM FAVORITES
@favorite_routes.route('/animals/<int:id>', methods=["DELETE"])
@login_required
def remove_favorite(id):
    """
    Remove an animal from favorites
    """
    user = User.query.get(current_user.id)
    animal = Animal.query.get(id)

    user.favorites.remove(animal)
    db.session.commit()

    return {'message': 'Successfully removed animal from favorites!'}
