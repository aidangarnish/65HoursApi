using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _65Hours.Models
{
    public class UserRequest
    {
        public UserRequest()
        {
            Created = DateTime.UtcNow;
            Modified = DateTime.UtcNow;
        }
        public int UserRequestID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string UserID { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
    }
}
