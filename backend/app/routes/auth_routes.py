from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.core.security import create_access_token, get_password_hash, verify_password
from app.db.mongo import get_database
from app.models.user import ProductivityProfile, UserCreate, UserResponse
from app.routes.deps import get_current_user

router = APIRouter(tags=["auth"])


def serialize_user(user: dict) -> UserResponse:
    user_dict = dict(user)
    user_dict["id"] = str(user_dict.get("_id", user_dict.get("id")))
    user_dict.pop("_id", None)
    user_dict.pop("password_hash", None)
    user_dict.setdefault("productivity_profile", ProductivityProfile().model_dump())
    user_dict.setdefault("onboarding_completed", False)
    user_dict.setdefault("created_at", datetime.utcnow())
    return UserResponse(**user_dict)


@router.post("/register", response_model=UserResponse)
async def register(user_in: UserCreate, db = Depends(get_database)):
    email = user_in.email.lower()
    existing_user = await db.users.find_one({"email": email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    user_dict = user_in.model_dump()
    user_dict["email"] = email
    password = user_dict.pop("password")
    user_dict["password_hash"] = get_password_hash(password)
    user_dict["onboarding_completed"] = False
    user_dict["productivity_profile"] = ProductivityProfile().model_dump()
    user_dict["created_at"] = datetime.utcnow()
    
    result = await db.users.insert_one(user_dict)
    created_user = await db.users.find_one({"_id": result.inserted_id})

    return serialize_user(created_user)

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db = Depends(get_database)):
    user = await db.users.find_one({"email": form_data.username.lower()})
    if not user or not verify_password(form_data.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(subject=str(user["_id"]))
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": serialize_user(user).model_dump(mode="json"),
    }


@router.get("/me", response_model=UserResponse)
async def me(current_user: dict = Depends(get_current_user)):
    return serialize_user(current_user)
