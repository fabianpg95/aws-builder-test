import requests
from jose import jwt
from jose.exceptions import JWTError

# Basic example to validate JWT from Cognito (simplified)

COGNITO_REGION = 'YOUR_AWS_REGION'
COGNITO_USERPOOL_ID = 'YOUR_USERPOOL_ID'
JWKS_URL = f'https://cognito-idp.{COGNITO_REGION}.amazonaws.com/{COGNITO_USERPOOL_ID}/.well-known/jwks.json'

jwks = None

def get_jwks():
    global jwks
    if jwks is None:
        response = requests.get(JWKS_URL)
        jwks = response.json()
    return jwks

def validate_jwt(token):
    try:
        jwks = get_jwks()
        unverified_header = jwt.get_unverified_header(token)
        rsa_key = {}
        for key in jwks['keys']:
            if key['kid'] == unverified_header['kid']:
                rsa_key = {
                    'kty': key['kty'],
                    'kid': key['kid'],
                    'use': key['use'],
                    'n': key['n'],
                    'e': key['e']
                }
        if not rsa_key:
            return False

        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=['RS256'],
            audience='YOUR_APP_CLIENT_ID',
            issuer=f'https://cognito-idp.{COGNITO_REGION}.amazonaws.com/{COGNITO_USERPOOL_ID}'
        )
        # Here you can add extra validations with payload if you want
        return True
    except JWTError:
        return False
    except Exception:
        return False
