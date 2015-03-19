from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask("tictail_todo")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
app.debug = True
db = SQLAlchemy(app)

from . import models
from . import views
