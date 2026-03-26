from cryptography.fernet import Fernet
import os
import json

# ENCRYPTION_KEY should be a 32-byte URL-safe base64-encoded string
# In production, this MUST be set in environment variables
ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY")

def get_fernet():
    if not ENCRYPTION_KEY:
        # Fallback for dev only - in prod this will fail if not set
        return Fernet(Fernet.generate_key())
    return Fernet(ENCRYPTION_KEY.encode())

def encrypt_data(data: dict) -> str:
    f = get_fernet()
    json_data = json.dumps(data)
    return f.encrypt(json_data.encode()).decode()

def decrypt_data(encrypted_str: str) -> dict:
    f = get_fernet()
    decrypted_bytes = f.decrypt(encrypted_str.encode())
    return json.loads(decrypted_bytes.decode())
