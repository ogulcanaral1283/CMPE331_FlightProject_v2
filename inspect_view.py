
import psycopg2

DB_HOST = "54.160.190.8"
DB_NAME = "airline_db"
DB_USER = "postgres"
DB_PASSWORD = "123"
# DB_PORT = "5432" # Removed port because default or user script didn't have it explicitly in snippet but used default

def inspect_details():
    try:
        conn = psycopg2.connect(host=DB_HOST, dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD)
        cur = conn.cursor()
        
        print(f"--- Inspecting flight_pilot_details ---")
        # Check columns
        cur.execute("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'pilots';")
        cols = cur.fetchall()
        if not cols:
            print("Table/View not found in information_schema? Checking pg_matviews...")
            cur.execute("SELECT definition FROM pg_matviews WHERE matviewname = 'flight_pilot_details';")
            mat = cur.fetchone()
            if mat:
                print("Found in pg_matviews!")
            else:
                print("Not found anywhere.")
        
        for c in cols:
            print(f"Col: {c[0]} ({c[1]})")

        # Peek data
        try:
            cur.execute("SELECT * FROM pilots LIMIT 3;")
            rows = cur.fetchall()
            print("\nSample Data:")
            for r in rows:
                print(r)
        except Exception as e:
            print(f"Peek failed: {e}")

        conn.close()
    except Exception as e:
        print(e)

if __name__ == "__main__":
    inspect_details()
