using System;
using System.Collections.Generic;

#nullable disable

namespace TestEmployeeBackend.Models
{
    public partial class JobTitle
    {
        public JobTitle()
        {
            Tests = new HashSet<Test>();
            Users = new HashSet<User>();
        }

        public int Id { get; set; }
        public string JobTitleName { get; set; }

        public virtual ICollection<Test> Tests { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
