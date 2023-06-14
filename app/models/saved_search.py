from .db import db, environment, SCHEMA, add_prefix_for_prod

class SavedSearch(db.Model):
    __tablename__ = 'saved_searches'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    breed = db.Column(db.String)
    age = db.Column(db.String)
    size = db.Column(db.String)
    gender = db.Column(db.String)
    goodWith = db.Column(db.String)
    houseTrained = db.Column(db.Boolean)
    specialNeeds = db.Column(db.Boolean)
    coatLength = db.Column(db.String)
    color = db.Column(db.String)
    daysOnSite = db.Column(db.String)
    orgName = db.Column(db.String)
    petName = db.Column(db.String)
    outOfTown = db.Column(db.Boolean)

    user = db.relationship("User", back_populates="saved_searches")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'title': self.title,
            'type': self.type,
            'breed': self.breed,
            'age': self.age,
            'size': self.size,
            'gender': self.gender,
            'goodWith': self.goodWith,
            'houseTrained': self.houseTrained,
            'specialNeeds': self.specialNeeds,
            'coatLength': self.coatLength,
            'color': self.color,
            'dayOnSite': self.daysOnSite,
            'orgName': self.orgName,
            'petName': self.petName,
            'outOfTown': self.outOfTown
        }
