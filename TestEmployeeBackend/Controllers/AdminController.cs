using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestEmployeeBackend.Models;

namespace TestEmployeeBackend.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : Controller
    {
        private TestEmployeeDBContext? _db;

        public AdminController(TestEmployeeDBContext projectContext)
        {
            _db = projectContext;
        }

        // Получение всех пользователей
        [Route("users")]
        [HttpGet]
        public async Task<ActionResult> GetUsers(int? page, string searchValue, int limit = 6)
        {
            List<User> users = await _db.Users.ToListAsync();

            if (searchValue != null)
            {
                users = users.Where(el => el.Fio.ToLower().Contains(searchValue.ToLower())).ToList();
            }

            int amountPages = Convert.ToInt32(Math.Ceiling(users.Count / (float)limit));

            if (page != null)
            {
                users = users.Skip(limit * ((int)page - 1)).Take(limit).ToList();
            }

            List<UserJson> usersJson = new List<UserJson>();

            users.ForEach(user =>
            {
                UserJson userJson = new UserJson()
                {
                    id=user.Id,
                    login = user.Login,
                    password = user.Password,
                    role = user.Role.RoleName,
                    fio = user.Fio,
                    workExperience = user.WorkExperience,
                    dateOfBirth = user.DateOfBirth,
                    email = user.Email,
                    phoneNumber = user.PhoneNumber,
                    jobId = user.JobTitleId
                };

                usersJson.Add(userJson);
            });


            ResponseUserJson responseUser = new ResponseUserJson()
            {
                items = usersJson,
                amountPages = amountPages
            };

            return new JsonResult(responseUser);
        }

    }
}
