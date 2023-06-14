from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class SearchForm(FlaskForm):
    title = StringField("Title")
    type = StringField("Type")
    breed = StringField("Breed")
    age = StringField("Age")
    size = StringField("Size")
    gender = StringField("Gender")
    good_with = StringField("Good With")
    house_trained = BooleanField("House Trained")
    special_needs = BooleanField("Special Needs")
    coat_length = StringField("Coat Length")
    color = StringField("Color")
    days_on_site = StringField("Days on Site")
    org_name = StringField("Organization Name")
    pet_name = StringField("Pet Name")
    out_of_town = BooleanField("Out of Town")
