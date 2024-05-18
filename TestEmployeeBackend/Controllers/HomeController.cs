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
        public async Task<ActionResult<Test>> Get(int? page, int? jobId, int limit = 6)
        {
            List<Test> allTests = await _db.Tests.ToListAsync();
            if (jobId != null)
            {
                allTests = allTests.Where(el => el.JobTitleId == jobId).ToList();
            }

            int amountPages = Convert.ToInt32(Math.Ceiling(allTests.Count / (float)limit));

            if (page != null)
            {
                allTests = allTests.Skip(limit * ((int)page - 1)).Take(limit).ToList();
            }

            List<TestJson> testsJson = new List<TestJson>();

            allTests.ForEach(el =>
            {
                testsJson.Add(new TestJson()
                {
                    id = el.Id,
                    name = el.Name,
                    jobId = el.JobTitleId,
                    timeTest = el.TimeTest
                });
            });


            ResponseTestJson responseTestJson = new ResponseTestJson() {
                items = testsJson,
                amountPages = amountPages
            };

            return new JsonResult(responseTestJson);
        }

        [HttpPost]
        [Route("addTest")]
        public async Task<ActionResult<Test>> AddTest(TestJson test)
        {
            Test newTest = new Test()
            {
                Name = test.name,
                TimeTest = test.timeTest,
                JobTitleId = test.jobId
            };

            await _db.Tests.AddAsync(newTest);
            await _db.SaveChangesAsync();

            test.id = newTest.Id;

            return new JsonResult(test);
        }
    }
}
