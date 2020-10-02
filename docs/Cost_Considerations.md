# Cost Considerations

As previously mentioned, this solution has to be deployed per SID.

As an example, for simple HANA System, without considering free tier, costs are estimated to be approximately [14 USD / month per SID](https://calculator.aws/#/estimate?id=be780508e9c65bf3013a54e56a2c13e907abc8e5).

Especially the Lambda function turns out to be very cost effective, serving metrics in less than 500ms in average at a memory consumption of just 512Mb.  As the Lambda is kept warm through our periodic execution every minute, we also don’t require any [cold start tweaks](https://aws.amazon.com/de/blogs/compute/new-for-aws-lambda-predictable-start-up-times-with-provisioned-concurrency/).

To limit the stored log data, make sure to also [reduce the retention period](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#SettingLogRetention) for “/aws/lambda/sap-monitor-hana-\<SID\>” to e.g. 1 week.