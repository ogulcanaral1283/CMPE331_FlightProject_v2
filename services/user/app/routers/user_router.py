from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.db_dependency import get_db
from app.models.user_model import User
from app.schemas.user_schema import UserCreate, UserResponse
from app.utils.hashing import hash_password

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/", response_model=UserResponse)
def create_user(user_data: UserCreate, db: Session = Depends(get_db)):
    # Kullanıcı adı var mı?
    check_user = db.query(User).filter(User.username == user_data.username).first()
    if check_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed_pw = hash_password(user_data.password)

    new_user = User(
        username=user_data.username,
        hashed_password=hashed_pw,
        role="user",  # varsayılan user
        airline_id=user_data.airline_id
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.get("/", response_model=list[UserResponse])
def get_all_users(username: str = None, db: Session = Depends(get_db)):
    query = db.query(User)
    if username:
        query = query.filter(User.username == username)
    return query.all()
