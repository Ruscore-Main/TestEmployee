﻿using System;
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
                allTests = allTests.Where(el => el.JobTitleId == jobId).Where(el => el.Questions.Count > 0).Where(el => el.Questions.Any(q => q.Status != "Ожидает подтверждения")).ToList();
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
                    jobTitle = el.JobTitle.JobTitleName,
                    timeTest = el.TimeTest
                });
            });


            ResponseTestJson responseTestJson = new ResponseTestJson() {
                items = testsJson,
                amountPages = amountPages
            };

            return new JsonResult(responseTestJson);
        }

        [HttpGet]
        [Route("questions")]
        public async Task<ActionResult<Test>> GetQuestions(int? page, string searchValue, int limit = 6)
        {
            List<Question> allQuestions = await _db.Questions.ToListAsync();
            if (searchValue != null)
            {
                allQuestions = allQuestions.Where(el => el.QuestionText.ToLower().Contains(searchValue.ToLower())).ToList();
            }

            int amountPages = Convert.ToInt32(Math.Ceiling(allQuestions.Count / (float)limit));

            if (page != null)
            {
                allQuestions = allQuestions.Skip(limit * ((int)page - 1)).Take(limit).ToList();
            }

            List<QuestionJson> questionsJson = new List<QuestionJson>();

            allQuestions.ForEach(question =>
            {
                QuestionJson questionJson = new QuestionJson()
                {
                    id = question.Id,
                    questionText = question.QuestionText,
                    status = question.Status,
                    testId = question.TestId
                };

                questionsJson.Add(questionJson);
            });


            ResponseQuestionJson responseUser = new ResponseQuestionJson()
            {
                items = questionsJson,
                amountPages = amountPages
            };

            return new JsonResult(responseUser);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Test>> GetFull(int id)
        {
            Test foundTest = await _db.Tests.FirstOrDefaultAsync(el => el.Id == id);
            if (foundTest == null)
            {
                return NotFound();
            }

            List<QuestionJson> questionsJson = new List<QuestionJson>();


            // Получение всех вопросов
            foundTest.Questions.ToList().ForEach(el =>
            {

                // Получение всех ответов
                List<AnswerJson> answersJsons = new List<AnswerJson>();
                el.Answers.ToList().ForEach(el => {
                    AnswerJson answerJson = new AnswerJson()
                    {
                        id = el.Id,
                        answerText = el.AnswerText,
                        isTrue = el.IsTrue,
                        questionId = el.QuestionId
                    };

                    answersJsons.Add(answerJson);
                });

                QuestionJson questionJson = new QuestionJson()
                {
                    id = el.Id,
                    status = el.Status,
                    questionText = el.QuestionText,
                    testId = el.TestId,
                    answers = answersJsons
                };

                questionsJson.Add(questionJson);
            });

            TestJson testJson = new TestJson()
            {
                id = foundTest.Id,
                name = foundTest.Name,
                jobId = foundTest.JobTitleId,
                timeTest = foundTest.TimeTest,
                questions = questionsJson
            };

            return new JsonResult(testJson);
        }

        [HttpPost]
        [Route("addTest")]
        public async Task<ActionResult<TestJson>> AddTest(TestJson test)
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

        [HttpPost]
        [Route("addQuestion")]
        public async Task<ActionResult<TestJson>> AddQuestion(QuestionJson question)
        {

            List<Answer> answers = new List<Answer>();

            Question newQuestion = new Question()
            {
                TestId = question.testId,
                QuestionText = question.questionText,
                Status = "Ожидает подтверждения",
            };

            question.answers.ForEach(el =>
            {
                answers.Add(new Answer()
                {
                    AnswerText = el.answerText,
                    IsTrue = el.isTrue,
                    QuestionId = newQuestion.Id
                });
            });

            newQuestion.Answers = answers;

            await _db.Questions.AddAsync(newQuestion);
            await _db.SaveChangesAsync();

            question.id = newQuestion.Id;

            return new JsonResult(question);
        }

        [HttpDelete]
        [Route("deleteQuestion/{id}")]
        public async Task<ActionResult<TestJson>> DeleteQuestion(int id)
        {

            Question foundQuestion = await _db.Questions.FirstOrDefaultAsync(el => el.Id == id);

            if (foundQuestion == null)
            {
                return NotFound();
            }

            _db.Questions.Remove(foundQuestion);
            await _db.SaveChangesAsync();

            return Ok(foundQuestion);
        }

        [HttpGet]
        [Route("acceptQuestion/{id}")]
        public async Task<ActionResult<TestJson>> AcceptQuestion(int id)
        {
            Question foundQuestion = await _db.Questions.FirstOrDefaultAsync(el => el.Id == id);

            if (foundQuestion == null)
            {
                return NotFound();
            }

            foundQuestion.Status = "Утвержден";

            await _db.SaveChangesAsync();

            return Ok(foundQuestion);
        }

        [HttpPut]
        [Route("updateQuestion/{id}")]
        public async Task<ActionResult<TestJson>> UpdateQuestion(QuestionJson question)
        {
            Question foundQuestion = await _db.Questions.FirstOrDefaultAsync(el => el.Id == question.id);

            if (foundQuestion == null)
            {
                return NotFound();
            }

            foundQuestion.QuestionText = question.questionText;

            await _db.SaveChangesAsync();

            return Ok(foundQuestion);
        }


    }
}
