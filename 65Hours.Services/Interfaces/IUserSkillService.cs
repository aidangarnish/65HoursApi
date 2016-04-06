using _65Hours.Models;
using _65Hours.Models.Results;
using System.Collections.Generic;

namespace _65Hours.Services.Interfaces
{
    public interface IUserSkillService
    {
        ResultT<IEnumerable<UserSkill>> GetByUserId(string id);
        ResultT<UserSkill> GetById(int id);
        ResultT<UserSkill> Save(UserSkill userSkill, string currentUserId);
        Result Delete(int id, string currentUserId);
    }
}
