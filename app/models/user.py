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
    first_name = db.Column(db.String(30))
    last_name = db.Column(db.String(30))
    zip_code = db.Column(db.Integer)
    # eventually nullable=false when i do location services
    phone = db.Column(db.Integer)
    country = db.Column(db.String(100))
    address = db.Column(db.String(255))
    city = db.Column(db.String(255))
    state = db.Column(db.String(255))

    adoption_agency = db.Column(db.Boolean, nullable=False, default=False)
    org_name = db.Column(db.String(255))

    # Adopter Profile Fields
    desired_pet = db.Column(db.String)
    pet_owner = db.Column(db.String)
    kids = db.Column(db.Boolean)
    owner_type = db.Column(db.String)
    current_pets = db.Column(db.String)
    age_pref = db.Column(db.String)
    gender_pref = db.Column(db.String)
    size_pref = db.Column(db.String)
    special_needs = db.Column(db.Boolean)
    breed = db.Column(db.String)

    # Dog Specific
    private_outdoor = db.Column(db.String)
    shared_outdoor = db.Column(db.String)
    lease_restriction = db.Column(db.Boolean)
    breed_restriction = db.Column(db.String)
    size_restriction = db.Column(db.Integer)
    activity_level_pref = db.Column(db.String)

    animals = db.relationship('Animal', back_populates='user', cascade='all, delete-orphan')
    favorites = db.relationship('Animal', secondary='favorites', back_populates="favorites", cascade='all, delete')
    saved_searches = db.relationship('SavedSearch', back_populates='user', cascade='all, delete-orphan')

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
            'firstName': self.first_name,
            'lastName': self.last_name,
            'zipCode': self.zip_code,
            'phone': self.phone,
            'country': self.country,
            'address': self.address,
            'city': self.city,
            'state': self.state,

            'adoptionAgency': self.adoption_agency,
            'orgName': self.org_name,

            'desiredPet': self.desired_pet,
            'petOwner': self.pet_owner,
            'kids': self.kids,
            'ownerType': self.owner_type,
            'currentPets': self.current_pets,
            'agePref': self.age_pref,
            'genderPref': self.gender_pref,
            'sizePref': self.size_pref,
            'specialNeeds': self.special_needs,
            'breed': self.breed,

            'privateOutdoor': self.private_outdoor,
            'sharedOutdoor': self.shared_outdoor,
            'leaseRestriction': self.lease_restriction,
            'breedRestriction': self.breed_restriction,
            'sizeRestriction': self.size_restriction,
            'activityLevelPref': self.activity_level_pref
        }
