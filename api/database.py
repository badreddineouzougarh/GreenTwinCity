import os
import psycopg2

conn = psycopg2.connect(
        host="localhost",
        database="test",
        user=os.environ['postgres'],
        password=os.environ['b2a1d3r4e56'])

# Open a cursor to perform database operations
cur = conn.cursor()

conn.commit()

cur.close()
conn.close()