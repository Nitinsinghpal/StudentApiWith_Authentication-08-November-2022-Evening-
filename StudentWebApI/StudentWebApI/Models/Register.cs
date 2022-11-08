using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StudentWebApI.Models
{
    public class Register
    {
        public int Id { get; set; }
        [Required]
        public String Name { get; set; }
        
        public String Email { get; set; }
        [Required]
        public String Password { get; set; }
        public string Status { get; set; }
        public bool IsEmailConfirmed { get; set; }
        [NotMapped]
        public string Token { get; set; }
        //[NotMapped]
        //public string Message { get; set; }

    }
}
