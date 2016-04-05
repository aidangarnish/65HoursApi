using _65Hours.Models;
using _65Hours.Models.Results;
using _65Hours.Services.Interfaces;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace _65HoursApi.Controllers
{
    [Authorize]
    [RoutePrefix("api/UserSkill")]
    public class UserSkillController : ApiController
    {
        private IUserSkillService _userSkillService;
        private ApplicationUserManager _userManager;
        public UserSkillController(IUserSkillService userSkillService, ApplicationUserManager userManager)
        {
            _userSkillService = userSkillService;
            UserManager = userManager;
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        // GET: UserSkill
        [Route("Save")]
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