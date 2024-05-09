using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TestEmployeeBackend.Models;

namespace TestEmployeeBackend.Controllers
{
    [Route("api/test")]
    [ApiController]
    public class HomeController : Controller
    {
        private TestEmployeeDBContext? _db;

        public HomeController(TestEmployeeDBContext projectContext)
        {
            _db = projectContext;
        }

        [HttpGet]
        [Route("jobs")]
        public async Task<ActionResult<IEnumerable<JsonResult>>> Get()
        {
            List<JobTitle> allJobs = await _db.JobTitles.ToListAsync();


            return new JsonResult(allJobs);
        }

    }
}
