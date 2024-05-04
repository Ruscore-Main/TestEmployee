using System;
using System.Collections.Generic;

#nullable disable

namespace TestEmployeeBackend.Models
{
    public partial class User
    {
        public User()
        {
            TestResults = new HashSet<TestResult>();
        }

        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; }
        public string Fio { get; set; }
        public int? WorkExperience { get; set; }
        public string DateOfBirth { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int? JobTitleId { get; set; }

        public virtual JobTitle JobTitle { get; set; }
        public virtual Role Role { get; set; }
        public virtual ICollection<TestResult> TestResults { get; set; }
    }
}
