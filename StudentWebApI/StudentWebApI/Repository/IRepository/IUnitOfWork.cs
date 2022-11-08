using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentWebApI.Repository.IRepository
{
    public interface IUnitOfWork
    {
        IClassRepository ClassRepository { get; set; }
        IStudentRepository StudentRepository { get; set; }
        IUserRepository UserRepository { get; set; }
        IGuardianRepository GuardianRepository { get; set; }
        IRegisterRepository RegisterRepository { get; set; }
        //IEmailServicesRepository EmailServicesRepository { get; set; }
        //IDbContextTransaction Transaction { get; set; }
        void Commit();
        void Rollback();
        IDbContextTransaction BeginTransaction();
        //bool Save();

    }

}
