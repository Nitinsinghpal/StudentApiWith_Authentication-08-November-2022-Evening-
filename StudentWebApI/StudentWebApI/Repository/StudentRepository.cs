using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StudentWebApI.Data;
using StudentWebApI.Models;
using StudentWebApI.Models.Dtos;
using StudentWebApI.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentWebApI.Repository
{
    public class StudentRepository :Repository<Student>, IStudentRepository
    {
        private readonly ApplicationDbContext _context;

        public StudentRepository(ApplicationDbContext context):base(context)
        {
            _context = context;
        }
        
        public bool CheckAdhaarNo(int? adhaarNo)
        {
            return _context.Students.Any(a => a.AdhaarNo == adhaarNo);
        }

        public IQueryable GetStudentGuardian()
        {
            var studentsInDb = _context.Students.
                GroupJoin(_context.GuardianDetails, s => s.Id, g => g.Student_Id,
                (student, guardian) => new
                {
                    student,
                    guardian
                }).SelectMany(z => z.guardian.DefaultIfEmpty(),
                
             (a, b) => new
             {
                 //StudentName = a.student.Name,

                 StudentId = a.student.Id,
                 StudentName = a.student.Name,
                 StudentAge = a.student.Age,
                 StudentAdhaarNo = a.student.AdhaarNo,
                 StudentClassId = a.student.Class_Id,
                 GuardianId = b == null ? "Not found" : b.Id.ToString(),
                 GStudentId = b == null ? "Not found" : b.Student_Id.ToString(),
                 FatherName = b == null ? "Not found" : b.FatherName,
                 FatherOccupation = b == null ? "Not found" : b.FatherOccupation,
                 FatherSalary = b == null ? "Not found" : b.FatherSalary.ToString(),
                 MotherName = b == null ? "Not found" : b.MotherName,
                 MotherOccupation = b == null ? "Not found" : b.MotherOccupation



             });

           

            return studentsInDb;
        }
        public IQueryable GetStudentGuardianById(int id)
        {
            var idInDb = _context.Students.Find(id);
            if (idInDb == null)
                return null;
            //var studentGuardian = from s in _context.Students
            //                      join
            //                      g in _context.GuardianDetails
            //                      on
            //                      s.Id equals g.Student_Id

            //                      where s.Id == idInDb.Id
            //                      select new
            //                      {
            //                          StudentId = s.Id,
            //                          StudentName = s.Name,
            //                          StudentAge = s.Age,
            //                          StudentAdhaarNo = s.AdhaarNo,
            //                          StudentClassId = s.Class_Id,
            //                          GuardianId = g == null ? "Not found" : g.Id.ToString(),
            //                          GStudentId = g == null ? "Not found" : g.Student_Id.ToString(),
            //                          FatherName = g == null ? "Not found" : g.FatherName,
            //                          FatherOccupation = g == null ? "Not found" : g.FatherOccupation,
            //                          FatherSalary = g == null ? "Not found" : g.FatherSalary.ToString(),
            //                          MotherName = g == null ? "Not found" : g.MotherName,
            //                          MotherOccupation = g == null ? "Not found" : g.MotherOccupation
            //                      };

            var studentGuardian = (from s in _context.Students
                                   join g in _context.GuardianDetails on s.Id equals g.Student_Id
                                   into t
                                   from rt in t.DefaultIfEmpty()
                                   orderby s.Id
                                   where s.Id == idInDb.Id
                                   select new
                                   {
                                       StudentId = s.Id,
                                       StudentName = s.Name,
                                       StudentAge = s.Age,
                                       StudentAdhaarNo = s.AdhaarNo,
                                       StudentClassId = s.Class_Id,
                                       GuardianId = rt == null ? "Not found" : rt.Id.ToString(),
                                       GStudentId = rt == null ? "Not found" : rt.Student_Id.ToString(),
                                       FatherName = rt == null ? "Not found" : rt.FatherName,
                                       FatherOccupation = rt == null ? "Not found" : rt.FatherOccupation,
                                       FatherSalary = rt == null ? "Not found" : rt.FatherSalary.ToString(),
                                       MotherName = rt == null ? "Not found" : rt.MotherName,
                                       MotherOccupation = rt == null ? "Not found" : rt.MotherOccupation
                                   });
                     //.Where(s=>s.StudentId==idInDb.Id);

            return studentGuardian;

        }
    }
}
