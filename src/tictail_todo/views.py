from flask import json

from . import app, models

@app.route("/tasks/", methods=["GET"])
def tasks_get():
    """Return a JSON object of all tasks present in the database."""
    pass

@app.route("/tasks/", methods=["PUT"])
def tasks_update():
    """Accept a subset of all tasks in the database and update them with new params."""
    pass

@app.route("/tasks/", methods=["POST"])
def new_task():
    """Add a new task to the database."""
    pass
