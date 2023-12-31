from flask.cli import AppGroup
from .users import seed_users, undo_users
from .animals import seed_animals, undo_animals
from .favorites import seed_favorites, undo_favorites
from .animal_images import seed_animal_images, undo_animal_images
from .saved_searches import seed_saved_searches, undo_saved_searches

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_saved_searches()
        undo_favorites()
        undo_animal_images()
        undo_animals()
        undo_users()
    seed_users()
    seed_animals()
    seed_animal_images()
    seed_favorites()
    seed_saved_searches()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_saved_searches()
    undo_favorites()
    undo_animal_images()
    undo_animals()
    undo_users()
    # Add other undo functions here
