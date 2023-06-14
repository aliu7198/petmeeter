from .db import db, environment, SCHEMA, add_prefix_for_prod

class AnimalImage(db.Model):
    __tablename__ = 'animal_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    animalId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('animals.id')), nullable=False)
    imageUrl = db.Column(db.String, nullable=False)

    animal = db.relationship('Animal', back_populates='animal_images')

    def to_dict(self):
        return {
            'id': self.id,
            'animalId': self.animalId,
            'imageUrl': self.imageUrl
        }
