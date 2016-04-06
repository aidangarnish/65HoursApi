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
            var includes = new[]
            {
                "Skill"
            };

            return _userSkillRepository.FindMany(u => u.UserId == id, includes);
        }

        public ResultT<UserSkill> Save(UserSkill userSkill, string currentUserId)
        {
            if (userSkill.Id == 0)
            {
                userSkill.UserId = currentUserId;

                //check to see if skill exists
                ResultT<Skill> skillResult = _skillService.GetByTitle(userSkill.Skill.Title);

                if (skillResult.Status == ResultStatus.Success)
                {
                    //if skill does exist use existing skill id
                    userSkill.SkillId = skillResult.Data.Id;
                    
                    //null skill so that a new skill isn't added to the skills table
                    userSkill.Skill = null;

                    return _userSkillRepository.Add(userSkill);
                }
                else if (skillResult.Status == ResultStatus.FailedNoMatchingData)
                {
                    //if skill doesn't exist then save userSkill 
                    //Entity Framework will create the new skill and use generated skill id
                    
                    return _userSkillRepository.Add(userSkill);
                } 
                else
                {
                    return new ResultT<UserSkill>() { Status = skillResult.Status };
                }              
            }
            else
            {
                if (userSkill.UserId == currentUserId)
                {
                    return _userSkillRepository.Update(userSkill);
                }
                else
                {
                    return new ResultT<UserSkill>() { Status = ResultStatus.OperationFailedIncorrectUser };
                }
            }

        }

        public Result Delete(int id, string currentUserId)
        {
            var result = new Result();

            var userSkillResult = GetById(id);

            if(userSkillResult.Status != ResultStatus.Success)
            {
                result.Status = userSkillResult.Status;
                return result;
            }

            //check that this userSkill belongs to the current user before deleting
            if(userSkillResult.Data.UserId == currentUserId)
            {
               return _userSkillRepository.Delete(id);
            }
            else
            {
                result.Status = ResultStatus.OperationFailedIncorrectUser;
                return result;
            }
        }
    }
}
