using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestEmployeeBackend.Models
{
    // Json Model of User
    public class UserJson
    {
        public int id { get; set; }
        public string login { get; set; }
        public string password { get; set; }
        public string role { get; set; }
        public string fio { get; set; }
        public int? workExperience { get; set; }
        public DateTime? dateOfBirth { get; set; }
        public string email { get; set; }
        public string phoneNumber { get; set; }
        public int? jobId { get; set; }
        public string jobTitle { get; set; }

        public List<TestResultJson> testResults { get; set; }
    }

    // Json Model of Test
    public class TestJson
    {
        public int? id { get; set; }
        public string name { get; set; }
        public int? jobId { get; set; }
        public string jobTitle { get; set; }
        public int? timeTest { get; set; }
        public List<QuestionJson> questions { get; set; }
    }

    // Json Model of Answer
    public class AnswerJson
    {
        public int id { get; set; }
        public string answerText { get; set; }
        public bool? isTrue { get; set; }
        public int? questionId { get; set; }
    }


    // Json Model of Question
    public class QuestionJson
    {
        public int id { get; set; }
        public string questionText { get; set; }
        public string status { get; set; }
        public int? testId { get; set; }
        public List<AnswerJson> answers { get; set; }
    }

    // Json Model of TestResult
    public class TestResultJson
    {
        public int id { get; set; }
        public int? userId { get; set; }
        public int? testId { get; set; }
        public string testName { get; set; }
        public int? timeSpent { get; set; }
        public double? countTrueAnswers { get; set; }
        public int? countQuestions { get; set; }
        public DateTime? DatePassing { get; set; }
    }

    // Json Model for User list
    public class ResponseTestJson
    {
        public int amountPages { get; set; }
        public List<TestJson> items { get; set; }
    }

    // Json Model for Login
    public class UserRequest
    {
        public string login { get; set; }
        public string password { get; set; }
    };


    // Json Model for User list
    public class ResponseUserJson
    {
        public int amountPages { get; set; }
        public List<UserJson> items { get; set; }
    }


    // Json Model for Question list
    public class ResponseQuestionJson
    {
        public int amountPages { get; set; }
        public List<QuestionJson> items { get; set; }
    }

    // Json Model for Question list
    public class ResponseTestResultnJson
    {
        public int amountPages { get; set; }
        public List<TestResultJson> items { get; set; }
    }
}
