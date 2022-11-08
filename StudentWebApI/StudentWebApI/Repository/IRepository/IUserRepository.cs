using StudentWebApI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentWebApI.Repository.IRepository
{
    public interface IUserRepository
    {
        Register Authenticate(string UserName, string password);
        string GetMailBody(string email);
         bool SendEmail(string email);
        string CreatePasswordForm(string email);
        string RedirectToLogin();


    }
}
