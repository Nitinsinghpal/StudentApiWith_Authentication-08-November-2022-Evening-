using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentWebApI.Models;
using StudentWebApI.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace StudentWebApI.Controllers
{
    //[Authorize]
    [Route("api/class")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ClassController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpGet]
        public IActionResult GetClasses()
        {
            var classesInDb = _unitOfWork.ClassRepository.GetAll().ToList();
            return Ok(classesInDb);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetClassById(int id)
        {
            var classInDb = _unitOfWork.ClassRepository.GetEntityById
                (id);
            return Ok(classInDb);
        }

        [HttpPost]
        public IActionResult CreateClass(Class classs)
        {
            if (classs == null)
                return BadRequest();
            var classExists = _unitOfWork.ClassRepository.ClassExists(classs.ClassName);
            if (!classExists)
            {
                if(_unitOfWork.ClassRepository.Create(classs))
                {
                    return Ok("Created Successfully!!");

                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }

            }
            return BadRequest("Class Already Exists");

        }
        [HttpPost()]
        [Route("BulkInsert")]
        public IActionResult CreateInBulk(IEnumerable<Class> classes)
        {
            if (classes == null)
                return BadRequest();
            if (_unitOfWork.ClassRepository.BulkInsert(classes))
            {
                return Ok("successfull");
            }
            return BadRequest();
        }
        [HttpPut]
        public IActionResult UpdateClass(Class classs)
        {
            if (classs == null)
                return BadRequest();
            if(_unitOfWork.ClassRepository.Update(classs))
            {
                return Ok();
            }
            return StatusCode(StatusCodes.Status500InternalServerError);
           
            
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteClass(int id)
        {
            var classInDb = _unitOfWork.ClassRepository.GetEntityById(id);
            if (classInDb == null)
                return BadRequest();
             if(_unitOfWork.ClassRepository.Delete(classInDb))
            {
                return Ok();

            }
            return StatusCode(StatusCodes.Status500InternalServerError);
            //if (!classDelete)
            //{
            //    return StatusCode(StatusCodes.Status500InternalServerError);
            //}
        }
        [HttpDelete]
        [Route("BulkDelete")]
        public IActionResult BulkDelete(IEnumerable<Class> classes)
        {
            if (classes == null)
                return BadRequest();
            //IEnumerable<Class> entitiesInDb = _unitOfWork.ClassRepository.GetEntitiesById(classes);
            if(classes!=null)
            {
                if (_unitOfWork.ClassRepository.BulkDelete(classes))
                {
                    return Ok("successfull");
                }
            }

            
            return BadRequest();
        }

    }
}
