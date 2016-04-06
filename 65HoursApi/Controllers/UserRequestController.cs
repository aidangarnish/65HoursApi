using _65Hours.Models;
using _65Hours.Models.Results;
using _65Hours.Services.Interfaces;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace _65HoursApi.Controllers
{
    public class UserRequestController : ApiController
    {
        private IUserRequestService _userRequestService;
        private ApplicationUserManager _userManager;
        public UserRequestController(IUserRequestService userRequestService, ApplicationUserManager userManager)
        {
            _userRequestService = userRequestService;
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

        [HttpGet]
        [Route("CurrentUserRequests")]
        public async Task<ResultT<IEnumerable<UserRequest>>> CurrentUserRequests()
        {
            var result = new ResultT<UserRequest>();

            ApplicationUser user = await _userManager.FindByNameAsync(User.Identity.Name);

            return _userRequestService.GetByUserId(user.Id);
        }

        // POST: Save UserSkill
        [Route("Save")]
        public async Task<ResultT<UserRequest>> Save(UserRequest userRequest)
        {
            var result = new ResultT<UserRequest>();

            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);

            return _userRequestService.Save(userRequest, currentUser.Id);
        }

        // DELETE: Delete UserSkill
        [HttpDelete]
        [Route("Delete")]
        public async Task<Result> Delete(int id)
        {
            var result = new Result();

            ApplicationUser user = await _userManager.FindByNameAsync(User.Identity.Name);

            UserSkill userSkill = new UserSkill { Id = id, UserId = user.Id };

            return _userSkillService.Delete(userSkill);
        }
    }
}
