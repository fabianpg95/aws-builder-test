import json
import boto3

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    for record in event['Records']:
        try:
            body = json.loads(record['body'])
            file_id = body.get('file_id')
            # Here, we just print the file_id for demonstration purposes
            print(f"Processing file_id: {file_id}")

            # Example: update a field in DynamoDB to mark as processed
            table = dynamodb.Table('Metadata-dev')
            table.update_item(
                Key={'file_id': file_id},
                UpdateExpression="SET processed = :val",
                ExpressionAttributeValues={':val': True}
            )
        except Exception as e:
            print(f"Error processing record: {e}")

    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Processing complete'})
    }
