from .db import db, environment, SCHEMA, add_prefix_for_prod

class SavedSearch(db.Model):
    __tablename__ = 'saved_searches'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    breed = db.Column(db.String)
    age = db.Column(db.String)
    size = db.Column(db.String)
    gender = db.Column(db.String)
    good_with = db.Column(db.String)
    house_trained = db.Column(db.Boolean)
    special_needs = db.Column(db.Boolean)
    coat_length = db.Column(db.String)
    color = db.Column(db.String)
    days_on_site = db.Column(db.String)
    org_name = db.Column(db.String)
    pet_name = db.Column(db.String)
    out_of_town = db.Column(db.Boolean)

    user = db.relationship("User", back_populates="saved_searches")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'type': self.type,
            'breed': self.breed,
            'age': self.age,
            'size': self.size,
            'gender': self.gender,
            'goodWith': self.good_with,
            'houseTrained': self.house_trained,
            'specialNeeds': self.special_needs,
            'coatLength': self.coat_length,
            'color': self.color,
            'daysOnSite': self.dayss_on_site,
            'orgName': self.org_name,
            'petName': self.pet_name,
            'outOfTown': self.out_of_town
        }
