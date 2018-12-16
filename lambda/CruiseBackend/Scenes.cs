using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;

[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace CruiseBackend
{
    class Scenes
    {
        string databaseName = "CruiseMurderDB";
        String connectionString = @"data source=cruisemurderdb.cat4spyvo2xb.ap-southeast-2.rds.amazonaws.com;" +
                "initial catalog=CruiseMurderDB;" +
                "User Id=sa;Password=12345678";
        SqlConnection con;
        SqlDataAdapter da;
        DataSet ds;

        public Scenes() { }

        public APIGatewayProxyResponse Get(APIGatewayProxyRequest request, ILambdaContext context)
        {
            var id = request.Body;
            con = new SqlConnection(connectionString);
            con.Open();
            string qry = "getScene " + id;
            SqlCommand cmd = new SqlCommand(qry, con);
            SqlDataReader dataReader = cmd.ExecuteReader();
            dataReader.Read();
            SceneItem item = new SceneItem
            {
                SceneContent = (String)dataReader.GetValue(0),
                SceneImage = (String)dataReader.GetValue(1),
                SceneId = (int)dataReader.GetValue(2),
                EndingType = (String)dataReader.GetValue(3),
                SceneLocation = (String)dataReader.GetValue(4)
            };

            dataReader.Close();
            cmd.Dispose();

            qry = "getChoicesFromScene " + id;
            cmd = new SqlCommand(qry, con);
            dataReader = cmd.ExecuteReader();
            List<ChoiceItem> choices = new List<ChoiceItem>();
            while (dataReader.Read())
            {
                ChoiceItem choice = new ChoiceItem();
                choice.Consequent = (int)dataReader.GetValue(0);
                choice.Text = (String)dataReader.GetValue(1);
                choices.Add(choice);
            }
            item.Choices = choices;

            dataReader.Close();
            cmd.Dispose();
            con.Close();

            string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(item);

            var response = new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.OK,
                Body = jsonString,
                Headers = new Dictionary<string, string> { { "Content-Type", "application/json" }, { "Access-Control-Allow-Origin", "*" } }
            };

            return response;
        }

        class SceneItem
        {
            public string SceneContent { get; set; }
            public string SceneImage { get; set; }
            public string EndingType { get; set; }
            public string SceneLocation { get; set; }
            public int SceneId { get; set; }
            public List<ChoiceItem> Choices { get; set; }
        }

        class ChoiceItem
        {
            public int Consequent { get; set; }

            public string Text { get; set; }
        }
    }
}
