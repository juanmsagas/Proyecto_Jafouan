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
    public class SucursalesController : Controller
    {
        private readonly VentaRopaServices _ventaRopaServices;
        private readonly IMapper _mapper;

        public SucursalesController(VentaRopaServices ventaRopaServices, IMapper mapper)
        {
            _ventaRopaServices = ventaRopaServices;
            _mapper = mapper;
        }


        [HttpGet("Index")]
        public IActionResult ListSucursales()
        {
            var list = _ventaRopaServices.ListaSucursales();

            return Ok(list);
        }

        [HttpPost("Insert")]
        public IActionResult InsertSucursales([FromBody] SucursalesViewModel sucursales)
        {

            var item = _mapper.Map<tbSucursales>(sucursales);
            var response = _ventaRopaServices.InsertSucursales(item);
            return Ok(response);
        }

        [HttpPut("Update")]
        public IActionResult UpdateSucursales([FromBody] SucursalesViewModel sucursales)
        {
            var item = _mapper.Map<tbSucursales>(sucursales);
            var result = _ventaRopaServices.UpdateSucursales(item);
            return Ok(result);
        }

        [HttpGet("Find")]
        public IActionResult FindSucursales(int id)
        {
            var list = _ventaRopaServices.FindSucursales(id);
            return Ok(list);
        }

        [HttpPut("Delete")]
        public IActionResult DeleteSucursales([FromBody] SucursalesViewModel sucursales)
        {
            var item = _mapper.Map<tbSucursales>(sucursales);
            var result = _ventaRopaServices.DeleteSucursales(item);
            return Ok(result);
        }
    }
}
