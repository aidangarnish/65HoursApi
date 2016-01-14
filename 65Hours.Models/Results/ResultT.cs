namespace _65Hours.Models.Results
{
    public class ResultT<T> : Result
    {
        public T Data { get; set; }
    }
}
