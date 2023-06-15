from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Animal, SavedSearch

animal_routes = Blueprint('animals', __name__)

# GET ALL ANIMALS
@animal_routes.route('/')
def animals():
    """
    Query for all animals and return them in a dictionary
    """
    # print("🚀 ~ file: animal_routes.py:16 ~ current_user:", current_user)
    type = request.args.get('type')
    age = request.args.get('age')
    size = request.args.get('size')
    gender = request.args.get('gender')
    color = request.args.get('color')

    animals = Animal.query.all()
    filtered_animals = []

    for animal in animals:
        animal_dict = animal.to_dict()
        previewImage = animal.animal_images[0].to_dict()
        animal_dict["previewImage"] = previewImage["imageUrl"]

        if (not age or animal.age == age) and \
            (not type or animal.type == type) and \
            (not size or animal.size == size) and \
            (not gender or animal.gender == gender) and \
            (not color or animal.color == color):
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
        animal_dict = animal.to_dict()
        previewImage = animal.animal_images[0].to_dict()
        animal_dict["previewImage"] = previewImage["imageUrl"]

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
                filtered_animals.append(animal_dict)

    return filtered_animals

# CREATE ANIMAL
@animal_routes.route('/', methods=['POST'])
@login_required
def create_search():
    """
    Create a new saved animal
    """
    form = AnimalForm()

## Create New Post - FINISHED
@post_routes.route("/new", methods=['POST'])
@login_required
def create_post():
    """
    Create a post
    """
    postForm = PostForm()
    postForm['csrf_token'].data = request.cookies['csrf_token']
    post = {}

    err_obj = {}
    if postForm.validate_on_submit():
        new_post = Post(
            content = postForm.data['content'],
            user_id = current_user.id
        )
        db.session.add(new_post)
        db.session.commit()
        post = new_post.to_dict()

        post["postImages"] = []

        images = postForm.data["images"]
        for image in images:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            new_image = PostImage(
                post_id = post["id"],
                image_url = upload["url"]
            )

            db.session.add(new_image)
            db.session.commit()

            image_dict = new_image.to_dict()
            post["postImages"].append(image_dict)


    if postForm.errors:
        return postForm.errors

    return post
