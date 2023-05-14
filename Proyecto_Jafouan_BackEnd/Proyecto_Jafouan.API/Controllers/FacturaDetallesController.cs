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
    public class FacturaDetallesController : Controller
    {
        private readonly FacturationServices _facturationServices;
        private readonly IMapper _mapper;

        public FacturaDetallesController(FacturationServices  facturationServices, IMapper mapper)
        {
            _facturationServices = facturationServices;
            _mapper = mapper;
        }


        [HttpGet("Index")]
        public IActionResult ListFacturaDetalles()
        {
            var list = _facturationServices.ListFacturaDetalles();

            return Ok(list);
        }

        [HttpPost("Insert")]
        public IActionResult InsertFacturaDetalles(int pren_Id, int fade_UserCrea)
        {
            tbFacturaDetalles item = new tbFacturaDetalles();
            item.pren_Id = pren_Id;
            item.fade_UserCrea = fade_UserCrea;

            var response = _facturationServices.InsertFacturaDetalles(item);
            return Ok(response);
        }

        [HttpPut("Update")]
        public IActionResult UpdateFacturaDetalles([FromBody] FacturaDetallesViewModel facturas)
        {
            var item = _mapper.Map<tbFacturaDetalles>(facturas);
            var result = _facturationServices.UpdateFacturaDetalles(item);
            return Ok(result);
        }

        [HttpGet("Find")]
        public IActionResult FindFacturaDetalles(int id)
        {
            var list = _facturationServices.FindFacturaDetalles(id);
            return Ok(list);
        }

        [HttpPut("Delete")]
        public IActionResult DeleteUsuario([FromBody] FacturaDetallesViewModel facturas)
        {
            var item = _mapper.Map<tbFacturaDetalles>(facturas);
            var result = _facturationServices.DeleteFacturaDetalles(item);
            return Ok(result);
        }
    }
}
