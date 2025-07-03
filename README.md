# 📦 AWS Experiment

A fully serverless Python application using multiple AWS services to securely upload, process, and manage files with scalable backend and infrastructure as code.

---

## 🚀 What It Does

- Accepts file uploads via an authenticated API Gateway endpoint protected by Cognito User Pool.
- Stores files securely in Amazon S3 with versioning enabled.
- Saves metadata in a DynamoDB table.
- Sends notifications via SNS and processes jobs asynchronously using SQS and Lambda workers.
- Supports orchestration of complex flows with AWS Step Functions.
- All infrastructure is managed with CloudFormation templates and CI/CD pipelines.
- Monitors logs, metrics, and traces with CloudWatch and AWS X-Ray.
- Manages secrets securely with AWS Secrets Manager or SSM Parameter Store.
- Frontend hosting and distribution using S3 static website hosting + CloudFront CDN + Route 53 domain management.

---

## 🧱 Architecture Overview

| Component           | AWS Service                            |
|---------------------|--------------------------------------|
| API                 | API Gateway + Lambda + Cognito       |
| Authentication      | Cognito User Pool                    |
| Storage             | S3 Bucket (with versioning & policies) |
| Metadata DB         | DynamoDB                            |
| Relational DB       | Aurora Serverless (Postgres)        |
| Processing          | Lambda (API handlers + Workers)     |
| Messaging           | SNS + SQS                          |
| Orchestration       | Step Functions                      |
| Secrets Management  | AWS Secrets Manager / SSM Parameter Store |
| Monitoring & Logs   | CloudWatch Logs, Alarms + X-Ray     |
| CI/CD               | CodePipeline + CodeBuild + GitHub   |
| Frontend Hosting    | S3 Static Website + CloudFront CDN  |
| DNS & Domain        | Route 53                           |
| Security & Roles    | IAM Roles (least privilege)          |

---

## 🧰 Tech Stack

- Python 3.11 (Lambda runtime)
- Boto3 AWS SDK for Python
- AWS CloudFormation & AWS CDK (optional)
- AWS CLI (for deployments)
- Shell scripting (bash) for local environment and deployment
- Frontend: HTML, CSS, JavaScript (served via S3 + CloudFront)
---

## 📂 Project Structure

``` java
│
├── src/
│   ├── api/
│   │   ├── lambda_function.py        # API Lambda handler
│   │   ├── requirements.txt          # API dependencies
│   │   └── utils.py                  # Helper utils (JWT validation, etc)
│   │
│   └── workers/
│       ├── processor_lambda.py       # Worker Lambda for async processing
│       └── requirements.txt          # Worker dependencies
│
├── frontend/
│   ├── index.html                    # Dev version (for local testing)
│   ├── app.js                        # Frontend JS logic
│   └── styles.css                    # Frontend styles
│
├── cdn/
│   ├── index.html                    # Production-ready minified frontend
│   ├── app.js                        # Minified JS for S3/CDN
│   └── styles.css                    # Minified CSS for S3/CDN
│
├── templates/
│   └── cloudformation.yaml           # Full infra CloudFormation template
│
├── scripts/
│   └── deploy.sh                     # Deployment script (setup venv, deploy)
│
├── .env                              # Environment variables for local dev
└── README.md                         # This file
```
---

## 🛠️ Setup & Deployment

### Install Dependencies

```bash
pip install -r src/requirements.txt
```

### Star localhost server
```bash
python3 -m http.server 8000
```

#### S3 - Steps for create S3 bucket from console commands.

```bash
# 1. Create S3 bucket with a unique name
BUCKET_NAME=smartuploader-frontend-$(date +%s)
aws s3api create-bucket \
  --bucket $BUCKET_NAME \
  --region us-east-2 \
  --create-bucket-configuration LocationConstraint=us-east-2

# 2. Enable static website hosting on the bucket
aws s3 website s3://$BUCKET_NAME/ \
  --index-document index.html \
  --error-document index.html

# 3. Make files public (bucket policy)
aws s3api put-bucket-policy \
  --bucket $BUCKET_NAME \
  --policy "{
    \"Version\": \"2012-10-17\",
    \"Statement\": [{
      \"Sid\": \"PublicReadGetObject\",
      \"Effect\": \"Allow\",
      \"Principal\": \"*\",
      \"Action\": \"s3:GetObject\",
      \"Resource\": \"arn:aws:s3:::$BUCKET_NAME/*\"
    }]
  }"

# 4. Upload CDN-optimized frontend files with caching headers
aws s3 sync ./cdn/ s3://$BUCKET_NAME/ \
  --cache-control "public, max-age=31536000, immutable" \
  --acl public-read

# 5. Output public frontend URL
echo "✅ Your static site is live at:"
echo "https://$BUCKET_NAME.s3-website.us-east-2.amazonaws.com"

# Expected result:
https://smartuploader-frontend-1725037267.s3-website.us-east-2.amazonaws.com
  ```



#### List buckets of all profiles:

```bash
aws s3api list-buckets --query "Buckets[].Name"
```

#### List buckets that belong to my profile:

```bash
aws s3api list-buckets --query "Buckets[].Name" --profile fabianpg95
```

#### Remove all the buckets:

```bash
aws s3 rm s3://smartuploader-frontend-1751494811 --recursive
aws s3 rm s3://smartuploader-frontend-1751494910 --recursive
aws s3 rm s3://smartuploader-frontend-1751510870 --recursive
```