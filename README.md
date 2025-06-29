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

```java
│
├── api/
│   ├── lambda_function.py          # API Lambda handler
│   ├── requirements.txt            # API dependencies
│   └── utils.py                   # Helper utils (JWT validation, etc)
│
├── workers/
│   ├── processor_lambda.py         # Worker Lambda for async processing
│   └── requirements.txt            # Worker dependencies
│
├── frontend/
│   ├── index.html                 # Frontend entry point
│   ├── app.js                     # Frontend JS logic
│   └── styles.css                 # Frontend styles
│
├── templates/
│   └── cloudformation.yaml        # Full infra CloudFormation template
│
├── scripts/
│   └── deploy.sh                  # Deployment script (setup venv, deploy)
│
├── .env                          # Environment variables for local dev
└── README.md                     # This file

```
---

## 🛠️ Setup & Deployment

### 1. Install Dependencies

```bash
pip install -r src/requirements.txt

