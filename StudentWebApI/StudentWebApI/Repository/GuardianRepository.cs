using StudentWebApI.Data;
using StudentWebApI.Models;
using StudentWebApI.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentWebApI.Repository
{
    public class GuardianRepository : Repository<GuardianDetails>, IGuardianRepository
    {
        private readonly ApplicationDbContext _context;

        public GuardianRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public GuardianDetails GetDetailsByStudentId(int stId)
        {
            var guardian =  _context.GuardianDetails.FirstOrDefault(x => x.Student_Id == stId);
            return guardian;
        }
        public bool UpdateGuardian(GuardianDetails guardian)
        {
            _context.Update(guardian);
            return SaveGuardian();

        }
        public bool SaveGuardian()
        {
            return _context.SaveChanges() >= 1 ? true : false;
        }
    }
}
