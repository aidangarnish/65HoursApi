using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _65Hours.Models.Results
{
    public class Result
    {
        public readonly Lazy<List<Exception>> Exceptions = new Lazy<List<Exception>>();
        public readonly List<string> Messages = new List<string>();
        [JsonConverter(typeof(StringEnumConverter))]
        public ResultStatus Status { get; set; }
    }

    public enum ResultStatus
    {
        Unknown,
        Success,
        Failed,

        //room for adding more granular failure messages e.g. DatabaseFailure, WebServiceFailure etc etc
        [Description("Failed No Matching Data")]
        FailedNoMatchingData,
        [Description("Operation Failed Incorrect User")]
        OperationFailedIncorrectUser
    }
}
