using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
//[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace CruiseBackend
{
    public class Functions
    {
        string databaseName = "CruiseMurderDB";
        SqlConnection con;
        SqlDataAdapter da;
        DataSet ds;

        /// <summary>
        /// Default constructor that Lambda will invoke.
        /// </summary>
        public Functions()
        {
        }


        /// <summary>
        /// A Lambda function to respond to HTTP Get methods from API Gateway
        /// </summary>
        /// <param name="request"></param>
        /// <returns>The list of blogs</returns>
        public APIGatewayProxyResponse Get(APIGatewayProxyRequest request, ILambdaContext context)
        {
            var b = request.Body;
            context.Logger.LogLine("Get Request\n" + b.ToString() + "\n");

            var response = new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.OK,
                Body = "Hello AWS Serverless\n" + b.ToString(),
                Headers = new Dictionary<string, string> { { "Content-Type", "application/json" }, { "Access-Control-Allow-Origin", "*" } }
            };

            return response;
        }


        /// <summary>
        /// A Lambda function to acquire scene data with a specific scene id.
        /// </summary>
        /// <param name="request"></param>
        /// <returns>The list of blogs</returns>
        public APIGatewayProxyResponse GetScene(APIGatewayProxyRequest request, ILambdaContext context)
        {
            var b = request.Body;
            var b_obj = Newtonsoft.Json.JsonConvert.DeserializeObject(b);
            context.Logger.LogLine("Get Request\n" + b.ToString() + "\n");

            var response = new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.OK,
                Body = "Hello AWS Serverless\n" + b.ToString(),
                Headers = new Dictionary<string, string> { { "Content-Type", "application/json" }, { "Access-Control-Allow-Origin", "*" } }
            };

            return response;
        }
    }
}
