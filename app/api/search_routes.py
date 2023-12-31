from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Animal, SavedSearch
from app.forms import SearchForm
from .auth_routes import validation_errors_to_error_messages

search_routes = Blueprint('searches', __name__)

# GET ALL SEARCHES
@search_routes.route('/')
@login_required
def searches():
    """
    Query for all saved searches and return them in a dictionary
    """
    searches = SavedSearch.query.all()
    return [search.to_dict() for search in searches]

# GET SEARCH BY ID
@search_routes.route('/<int:id>')
@login_required
def single_search(id):
    """
    Query for a saved search by id and returns that search in a dictionary
    """
    search = SavedSearch.query.get(id)
    return search.to_dict()

# GET CURRENT USER SEARCHES
@search_routes.route('/current')
@login_required
def user_searches():
    """
    Query for the current user's saved searches
    """
    user = User.query.get(current_user.id)
    searches = user.saved_searches
    return [search.to_dict() for search in searches]

# CREATE SEARCH
@search_routes.route('/new', methods=['POST'])
@login_required
def create_search():
    """
    Create a new saved search
    """
    form = SearchForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        # Generate a default title based on form fields
        if form.data['type']:
            title = f"{form.data['type']}"
        else:
            title = "All Animals"

        if form.data['age']:
            title += f" | {form.data['age']}"
        if form.data['size']:
            title += f" | {form.data['size']}"
        if form.data['gender']:
            title += f" | {form.data['gender']}"
        if form.data['good_with_cats']:
            title += f" | Good fit with cats"
        if form.data['good_with_dogs']:
            title += f" | Good fit with dogs"
        if form.data['good_with_children']:
            title += f" | Good fit with children"
        if form.data['good_with_other_animals']:
            title += f" | Good fit with other animals"
        if form.data['house_trained']:
            title += f" | House trained"
        if form.data['special_needs']:
            title += f" | Special needs"


        new_search = SavedSearch(
            user_id = current_user.id,
            title = title,
            type = form.data['type'],
            # breed = form.data['breed'],
            age = form.data['age'],
            size = form.data['size'],
            gender = form.data['gender'],
            good_with_cats = form.data['good_with_cats'],
            good_with_dogs = form.data['good_with_dogs'],
            good_with_children = form.data['good_with_children'],
            good_with_other_animals = form.data['good_with_other_animals'],
            house_trained = form.data['house_trained'],
            special_needs = form.data['special_needs'],
            # color = form.data['color'],
            # days_on_site = form.data['days_on_site'],
            # org_name = form.data['org_name'],
            # pet_name = form.data['pet_name'],
            # out_of_town = form.data['out_of_town']
        )

        db.session.add(new_search)
        db.session.commit()

        return new_search.to_dict()

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# UPDATE SEARCH
@search_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_search(id):
    """
    Update a search's title
    """
    search = SavedSearch.query.get(id)

    form = SearchForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        search.title = form.data['title']

        db.session.commit()
        return search.to_dict()

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# DELETE SEARCH
@search_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_search(id):
    """
    Delete a search
    """
    search = SavedSearch.query.get(id)
    db.session.delete(search)
    db.session.commit()
    return {'message': 'Saved search successfully deleted'}
