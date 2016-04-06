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
    public class UserRequestService : IUserRequestService
    {
        private IHoursRepository<UserRequest> _userRequestRepository;

        public UserRequestService(IHoursRepository<UserRequest> userRequestRepository)
        {
            _userRequestRepository = userRequestRepository;
        }

        public ResultT<UserRequest> GetById(int id)
        {
            return _userRequestRepository.FindById(id);
        }

        public ResultT<IEnumerable<UserRequest>> GetByUserId(string id)
        {
            return _userRequestRepository.FindMany(r => r.UserId == id);
        }

        public ResultT<UserRequest> Save(UserRequest userRequest, string currentUserId)
        {
            if(userRequest.Id   == 0)
            {
                userRequest.UserId = currentUserId;
                return _userRequestRepository.Add(userRequest);
            }
            else
            {
                if(userRequest.UserId == currentUserId)
                {
                    return _userRequestRepository.Update(userRequest);
                }
                else
                {
                    return new ResultT<UserRequest>() { Status = ResultStatus.OperationFailedIncorrectUser };
                }
            }
            
        }

        public Result Delete(UserRequest userRequest, string currentUserId)
        {
            var result = new Result();

            var userRequestResult = GetById(userRequest.Id);

            if (userRequestResult.Status != ResultStatus.Success)
            {
                result.Status = userRequestResult.Status;
                return result;
            }

            //check that this userRequest belongs to the current user before deleting
            if (userRequestResult.Data.UserId == currentUserId)
            {
                return _userRequestRepository.Delete(userRequest.Id);
            }
            else
            {
                result.Status = ResultStatus.OperationFailedIncorrectUser;
                return result;
            }
        }

    }
}
