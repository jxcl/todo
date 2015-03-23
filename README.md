Todo
====

A small todo app written with Flask and React.

Installation
------------
Clone the repository and set up a Python 3 virtualenv with all of the packages found in
`REQUIREMENTS`.

```bash
$ git clone https://github.com/jxcl/todo.git
$ virtualenv -p python3 todo-venv
$ source todo-venv/bin/activate
$ pip install -r todo/REQUIREMENTS
```

Running
-------

Run the server with the `run_server.py` script. It takes as an argument the
location of the sqlite3 database to use. The database will be created if it does
not exist.

```bash
$ todo/src/run_server.py /tmp/todo.db
```
