from app.models import db, Animal, environment, SCHEMA
from sqlalchemy.sql import text


def seed_animals():
    cat1 = Animal(
        owner_id = 1,
        type = 'Cat',
        name = 'Stinky',
        age = 'Young',
        gender = 'Male',
        size = 'Large',
        breed = 'Domestic Shorthair',
        adoption_fee = 100.00
    )

    db.session.add(cat1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_animals():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.animals RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM animals"))

    db.session.commit()
