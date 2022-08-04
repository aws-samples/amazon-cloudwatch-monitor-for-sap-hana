# Overview

![badge](https://codebuild.eu-central-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiQXd4MS94UTE2ZEZPQzNndnJ0b3ZyVFY2czZodFcvemlFVFVJWlliZzA1c2ZiMlRwbUlRZ0NZOStBR1h5R1grYTJQWmk1WE5RN3g2ZlNLaWNHanAxZW4wPSIsIml2UGFyYW1ldGVyU3BlYyI6Ii9hQURXWVFHbUU2aEphNTEiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

Amazon CloudWatch Monitoring for SAP HANA powered by AWS Lambda.

Please see our blog post [SAP HANA Monitoring: A serverless approach using Amazon CloudWatch](https://aws.amazon.com/blogs/awsforsap/sap-hana-monitoring-a-serverless-approach-using-amazon-cloudwatch/) for more info on the motivation and concept!

> :mega: Update 12/2021: If you prefer a **fully supported & agent-based solution** instead, kindly checkout the new [Amazon CloudWatch Application Insights for SAP HANA](https://aws.amazon.com/de/blogs/awsforsap/sap-hana-observability-with-amazon-cloudwatch-application-insights/)!

## Prerequisites

- SAP HANA >= 1.0 SPS 12
- SAP HANA Monitoring user and password - see "Setting it up -> Step 1"
- Amazon VPC security group(s) allowing inbound/outbound traffic - see also section “Architecture”:
  - Lambda + SAP HANA@EC2: 3\<instanceID\>13 and 3\<instanceID\>15, so that the Lambda function can connect via the private subnet to the SAP HANA system to be monitored
  - Lambda: Additionally port 443 to call AWS Secrets Manager and CloudWatch APIs. In case of a private subnet without NAT Gateway make sure to create respective [private endpoints](https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html)!
- For Production systems, make sure to enable CloudWatch detailed monitoring according to [SAP note 1656250](https://launchpad.support.sap.com/#/notes/1656250).

## Setting it up

Please follow the [step-by-step guide](https://github.com/aws-samples/amazon-cloudwatch-monitor-for-sap-hana/blob/master/docs/Setting_it_up.md).

## Architecture

**Note:** You will have to deploy a single instance of this application per SAP HANA DB! 

![Architecture](https://github.com/aws-samples/amazon-cloudwatch-monitor-for-sap-hana/blob/master/assets/arch.png?raw=true)

The resulting dashboards can look as follows  

![Dashboard1](https://github.com/aws-samples/amazon-cloudwatch-monitor-for-sap-hana/blob/master/assets/cw_dashboard1.png?raw=true)
![Dashboard2](https://github.com/aws-samples/amazon-cloudwatch-monitor-for-sap-hana/blob/master/assets/cw_dashboard2.png?raw=true)

## Further Read

- [Cost Considerations](https://github.com/aws-samples/amazon-cloudwatch-monitor-for-sap-hana/blob/master/docs/Cost_Considerations.md)  
- [Performance & Overhead Considerations](https://github.com/aws-samples/amazon-cloudwatch-monitor-for-sap-hana/blob/master/docs/Performance_Considerations.md)  
- [Known Issues](https://github.com/aws-samples/amazon-cloudwatch-monitor-for-sap-hana/blob/master/docs/Known_Issues.md)  
- [Collected Metrics](https://github.com/aws-samples/amazon-cloudwatch-monitor-for-sap-hana/blob/master/docs/Metrics.md)  
- [Troubleshooting](https://github.com/aws-samples/amazon-cloudwatch-monitor-for-sap-hana/blob/master/docs/Troubleshooting.md)  

## Changelog

0.1.4

- Upgrade to Node16
- Upgrade to SAP HANA Client [2.13.22](https://launchpad.support.sap.com/#/notes/3210156)

## License

This solution is licensed under the [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](.LICENSE).

It requires the [SAP HANA Client for Node.js](https://www.npmjs.com/package/@sap/hana-client) from SAP SE.
  
All rights reserved.
