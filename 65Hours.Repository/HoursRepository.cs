using _65Hours.Models.Results;
using _65Hours.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace _65Hours.Repository
{
    public class HoursRepository<T> : IHoursRepository<T> where T : class
    {
        private HoursDbContext _context;
        public virtual HoursDbContext Context { get { return _context; } set { _context = value; } }

        public HoursRepository(HoursDbContext context)
        {
            _context = context;
        }
        protected void RefreshContext()
        {
            Context = new HoursDbContext();
        }
        public IQueryable<T> All()
        {
            RefreshContext();
            return Context.Set<T>();
        }

        public IQueryable<T> All(string[] includeProperties)
        {
            RefreshContext();
            IQueryable<T> query = Context.Set<T>();

            if (includeProperties != null && includeProperties.Any())
            {
                foreach (var includeProperty in includeProperties)
                {
                    query = query.Include(includeProperty);
                }
            }

            return query;
        }

        public ResultT<T> FindById(int id)
        {
            var result = new ResultT<T>();

            try
            {
                result.Data = Context.Set<T>().Find(id);
                result.Status = result.Data == null ? ResultStatus.FailedNoMatchingData : ResultStatus.Success;
            }
            catch (Exception ex)
            {
                result.Exceptions.Value.Add(ex);
                result.Status = ResultStatus.Failed;
            }

            return result;
        }
        public ResultT<T> Find(Expression<Func<T, bool>> match)
        {
            var result = new ResultT<T>();

            try
            {
                result.Data = Context.Set<T>().SingleOrDefault(match);
                result.Status = result.Data == null ? ResultStatus.FailedNoMatchingData : ResultStatus.Success;
            }
            catch (Exception ex)
            {
                result.Exceptions.Value.Add(ex);
                result.Status = ResultStatus.Failed;
            }

            return result;
        }

        public ResultT<T> Find(Expression<Func<T, bool>> match, string[] includeProperties)
        {
            var result = new ResultT<T>();
            IQueryable<T> query = Context.Set<T>();

            try
            {
                if (includeProperties != null && includeProperties.Any())
                {
                    foreach (var includeProperty in includeProperties)
                    {
                        query = query.Include(includeProperty);
                    }
                }
                result.Data = query.SingleOrDefault(match);
                result.Status = result.Data == null ? ResultStatus.FailedNoMatchingData : ResultStatus.Success;
            }
            catch (Exception ex)
            {
                result.Exceptions.Value.Add(ex);
                result.Status = ResultStatus.Failed;
            }

            return result;
        }

        public ResultT<IEnumerable<T>> FindMany(Expression<Func<T, bool>> match)
        {
            var result = new ResultT<IEnumerable<T>>();

            try
            {
                RefreshContext();
                result.Data = Context.Set<T>().Where(match).ToList();
                result.Status = result.Data == null || !result.Data.Any() ? ResultStatus.FailedNoMatchingData : ResultStatus.Success;
            }
            catch (Exception ex)
            {
                result.Exceptions.Value.Add(ex);
                result.Status = ResultStatus.Failed;
            }

            return result;
        }
        public ResultT<IEnumerable<T>> FindMany(Expression<Func<T, bool>> match, string[] includeProperties)
        {
            var result = new ResultT<IEnumerable<T>>();
            RefreshContext();
            IQueryable<T> query = Context.Set<T>();
            try
            {
                if (includeProperties != null && includeProperties.Any())
                {
                    foreach (var includeProperty in includeProperties)
                    {
                        query = query.Include(includeProperty);
                    }
                }
                result.Data = query.Where(match).ToList();
                result.Status = result.Data == null ? ResultStatus.FailedNoMatchingData : ResultStatus.Success;
            }
            catch (Exception ex)
            {
                result.Exceptions.Value.Add(ex);
                result.Status = ResultStatus.Failed;
            }
            return result;
        }

        public ResultT<T> Add(T entity)
        {
            var result = new ResultT<T>();

            try
            {
                Context.Set<T>().Add(entity);
                Context.SaveChanges();
                result.Status = ResultStatus.Success;
                result.Data = entity;
            }
            catch (Exception ex)
            {
                result.Exceptions.Value.Add(ex);
                result.Status = ResultStatus.Failed;
            }
            return result;
        }
        public ResultT<T> Update(T entity)
        {
            var result = new ResultT<T>();

            try
            {
                Context.Entry(entity).State = EntityState.Detached;
                RefreshContext();

                Context.Set<T>().Attach(entity);
                Context.Entry(entity).State = EntityState.Modified;
                Context.SaveChanges();

                result.Status = ResultStatus.Success;
                result.Data = entity;

            }
            catch (DbUpdateConcurrencyException concEx)
            {
                var entry = concEx.Entries.Single();

                var clientValues = (T)entry.Entity;
                var databaseEntry = entry.GetDatabaseValues();

                if (databaseEntry == null)
                {
                    result.Messages.Add("DbEntry deleted by another user");
                }
                else
                {
                    var databaseValues = (T)databaseEntry.ToObject();

                    result.Messages.Add("DbEntry updated by another user");
                }

                result.Exceptions.Value.Add(concEx);
                result.Status = ResultStatus.Failed;
            }
            catch (Exception ex)
            {

                result.Exceptions.Value.Add(ex);
                result.Status = ResultStatus.Failed;
            }

            return result;
        }
        public Result Delete(int id)
        {
            var result = new Result();

            try
            {
                var entityResult = FindById(id);

                if (entityResult.Data != null)
                {
                    Context.Set<T>().Remove(entityResult.Data);
                    Context.SaveChanges();

                    result.Status = ResultStatus.Success;
                }
                else
                {
                    result.Status = entityResult.Status;
                }
            }
            catch (Exception ex)
            {
                result.Exceptions.Value.Add(ex);
                result.Status = ResultStatus.Failed;
            }

            return result;
        }

    }
}
