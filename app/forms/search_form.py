from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired
from app.models import User

class SearchForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    type = StringField("Type", validators=[DataRequired()])
    age = StringField("Age")
    size = StringField("Size")
    gender = StringField("Gender")
    # color = StringField("Color")
    # breed = StringField("Breed")
    good_with_cats = BooleanField("Good With Cats")
    good_with_dogs = BooleanField("Good With Dogs")
    good_with_children = BooleanField("Good With Children")
    good_with_other_animals = BooleanField("Good With Other Animals")
    house_trained = BooleanField("House Trained")
    special_needs = BooleanField("Special Needs")
    # days_on_site = StringField("Days on Site")
    # org_name = StringField("Organization Name")
    # pet_name = StringField("Pet Name")
    # out_of_town = BooleanField("Out of Town")
