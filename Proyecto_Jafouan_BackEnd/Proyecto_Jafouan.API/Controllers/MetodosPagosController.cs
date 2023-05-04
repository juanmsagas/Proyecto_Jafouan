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
    public class MetodosPagosController : Controller
    {
        private readonly FacturationServices _facturationServices;
        private readonly IMapper _mapper;

        public MetodosPagosController(FacturationServices facturationServices, IMapper mapper)
        {
            _facturationServices = facturationServices;
            _mapper = mapper;
        }


        [HttpGet("Index")]
        public IActionResult ListMetodosPagos()
        {
            var list = _facturationServices.ListMetodosPagos();

            return Ok(list);
        }

        [HttpPost("Insert")]
        public IActionResult InsertMetodosPagos([FromBody] MetodosPagpsViewModel metodosPagps)
        {

            var item = _mapper.Map<tbMetodosPagos>(metodosPagps);
            var response = _facturationServices.InsertMetodosPagos(item);
            return Ok(response);
        }

        [HttpPut("Update")]
        public IActionResult UpdateMetodosPagos([FromBody] MetodosPagpsViewModel metodosPagps)
        {
            var item = _mapper.Map<tbMetodosPagos>(metodosPagps);
            var result = _facturationServices.UpdateMetodosPagos(item);
            return Ok(result);
        }

        [HttpGet("Find")]
        public IActionResult FindMetodosPagos(int id)
        {
            var list = _facturationServices.FindMetodosPagos(id);
            return Ok(list);
        }

        [HttpPut("Delete")]
        public IActionResult DeleteFacturas([FromBody] MetodosPagpsViewModel metodosPagps)
        {
            var item = _mapper.Map<tbMetodosPagos>(metodosPagps);
            var result = _facturationServices.DeleteMetodosPagos(item);
            return Ok(result);
        }
    }
}
