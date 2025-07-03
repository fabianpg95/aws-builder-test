#!/bin/bash

zip -r lambda-code.zip src/
aws s3 cp lambda-code.zip s3://YOUR_CODE_BUCKET_NAME/

aws cloudformation deploy \
  --template-file templates/cloudformation.yaml \
  --stack-name smart-uploader-dev \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides Environment=dev

set -e  # Exit immediately on error

# Configuration variables
BUCKET_NAME="smart-uploader-cdn"
CLOUDFRONT_DISTRIBUTION_ID="E123456ABCDEFG"  # ⚠️ Replace with your real CloudFront distribution ID

echo "🔧 Deploying minified frontend to S3..."

# Sync frontend files to S3 bucket with proper headers
aws s3 sync ./cdn s3://$BUCKET_NAME/ \
  --acl public-read \
  --cache-control "no-cache" \
  --delete

echo "✅ Files uploaded to S3: s3://$BUCKET_NAME/"

# Optional: Invalidate CloudFront cache if distribution ID is set
if [[ ! -z "$CLOUDFRONT_DISTRIBUTION_ID" ]]; then
  echo "🚀 Invalidating CloudFront cache..."
  aws cloudfront create-invalidation \
    --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
    --paths "/*"
  echo "✅ Cache invalidation request submitted."
else
  echo "⚠️ CLOUDFRONT_DISTRIBUTION_ID not set, skipping cache invalidation."
fi

echo "✅ Frontend deployment complete."
