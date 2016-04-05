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
    public class SkillService : ISkillService
    {
        private IHoursRepository<Skill> _skillRepository;

        public SkillService(IHoursRepository<Skill> skillRepository)
        {
            _skillRepository = skillRepository;
        }
        public ResultT<IEnumerable<Skill>> All()
        {
            ResultT<IEnumerable<Skill>> result = new ResultT<IEnumerable<Skill>>();

            try
            {
                result.Data = _skillRepository.All().ToList();
                result.Status = ResultStatus.Success;
                
            }
            catch(Exception ex)
            {
                result.Status = ResultStatus.Failed;
                result.Exceptions.Value.Add(ex);
            }

            return result;
        }

        public ResultT<Skill> GetById(int id)
        {
            return _skillRepository.FindById(id);
        }

        public ResultT<Skill> GetByTitle(string title)
        {
            return _skillRepository.Find(s => s.Title == title);
        }

        public ResultT<Skill> Save(Skill skill)
        {
            if (skill.Id == 0)
            {
                return _skillRepository.Add(skill);
            }
            else
            {
                return _skillRepository.Update(skill);
            }
        }
    }
}
