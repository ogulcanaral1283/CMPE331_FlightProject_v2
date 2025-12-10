import requests
import sys

# Configuration
AIRCRAFT_SERVICE_URL = "http://localhost:8040/airlines"
USER_SERVICE_URL = "http://localhost:8060/users"

# Extended Airlines List
AIRLINES = [
    {"airline_name": "Turkish Airlines", "country": "Turkey", "airline_iata": "TK", "airline_icao": "THY"},
    {"airline_name": "Pegasus Airlines", "country": "Turkey", "airline_iata": "PC", "airline_icao": "PGT"},
    {"airline_name": "Lufthansa", "country": "Germany", "airline_iata": "LH", "airline_icao": "DLH"},
    {"airline_name": "Emirates", "country": "UAE", "airline_iata": "EK", "airline_icao": "UAE"},
    {"airline_name": "Qatar Airways", "country": "Qatar", "airline_iata": "QR", "airline_icao": "QTR"},
    {"airline_name": "British Airways", "country": "UK", "airline_iata": "BA", "airline_icao": "BAW"},
    {"airline_name": "Air France", "country": "France", "airline_iata": "AF", "airline_icao": "AFR"},
]

USERS = [
    {"username": "admin_tk", "password": "password123", "airline_iata": "TK"},
    {"username": "admin_pc", "password": "password123", "airline_iata": "PC"},
    {"username": "admin_lh", "password": "password123", "airline_iata": "LH"},
    {"username": "admin_ek", "password": "password123", "airline_iata": "EK"},
    {"username": "admin_qr", "password": "password123", "airline_iata": "QR"},
    {"username": "admin_ba", "password": "password123", "airline_iata": "BA"},
    {"username": "admin_af", "password": "password123", "airline_iata": "AF"},
]

def seed_airlines():
    print("--- Seeding All Airlines ---")
    created_airlines = {}
    
    for airline in AIRLINES:
        try:
            response = requests.post(AIRCRAFT_SERVICE_URL + "/", json=airline)
            if response.status_code == 200:
                data = response.json()
                print(f"[SUCCESS] Created/Found Airline: {data['airline_name']} (ID: {data['airline_id']})")
                created_airlines[data['airline_iata']] = data['airline_id']
            else:
                print(f"[ERROR] Failed to create {airline['airline_name']}: {response.text}")
        except Exception as e:
            print(f"[ERROR] Connection failed for {airline['airline_name']}: {e}")
            
    return created_airlines

def seed_users(airline_map):
    print("\n--- Seeding Users ---")
    for user in USERS:
        try:
            airline_code = user.pop("airline_iata")
            airline_id = airline_map.get(airline_code) if airline_code else None
            
            payload = {
                "username": user["username"],
                "password": user["password"],
                "airline_id": airline_id
            }

            response = requests.post(USER_SERVICE_URL + "/", json=payload)
            if response.status_code == 200:
                data = response.json()
                print(f"[SUCCESS] Created User: {data['username']} (Airline ID: {data['airline_id']})")
            elif response.status_code == 400 and "already exists" in response.text:
                 # Check existing to enable login test if pw matches
                print(f"[INFO] User {user['username']} already exists.")
            else:
                print(f"[ERROR] Failed to create {user['username']}: {response.text}")

        except Exception as e:
            print(f"[ERROR] Connection failed for {user['username']}: {e}")

if __name__ == "__main__":
    airline_map = seed_airlines()
    if airline_map:
        seed_users(airline_map)
