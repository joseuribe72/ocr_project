import sqlite3
import os
print(os.path)

file_path = os.path.abspath(__file__)
work_dir = os.path.dirname(file_path)
db = "database/flask_database.db"
db = os.path.join(work_dir, db)


def start_db():
    """This initializes the database when the flask server starts."""
    if not os.path.isfile(db):
        con = sqlite3.connect(db)
        cur = con.cursor()
        cur.execute("""CREATE TABLE text(
            id INTEGER PRIMARY KEY,
            data STRING)""")
        cur.execute("""INSERT INTO text
                    VALUES(1, " jkh")""")
        con.commit()
        con.close()
    else:
        con = sqlite3.connect(db)
        cur = con.cursor()
        cur.execute("""
            UPDATE text
            SET data = " "
            WHERE id = 1
            """)
        con.commit()
        con.close()
        
def db_update(text):
    """This updates the database"""
    con = sqlite3.connect(db)
    cur = con.cursor()
    cur.execute("""
        UPDATE text
        SET data = ?
        WHERE id = 1
        """, (text,))
    con.commit()
    con.close()
    
def db_retrieve():
    """This gets the most recent update"""
    con = sqlite3.connect(db)
    cur = con.cursor()
    cur.execute("SELECT * FROM text WHERE id = 1")
    data = cur.fetchone()    
    return data[1]
