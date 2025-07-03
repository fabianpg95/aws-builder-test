import json
import jwt
import urllib.request
from jwt import PyJWKClient

REGION = "us-east-2"
USERPOOL_ID = "us-east-2_Hw55n0L86"
AUDIENCE = "35dptbnpvndtp8v9j2u0d66q69"
COGNITO_ISSUER = f"https://cognito-idp.{REGION}.amazonaws.com/{USERPOOL_ID}"

def lambda_handler(event, context):
    token = event["authorizationToken"].split(" ")[1]
    jwks_url = f"{COGNITO_ISSUER}/.well-known/jwks.json"

    try:
        jwk_client = PyJWKClient(jwks_url)
        signing_key = jwk_client.get_signing_key_from_jwt(token)
        decoded = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            audience=AUDIENCE,
            issuer=COGNITO_ISSUER,
        )

        return {
            "principalId": decoded["sub"],
            "policyDocument": {
                "Version": "2012-10-17",
                "Statement": [{
                    "Action": "execute-api:Invoke",
                    "Effect": "Allow",
                    "Resource": event["methodArn"]
                }]
            }
        }
    except Exception as e:
        print(f"Auth error: {str(e)}")
        raise Exception("Unauthorized")
