import json
import boto3
import uuid
from datetime import datetime

s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')
sns = boto3.client('sns')

BUCKET = 'smart-uploader-dev'
TABLE = 'Metadata-dev'
TOPIC_ARN = 'arn:aws:sns:REGION:ACCOUNT_ID:UploaderNotifications-dev'

def lambda_handler(event, context):
    body = json.loads(event['body'])
    file_content = body['file_content']
    file_name = body['file_name']
    
    file_id = str(uuid.uuid4())
    s3.put_object(Bucket=BUCKET, Key=file_name, Body=file_content)
    
    table = dynamodb.Table(TABLE)
    table.put_item(Item={
        'file_id': file_id,
        'file_name': file_name,
        'uploaded_at': datetime.utcnow().isoformat()
    })
    
    sns.publish(
        TopicArn=TOPIC_ARN,
        Message=f"File uploaded: {file_name}"
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'File uploaded', 'file_id': file_id})
    }
# This code is a simple AWS Lambda function that uploads a file to S3, stores metadata in DynamoDB, and sends a notification via SNS.
# It expects an event with a JSON body containing 'file_content' and 'file_name'.
# The function generates a unique file ID, uploads the file to S3, saves metadata in DynamoDB, and publishes a notification to an SNS topic.
# The response includes a status code and the file ID of the uploaded file.
# Make sure to replace 'REGION' and 'ACCOUNT_ID' in the TOPIC_ARN with your actual AWS region and account ID.
# Also, ensure that the Lambda function has the necessary permissions to access S3, DynamoDB, and SNS.
# This code is designed to be run in an AWS Lambda environment.
# Ensure that the Lambda function has the necessary IAM permissions to access S3, DynamoDB,
# and SNS services. The bucket, table, and topic ARN should be created beforehand.  