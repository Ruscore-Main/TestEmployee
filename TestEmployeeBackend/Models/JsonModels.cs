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
}
