import { defineFunction } from '@aws-amplify/backend';

const branchName = process.env.AWS_BRANCH ?? 'sandbox';

export const tripsummarydaily = defineFunction({
  entry: './index.js',
  name: `tripsummarydaily-${branchName}`,
  timeoutSeconds: 25,
  memoryMB: 128,
  environment: { ENV: `${branchName}`, REGION: 'us-west-2' },
  runtime: 22,
  schedule: '0 0 * * ? *',
});
