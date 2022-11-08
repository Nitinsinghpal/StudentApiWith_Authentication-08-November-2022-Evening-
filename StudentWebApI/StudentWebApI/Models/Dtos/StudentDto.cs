using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentWebApI.Models.Dtos
{
    public class StudentDto
    {
        public int StudentId
        { get; set; }
        public string StudentName{ get; set; }
        public int StudentAge { get; set; }
        public int StudentAdhaarNo{ get; set; }
        public string FatherName { get; set; }
        public string FatherOccupation { get; set; }
        //[Range(10000,50000)]
        public double FatherSalary { get; set; }
        public string MotherName { get; set; }
        public string MotherOccupation { get; set; }

        //public int Class_Id { get; set; }
        //public Class Classes { get; set; }
    }
}
