from . import db

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    ordering = db.Column(db.Integer, nullable=False)
    task = db.Column(db.String, nullable=False)
    complete = db.Column(db.Boolean, nullable=False)
