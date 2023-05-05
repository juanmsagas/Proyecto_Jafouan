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
    public class PrendasController : Controller
    {
        private readonly VentaRopaServices _ventaRopaServices;
        private readonly IMapper _mapper;

        public PrendasController(VentaRopaServices ventaRopaServices, IMapper mapper)
        {
            _ventaRopaServices = ventaRopaServices;
            _mapper = mapper;
        }


        [HttpGet("Index")]
        public IActionResult ListPrendas()
        {
            var list = _ventaRopaServices.ListaPrendas();

            return Ok(list);
        }

        [HttpPost("Insert")]
        public IActionResult InsertPrendas([FromBody] PrendasViewModel prendas)
        {

            var item = _mapper.Map<tbPrendas>(prendas);
            var response = _ventaRopaServices.InsertPrendas(item);
            return Ok(response);
        }

        [HttpPut("Update")]
        public IActionResult UpdatePrendas([FromBody] PrendasViewModel prendas)
        {
            var item = _mapper.Map<tbPrendas>(prendas);
            var result = _ventaRopaServices.UpdatePrendas(item);
            return Ok(result);
        }

        [HttpGet("Find")]
        public IActionResult FindPrendas(int id)
        {
            var list = _ventaRopaServices.FindPrendas(id);
            return Ok(list);
        }

        [HttpPut("Delete")]
        public IActionResult DeleteMarcas([FromBody] PrendasViewModel prendas)
        {
            var item = _mapper.Map<tbPrendas>(prendas);
            var result = _ventaRopaServices.DeletePrendas(item);
            return Ok(result);
        }
    }
}
