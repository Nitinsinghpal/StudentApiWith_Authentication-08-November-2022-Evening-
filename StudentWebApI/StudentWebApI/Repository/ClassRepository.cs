using Microsoft.EntityFrameworkCore.Storage;
using StudentWebApI.Data;
using StudentWebApI.Models;
using StudentWebApI.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentWebApI.Repository
{
    public class ClassRepository : Repository<Class>,IClassRepository
    {
        private readonly ApplicationDbContext _context;

        public ClassRepository(ApplicationDbContext context):base(context)
        {
            _context = context;
        }

        public bool ClassExists(string name)
        {
            return _context.Classes.Any(p => p.ClassName == name);

        }

    }   
}
