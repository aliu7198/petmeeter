from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, SelectField
from wtforms.validators import DataRequired, ValidationError, Length, Email
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


class SignUpForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(message="Email is required."), user_exists, Email()])
    password = StringField('Password', validators=[DataRequired(message="Password is required"), Length(min=8, message="Password must be at least 8 characters long.")])
    first_name = StringField('First Name', validators=[DataRequired(message="First name is required."), Length(max=30, message="First name cannot be longer than 30 characters.")])
    last_name = StringField('Last Name', validators=[DataRequired(message="Last name is required."), Length(max=30, message="Last name cannot be longer than 30 characters.")])
    # zip_code = IntegerField('Zip Code', validators=[DataRequired()])
    # country = StringField("Country")
    # address = StringField("Address", validators=[Length(max=255)])
    # city = StringField("City", validators=[Length(max=255)])
    # state = StringField("State", validators=[Length(max=255)])
    # adoption_agency = BooleanField('Adoption Agency', validators=[DataRequired()])
    # org_name = StringField("Organization Name", validators=[Length(max=255)])
