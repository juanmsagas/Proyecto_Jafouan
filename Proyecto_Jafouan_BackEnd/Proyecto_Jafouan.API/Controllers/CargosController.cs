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
    public class CargosController : Controller
    {
        private readonly GeneralServices _generalServices;
        private readonly IMapper _mapper;

        public CargosController(GeneralServices generalServices, IMapper mapper)
        {
            _generalServices = generalServices;
            _mapper = mapper;
        }


        [HttpGet("Index")]
        public IActionResult ListCargos()
        {
            var list = _generalServices.ListCargos();

            return Ok(list);
        }

        [HttpPost("Insert")]
        public IActionResult InsertCargos([FromBody] CargosViewModel cargos)
        {

            var item = _mapper.Map<tbCargos>(cargos);
            var response = _generalServices.InsertCargo(item);
            return Ok(response);
        }

        [HttpPut("Update")]
        public IActionResult UpdateCargos([FromBody] CargosViewModel cargos)
        {
            var item = _mapper.Map<tbCargos>(cargos);
            var result = _generalServices.UpdateCargo(item);
            return Ok(result);
        }

        [HttpGet("Find")]
        public IActionResult FindCargos(int id)
        {
            var list = _generalServices.FindCargo(id);
            return Ok(list);
        }

        [HttpPut("Delete")]
        public IActionResult DeleteUsuario([FromBody] CargosViewModel cargos)
        {
            var item = _mapper.Map<tbCargos>(cargos);
            var result = _generalServices.DeleteCargo(item);
            return Ok(result);
        }
    }
}
