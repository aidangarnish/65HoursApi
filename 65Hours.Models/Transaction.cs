using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _65Hours.Models
{
    public class Transaction
    {
        public int TransactionId { get; set; }
        public string PaidToUserId { get; set; }
        public string PaidByUSerId { get; set; }
        public DateTime Created { get; set; }
        public int Minutes { get; set; }
        public string Reason { get; set; }
        public bool Recommended { get; set; }
    }
}
