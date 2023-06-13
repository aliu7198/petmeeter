from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        email='demo@aa.io',
        password='password',
        firstName='Demo',
        lastName='User',
        zipCode=10280
    )
    marnie = User(
        email='marnie@aa.io',
        password='password',
        firstName='Marnie',
        lastName='Demo',
        zipCode=32811
    )
    bobbie = User(
        email='bobbie@aa.io',
        password='password',
        firstName='Bobbie',
        lastName='Demo',
        zipCode=94016
    )

    sunshineRescue = User(
        email='sunshinerescue@aa.io',
        password='password',
        adoptionAgency=True,
        orgName='Sunshine Rescue',
        zipCode=32811
    )

    pawsNWhiskers = User(
        email='pawsnwhiskers@aa.io',
        password='password',
        adoptionAgency=True,
        orgName='Paws N\' Whiskers',
        zipCode=10280
    )

    creatureCompanions = User(
        email='creaturecompanions@aa.io',
        password='password',
        adoptionAgency=True,
        orgName='Creature Companions',
        zipCode=94016
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(sunshineRescue)
    db.session.add(pawsNWhiskers)
    db.session.add(creatureCompanions)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
