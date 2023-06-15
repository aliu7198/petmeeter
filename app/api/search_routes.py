from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Animal, SavedSearch
from app.forms import SearchForm

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

# # CREATE SEARCH
# @search_routes.route('/new', methods=['POST'])
# @login_required
# def create_search():
#     """
#     Create a new saved search
#     """
#     form = SearchForm()
