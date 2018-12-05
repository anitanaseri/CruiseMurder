using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EndingRecordController: ControllerBase
    {
        string databaseName = "CruiseMurderDB";
        SqlConnection con;
        SqlDataAdapter da;
        DataSet ds;

        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            con = new SqlConnection("Server=localhost;Database=" + databaseName + ";Integrated Security=SSPI");
            string qry = "getCounterAtEnding " + id;
            da = new SqlDataAdapter(qry, con);
            ds = new DataSet();
            da.Fill(ds);
            if (ds.Tables[0].Rows.Count == 0) return "";
            EndingRecordItem item = new EndingRecordItem
            {
                SceneId = (int)ds.Tables[0].Rows[0].ItemArray[1],
                SceneCount = (int) ds.Tables[0].Rows[0].ItemArray[0]
            };

            string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(item);
            return jsonString;
        }

        [HttpPost]
        public ActionResult<string> Post([FromBody] string id)
        {
            con = new SqlConnection("Server=localhost;Database=" + databaseName + ";Integrated Security=SSPI");
            string sql = "updateCounterAtEnding " + id;
            try
            {
                con.Open();
                SqlCommand command = new SqlCommand(sql, con);
                SqlDataAdapter sqlDataAdap = new SqlDataAdapter(command);
                command.ExecuteNonQuery();
                command.Dispose();
                con.Close();
                return "succeed";
            }
            catch (Exception _)
            {
                return "failed";
            }
        }
    }
}
