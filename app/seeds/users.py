from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    #1
    demo = User(
        email='demo@aa.io',
        password='password',
        first_name='Demo',
        last_name='User',
        zip_code=10280
    )

    #2
    marnie = User(
        email='marnie@aa.io',
        password='password',
        first_name='Marnie',
        last_name='Demo',
        zip_code=32811
    )

    #3
    bobbie = User(
        email='bobbie@aa.io',
        password='password',
        first_name='Bobbie',
        last_name='Demo',
        zip_code=94016
    )

    #4
    adanna = User(
        email='adanna@aa.io',
        password='adanna',
        first_name='Adanna',
        last_name='Liu',
        zip_code=32811
    )

    #5
    sam = User(
        email='sam@aa.io',
        password='password',
        first_name='Sam',
        last_name='Spam',
        zip_code=94016
    )

    #6
    katie = User(
        email='ktp@aa.io',
        password='ktp',
        first_name='Katie',
        last_name='Piele'
    )

    #7
    tien = User(
        email='tien@aa.io',
        password='tien',
        first_name='Tien',
        last_name='Hoang'
    )

    #8
    claudia = User(
        email='claudia@aa.io',
        password='claudia',
        first_name='Claudia',
        last_name='Kosylak'
    )

    #9
    raoul = User(
        email='raoul@aa.io',
        password='raoul',
        first_name='Raoul',
        last_name='Andalis'
    )

    #10
    jenna = User(
        email='jenna@aa.io',
        password='jenna',
        first_name='Jenna',
        last_name='Godfrey'
    )

    # sunshineRescue = User(
    #     email='sunshinerescue@aa.io',
    #     password='password',
    #     adoption_agency=True,
    #     org_name='Sunshine Rescue',
    #     zip_code=32811
    # )

    # pawsNWhiskers = User(
    #     email='pawsnwhiskers@aa.io',
    #     password='password',
    #     adoption_agency=True,
    #     org_name='Paws N\' Whiskers',
    #     zip_code=10280
    # )

    # creatureCompanions = User(
    #     email='creaturecompanions@aa.io',
    #     password='password',
    #     adoption_agency=True,
    #     org_name='Creature Companions',
    #     zip_code=94016
    # )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(adanna)
    db.session.add(sam)
    db.session.add(katie)
    db.session.add(tien)
    db.session.add(claudia)
    db.session.add(raoul)
    db.session.add(jenna)
    # db.session.add(sunshineRescue)
    # db.session.add(pawsNWhiskers)
    # db.session.add(creatureCompanions)
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
