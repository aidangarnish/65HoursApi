using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace _65Hours.Models
{
    public class UserSkill
    {
        public UserSkill()
        {
            Created = DateTime.UtcNow;
        }
        public int Id { get; set; }
        public string UserId { get; set; }
        public int SkillId { get; set; }
        [NotMapped]
        public string SkillTitle { get; set; }
        public DateTime Created { get; set; }
    }
}
