using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using StudentWebApI.Data;
using StudentWebApI.Models;
using StudentWebApI.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace StudentWebApI.Repository
{
    public class UserRepository :Repository<User>,IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly AppSettings _appSettings;
        public readonly SMTPConfig _smtpConfig;

        public UserRepository(ApplicationDbContext context,AppSettings appSettings, SMTPConfig smtpConfig) :base(context)
        {
            _context = context;
            _appSettings = appSettings;
            _smtpConfig = smtpConfig;


        }
        

        public Register Authenticate(string userName, string password)
        {
            var userInDb = _context.Registers.FirstOrDefault(u => u.Name == userName && u.Password == password);
            Register register=new Register();
            if (userInDb == null)
                return null;
            if(userInDb.IsEmailConfirmed == false && userInDb.Status == "Saved")
            {
                register.IsEmailConfirmed = userInDb.IsEmailConfirmed;
                register.Name = userInDb.Name;
                register.Status = userInDb.Status;
                return register;
            }
            if (userInDb.IsEmailConfirmed == false)
            {
                register.Name = userInDb.Name;
                register.IsEmailConfirmed = userInDb.IsEmailConfirmed;

                return register;
            }
            
            
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)


            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            register.Token = tokenHandler.WriteToken(token);
            register.IsEmailConfirmed = userInDb.IsEmailConfirmed;
           
           // userInDb.Password = "";
            return register;
        }
        public bool SendEmail(string email)
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
                var body = GetMailBody(email);
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
        public string GetMailBody(string email)
        {
            string url = "http://localhost:3000/newpassword?email="+email;
            //string emailButton = string.Format(@"<form method='post' action='{0}'>
            //                         <button type='submit'>confirm mail</button>
            //                       </form>
            //                        ", url);
            return url;
        }
        public string CreatePasswordForm(string email)
        {
            
            string url = "https://localhost:44358/api/user/submitPassword?email=" + email;
            string emailButton = string.Format(@"<form method='post' action='{0}'>
                                       <label for='password'>New Password<label/>
                                        <input type='password' name='password' value=/>
                                     <button type='submit'>submit</button>
                                   </form>
                                    ", url);
            return emailButton;
        }

        public string RedirectToLogin()
        {
            string url = "http://localhost:3000/";
            return string.Format(@"<form method='get' action='{0}'>
                                     <button type='submit'>Go to the login page</button>
                                   </form>
                                    ", url);
        }
    }
}
