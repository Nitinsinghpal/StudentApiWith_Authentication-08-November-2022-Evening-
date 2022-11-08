using StudentWebApI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentWebApI.Repository.IRepository
{
    public interface IRegisterRepository:IRepository<Register>
    {
        bool SendEmail(IEnumerable<Register> register);
        Register GetEntityByEmail(string email);
        string RedirectToLogin();
        bool SendSingleEmail(string email);
    }
}
