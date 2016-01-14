using _65Hours.Models.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace _65Hours.Repository.Interfaces
{
    public interface IHoursRepository<T>
    {
        IQueryable<T> All();
        ResultT<T> FindById(int id);
        ResultT<T> Find(Expression<Func<T, bool>> match);
        ResultT<T> Find(Expression<Func<T, bool>> match, string[] includeProperties);
        ResultT<IEnumerable<T>> FindMany(Expression<Func<T, bool>> match);       
        ResultT<IEnumerable<T>> FindMany(Expression<Func<T, bool>> match, string[] includeProperties);
        ResultT<T> Add(T t);
        ResultT<T> Update(T updated);
        Result Delete(int id);

    }
}
