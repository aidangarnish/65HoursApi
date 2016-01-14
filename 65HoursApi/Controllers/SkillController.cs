using _65Hours.Models;
using _65Hours.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace _65HoursApi.Controllers
{
    [RoutePrefix("api/Skill")]
    public class SkillController : ApiController
    {
        private ISkillService _skillService;
        public SkillController(ISkillService skillService)
        {
            _skillService = skillService;
        }

        public IEnumerable<Skill> GetAllSkills()
        {
            return _skillService.All().Data;
        }

        [Authorize]
        public IEnumerable<Skill> GetAllSkillsAuth()
        {
            return _skillService.All().Data;
        }
    }
}
