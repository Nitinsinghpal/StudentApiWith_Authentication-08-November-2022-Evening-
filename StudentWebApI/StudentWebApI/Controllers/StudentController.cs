using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Logging;
using Serilog;
using StudentWebApI.Data;
using StudentWebApI.Models;
using StudentWebApI.Models.Dtos;
using StudentWebApI.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentWebApI.Controllers
{
    
    [Route("api/student")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<StudentController> _logger;
        private readonly IMapper _mapper;



        public StudentController(IUnitOfWork unitOfWork,ILogger<StudentController> logger,IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetStudents()
        {
            var studentsInDb = _unitOfWork.StudentRepository.GetStudentGuardian();
            //var student = _mapper.Map<StudentDto>(studentsInDb);
            return Ok(studentsInDb);

        }

        [HttpGet("{id:int}")]
        public IActionResult GetStudentById(int id)                        
        {
            var studentInDb = _unitOfWork.StudentRepository.GetStudentGuardianById(id);
            if (studentInDb == null)
                return BadRequest("Not found in database");
            return Ok(studentInDb);
        }

        [HttpPost]
        public IActionResult CreateStudent(StudentDto studentDto)
        {
            using (IDbContextTransaction transaction = _unitOfWork.BeginTransaction())
            {

                try
                {
                    if (studentDto == null)
                        return BadRequest();
                    
                    var student = new Student 
                    {
                        Name=studentDto.StudentName,
                        Age=studentDto.StudentAge,
                        AdhaarNo=studentDto.StudentAdhaarNo,
                        Class_Id=7

                    };
                    var guardian = new GuardianDetails()
                    {
                        FatherName=studentDto.FatherName,
                        FatherSalary=studentDto.FatherSalary,
                        FatherOccupation=studentDto.FatherOccupation,
                        MotherName=studentDto.MotherName,
                        MotherOccupation=studentDto.MotherOccupation
                    };

                    var checkAdhaar = _unitOfWork.StudentRepository.CheckAdhaarNo(student.AdhaarNo);
                    if (!checkAdhaar)
                    {
                        if(_unitOfWork.StudentRepository.Create(student))
                        {
                            guardian.Student_Id = student.Id;
                            if(_unitOfWork.GuardianRepository.Create(guardian))
                            {
                                _unitOfWork.Commit();
                                return Ok();
                            }
                            else
                            {
                                _unitOfWork.Rollback();
                                return StatusCode(StatusCodes.Status500InternalServerError);

                            }
                        }
                        else
                        {
                            return StatusCode(StatusCodes.Status500InternalServerError);
                        }
                    }
                    else
                    {
                        return BadRequest("Adhaar no already registered");
                    }

                }
                catch (Exception ex)
                {
                    //Log.Logger = new LoggerConfiguration().WriteTo.Console().WriteTo.File(path: @"C:\Users\NITTIN\Desktop\log.txt", rollingInterval: RollingInterval.Day).CreateLogger();
                    //Log.Information(messageTemplate: "Information");
                    _unitOfWork.Rollback();
                    return BadRequest(ex);

                }
            }
            //return Ok(studentDto);

        }




        [HttpPut]
        public IActionResult UpdateStudent(StudentDto studentDto)
        {
            using(IDbContextTransaction transaction= _unitOfWork.BeginTransaction())
            { 
                try
                {
                    if (studentDto == null)
                        return NotFound();
                    var student = new Student
                    {
                        Id=studentDto.StudentId,
                        Name = studentDto.StudentName,
                        Age = studentDto.StudentAge,
                        AdhaarNo = studentDto.StudentAdhaarNo,
                        Class_Id = 7

                    };
                    
                   if(_unitOfWork.StudentRepository.Update(student))
                    {
                        var guardianInDb = _unitOfWork.GuardianRepository.GetDetailsByStudentId(student.Id);
                        var guardian = new GuardianDetails()
                        {
                            Student_Id=guardianInDb.Student_Id,
                            FatherName = studentDto.FatherName,
                            FatherSalary = studentDto.FatherSalary,
                            FatherOccupation = studentDto.FatherOccupation,
                            MotherName = studentDto.MotherName,
                            MotherOccupation = studentDto.MotherOccupation
                        };
                        if (guardianInDb!=null)
                        {
                            if (_unitOfWork.GuardianRepository.UpdateGuardian(guardian))
                            {
                                transaction.Commit();
                                return Ok();
                            }
                            else
                            {
                                transaction.Rollback();
                                return StatusCode(StatusCodes.Status500InternalServerError);
                            }
                        }
                        else
                        {
                            return NoContent();
                        }

                    }
                    else
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError);
                    }

                }
                catch(Exception ex)
                {
                    transaction.Rollback();
                    return StatusCode(StatusCodes.Status500InternalServerError,ex);
                }
            }

           
        }

        [HttpDelete("{stId:int}")]
        public IActionResult DeleteStudent(int stId)
        {
            using(IDbContextTransaction transaction = _unitOfWork.BeginTransaction())
            {
                try
                {
                    var student = _unitOfWork.StudentRepository.GetEntityById(stId);
                    if (student == null) return BadRequest();
                    if (_unitOfWork.StudentRepository.Delete(student))
                    {
                        var guardian = _unitOfWork.GuardianRepository.GetDetailsByStudentId(stId);
                        if(guardian!=null)
                        {
                            if (_unitOfWork.GuardianRepository.Delete(guardian))
                            {
                                transaction.Commit();
                                return Ok();
                            }
                            else
                            {
                                transaction.Rollback();
                                return StatusCode(StatusCodes.Status500InternalServerError);
                            }
                        }
                        else
                        {
                            transaction.Commit();
                            return Ok();
                        } 
                    }
                    else
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError);
                    }
                }
                catch(Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError,ex);
                }
            }
            
            
        }




    }
}
