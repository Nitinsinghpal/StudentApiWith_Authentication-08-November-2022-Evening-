using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentWebApI.Models;
using StudentWebApI.Models.Dtos;
using StudentWebApI.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentWebApI.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public UserController(IUnitOfWork unitOfWork)
        {
            _unitOfWork=unitOfWork;
        }

        [HttpPost]
        public IActionResult Authenticate(Register user)
        {
            Register returnToUser = new Register();
            var userAuth = _unitOfWork.UserRepository.Authenticate(user.Name, user.Password);
            
            if (userAuth == null)
            {
                returnToUser.Name = user.Name;
                return Ok(returnToUser);
            }
            else if (userAuth.IsEmailConfirmed == true && userAuth.Name != null)
            {
                return Ok(userAuth);
            }
            else if(userAuth.IsEmailConfirmed == false && userAuth.Status =="Saved")
            {
                returnToUser.IsEmailConfirmed = false;
                returnToUser.Status = "Saved";
                _unitOfWork.RegisterRepository.SendSingleEmail(user.Email);
                return Ok(returnToUser);
            }
            else
            {
                return Ok(returnToUser);
            }

            
        }

        [HttpPost]
        [Route("forgotPassword")]
        public IActionResult ForgotPassword(RegisterDto registerDto)
        {
            if (registerDto.Email == null)
                return BadRequest();

            Register register = new Register 
            { 
                Email=registerDto.Email
            };
           
           
            var emailInDb = _unitOfWork.RegisterRepository.GetEntityByEmail(register.Email);
            if (emailInDb == null)
                return BadRequest();
           if(_unitOfWork.UserRepository.SendEmail(register.Email))
            {
                return Ok();
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

        }
        //[HttpPost]
        //[Route("CreatePassword")]
        //public IActionResult CreatePassword(string email)
        //{
        //    var mailInDb = _unitOfWork.RegisterRepository.GetEntityByEmail(email);
        //    if (mailInDb == null)
        //        return BadRequest();
        //    var redirect = _unitOfWork.UserRepository.CreatePasswordForm(email);
        //    return new ContentResult
        //    {
        //        Content = redirect,
        //        ContentType = "text/html"
        //    };
        //}

        [HttpPost]
        [Route("submitPassword")]
        public IActionResult SubmitPassword(RegisterDto registerDto)
        {
            if (registerDto == null)
                return BadRequest();
            Register register = new Register()
            {
                Email = registerDto.Email,
                Password = registerDto.Password
            };
            var mailInDb = _unitOfWork.RegisterRepository.GetEntityByEmail(registerDto.Email);
            if (mailInDb == null)
                return BadRequest();
            
            mailInDb.Password = register.Password;
            if (_unitOfWork.RegisterRepository.Update(mailInDb))
            {
                return Ok();
                //var redirect = _unitOfWork.UserRepository.RedirectToLogin();
                
                //return new ContentResult
                //{
                //    Content = redirect,
                //    ContentType = "text/html"
                //};
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
           
        }

    }
}
