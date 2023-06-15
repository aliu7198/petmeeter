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

        title = f"{form.data['type']} | "

        # TODO: generate a title based on search criteria put in

        new_search = SavedSearch(
            user_id = current_user.id,
            title = title,
            type = form.data['type'],
            breed = form.data['breed'],
            age = form.data['age'],
            size = form.data['size'],
            gender = form.data['gender'],
            good_with_cats = form.data['good_with_cats'],
            good_with_dogs = form.data['good_with_dogs'],
            good_with_children = form.data['good_with_children'],
            good_with_other_animals = form.data['good_with_other_animals'],
            house_trained = form.data['house_trained'],
            special_needs = form.data['special_needs'],
            coat_length = form.data['coat_length'],
            color = form.data['color'],
            days_on_site = form.data['days_on_site'],
            org_name = form.data['org_name'],
            pet_name = form.data['pet_name'],
            out_of_town = form.data['out_of_town']
        )

        db.session.add(new_search)
        db.session.commit()

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
