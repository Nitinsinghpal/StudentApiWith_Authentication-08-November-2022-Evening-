using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StudentWebApI.Models
{
    public class GuardianDetails
    {
        public int Id { get; set; }
        public int Student_Id { get; set; }
        [ForeignKey("Student_Id")]
        public Student Student { get; set; }
        public string FatherName { get; set; }
        public string FatherOccupation { get; set; }
        //[Range(10000,50000)]
        public double FatherSalary { get; set; }
        public string MotherName { get; set; }
        public string MotherOccupation { get; set; }


    }
}
