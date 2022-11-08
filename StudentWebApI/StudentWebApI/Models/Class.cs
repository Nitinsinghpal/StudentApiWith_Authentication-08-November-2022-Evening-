using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StudentWebApI.Models
{
    public class Class
    {
        public int Id { get; set; }
        [Required]
        public string ClassName { get; set; }

    }
}
