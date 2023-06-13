from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    firstName = db.Column(db.String(30))
    lastName = db.Column(db.String(30))
    zipCode = db.Column(db.Integer, nullable=False)
    phone = db.Column(db.Integer)
    country = db.Column(db.String(100))
    address = db.Column(db.String(255))
    city = db.Column(db.String(255))
    state = db.Column(db.String(255))

    adoptionAgency = db.Column(db.Boolean, nullable=False, default=False)
    orgName = db.Column(db.String(255))

    # Adopter Profile Fields
    desiredPet = db.Column(db.String)
    petOwner = db.Column(db.String)
    kids = db.Column(db.Boolean)
    ownerType = db.Column(db.String)
    currentPets = db.Column(db.String)
    agePref = db.Column(db.String)
    genderPref = db.Column(db.String)
    sizePref = db.Column(db.String)
    specialNeeds = db.Column(db.Boolean)
    breed = db.Column(db.String)

    # Cat Specific
    coatLengthPref = db.Column(db.String)

    # Dog Specific
    privateOutdoor = db.Column(db.String)
    sharedOutdoor = db.Column(db.String)
    leaseRestriction = db.Column(db.Boolean)
    breedRestriction = db.Column(db.String)
    sizeRestriction = db.Column(db.Integer)
    activityLevelPref = db.Column(db.String)


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'zipCode': self.zipCode,
            'phone': self.phone,
            'country': self.country,
            'address': self.address,
            'city': self.city,
            'state': self.state,

            'adoptionAgency': self.adoptionAgency,
            'orgName': self.orgName,

            'desiredPet': self.desiredPet,
            'petOwner': self.petOwner,
            'kids': self.kids,
            'ownerType': self.ownerType,
            'currentPets': self.currentPets,
            'agePref': self.agePref,
            'genderPref': self.genderPref,
            'sizePref': self.sizePref,
            'specialNeeds': self.specialNeeds,
            'breed': self.breed,

            'coatLengthPref': self.coatLengthPref,

            'privateOutdoor': self.privateOutdoor,
            'sharedOutdoor': self.sharedOutdoor,
            'leaseRestriction': self.leaseRestriction,
            'breedRestriction': self.breedRestriction,
            'sizeRestriction': self.sizeRestriction,
            'activityLevelPref': self.activityLevelPref
        }
