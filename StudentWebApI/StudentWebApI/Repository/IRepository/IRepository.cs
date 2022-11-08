using StudentWebApI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentWebApI.Repository.IRepository
{
    public interface IRepository<T> where T:class
    {
        IEnumerable<T> GetAll();
        T GetEntityById(int? entityId);
        //IEnumerable<T> GetEntitiesById(IEnumerable<T> entities);


        bool Create(T entity);
        bool Update(T entity);
        bool Delete(T entity);
        bool BulkInsert(IEnumerable<T> entities);
        bool BulkDelete(IEnumerable<T> entities);
        bool Save();
    }
}
