#!/bin/bash

set -e

releaseID='9a1487cad0236587af2bba0b4196eabf' # v.0.1.6


# Create Bucket if not exists
accountid=$(aws sts get-caller-identity --query Account --output text)
if aws s3 ls "s3://$accountid-sapmonitorhana" 2>&1 | grep -q 'NoSuchBucket'
then
echo "Create Amazon S3 Bucket to store artifacts"
aws s3 mb s3://$accountid-sapmonitorhana
fi

# Copy Artifacts
echo "Copy artifacts to S3 Bucket"
aws s3 cp s3://sap-monitor-hana/$releaseID ./ --source-region eu-central-1
aws s3 cp $releaseID s3://$accountid-sapmonitorhana/$releaseID

# Upload YAML
echo "Adjust AWS CloudFormation Template"
wget https://github.com/aws-samples/amazon-cloudwatch-monitor-for-sap-hana/raw/master/packaged.yml
sed -i 's/s3\:\/\/sap-monitor-hana\/'$releaseID'/s3\:\/\/'$accountid'-sapmonitorhana\/'$releaseID'/g' packaged.yml
aws s3 cp packaged.yml s3://$accountid-sapmonitorhana/packaged.yml

echo "All Done!"
echo "Create a new AWS CloudFormation stack by selecting Amazon S3 as template source:"
echo "https://$accountid-sapmonitorhana.s3.amazonaws.com/packaged.yml"