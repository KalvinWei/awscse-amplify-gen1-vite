/* Amplify Params - DO NOT EDIT
	API_TRIPNOTESAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_TRIPNOTESAPI_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export async function handler(event) {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Amz-Date,X-Amz-Security-Token,X-Api-Key",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Hello from Lambda!",
            source: "tripsummarydaily",
            env: process.env.ENV,
            region: process.env.REGION,
            timestamp: new Date().toISOString()
        }),
    };
}
