from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Animal, SavedSearch, AnimalImage
from app.forms import AnimalForm
from .AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from .auth_routes import validation_errors_to_error_messages


animal_routes = Blueprint('animals', __name__)

# GET ALL ANIMALS
@animal_routes.route('')
def animals():
    """
    Query for all animals and return them in a list of dictionaries
    """
    type = request.args.get('type')
    age = request.args.get('age')
    size = request.args.get('size')
    gender = request.args.get('gender')
    color = request.args.get('color')
    good_with_cats = None
    good_with_dogs = None
    good_with_children = None
    good_with_other_animals = None
    house_trained = None
    special_needs = None
    if request.args.get('goodWithCats') == 'true':
        good_with_cats = True
    if request.args.get('goodWithDogs') == 'true':
        good_with_dogs = True
    if request.args.get('goodWithChildren') == 'true':
        good_with_children = True
    if request.args.get('goodWithOtherAnimals') == 'true':
        good_with_other_animals = True
    if request.args.get('houseTrained') == 'true':
        house_trained = True
    if request.args.get('specialNeeds') == 'true':
        special_needs = True

    animals = Animal.query.all()
    filtered_animals = []

    for animal in animals:
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

        if (not age or animal.age == age) and \
            (not type or animal.type == type) and \
            (not size or animal.size == size) and \
            (not gender or animal.gender == gender) and \
            (not color or animal.color == color) and \
            (not good_with_cats or animal.good_with_cats == good_with_cats) and \
            (not good_with_dogs or animal.good_with_dogs == good_with_dogs) and \
            (not good_with_children or animal.good_with_children == good_with_children) and \
            (not good_with_other_animals or animal.good_with_other_animals == good_with_other_animals) and \
            (not house_trained or animal.house_trained == house_trained) and \
            (not special_needs or animal.special_needs == special_needs):
                filtered_animals.append(animal_dict)

    return filtered_animals


    # return [animal.to_dict() for animal in animals]

# GET ANIMAL BY ID
@animal_routes.route('/<int:id>')
@login_required
def single_animal(id):
    """
    Query for an animal by id and returns that animal in a dictionary
    """
    animal = Animal.query.get(id)
    images = animal.animal_images

    animal_dict = animal.to_dict()
    animal_dict["images"] = []

    for image in images:
        animal_dict["images"].append(image.to_dict())

    return animal_dict

# # GET ANIMAL BY SEARCH - NOT IN USE
# @animal_routes.route('/search/<int:id>')
# @login_required
# def get_animals_by_search(id):
#     """
#     Query for animals matching saved search criteria and return them in a dictionary
#     """
#     search = SavedSearch.query.get(id)
#     animals = Animal.query.all()

#     if not search:
#         return {"error": "Invalid search ID"}, 404

#     age = search.age
#     breed = search.breed
#     color = search.color
#     days_on_site = search.days_on_site
#     gender = search.gender

#     good_with_cats = search.good_with_cats
#     good_with_dogs = search.good_with_dogs
#     good_with_children = search.good_with_children
#     good_with_other_animals = search.good_with_other_animals

#     house_trained = search.house_trained
#     org_name = search.org_name
#     out_of_town = search.out_of_town
#     pet_name = search.pet_name
#     size = search.size
#     special_needs = search.special_needs
#     type = search.type

#     filtered_animals = []
#     for animal in animals:
#         animal_dict = animal.to_dict()
#         previewImage = animal.animal_images[0].to_dict()
#         animal_dict["previewImage"] = previewImage["imageUrl"]

#         if (not age or animal.age == age) and \
#             (not breed or animal.breed == breed) and \
#             (not color or animal.color == color) and \
#             (not days_on_site or animal.days_on_site == days_on_site) and \
#             (not gender or animal.gender == gender) and \
#             (not good_with_cats or animal.good_with_cats == good_with_cats) and \
#             (not good_with_dogs or animal.good_with_dogs == good_with_dogs) and \
#             (not good_with_children or animal.good_with_children == good_with_children) and \
#             (not good_with_other_animals or animal.good_with_other_animals == good_with_children) and \
#             (not house_trained or animal.house_trained == house_trained) and \
#             (not org_name or animal.org_name == org_name) and \
#             (not out_of_town or animal.out_of_town == out_of_town) and \
#             (not pet_name or animal.pet_name == pet_name) and \
#             (not size or animal.size == size) and \
#             (not special_needs or animal.special_needs == special_needs) and \
#             (not type or animal.type == type):
#                 filtered_animals.append(animal_dict)

#     return filtered_animals

# CREATE ANIMAL - WORKS
@animal_routes.route('/new', methods=['POST'])
@login_required
def create_search():
    """
    Create a new animal
    """
    form = AnimalForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_animal = Animal(
            owner_id = current_user.id,
            type = form.data['type'],
            name = form.data['name'],
            age = form.data['age'],
            gender = form.data['gender'],
            size = form.data['size'],
            primary_breed = form.data['primary_breed'].title(),
            secondary_breed = form.data['secondary_breed'].title(),
            color = form.data['color'].title(),
            house_trained = form.data['house_trained'],
            vaccinated = form.data['vaccinated'],
            fixed = form.data['fixed'],
            special_needs = form.data['special_needs'],
            good_with_cats = form.data['good_with_cats'],
            good_with_dogs = form.data['good_with_dogs'],
            good_with_children = form.data['good_with_children'],
            good_with_other_animals = form.data['good_with_other_animals'],
            description = form.data['description'],
            adoption_fee = form.data['adoption_fee'],
        )

        db.session.add(new_animal)
        db.session.commit()
        animal = new_animal.to_dict()
        animal["animalImages"] = []

        images = form.data['images']
        for image in images:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            new_image = AnimalImage(
                animal_id = animal["id"],
                image_url = upload["url"]
            )

            db.session.add(new_image)
            db.session.commit()

            image_dict = new_image.to_dict()
            animal['animalImages'].append(image_dict)

        return animal

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# UPDATE ANIMAL
@animal_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_animal(id):
    """
    Update an animal
    """
    animal = Animal.query.get(id)

    form = AnimalForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        animal.type = form.data['type']
        animal.name = form.data['name']
        animal.age = form.data['age']
        animal.gender = form.data['gender']
        animal.size = form.data['size']
        animal.primary_breed = form.data['primary_breed'].title()
        animal.secondary_breed = form.data['secondary_breed'].title()
        animal.color = form.data['color'].title()
        animal.house_trained = form.data['house_trained']
        animal.vaccinated = form.data['vaccinated']
        animal.fixed = form.data['fixed']
        animal.special_needs = form.data['special_needs']
        animal.good_with_cats = form.data['good_with_cats']
        animal.good_with_dogs = form.data['good_with_dogs']
        animal.good_with_children = form.data['good_with_children']
        animal.good_with_other_animals = form.data['good_with_other_animals']
        animal.description = form.data['description']
        animal.adoption_fee = form.data['adoption_fee']

        db.session.commit()
        return animal.to_dict()

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# DELETE ANIMAL
@animal_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_animal(id):
    """
    Delete an animal
    """
    animal = Animal.query.get(id)

    images_list = [animal.animal_image.to_dict() for animal.animal_image in animal.animal_images]

    [remove_file_from_s3(image["imageUrl"]) for image in images_list]

    db.session.delete(animal)
    db.session.commit()
    return {'message': 'Post successfully deleted'}
