using Microsoft.EntityFrameworkCore;
using StudentWebApI.Data;
using StudentWebApI.Models;
using StudentWebApI.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace StudentWebApI.Repository
{
    public class Repository<T> : IRepository<T> where T:class
    {
        private readonly ApplicationDbContext _context;

        public Repository(ApplicationDbContext context)
        {
            _context= context;

        }

        public bool BulkInsert(IEnumerable<T> entities)
        {
            _context.AddRange(entities);
            return Save();
        }
        public bool BulkDelete(IEnumerable<T> entities)
        {
            _context.RemoveRange(entities);
            return Save();
        }

        public bool Create(T entity)
        {
            //dbSet.Add(entity);
            _context.Add<T>(entity);
            return Save();
            
        }

        public bool Delete(T entity)
        {
            _context.Remove<T>(entity);
            return Save();
        }

        public IEnumerable<T> GetAll()
        {
            
            return _context.Set<T>().ToList();
        }

        public T GetEntityById(int? entityId)
        {
            return _context.Find<T>(entityId);
        }

        public bool Save()
        {
            var count = _context.SaveChanges();
            var ret = count >= 1 ? true : false;
            return ret;

        }

        public bool Update(T entity)
        {
            _context.Update<T>(entity);
            return Save();
            
        }

        //public IEnumerable<T> GetEntitiesById(IEnumerable<T> entities)
        //{
        //    return _context.Find<T>(entities);
        //}
    }
}

