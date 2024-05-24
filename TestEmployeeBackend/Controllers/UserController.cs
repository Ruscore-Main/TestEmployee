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
            userJson.jobTitle = newUser.JobTitle.JobTitleName;
            userJson.testResults = new List<TestResultJson>();

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
                id = currentUser.Id,
                login = login,
                password = currentUser.Password,
                role = currentUser.Role.RoleName,
                fio = currentUser.Fio,
                workExperience = currentUser.WorkExperience,
                dateOfBirth = currentUser.DateOfBirth,
                email = currentUser.Email,
                phoneNumber = currentUser.PhoneNumber,
                jobId = currentUser.JobTitleId,
                jobTitle = currentUser.JobTitle.JobTitleName
            };

            List<TestResultJson> testResultsJson = new List<TestResultJson>();

            currentUser.TestResults.ToList().ForEach(el =>
            {
                testResultsJson.Add(new TestResultJson()
                {
                    id = el.Id,
                    userId = el.UserId,
                    testId = el.TestId,
                    timeSpent = el.TimeSpent,
                    countTrueAnswers = el.CountTrueAnswers,
                    countQuestions = el.CountQuestions,
                    DatePassing = el.DatePassing,
                    testName = el.Test.Name
                });
            });

            user.testResults = testResultsJson;

            return new JsonResult(user);
        }


        // PUT /update
        // Обновление пользователя
        [Route("update")]
        [HttpPut]
        public async Task<ActionResult<User>> Update(UserJson userJson)
        {
            User user = await _db.Users.FirstOrDefaultAsync(el => el.Id == userJson.id);
            if (user == null)
            {
                return NotFound("Пользователь не найден!");
            }

            User userWithSameLogin = await _db.Users.FirstOrDefaultAsync(el => el.Id != userJson.id && el.Login == userJson.login);

            if (userWithSameLogin != null)
            {
                return BadRequest("Пользователь с таким логином уже существует!");
            }

            user.Login = userJson.login;
            user.Fio = userJson.fio;
            user.DateOfBirth = userJson.dateOfBirth;
            user.Email = userJson.email;
            user.PhoneNumber = userJson.phoneNumber;
            

            await _db.SaveChangesAsync();

            return new JsonResult(userJson);
        }
         
        // Post /setTestResult
        [Route("setTestResult")]
        [HttpPost]
        public async Task<ActionResult<TestResultJson>> SetTestResult(TestResultJson testResultJson)
        {
            TestResult testResult = new TestResult()
            {
                UserId = testResultJson.userId,
                TestId = testResultJson.testId,
                TimeSpent = testResultJson.timeSpent,
                CountTrueAnswers = testResultJson.countTrueAnswers,
                CountQuestions = testResultJson.countQuestions,
                DatePassing = testResultJson.DatePassing
            };

            await _db.TestResults.AddAsync(testResult);
            await _db.SaveChangesAsync();

            testResultJson.id = testResult.Id;

            return new JsonResult(testResultJson);
        }

        // GET /setTestResult
        [Route("getTestResults")]
        [HttpGet]
        public async Task<ActionResult<TestResultJson>> GetTestResults(int? userId, int? page, string sort, int limit = 10)
        {
            List<TestResultJson> testResultsJson = new List<TestResultJson>();
            List<TestResult> testResults = await _db.TestResults.ToListAsync();

            if (userId != null)
            {
                User user = await _db.Users.FirstOrDefaultAsync(el => el.Id == userId);
                if (user == null)
                {
                    return NotFound("Пользователь не найден!");
                }
                testResults = testResults.Where(el => el.User.Id == userId).ToList();
            }

            // Сортировка списка проектов домов
            if (sort != null)
            {
                switch (sort)
                {
                    case "workExperience":
                        {
                            testResults = testResults.OrderBy(el => el.User.WorkExperience).ToList();
                            break;
                        }
                    case "-workExperience":
                        {
                            testResults = testResults.OrderByDescending(el => el.User.WorkExperience).ToList();
                            break;
                        }

                    case "result":
                        {
                            testResults = testResults.OrderBy(el => el.CountTrueAnswers).ToList();
                            break;
                        }
                    case "-result":
                        {
                            testResults = testResults.OrderByDescending(el => el.CountTrueAnswers).ToList();
                            break;
                        }
                }
            }
            int amountPages = Convert.ToInt32(Math.Ceiling(testResults.Count / (float)limit));

            if (page != null)
            {
                testResults = testResults.Skip(limit * ((int)page - 1)).Take(limit).ToList();
            }

            testResults.ForEach(el =>
            {
                testResultsJson.Add(new TestResultJson()
                {
                    id = el.Id,
                    userId = el.UserId,
                    workExperience = el.User.WorkExperience,
                    testId = el.TestId,
                    timeSpent = el.TimeSpent,
                    countTrueAnswers = el.CountTrueAnswers,
                    countQuestions = el.CountQuestions,
                    DatePassing = el.DatePassing,
                    testName = el.Test.Name
                });
            });

            ResponseTestResultnJson responseTestResult = new ResponseTestResultnJson()
            {
                items = testResultsJson,
                amountPages = amountPages
            };
            return new JsonResult(responseTestResult);
        }
    }
}
