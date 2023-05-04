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
    public class FacturasController : Controller
    {
        private readonly FacturationServices _facturationServices;
        private readonly IMapper _mapper;

        public FacturasController(FacturationServices  facturationServices, IMapper mapper)
        {
            _facturationServices = facturationServices;
            _mapper = mapper;
        }


        [HttpGet("Index")]
        public IActionResult ListFactura()
        {
            var list = _facturationServices.ListFactura();

            return Ok(list);
        }

        [HttpPost("Insert")]
        public IActionResult InsertFactura([FromBody] FacturasViewModel facturas)
        {

            var item = _mapper.Map<tbFacturas>(facturas);
            var response = _facturationServices.InsertFactura(item);
            return Ok(response);
        }

        [HttpPut("Update")]
        public IActionResult UpdateFactura([FromBody] FacturasViewModel facturas)
        {
            var item = _mapper.Map<tbFacturas>(facturas);
            var result = _facturationServices.UpdateFactura(item);
            return Ok(result);
        }

        [HttpGet("Find")]
        public IActionResult FindFactura(int id)
        {
            var list = _facturationServices.FindFactura(id);
            return Ok(list);
        }

        [HttpPut("Delete")]
        public IActionResult DeleteFacturas([FromBody] FacturasViewModel facturas)
        {
            var item = _mapper.Map<tbFacturas>(facturas);
            var result = _facturationServices.DeleteFactura(item);
            return Ok(result);
        }
    }
}
