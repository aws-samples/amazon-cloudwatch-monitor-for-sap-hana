# Overview

![badge](https://codebuild.eu-central-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiTVBuUW9pbGlwNlNxVWJ4N3VhdmkyTjZJMVRqc1VvTnk0ZXNsWXNvNnFTR1pkRnlxQkFuQVpORkRqQnp2aUVYaE5PT1ZhVW83R2l5ZkljaHI4SGR1OEdvPSIsIml2UGFyYW1ldGVyU3BlYyI6InNPaUFXamZKdkNKZUFTaTYiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

Amazon CloudWatch Monitoring for SAP HANA powered by AWS Lambda.

Please see our blog post [SAP HANA Monitoring: A serverless approach using Amazon CloudWatch](https://aws.amazon.com/blogs/awsforsap/sap-monitoring-a-serverless-approach-using-amazon-hana/) for more info on the motivation and concept!

## Prerequisites

- SAP HANA >= 1.0 SPS 12
- Amazon VPC security group(s) allowing inbound/outbound traffic on port 3\<instanceID\>13 or 3\<instanceID\>15, so that the Lambda function can connect via the private subnet to the SAP HANA database to be monitored.
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

## License

This solution is licensed under the [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](.LICENSE).

It requires the [SAP HANA Client for Node.js](https://www.npmjs.com/package/@sap/hana-client) from SAP SE.
  
All rights reserved.