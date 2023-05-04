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
    public class ClientesController : Controller
    {
        private readonly VentaRopaServices _ventaRopaServices;
        private readonly IMapper _mapper;

        public ClientesController(VentaRopaServices ventaRopaServices, IMapper mapper)
        {
            _ventaRopaServices = ventaRopaServices;
            _mapper = mapper;
        }


        [HttpGet("Index")]
        public IActionResult ListClientes()
        {
            var list = _ventaRopaServices.ListaClientes();

            return Ok(list);
        }

        [HttpPost("Insert")]
        public IActionResult InsertClientes([FromBody] ClientesViewModel clientes)
        {

            var item = _mapper.Map<tbClientes>(clientes);
            var response = _ventaRopaServices.InsertClientes(item);
            return Ok(response);
        }

        [HttpPut("Update")]
        public IActionResult UpdateClientes([FromBody] ClientesViewModel clientes)
        {
            var item = _mapper.Map<tbClientes>(clientes);
            var result = _ventaRopaServices.UpdateClientes(item);
            return Ok(result);
        }

        [HttpGet("Find")]
        public IActionResult FindClientes(int id)
        {
            var list = _ventaRopaServices.FindClientes(id);
            return Ok(list);
        }

        [HttpPut("Delete")]
        public IActionResult DeleteClientes([FromBody] ClientesViewModel clientes)
        {
            var item = _mapper.Map<tbClientes>(clientes);
            var result = _ventaRopaServices.DeleteClientes(item);
            return Ok(result);
        }
    }
}
