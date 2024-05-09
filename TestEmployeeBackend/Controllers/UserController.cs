using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TestEmployeeBackend.Models;

namespace TestEmployeeBackend.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : Controller
    {
        private TestEmployeeDBContext? _db;

        public UserController(TestEmployeeDBContext projectContext)
        {
            _db = projectContext;
        }
    }
}
