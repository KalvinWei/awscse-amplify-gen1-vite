import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { tripsummarydaily } from './function/tripsummarydaily/resource';
import {
  RestApi,
  LambdaIntegration,
  AuthorizationType,
  Cors,
  ResponseType,
} from 'aws-cdk-lib/aws-apigateway';
import { Policy, PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';
import { defineBackend } from '@aws-amplify/backend';
import { Stack, Duration } from 'aws-cdk-lib';

const backend = defineBackend({
  auth,
  data,
  storage,
  tripsummarydaily,
});
const cfnGraphqlApi = backend.data.resources.cfnResources.cfnGraphqlApi;
cfnGraphqlApi.additionalAuthenticationProviders = [
  {
    authenticationType: 'AWS_IAM',
  },
];

// Grant signed-in Amplify users IAM access to the Gen1 AppSync API so the Gen1
// app keeps working after refactor (Identity Pool AuthRole becomes Gen2 role).
backend.auth.resources.authenticatedUserIamRole.addToPrincipalPolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ['appsync:GraphQL'],
    resources: [
      `arn:aws:appsync:${backend.data.stack.region}:${backend.data.stack.account}:apis/fzzahbsvzbantlj53tckwsz3qa/*`,
    ],
  })
);
const branchName = process.env.AWS_BRANCH ?? 'sandbox';
const tripnotesrestStack = backend.createStack('rest-api-stack-tripnotesrest');
const tripnotesrestApi = new RestApi(tripnotesrestStack, 'RestApi', {
  restApiName: `tripnotesrest-${branchName}`,
});
tripnotesrestApi.addGatewayResponse('Default4XX', {
  type: ResponseType.DEFAULT_4XX,
  responseHeaders: {
    'Access-Control-Allow-Origin': "'*'",
    'Access-Control-Allow-Headers':
      "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    'Access-Control-Allow-Methods': "'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT'",
    'Access-Control-Expose-Headers': "'Date,X-Amzn-ErrorType'",
  },
});
tripnotesrestApi.addGatewayResponse('Default5XX', {
  type: ResponseType.DEFAULT_5XX,
  responseHeaders: {
    'Access-Control-Allow-Origin': "'*'",
    'Access-Control-Allow-Headers':
      "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    'Access-Control-Allow-Methods': "'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT'",
    'Access-Control-Expose-Headers': "'Date,X-Amzn-ErrorType'",
  },
});
const tripsummarydailyIntegration = new LambdaIntegration(
  backend.tripsummarydaily.resources.lambda
);
const gen1tripnotesrestApi = RestApi.fromRestApiAttributes(
  tripnotesrestStack,
  'Gen1tripnotesrestApi',
  {
    restApiId: '5y4gcuyvt0',
    rootResourceId: 'cyek8mgsa1',
  }
);
const gen1tripnotesrestPolicy = new Policy(
  tripnotesrestStack,
  'Gen1tripnotesrestPolicy',
  {
    statements: [
      new PolicyStatement({
        actions: ['execute-api:Invoke'],
        resources: [
          `${gen1tripnotesrestApi.arnForExecuteApi('POST', '/*')}`,
          `${gen1tripnotesrestApi.arnForExecuteApi('GET', '/*')}`,
          `${gen1tripnotesrestApi.arnForExecuteApi('PUT', '/*')}`,
          `${gen1tripnotesrestApi.arnForExecuteApi('DELETE', '/*')}`,
        ],
      }),
    ],
  }
);
backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(
  gen1tripnotesrestPolicy
);
const publictrips = tripnotesrestApi.root
  .addResource('public')
  .addResource('trips', {
    defaultCorsPreflightOptions: {
      allowOrigins: Cors.ALL_ORIGINS,
      allowMethods: Cors.ALL_METHODS,
      allowHeaders: [
        'Content-Type',
        'X-Amz-Date',
        'Authorization',
        'X-Api-Key',
        'X-Amz-Security-Token',
        'X-Amz-User-Agent',
      ],
      statusCode: 200,
    },
  });
publictrips.addMethod('ANY', tripsummarydailyIntegration);
publictrips.addProxy({
  anyMethod: true,
  defaultIntegration: tripsummarydailyIntegration,
});
// /public/trips - all authenticated users
backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(
  new Policy(tripnotesrestStack, 'publictripsAuthPolicy', {
    statements: [
      new PolicyStatement({
        actions: ['execute-api:Invoke'],
        resources: [
          tripnotesrestApi.arnForExecuteApi('POST', '/public/trips'),
          tripnotesrestApi.arnForExecuteApi('POST', '/public/trips/*'),
          tripnotesrestApi.arnForExecuteApi('GET', '/public/trips'),
          tripnotesrestApi.arnForExecuteApi('GET', '/public/trips/*'),
          tripnotesrestApi.arnForExecuteApi('PUT', '/public/trips'),
          tripnotesrestApi.arnForExecuteApi('PUT', '/public/trips/*'),
          tripnotesrestApi.arnForExecuteApi('DELETE', '/public/trips'),
          tripnotesrestApi.arnForExecuteApi('DELETE', '/public/trips/*'),
        ],
      }),
    ],
  })
);
backend.addOutput({
  custom: {
    API: {
      [tripnotesrestApi.restApiName]: {
        endpoint: tripnotesrestApi.url.slice(0, -1),
        region: Stack.of(tripnotesrestApi).region,
        apiName: tripnotesrestApi.restApiName,
      },
    },
  },
});
const cfnUserPool = backend.auth.resources.cfnResources.cfnUserPool;
cfnUserPool.usernameAttributes = ['email'];
cfnUserPool.policies = {
  passwordPolicy: {
    minimumLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: false,
    temporaryPasswordValidityDays: 7,
  },
};
const userPool = backend.auth.resources.userPool;
userPool.addClient('NativeAppClient', {
  refreshTokenValidity: Duration.days(30),
  enableTokenRevocation: true,
  enablePropagateAdditionalUserContextData: false,
  authSessionValidity: Duration.minutes(3),
  disableOAuth: true,
  generateSecret: false,
});
backend.tripsummarydaily.resources.cfnResources.cfnFunction.functionName = `tripsummarydaily-${branchName}`;
backend.tripsummarydaily.addEnvironment(
  'API_TRIPNOTESAPI_GRAPHQLAPIENDPOINTOUTPUT',
  backend.data.graphqlUrl
);
backend.tripsummarydaily.addEnvironment(
  'API_TRIPNOTESAPI_GRAPHQLAPIIDOUTPUT',
  backend.data.apiId
);
backend.data.resources.graphqlApi.grantMutation(
  backend.tripsummarydaily.resources.lambda
);
backend.data.resources.graphqlApi.grantQuery(
  backend.tripsummarydaily.resources.lambda
);
const s3Bucket = backend.storage.resources.cfnResources.cfnBucket;
// Use this bucket name post refactor
// s3Bucket.bucketName = 'tripnotes-photos-869935107373f34fa-main';
s3Bucket.bucketEncryption = {
  serverSideEncryptionConfiguration: [
    {
      serverSideEncryptionByDefault: {
        sseAlgorithm: 'AES256',
      },
      bucketKeyEnabled: false,
    },
  ],
};
