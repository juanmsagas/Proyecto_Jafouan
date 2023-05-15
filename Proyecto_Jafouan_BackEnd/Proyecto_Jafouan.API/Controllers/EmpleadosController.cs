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
    public class EmpleadosController : Controller
    {
        private readonly VentaRopaServices _ventaRopaServices;
        private readonly IMapper _mapper;

        public EmpleadosController(VentaRopaServices ventaRopaServices, IMapper mapper)
        {
            _ventaRopaServices = ventaRopaServices;
            _mapper = mapper;
        }


        [HttpGet("Index")]
        public IActionResult ListEmpleados()
        {
            var list = _ventaRopaServices.ListaEmpleados();

            return Ok(list);
        }

        [HttpGet("Grafica")]
        public IActionResult Grafica()
        {
            var list = _ventaRopaServices.GraficaEmpleados();

            return Ok(list);
        }


        [HttpPost("Insert")]
        public IActionResult InsertEmpleados([FromBody] EmpleadosViewModel empleados)
        {

            var item = _mapper.Map<tbEmpleados>(empleados);
            var response = _ventaRopaServices.InsertEmpleados(item);
            return Ok(response);
        }

        [HttpPut("Update")]
        public IActionResult UpdateEmpleados([FromBody] EmpleadosViewModel empleados)
        {
            var item = _mapper.Map<tbEmpleados>(empleados);
            var result = _ventaRopaServices.UpdatetEmpleados(item);
            return Ok(result);
        }

        [HttpGet("Find")]
        public IActionResult FindEmpleados(int id)
        {
            var list = _ventaRopaServices.FindtEmpleados(id);
            return Ok(list);
        }

        [HttpPut("Delete")]
        public IActionResult DeleteClientes([FromBody] EmpleadosViewModel empleados)
        {
            var item = _mapper.Map<tbEmpleados>(empleados);
            var result = _ventaRopaServices.DeletetEmpleados(item);
            return Ok(result);
        }
    }
}
