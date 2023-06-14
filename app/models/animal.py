from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Animal(db.Model):
    __tablename__ = 'animals'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    type = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.String, nullable=False)
    gender = db.Column(db.String, nullable=False)
    size = db.Column(db.String, nullable=False)
    breed = db.Column(db.String, nullable=False)
    color = db.Column(db.String)
    characteristics = db.Column(db.String)
    coatLength = db.Column(db.String)
    houseTrained = db.Column(db.Boolean)
    vaccinated = db.Column(db.Boolean)
    fixed = db.Column(db.Boolean)
    specialNeeds = db.Column(db.Boolean)
    goodWith = db.Column(db.String)
    description = db.Column(db.String)
    adoptionFee = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())

    isPet = db.Column(db.Boolean, nullable=False, default=False)
    birthDate = db.Column(db.Date)
    origin = db.Column(db.String)

    user = db.relationship("User", back_populates="animals")
    favorites = db.relationship("User", secondary="favorites", back_populates="favorites")
    animal_images = db.relationship("AnimalImage", back_populates="animal", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.ownerId,
            'type': self.type,
            'name': self.name,
            'age': self.age,
            'gender': self.gender,
            'size': self.size,
            'breed': self.breed,
            'color': self.color,
            'characteristics': self.characteristics,
            'coatLength': self.coatLength,
            'houseTrained': self.houseTrained,
            'vaccinated': self.vaccinated,
            'fixed': self.fixed,
            'specialNeeds': self.specialNeeds,
            'goodWith': self.goodWith,
            'description': self.description,
            'adoptionFee': self.adoptionFee,

            'isPet': self.isPet,
            'birthDate': self.birthDate,
            'origin': self.origin
        }
