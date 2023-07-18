from .db import db, environment, SCHEMA, add_prefix_for_prod

class SavedSearch(db.Model):
    __tablename__ = 'saved_searches'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(50))
    # breed = db.Column(db.String(50))
    age = db.Column(db.String(10))
    size = db.Column(db.String(15))
    gender = db.Column(db.String(10))
    good_with_cats = db.Column(db.Boolean)
    good_with_dogs = db.Column(db.Boolean)
    good_with_children = db.Column(db.Boolean)
    good_with_other_animals = db.Column(db.Boolean)
    house_trained = db.Column(db.Boolean)
    special_needs = db.Column(db.Boolean)
    # color = db.Column(db.String(50))
    # days_on_site = db.Column(db.String)
    # org_name = db.Column(db.String)
    # pet_name = db.Column(db.String(100))
    # out_of_town = db.Column(db.Boolean)

    user = db.relationship("User", back_populates="saved_searches")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'type': self.type,
            # 'breed': self.breed,
            'age': self.age,
            'size': self.size,
            'gender': self.gender,
            'goodWithCats': self.good_with_cats,
            'goodWithDogs': self.good_with_dogs,
            'goodWithChildren': self.good_with_children,
            'goodWithOtherAnimals': self.good_with_other_animals,
            'houseTrained': self.house_trained,
            'specialNeeds': self.special_needs,
            # 'color': self.color,
            # 'daysOnSite': self.days_on_site,
            # 'orgName': self.org_name,
            # 'petName': self.pet_name,
            # 'outOfTown': self.out_of_town
        }
