from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Animal(db.Model):
    __tablename__ = 'animals'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.String(10), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    size = db.Column(db.String(15), nullable=False)
    primary_breed = db.Column(db.String(50), nullable=False)
    secondary_breed = db.Column(db.String(50))
    color = db.Column(db.String(50))
    house_trained = db.Column(db.Boolean)
    vaccinated = db.Column(db.Boolean)
    fixed = db.Column(db.Boolean)
    special_needs = db.Column(db.Boolean)
    good_with_cats = db.Column(db.Boolean)
    good_with_dogs = db.Column(db.Boolean)
    good_with_children = db.Column(db.Boolean)
    good_with_other_animals = db.Column(db.Boolean)
    description = db.Column(db.String(2000))
    adoption_fee = db.Column(db.Numeric(scale=2, asdecimal=True), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())

    # is_pet = db.Column(db.Boolean, nullable=False, default=False)
    # birth_date = db.Column(db.Date)
    # origin = db.Column(db.String)

    user = db.relationship("User", back_populates="animals")
    favorites = db.relationship("User", secondary="favorites", back_populates="favorites")
    animal_images = db.relationship("AnimalImage", back_populates="animal", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'type': self.type,
            'name': self.name,
            'age': self.age,
            'gender': self.gender,
            'size': self.size,
            'primaryBreed': self.primary_breed,
            'secondaryBreed': self.secondary_breed,
            'color': self.color,
            'houseTrained': self.house_trained,
            'vaccinated': self.vaccinated,
            'fixed': self.fixed,
            'specialNeeds': self.special_needs,
            'goodWithCats': self.good_with_cats,
            'goodWithDogs': self.good_with_dogs,
            'goodWithChildren': self.good_with_children,
            'goodWithOtherAnimals': self.good_with_other_animals,
            'description': self.description,
            'adoptionFee': self.adoption_fee,

            # 'isPet': self.is_pet,
            # 'birthDate': self.birth_date,
            # 'origin': self.origin
        }
