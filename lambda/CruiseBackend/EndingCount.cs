using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;

namespace CruiseBackend
{
    class EndingCount
    {
        string databaseName = "CruiseMurderDB";
        String connectionString = @"data source=cruisemurderdb.cat4spyvo2xb.ap-southeast-2.rds.amazonaws.com;" +
                "initial catalog=CruiseMurderDB;" +
                "User Id=sa;Password=12345678";
        SqlConnection con;
        SqlDataAdapter da;
        DataSet ds;

        public EndingCount() { }

        public APIGatewayProxyResponse Get(APIGatewayProxyRequest request, ILambdaContext context)
        {
            var id = request.Body;
            con = new SqlConnection(connectionString);
            con.Open();
            string qry = "getCounterAtEnding " + id;
            SqlCommand cmd = new SqlCommand(qry, con);
            SqlDataReader dataReader = cmd.ExecuteReader();
            string jsonString = "";
            if (dataReader.Read())
            {
                EndingRecordItem item = new EndingRecordItem
                {
                    SceneId = (int)dataReader.GetValue(1),
                    SceneCount = (int)dataReader.GetValue(0),
                };
                jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(item);
            }

            dataReader.Close();
            cmd.Dispose();

            con.Close();

            var response = new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.OK,
                Body = jsonString,
                Headers = new Dictionary<string, string> { { "Content-Type", "application/json" }, { "Access-Control-Allow-Origin", "*" } }
            };

            return response;
        }

        public class EndingRecordItem
        {
            public int SceneId { get; set; }
            public int SceneCount { get; set; }
        }
    }
}
