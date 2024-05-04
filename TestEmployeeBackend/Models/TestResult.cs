using System;
using System.Collections.Generic;

#nullable disable

namespace TestEmployeeBackend.Models
{
    public partial class TestResult
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? TestId { get; set; }
        public int? TimeSpent { get; set; }
        public DateTime? DatePassing { get; set; }

        public virtual Test Test { get; set; }
        public virtual User User { get; set; }
    }
}
