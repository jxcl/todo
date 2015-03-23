#!/usr/bin/env python3
import argparse
import sys
from os import path
from tictail_todo import app, db

def ensure_db_exists(db_path):
    if not path.exists(db_path):
        db.create_all()

def main():
    parser = argparse.ArgumentParser(description="Run the Todo server.")
    parser.add_argument('db_path', type=str,
                        help=("Path to the sqlite db file to use. The file will be created" +
                              " if it does not exist."))
    args = parser.parse_args()

    if not path.isabs(args.db_path):
        print("Error: Database path must be absolute.", file=sys.stderr)
        sys.exit(1)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + args.db_path
    ensure_db_exists(args.db_path)
    app.run(host="0.0.0.0")

if __name__ == "__main__":
    main()
