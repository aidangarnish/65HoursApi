using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _65Hours.Models
{
    public class UserSkill
    {
        public UserSkill()
        {
            Created = DateTime.UtcNow;
        }
        public int UserSkillID { get; set; }
        public string UserID { get; set; }
        public int SkillID { get; set; }
        public DateTime Created { get; set; }
    }
}
