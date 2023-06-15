from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Animal, SavedSearch

animal_routes = Blueprint('animals', __name__)

# GET ALL ANIMALS
@animal_routes.route('/')
@login_required
def searches():
    """
    Query for all animals and return them in a dictionary
    """
    animals = Animal.query.all()
    return {'animals': [animal.to_dict() for animal in animals]}

# GET ANIMAL BY ID
@animal_routes.route('/<int:id>')
@login_required
def single_animal(id):
    """
    Query for an animal by id and returns that animal in a dictionary
    """
    animal = Animal.query.get(id)
    return animal.to_dict()

# GET ANIMAL BY SEARCH
@animal_routes.route('/search/<int:id>')
@login_required
def get_animals_by_search(id):
    """
    Query for animals matching saved search criteria and return them in a dictionary
    """
    search = SavedSearch.query.get(id)
    animals = Animal.query.all()

    if not search:
        return {"error": "Invalid search ID"}, 404

    age = search.age
    breed = search.breed
    coat_length = search.coat_length
    color = search.color
    days_on_site = search.days_on_site
    gender = search.gender

    good_with_cats = search.good_with_cats
    good_with_dogs = search.good_with_dogs
    good_with_children = search.good_with_children
    good_with_other_animals = search.good_with_other_animals

    house_trained = search.house_trained
    org_name = search.org_name
    out_of_town = search.out_of_town
    pet_name = search.pet_name
    size = search.size
    special_needs = search.special_needs
    type = search.type

    filtered_animals = []
    for animal in animals:
        if (not age or animal.age == age) and \
            (not breed or animal.breed == breed) and \
            (not coat_length or animal.coat_length == coat_length) and \
            (not color or animal.color == color) and \
            (not days_on_site or animal.days_on_site == days_on_site) and \
            (not gender or animal.gender == gender) and \
            (not good_with_cats or animal.good_with_cats == good_with_cats) and \
            (not good_with_dogs or animal.good_with_dogs == good_with_dogs) and \
            (not good_with_children or animal.good_with_children == good_with_children) and \
            (not good_with_other_animals or animal.good_with_other_animals == good_with_children) and \
            (not house_trained or animal.house_trained == house_trained) and \
            (not org_name or animal.org_name == org_name) and \
            (not out_of_town or animal.out_of_town == out_of_town) and \
            (not pet_name or animal.pet_name == pet_name) and \
            (not size or animal.size == size) and \
            (not special_needs or animal.special_needs == special_needs) and \
            (not type or animal.type == type):
                filtered_animals.append(animal.to_dict())

    return filtered_animals

# # CREATE ANIMAL
# @animal_routes.route('/new', methods=['POST'])
# @login_required
# def create_search():
#     """
#     Create a new saved animal
#     """
