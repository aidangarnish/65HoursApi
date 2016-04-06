using _65Hours.Models;
using _65Hours.Models.Results;
using System.Collections.Generic;

namespace _65Hours.Services.Interfaces
{
    public interface IUserRequestService
    {
        ResultT<IEnumerable<UserRequest>> GetByUserId(string id);
        ResultT<UserRequest> GetById(int id);
        ResultT<UserRequest> Save(UserRequest userRequest, string currentUserId);
        Result Delete(UserRequest userRequest, string currentUserId);
    }
}
