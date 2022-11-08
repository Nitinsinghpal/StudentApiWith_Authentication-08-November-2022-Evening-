using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace StudentWebApI.Controllers
{
    [Route("api/testEmail")]
    [ApiController]
    
    public class TestEmailController : ControllerBase
    {
        public TestEmailController()
        {
            var data = "TestEmailController";
        }
        /// <summary>
        /// A Generic Method to send email using Gmail
        /// </summary>
        /// <param name="to">The To address to send the email to</param>
        /// <param name="subject">The Subject of email</param>
        /// <param name="body">The Body of email</param>
        /// <param name="isBodyHtml">Tell whether body of email will be html of plain text</param>
        /// <param name="mailPriority">Set the mail priority to low, medium or high</param>
        /// <returns>Returns true if email is sent successfuly</returns>
        

       
    }
}
