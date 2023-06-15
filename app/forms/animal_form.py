from flask_wtf import FlaskForm
from wtforms import StringField, MultipleFileField, SelectField, BooleanField, IntegerField
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileAllowed
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class AnimalForm(FlaskForm):
    type = StringField("Type", validators=[DataRequired()])
    name = StringField("Name", validators=[DataRequired()])
    age = SelectField("Age", validators=[DataRequired()], choices = ["Baby", "Young", "Adult", "Senior"])
    gender = SelectField("", validators=[DataRequired()], choices = ["Male", "Female"])
    size = SelectField("Type", validators=[DataRequired()], choices = ["Small", "Medium", "Large", "Extra Large"])
    primary_breed = StringField("Primary Breed", validators=[DataRequired()])
    secondary_breed = StringField("Secondary Breed")
    color = StringField("Color")
    characteristics = StringField("Characteristics")
    coat_length = StringField("Coat Length")
    house_trained = BooleanField("House Trained")
    vaccinated = BooleanField("Vaccinated")
    fixed = BooleanField("Fixed")
    special_needs = BooleanField("Special Needs")
    good_with_cats = BooleanField("Good With Cats")
    good_with_dogs = BooleanField("Good With Dogs")
    good_with_children = BooleanField("Good With Children")
    good_with_other_animals = BooleanField("Good With Other Animals")
    description = StringField("Description", validators=[Length(max=2000)])
    adoption_fee = IntegerField("Adoption Fee")



    images = MultipleFileField('Upload Images', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))], render_kw={'multiple': True})
