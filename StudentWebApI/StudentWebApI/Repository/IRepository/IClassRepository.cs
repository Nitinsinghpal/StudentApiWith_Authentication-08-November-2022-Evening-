using StudentWebApI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentWebApI.Repository.IRepository
{
    public interface IClassRepository:IRepository<Class>
    {
        bool ClassExists(string name);
        

    }
}
