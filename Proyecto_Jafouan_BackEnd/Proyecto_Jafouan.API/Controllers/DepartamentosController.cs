using AutoMapper;
using Jafouan.API.Models;
using Jafouan.BusinessLogic.Service;
using Jafouan.Entities.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jafouan.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartamentosController : Controller
    {
        private readonly GeneralServices _generalServices;
        private readonly IMapper _mapper;

        public DepartamentosController(GeneralServices generalServices, IMapper mapper)
        {
            _generalServices = generalServices;
            _mapper = mapper;
        }


        [HttpGet("Index")]
        public IActionResult ListDepartamentos()
        {
            var list = _generalServices.ListDepartamentos();

            return Ok(list);
        }

        [HttpPost("Insert")]
        public IActionResult InsertDepartamentos([FromBody] DepartamentosViewModel departamentos)
        {

            var item = _mapper.Map<tbDepartamentos>(departamentos);
            var response = _generalServices.InsertDepartamentos(item);
            return Ok(response);
        }

        [HttpPut("Update")]
        public IActionResult UpdateDepartamentos([FromBody] DepartamentosViewModel departamentos)
        {
            var item = _mapper.Map<tbDepartamentos>(departamentos);
            var result = _generalServices.UpdateDepartamentos(item);
            return Ok(result);
        }

        [HttpGet("Find")]
        public IActionResult FindDepartamentos(int id)
        {
            var list = _generalServices.FindDepartamentos(id);
            return Ok(list);
        }

        [HttpPut("Delete")]
        public IActionResult DeleteDepartamentos([FromBody] DepartamentosViewModel departamentos)
        {
            var item = _mapper.Map<tbDepartamentos>(departamentos);
            var result = _generalServices.DeleteDepartamentos(item);
            return Ok(result);
        }
    }
}
