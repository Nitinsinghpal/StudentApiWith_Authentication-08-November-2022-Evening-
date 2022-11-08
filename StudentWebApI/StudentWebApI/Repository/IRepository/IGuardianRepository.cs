using StudentWebApI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentWebApI.Repository.IRepository
{
    public interface IGuardianRepository : IRepository<GuardianDetails>
    {
        GuardianDetails GetDetailsByStudentId(int stId);
        bool UpdateGuardian(GuardianDetails guardian);
        bool SaveGuardian();
    }
}
