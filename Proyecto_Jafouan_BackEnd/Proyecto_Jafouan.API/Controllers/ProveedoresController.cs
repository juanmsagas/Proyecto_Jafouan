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
    public class ProveedoresController : Controller
    {
        private readonly VentaRopaServices _ventaRopaServices;
        private readonly IMapper _mapper;

        public ProveedoresController(VentaRopaServices ventaRopaServices, IMapper mapper)
        {
            _ventaRopaServices = ventaRopaServices;
            _mapper = mapper;
        }


        [HttpGet("Index")]
        public IActionResult ListClientes()
        {
            var list = _ventaRopaServices.ListaProveedores();

            return Ok(list);
        }

        [HttpPost("Insert")]
        public IActionResult InsertProveedores([FromBody] ProveedoresViewModel proveedores)
        {

            var item = _mapper.Map<tbProveedores>(proveedores);
            var response = _ventaRopaServices.InsertProveedores(item);
            return Ok(response);
        }

        [HttpPut("Update")]
        public IActionResult UpdateProveedores([FromBody] ProveedoresViewModel proveedores)
        {
            var item = _mapper.Map<tbProveedores>(proveedores);
            var result = _ventaRopaServices.UpdateProveedores(item);
            return Ok(result);
        }

        [HttpGet("Find")]
        public IActionResult FindProveedores(int id)
        {
            var list = _ventaRopaServices.FindProveedores(id);
            return Ok(list);
        }

        [HttpPut("Delete")]
        public IActionResult DeleteClientes([FromBody] ProveedoresViewModel proveedores)
        {
            var item = _mapper.Map<tbProveedores>(proveedores);
            var result = _ventaRopaServices.DeleteProveedores(item);
            return Ok(result);
        }
    }
}
