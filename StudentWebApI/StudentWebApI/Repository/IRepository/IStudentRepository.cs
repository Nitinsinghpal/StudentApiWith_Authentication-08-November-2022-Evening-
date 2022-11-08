using StudentWebApI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentWebApI.Repository.IRepository
{
    public interface IStudentRepository:IRepository<Student>
    {
        IQueryable GetStudentGuardian();
        IQueryable GetStudentGuardianById(int id);
        bool CheckAdhaarNo(int? adhaarNo);
  
    }
}
