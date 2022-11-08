using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StudentWebApI.Models
{
    public class Student
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        public int AdhaarNo { get; set; }
        [Required]
        public int Class_Id { get; set; }
        [ForeignKey("Class_Id")]
        public Class Classes { get; set; }


    }
}
