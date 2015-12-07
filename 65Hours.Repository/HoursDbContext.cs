using _65Hours.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _65Hours.Repository
{
    public class HoursDbContext : IdentityDbContext<ApplicationUser>
    {
        public HoursDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public static HoursDbContext Create()
        {
            return new HoursDbContext();
        }

        public DbSet<Skill> Skills { get; set; }
        public DbSet<UserSkill> UserSkills { get; set; }
        public DbSet<UserRequest> UserRequests { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

    }
}
