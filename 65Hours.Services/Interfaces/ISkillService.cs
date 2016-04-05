using _65Hours.Models;
using _65Hours.Models.Results;
using System.Collections.Generic;

namespace _65Hours.Services.Interfaces
{
    public interface ISkillService
    {
        ResultT<IEnumerable<Skill>> All();
        ResultT<Skill> GetById(int id);
        ResultT<Skill> GetByTitle(string title);
        ResultT<Skill> Save(Skill skill);
    }
}
