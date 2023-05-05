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
    public class DescuentosController : Controller
    {
        private readonly VentaRopaServices _ventaRopaServices;
        private readonly IMapper _mapper;

        public DescuentosController(VentaRopaServices ventaRopaServices, IMapper mapper)
        {
            _ventaRopaServices = ventaRopaServices;
            _mapper = mapper;
        }


        [HttpGet("Index")]
        public IActionResult ListDescuentos()
        {
            var list = _ventaRopaServices.ListaDescuentos();

            return Ok(list);
        }

        [HttpPost("Insert")]
        public IActionResult InsertDescuentos([FromBody] DescuentosViewModel descuentos)
        {

            var item = _mapper.Map<tbDescuentos>(descuentos);
            var response = _ventaRopaServices.InsertDescuentos(item);
            return Ok(response);
        }

        [HttpPut("Update")]
        public IActionResult UpdateCargos([FromBody] DescuentosViewModel descuentos)
        {
            var item = _mapper.Map<tbDescuentos>(descuentos);
            var result = _ventaRopaServices.UpdateDescuentos(item);
            return Ok(result);
        }

        [HttpGet("Find")]
        public IActionResult FindCargos(int id)
        {
            var list = _ventaRopaServices.FindDescuentos(id);
            return Ok(list);
        }

        [HttpPut("Delete")]
        public IActionResult DeleteUsuario([FromBody] DescuentosViewModel descuentos)
        {
            var item = _mapper.Map<tbDescuentos>(descuentos);
            var result = _ventaRopaServices.DeleteDescuentos(item);
            return Ok(result);
        }
    }
}
