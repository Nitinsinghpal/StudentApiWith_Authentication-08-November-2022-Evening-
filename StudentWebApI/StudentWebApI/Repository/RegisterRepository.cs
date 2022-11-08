using StudentWebApI.Data;
using StudentWebApI.Models;
using StudentWebApI.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace StudentWebApI.Repository
{
    public class RegisterRepository:Repository<Register>,IRegisterRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly SMTPConfig _smtpConfig;

        public RegisterRepository(ApplicationDbContext context, SMTPConfig smtpConfig) :base(context)
        {
            _context = context;
            _smtpConfig = smtpConfig;
        }
        //public RegisterRepository(SMTPConfig sMtpConfig):base(context)
        //{
        //    _sMtpConfig = SMTPConfig;
        //}

        public bool SendEmail(IEnumerable<Register> register)
        {
            try
            {
                
                SmtpClient mailClient = new SmtpClient(_smtpConfig.Host, _smtpConfig.Port);
                mailClient.Credentials = new NetworkCredential(_smtpConfig.From, _smtpConfig.Password);
                mailClient.EnableSsl = _smtpConfig.EnableSSL; 

                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress(_smtpConfig.From);
                mailMessage.To.Add(To(register));

                mailMessage.Subject = _smtpConfig.Subject;
                var body = GetMailBody(register);
                mailMessage.Body = body;
                mailMessage.IsBodyHtml = _smtpConfig.IsBodyHTML;
                mailMessage.Priority = _smtpConfig.MailPriority;

               
                mailClient.Send(mailMessage);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool SendSingleEmail(string email)
        {
            try
            {

                SmtpClient mailClient = new SmtpClient(_smtpConfig.Host, _smtpConfig.Port);
                mailClient.Credentials = new NetworkCredential(_smtpConfig.From, _smtpConfig.Password);
                mailClient.EnableSsl = _smtpConfig.EnableSSL;

                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress(_smtpConfig.From);
                mailMessage.To.Add(email);

                mailMessage.Subject = _smtpConfig.Subject;
                var body = GetMailBodyWithButton(email);
                mailMessage.Body = body;
                mailMessage.IsBodyHtml = _smtpConfig.IsBodyHTML;
                mailMessage.Priority = _smtpConfig.MailPriority;


                mailClient.Send(mailMessage);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }


        public string To(IEnumerable<Register> register)
        {
            string[] emails = new string[register.Count()];
            var runs = 0;
            foreach (var r in register)
            {
                emails[runs] = $"<{r.Email}>";
                runs++;
            }
            string joinedEmails = string.Join(",", emails);
            return joinedEmails;
        }

        public string GetMailBody(IEnumerable<Register> register)
        {
                string Message =  string.Format(@"<form method='post'>
                                     <button type='submit'>Registration is  successfully</button>
                                   </form>
                                    ");
            return Message;
        }
        public string GetMailBodyWithButton(string email)
        {
            string url = "https://localhost:44358/api/register/ConfirmMail?email=" + email;
            string emailButton = string.Format(@"<form method='post' action='{0}'>
                                     <button type='submit'>confirm mail</button>
                                   </form>
                                    ", url, email);
            return emailButton;
        }

        public Register GetEntityByEmail(string email)
        {
            //return _context.Registers.Where(x => x.Email == email).ToList();
            return _context.Registers.FirstOrDefault(x => x.Email == email);
        }
        public string RedirectToLogin()
        {
            string url = "http://localhost:3000/";
            return string.Format(@"<form method='get' action='{0}'>
                                     <button type='submit'>Go to the login page</button>
                                   </form>
                                    ",url);
        }

    }
    //$EmailTo = "<to1@any.com>,<to2@any.com>";
    //foreach (var address in r.Email.Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries))
    //{
    //    using (var message = new MailMessage(fromAddress.ToString(), address)
    //    {
    //        Subject = subject,
    //        Body = body,
    //        Priority = MailPriority.High

    //    })
    //    {

    //        smtp.Send(message);
    //    }
    //}
}
