from functools import wraps
from flask import json, request, render_template, abort

from . import app, models, db

@app.route("/")
def index():
    """Serve javascript and css template."""
    return render_template("index.html")

@app.route("/tasks/", methods=["GET"])
def tasks_get():
    """Return a JSON object of all tasks present in the database."""
    tasks = models.Task.query.order_by(models.Task.ordering).all()

    task_list = [{"id": task.id, "ordering": task.ordering, "task": task.task, "complete": task.complete}
                 for task in tasks]

    return json.jsonify({"tasks": task_list})

@app.route("/tasks/", methods=["PUT"])
def tasks_update():
    """Accept a subset of all tasks in the database and update them with new params."""

    request_json = request.get_json()

    for task_data in request_json["tasks"]:
        task = models.Task.get(task_data["id"])
        if task == None:
            db.session.rollback()
            response = json.jsonify({"message": 'No task with id {}.'.format(task_data["id"])})
            response.status_code = 400
            return response

        if "complete" in task_data:
            task.complete = task_data["complete"]

        if "ordering" in task_data:
            task.ordering = task_data["ordering"]

        db.session.add(task)

    db.session.commit()
    return json.jsonify({"message": "ok"})

@app.route("/tasks/", methods=["POST"])
def new_task():
    """Add a new task to the database."""

    request_json = request.get_json()
    task = models.Task(request_json["task"])

    db.session.add(task)
    db.session.commit()
