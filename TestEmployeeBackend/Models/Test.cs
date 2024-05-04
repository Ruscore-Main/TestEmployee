using System;
using System.Collections.Generic;

#nullable disable

namespace TestEmployeeBackend.Models
{
    public partial class Test
    {
        public Test()
        {
            Questions = new HashSet<Question>();
            TestResults = new HashSet<TestResult>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? JobTitleId { get; set; }
        public int? TimeTest { get; set; }

        public virtual JobTitle JobTitle { get; set; }
        public virtual ICollection<Question> Questions { get; set; }
        public virtual ICollection<TestResult> TestResults { get; set; }
    }
}
