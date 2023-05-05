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
    public class EstadosCivilesController : Controller
    {
        private readonly GeneralServices _generalServices;
        private readonly IMapper _mapper;

        public EstadosCivilesController(GeneralServices generalServices, IMapper mapper)
        {
            _generalServices = generalServices;
            _mapper = mapper;
        }


        [HttpGet("Index")]
        public IActionResult ListEstadosCiviles()
        {
            var list = _generalServices.ListEstadosCiviles();

            return Ok(list);
        }

        [HttpPost("Insert")]
        public IActionResult InsertEstadosCiviles([FromBody] EstadosCivilesViewModel estadosCiviles )
        {

            var item = _mapper.Map<tbEstadosCiviles>(estadosCiviles);
            var response = _generalServices.InsertEstadosCiviles(item);
            return Ok(response);
        }

        [HttpPut("Update")]
        public IActionResult UpdateEstadosCiviles([FromBody] EstadosCivilesViewModel estadosCiviles)
        {
            var item = _mapper.Map<tbEstadosCiviles>(estadosCiviles);
            var result = _generalServices.UpdateEstadosCiviles(item);
            return Ok(result);
        }

        [HttpGet("Find")]
        public IActionResult FindEstadosCiviles(int id)
        {
            var list = _generalServices.FindEstadosCiviles(id);
            return Ok(list);
        }

        [HttpPut("Delete")]
        public IActionResult DeleteEstadosCiviles([FromBody] EstadosCivilesViewModel estadosCiviles)
        {
            var item = _mapper.Map<tbEstadosCiviles>(estadosCiviles);
            var result = _generalServices.DeleteEstadosCiviles(item);
            return Ok(result);
        }
    }
}
