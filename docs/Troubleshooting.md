# Troubleshooting

### Metrics not available

In case of metrics are not available inside CloudWatch or Lambda Runtime Errors, make sure to check the Lambda Function and CloudWatch Logs - Log Group **/aws/lambda/sap-monitor-hana-\<SID\>**.

You can always change your credentials or connection information (e.g. host) inside AWS Secrets Manager.

To force a config reload, simply pass the string "refresh":

![Imgur](../assets/tr1.png)

![Imgur](../assets/tr2.png)

For debugging purposes, temporarily add an environment variable - Key: DEBUG Value: true

Make sure to also check your connectiviy, as per prerequisites:

> Amazon VPC security group(s) allowing inbound/outbound traffic - see also section “Architecture”:
> - Lambda + SAP HANA@EC2: 3\<instanceID\>13 and 3\<instanceID\>15, so that the Lambda function can connect via the private subnet to the SAP HANA system to be monitored
> - Lambda: Additionally port 443 to call AWS Secrets Manager and CloudWatch APIs. In case of a private subnet without NAT Gateway make sure to create respective [private endpoints](https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html)!

### Authentication failed

In case of "authentication failed SQLSTATE: 28000" (e.g. single tenant), modify the database name in AWS Secrets Manager to "SYSTEMDB" instead of HANA SID.
