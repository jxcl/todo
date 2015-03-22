from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask("tictail_todo")
db = SQLAlchemy(app)

from . import models
from . import views
