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
    public class MarcasController : Controller
    {
        private readonly VentaRopaServices _ventaRopaServices;
        private readonly IMapper _mapper;

        public MarcasController(VentaRopaServices ventaRopaServices, IMapper mapper)
        {
            _ventaRopaServices = ventaRopaServices;
            _mapper = mapper;
        }


        [HttpGet("Index")]
        public IActionResult ListMarcas()
        {
            var list = _ventaRopaServices.ListaMarcas();

            return Ok(list);
        }

        [HttpPost("Insert")]
        public IActionResult InsertMarcas([FromBody] MarcasViewModel marcas)
        {

            var item = _mapper.Map<tbMarcas>(marcas);
            var response = _ventaRopaServices.InsertMarcas(item);
            return Ok(response);
        }

        [HttpPut("Update")]
        public IActionResult UpdateCargos([FromBody] MarcasViewModel marcas )
        {
            var item = _mapper.Map<tbMarcas>(marcas);
            var result = _ventaRopaServices.UpdateMarcas(item);
            return Ok(result);
        }

        [HttpGet("Find")]
        public IActionResult FindMarcas(int id)
        {
            var list = _ventaRopaServices.FindMarcas(id);
            return Ok(list);
        }

        [HttpPut("Delete")]
        public IActionResult DeleteMarcas([FromBody] MarcasViewModel marcas)
        {
            var item = _mapper.Map<tbMarcas>(marcas);
            var result = _ventaRopaServices.DeleteMarcas(item);
            return Ok(result);
        }
    }
}
