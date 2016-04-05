using _65Hours.Models;
using _65Hours.Models.Results;
using _65Hours.Services.Interfaces;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace _65HoursApi.Controllers
{
    [RoutePrefix("api/UserSkill")]
    [Authorize]
    public class UserSkillController : Controller
    {
        private IUserSkillService _userSkillService;
        private ApplicationUserManager _userManager;
        public UserSkillController(IUserSkillService userSkillService)
        {
            _userSkillService = userSkillService;
            _userManager = Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
        }
        // GET: UserSkill
        public async Task<ResultT<UserSkill>>  Save(UserSkill userSkill)
        {
            var result = new ResultT<UserSkill>();

            ApplicationUser user = await _userManager.FindByNameAsync(User.Identity.Name);

            userSkill.UserId = user.Id;

            _userSkillService.Save(userSkill);

            return result;
        }
    }
}