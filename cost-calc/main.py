from flask import Flask, render_template, request, redirect, url_for
from flask_bootstrap import Bootstrap5
from flask_wtf import FlaskForm, CSRFProtect
from wtforms import StringField, SubmitField, IntegerField, RadioField, SelectField
from wtforms.validators import DataRequired, Length
import secrets
import pickle
import sys
import numpy as np
import pandas as pd
import json


app = Flask(__name__)

app.secret_key = secrets.token_urlsafe(16)
bootstrap = Bootstrap5(app)
csrf = CSRFProtect(app)


@app.route('/', methods=["GET", "POST"])
def cost_calc():
    form = NameForm()
    if form.validate_on_submit():
        age = form.age.data
        bmi = form.bmi.data
        children = form.children.data
        sex = form.sex.data
        if sex == 'M':
            s1 = 0;
            s2 = 1;
        else:
            s1 = 1;
            s2 = 0;

        smoker = form.smoker.data
        if smoker == 'Smoker':
            sm1 = 0;
            sm2 = 1;
        else:
            sm1 = 1;
            sm2 = 0;

        region = form.region.data
        if region == 'NorthEast':
            ne = 1
            nw = 0
            se = 0
            sw = 0

        elif region == 'NorthWest':
            ne = 0
            nw = 1
            se = 0
            sw = 0

        elif region == 'SouthEast':
            ne = 0
            nw = 0
            se = 1
            sw = 0

        else:
            ne = 0
            nw = 0
            se = 0
            sw = 1

        chrgs = charges(age, bmi, children, s1, s2, sm1, sm2, ne, nw, se, sw)
        print(chrgs)
        return redirect(url_for('calculated', charges=chrgs))

    return render_template("index.html", form=form)


@app.route('/cost/<charges>')
def calculated(charges):
    return render_template("calculated.html", chgs=float(charges)*81.73)


@app.route('/payment')
def payment():
    return render_template("payment.html")
def charges(age, bmi, children, male, female, smokerno, smokeryes, northeast, northwest, southeast, southwest):
    with open('model', 'rb') as f:
        mp = pickle.load(f)

    return mp.predict([[age, bmi, children, male, female, smokerno, smokeryes,
                        northeast, northwest, southeast, southwest]])[0]


class NameForm(FlaskForm):
    age = IntegerField('Age', validators=[DataRequired()])
    bmi = IntegerField('Bmi', validators=[DataRequired()])
    children = IntegerField('Children', validators=[DataRequired()])
    sex = RadioField('Sex', choices=[('M', 'Male'), ('F', 'Female')], validators=[DataRequired()])
    smoker = RadioField('Smoker', choices=[('Yes', 'Smoker'), ('No', 'Not Smoker')], validators=[DataRequired()])
    region = SelectField('Region', choices=[('NorthEast', 'NorthEast'), ('NorthWest', 'NorthWest'),
                                            ('SouthEast', 'SouthEast'), ('SouthWest', 'SouthWest')])
    submit = SubmitField('Submit')


if __name__ == '__main__':
    app.run(debug=True)
