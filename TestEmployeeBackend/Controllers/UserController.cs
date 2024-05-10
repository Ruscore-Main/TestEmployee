using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpGet]
        [Route("jobs")]
        public async Task<ActionResult<IEnumerable<JsonResult>>> Get()
        {
            List<JobTitle> allJobs = await _db.JobTitles.ToListAsync();


            return new JsonResult(allJobs);
        }


        // POST /registration
        // Регистрация пользователя
        [Route("registration")]
        [HttpPost]
        public async Task<ActionResult<User>> Registration(UserJson userJson)
        {
            string login = userJson.login;
            List<User> users = await _db.Users.ToListAsync();
            if (users.Any(el => el.Login == login))
            {
                return BadRequest("Пользователь с таким логином уже существует!");
            }

            Role foundRole = await _db.Roles.FirstOrDefaultAsync(el => el.RoleName == "Employee");

            User newUser = new User()
            {
                Login = login,
                Password = userJson.password,
                Role = foundRole,
                Fio = userJson.fio,
                WorkExperience = userJson.workExperience,
                DateOfBirth = userJson.dateOfBirth,
                Email = userJson.email,
                PhoneNumber = userJson.phoneNumber,
                JobTitleId = userJson.jobId
            };

            await _db.Users.AddAsync(newUser);
            await _db.SaveChangesAsync();

            userJson.id = newUser.Id;
            userJson.role = newUser.Role.RoleName;

            return new JsonResult(userJson);
        }

        // POST /authorization
        // Авторизация пользователя
        [Route("authorization")]
        [HttpPost]
        public async Task<ActionResult> Authorization(UserRequest ur)
        {
            string login = ur.login;
            string password = ur.password;
            List<User> users = await _db.Users.ToListAsync();
            User currentUser = users.FirstOrDefault(el => el.Login == login && el.Password == password);
            if (currentUser == null)
            {
                return NotFound("Пользователь не найден!");
            }

            UserJson user = new UserJson()
            {
                login = login,
                password = currentUser.Password,
                role = currentUser.Role.RoleName,
                fio = currentUser.Fio,
                workExperience = currentUser.WorkExperience,
                dateOfBirth = currentUser.DateOfBirth,
                email = currentUser.Email,
                phoneNumber = currentUser.PhoneNumber,
                jobId = currentUser.JobTitleId
            };

            return new JsonResult(user);
        }
    }
}
