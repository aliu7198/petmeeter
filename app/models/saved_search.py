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
            'user_id': self.user_id,
            'title': self.title,
            'type': self.type,
            'breed': self.breed,
            'age': self.age,
            'size': self.size,
            'gender': self.gender,
            'good_with': self.good_with,
            'house_trained': self.house_trained,
            'special_needs': self.special_needs,
            'coat_length': self.coat_length,
            'color': self.color,
            'days_on_site': self.dayss_on_site,
            'org_name': self.org_name,
            'pet_name': self.pet_name,
            'out_of_town': self.out_of_town
        }
