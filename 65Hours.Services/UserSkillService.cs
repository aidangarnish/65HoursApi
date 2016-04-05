using _65Hours.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using _65Hours.Models;
using _65Hours.Models.Results;
using _65Hours.Repository.Interfaces;

namespace _65Hours.Services
{
    public class UserSkillService : IUserSkillService
    {
        private IHoursRepository<UserSkill> _userSkillRepository;
        private ISkillService _skillService;

        public UserSkillService(IHoursRepository<UserSkill> userSkillRepository, ISkillService skillService)
        {
            _userSkillRepository = userSkillRepository;
            _skillService = skillService;
        }

        public ResultT<UserSkill> GetById(int id)
        {
            return _userSkillRepository.FindById(id);
        }

        public ResultT<IEnumerable<UserSkill>> GetByUserId(string id)
        {
            return _userSkillRepository.FindMany(u => u.UserId == id);
        }

        public ResultT<UserSkill> Save(UserSkill userSkill)
        {
            if (userSkill.Id == 0)
            {
                //check to see if skill exists
                ResultT<Skill> skillResult = _skillService.GetByTitle(userSkill.SkillTitle);

                if (skillResult.Status == ResultStatus.Success)
                {
                    //if skill does exist use existing skill id
                    userSkill.SkillId = skillResult.Data.Id;
                }
                else if (skillResult.Status == ResultStatus.FailedNoMatchingData)
                {
                    //if skill doesn't exist then save new skill and use generated skill id
                    Skill newSkill = new Skill { Title = userSkill.SkillTitle };
                    ResultT<Skill> saveNewSkillResult = _skillService.Save(newSkill);

                    if(saveNewSkillResult.Status == ResultStatus.Success)
                    {
                        userSkill.SkillId = saveNewSkillResult.Data.Id;                       
                    }
                }

                return _userSkillRepository.Add(userSkill);
            }
            else
            {
                return _userSkillRepository.Update(userSkill);
            }

        }
    }
}
