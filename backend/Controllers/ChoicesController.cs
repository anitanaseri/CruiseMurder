using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChoicesController : ControllerBase
    {
        SqlConnection con = new SqlConnection("Server=localhost;Database=vacation_program;Integrated Security=SSPI");
        SqlDataAdapter da;
        DataSet ds;

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            string qry = "select * from Choices";
            da = new SqlDataAdapter(qry, con);
            ds = new DataSet();
            da.Fill(ds);
            List<string> result = new List<string>();
            for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
            {
                result.Add(ds.Tables[0].Rows[i].ItemArray[3].ToString());
            }
            return result;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            string qry = "select * from Choices where choiceId = " + id;
            da = new SqlDataAdapter(qry, con);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0].Rows[0].ItemArray[3].ToString();
        }
    }
}
