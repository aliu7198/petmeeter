from app.models import db, SavedSearch, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_saved_searches():
    search1 = SavedSearch(
        user_id = 1,
        title = "Cats | Senior",
        type = "Cat",
        age = "Senior"
    )

    search2 = SavedSearch(
        user_id = 1,
        title = "Cats | Female | Good with dogs",
        type = "Cat",
        gender = "Female",
        good_with_dogs = True
    )

    search3 = SavedSearch(
        user_id = 2,
        title = "Dogs | Large | House trained",
        type = "Dog",
        size = "Large",
        house_trained = True
    )

    searches = [search1, search2, search3]
    [db.session.add(search) for search in searches]

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_saved_searches():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.saved_searches RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM saved_searches"))

    db.session.commit()
