using _65Hours.Models;
using _65Hours.Models.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _65Hours.Services.Interfaces
{
    public interface ISkillService
    {
        ResultT<IEnumerable<Skill>> All();
        ResultT<Skill> GetById(int id);
    }
}
