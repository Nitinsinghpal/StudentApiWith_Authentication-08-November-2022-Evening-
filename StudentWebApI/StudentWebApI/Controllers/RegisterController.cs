using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentWebApI.Models;
using StudentWebApI.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentWebApI.Controllers
{
    [Route("api/register")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public RegisterController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _unitOfWork.RegisterRepository.GetAll();
            return Ok(users);
        }

        [HttpPost]
        public IActionResult Create(Register register)
        {
            Register emailExists = new Register();
            var checkEmailAlreadyExists = _unitOfWork.RegisterRepository.GetEntityByEmail(register.Email);
            
            if (checkEmailAlreadyExists != null)
            {
                emailExists.Email = "true";
                return Ok(emailExists);

            }
            if (register == null)
                return BadRequest();
            register.Status = "SavedByUser";
            if (_unitOfWork.RegisterRepository.Create(register))
            {
                _unitOfWork.RegisterRepository.SendSingleEmail(register.Email);
                return Ok("Check your mailbox and confirm the mail");
            }
            return StatusCode(StatusCodes.Status500InternalServerError);

        }
        [HttpPost]
        [Route("BulkRegister")]
        public IActionResult CreateInBulk(IEnumerable<Register> registers)
        {
            Register register = new Register();   
            foreach(var reg in registers)
            {
                reg.Status = "Saved";
            }
            if (registers == null)
                return BadRequest();
            if(_unitOfWork.RegisterRepository.BulkInsert(registers))
            {
                if(_unitOfWork.RegisterRepository.SendEmail(registers))
                {
                    register.Status = "Saved";
                    return Ok(register);
                }
                return StatusCode(StatusCodes.Status500InternalServerError);
               
            }
            else
            {
                return BadRequest(register);

            }
        }

        [Route("ConfirmMail")]
        [HttpPost]
        public IActionResult ConfirmMail(String email)
        {
            Register register = new Register();
            var emailInDb = _unitOfWork.RegisterRepository.GetEntityByEmail(email);
            if (emailInDb == null)
                return BadRequest("Email not found");
            emailInDb.IsEmailConfirmed = true;
           if(_unitOfWork.RegisterRepository.Update(emailInDb))
            {
                var redirect = _unitOfWork.RegisterRepository.RedirectToLogin();
                return new ContentResult
                {
                    Content = redirect,
                    ContentType = "text/html"
                };
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            
          
            
        }

        [HttpPut]
        public IActionResult Update(Register register)
        {
            if (register == null)
                return BadRequest();
            if (_unitOfWork.RegisterRepository.Update(register))
            {
                return Ok("User Updated successfully");
            }
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
        [HttpDelete("{id:int}")]
        public IActionResult Delete(int? id)
        {
            if (id == null)
                return BadRequest();
            var idInDb = _unitOfWork.RegisterRepository.GetEntityById(id);
            if (idInDb == null)
                return NotFound(id);
            if (_unitOfWork.RegisterRepository.Delete(idInDb))
            {
                return Ok("User Deleted successfully");
            }
            return StatusCode(StatusCodes.Status500InternalServerError);


        }
    }
}
