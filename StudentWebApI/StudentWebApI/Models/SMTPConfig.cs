using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace StudentWebApI.Models
{
    public  class SMTPConfig
    {
        public string From { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
        public bool EnableSSL { get; set; }
        public bool IsBodyHTML { get; set; }

        public string Subject { get; set; }
        public string Body { get; set; }
        public MailPriority MailPriority { get; set; }

    }
}
