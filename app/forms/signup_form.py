from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, SelectField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


class SignUpForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), user_exists])
    password = StringField('Password', validators=[DataRequired()])
    first_name = StringField('First Name', validators=[Length(max=30)])
    last_name = StringField('Last Name', validators=[Length(max=30)])
    # zip_code = IntegerField('Zip Code', validators=[DataRequired()])
    # country = StringField("Country")
    # address = StringField("Address", validators=[Length(max=255)])
    # city = StringField("City", validators=[Length(max=255)])
    # state = StringField("State", validators=[Length(max=255)])
    # adoption_agency = BooleanField('Adoption Agency', validators=[DataRequired()])
    # org_name = StringField("Organization Name", validators=[Length(max=255)])
