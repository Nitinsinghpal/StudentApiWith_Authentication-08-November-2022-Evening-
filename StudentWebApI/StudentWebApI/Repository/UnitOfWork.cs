using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Options;
using StudentWebApI.Data;
using StudentWebApI.Models;
using StudentWebApI.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentWebApI.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private readonly AppSettings _appSettings;
        public IDbContextTransaction Transaction;
        private readonly SMTPConfig _smtpConfig;

        public UnitOfWork(ApplicationDbContext context, IOptions<AppSettings> appSettings, IOptions<SMTPConfig> smtpConfig)
        {
            _context = context;
            _appSettings = appSettings.Value;
            _smtpConfig = smtpConfig.Value;
            //Transaction = _context.Database.BeginTransaction();
            ClassRepository = new ClassRepository(_context);
            StudentRepository = new StudentRepository(_context);
            UserRepository = new UserRepository(_context, _appSettings,_smtpConfig);
            GuardianRepository = new GuardianRepository(_context);
            RegisterRepository = new RegisterRepository(_context,_smtpConfig);
            //EmailServicesRepository = new EmailServicesRepository(_appSettings);
        }

        public IClassRepository ClassRepository { get; set; }

        public IStudentRepository StudentRepository { get; set; }

        public IUserRepository UserRepository { get; set; }
        public IGuardianRepository GuardianRepository { get; set; }
        public IRegisterRepository RegisterRepository { get; set; }
        //public IEmailServicesRepository EmailServicesRepository { get; set; }

        //public IDbContextTransaction Transaction { get; set; }


        public IDbContextTransaction BeginTransaction()
        {
            
            Transaction = _context.Database.BeginTransaction();
            return Transaction;

        }



        public void Commit()
        {
            Transaction.Commit();
        }

        public void Rollback()
        {
            Transaction.Rollback();
            Transaction.Dispose();
        }

       
    }
}
