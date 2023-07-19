from flask_wtf import FlaskForm
from wtforms import StringField, MultipleFileField, SelectField, BooleanField, DecimalField
from wtforms.validators import DataRequired, Length, NumberRange
from flask_wtf.file import FileAllowed
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class AnimalForm(FlaskForm):
    type = SelectField("Type", validators=[DataRequired(message="Type is required.")], choices=["Dog", "Cat", "Rabbit", "Small & Furry", "Horse", "Bird", "Scales, Fins, & Other"])
    name = StringField("Name", validators=[DataRequired(message="Name is required."), Length(min=1, max=100, message="Maximum 100 characters in name.")])
    age = SelectField("Age", validators=[DataRequired(message="Age is required.")], choices = ["Baby", "Young", "Adult", "Senior"])
    gender = SelectField("Gender", validators=[DataRequired(message="Gender is required.")], choices = ["Male", "Female"])
    size = SelectField("Type", validators=[DataRequired(message="Size is required.")], choices = ["Small", "Medium", "Large", "Extra Large"])
    primary_breed = StringField("Primary Breed", validators=[DataRequired(message="Primary Breed is required."), Length(min=1, max=50, message="Primary Breed must be between 1 and 50 characters long.")])
    secondary_breed = StringField("Secondary Breed", validators=[Length(max=50, message="Secondary Breed must be between 1 and 50 characters long.")])
    color = StringField("Color", validators=[Length(max=50, message="Color must be between 1 and 50 characters long.")])
    house_trained = BooleanField("House Trained")
    vaccinated = BooleanField("Vaccinated")
    fixed = BooleanField("Fixed")
    special_needs = BooleanField("Special Needs")
    good_with_cats = BooleanField("Good With Cats")
    good_with_dogs = BooleanField("Good With Dogs")
    good_with_children = BooleanField("Good With Children")
    good_with_other_animals = BooleanField("Good With Other Animals")
    description = StringField("Description", validators=[Length(max=2000, message="Maximum 2000 characters for description")])
    adoption_fee = DecimalField("Adoption Fee", places=2, validators=[DataRequired(message="Adoption Fee is required."), NumberRange(min=1, message="Adoption Fee must be at least $1.00")])
    images = MultipleFileField('Upload Images', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))], render_kw={'multiple': True})
