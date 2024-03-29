#!/bin/bash

set -e

echo "Specify your SAP HANA SystemID (3 letters):"
read sapsid

echo "Specify your password for SAP HANA user"
read sappassword

echo 'Prepare ChangeSet...'

json=$(aws cloudformation describe-stacks --stack-name serverlessrepo-sap-monitor-hana-$sapsid --query 'Stacks[*].Parameters')
json=$(sed 's/\*\*\*\*/'$sappassword'/g' <<< $json)
json=$(sed 's/ParameterKey/Name/g' <<< $json)
json=$(sed 's/ParameterValue/Value/g' <<< $json)
json=$(sed 's/\[ \[/\[/g' <<< $json)
json=$(sed 's/\] \]/\]/g' <<< $json)
changeARN=$(aws serverlessrepo create-cloud-formation-change-set \
--application-id arn:aws:serverlessrepo:eu-central-1:529824580566:applications/sap-monitor-hana \
--stack-name sap-monitor-hana-$sapsid \
--capabilities CAPABILITY_RESOURCE_POLICY CAPABILITY_IAM \
--parameter-overrides "$json" \
--query "ChangeSetId")
changeARN=$(sed -e 's/^"//' -e 's/"$//' <<<"$changeARN")

echo 'Wait 30 seconds...'
sleep 30
echo 'Deploy...'
aws cloudformation execute-change-set --change-set-name $changeARN
aws cloudformation describe-stacks --stack-name serverlessrepo-sap-monitor-hana-$sapsid --query 'Stacks[*].Tags'
echo 'All done! Check AWS CloudFormation console for any errors!'