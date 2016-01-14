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
        public int UserSkillId { get; set; }
        public string UserId { get; set; }
        public int SkillId { get; set; }
        public DateTime Created { get; set; }
    }
}
