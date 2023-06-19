from app.models import db, Animal, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_favorites():
    users = User.query.all()
    animals = Animal.query.all()

    #user1
    users[0].favorites.append(animals[1])
    users[0].favorites.append(animals[2])

    #user2
    users[1].favorites.append(animals[5])
    users[1].favorites.append(animals[7])

    #user3
    users[2].favorites.append(animals[9])

    db.session.commit()


def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()
