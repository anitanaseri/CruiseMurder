using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScenesController : ControllerBase
    {
        string databaseName = "TestDB";
        SqlConnection con;
        SqlDataAdapter da;
        DataSet ds;

     

        // GET api/scenes/id
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            con = new SqlConnection("Server=localhost;Database=" + databaseName + ";Integrated Security=SSPI");
            string qry = "getScene " + id;
            da = new SqlDataAdapter(qry, con);
            ds = new DataSet();
            da.Fill(ds);
            SceneItem item = new SceneItem
            {
                SceneContent = ds.Tables[0].Rows[0].ItemArray[0].ToString()
            };

            qry = "getChoicesFromScene " + id;
            da = new SqlDataAdapter(qry, con);
            ds = new DataSet();
            da.Fill(ds);
            List<string> choices = new List<string>();
            for(int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                choices.Add(ds.Tables[0].Rows[i].ItemArray[0].ToString());
            }
            item.Choices = choices;

            string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(item);
            return jsonString;
        }
    }
}
