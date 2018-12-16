using backend.Models;
using Microsoft.AspNetCore.Cors;
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
            con = new SqlConnection(@"data source=cruisemurderdb.cat4spyvo2xb.ap-southeast-2.rds.amazonaws.com;" +
                "initial catalog=" + databaseName + ";" +
                "User Id=sa;" +
                "Password=12345678");
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
            
            return jsonString;
        }

        [HttpPost]
        public ActionResult<string> Post([FromBody] string id)
        {
            con = new SqlConnection(@"data source=cruisemurderdb.cat4spyvo2xb.ap-southeast-2.rds.amazonaws.com;" +
                "initial catalog=" + databaseName + ";" +
                "User Id=sa;" +
                "Password=12345678");
            string sql = "updateCounterAtEnding " + id;
            try
            {
                //Request.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                //Request.HttpContext.Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
                //Request.HttpContext.Response.Headers.Add("Access-Control-Allow-Headers", "Origin, Content-Type,X-Auth-Token");
                con.Open();
                SqlCommand command = new SqlCommand(sql, con);
                SqlDataAdapter sqlDataAdap = new SqlDataAdapter(command);
                command.ExecuteNonQuery();
                command.Dispose();
                con.Close();

                return Ok();
            }
            catch (Exception _)
            {
                return "failed";
            }
        }
    }
}
