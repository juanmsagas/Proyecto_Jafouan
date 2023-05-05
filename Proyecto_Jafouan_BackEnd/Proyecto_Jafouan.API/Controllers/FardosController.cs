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
    public class FardosController : Controller
    {
        private readonly VentaRopaServices _ventaRopaServices;
        private readonly IMapper _mapper;

        public FardosController(VentaRopaServices ventaRopaServices, IMapper mapper)
        {
            _ventaRopaServices = ventaRopaServices;
            _mapper = mapper;
        }


        [HttpGet("Index")]
        public IActionResult ListFardos()
        {
            var list = _ventaRopaServices.ListaFardos();

            return Ok(list);
        }

        [HttpPost("Insert")]
        public IActionResult InsertFardos([FromBody] FardosViewModel fardos)
        {

            var item = _mapper.Map<tbFardos>(fardos);
            var response = _ventaRopaServices.InsertFardos(item);
            return Ok(response);
        }

        [HttpPut("Update")]
        public IActionResult UpdateFardos([FromBody] FardosViewModel fardos)
        {
            var item = _mapper.Map<tbFardos>(fardos);
            var result = _ventaRopaServices.UpdateFardos(item);
            return Ok(result);
        }

        [HttpGet("Find")]
        public IActionResult FindFardos(int id)
        {
            var list = _ventaRopaServices.FindFardos(id);
            return Ok(list);
        }

        [HttpPut("Delete")]
        public IActionResult DeleteFardos([FromBody] FardosViewModel fardos)
        {
            var item = _mapper.Map<tbFardos>(fardos);
            var result = _ventaRopaServices.DeleteFardos(item);
            return Ok(result);
        }
    }
}
