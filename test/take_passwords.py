from passlib.context import CryptContext

pwd = CryptContext(schemes=["argon2"], deprecated="auto")
plain = "12345"
hashed = pwd.hash(plain)
print(hashed)