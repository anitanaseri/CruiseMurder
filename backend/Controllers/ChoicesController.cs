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
        string databaseName = "SQL_Workshop_2018";
        SqlConnection con;
        SqlDataAdapter da;
        DataSet ds;

        // GET api/Choices/id
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            con = new SqlConnection("Server=localhost;Database=" + databaseName + ";Integrated Security=SSPI");
            string qry = "getChoicesFromScene " + id;
            da = new SqlDataAdapter(qry, con);
            ds = new DataSet();
            da.Fill(ds);
            return ds.Tables[0].Rows[0].ItemArray[0].ToString();
        }
    }
}
