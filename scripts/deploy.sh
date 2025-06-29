#!/bin/bash

zip -r lambda-code.zip src/
aws s3 cp lambda-code.zip s3://YOUR_CODE_BUCKET_NAME/

aws cloudformation deploy \
  --template-file templates/cloudformation.yaml \
  --stack-name smart-uploader-dev \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides Environment=dev
