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
    public class CategoriasController : Controller
    {
        private readonly VentaRopaServices _ventaRopaServices;
        private readonly IMapper _mapper;

        public CategoriasController(VentaRopaServices ventaRopaServices, IMapper mapper)
        {
            _ventaRopaServices = ventaRopaServices;
            _mapper = mapper;
        }


        [HttpGet("Index")]
        public IActionResult ListCategorias()
        {
            var list = _ventaRopaServices.ListaCategorias();

            return Ok(list);
        }

        [HttpPost("Insert")]
        public IActionResult InsertCategorias([FromBody] CategoriasViewModel categorias )
        {

            var item = _mapper.Map<tbCategorias>(categorias);
            var response = _ventaRopaServices.InsertCategorias(item);
            return Ok(response);
        }

        [HttpPut("Update")]
        public IActionResult UpdateCategorias([FromBody] CategoriasViewModel categorias)
        {
            var item = _mapper.Map<tbCategorias>(categorias);
            var result = _ventaRopaServices.UpdateCategorias(item);
            return Ok(result);
        }

        [HttpGet("Find")]
        public IActionResult FindCategorias(int id)
        {
            var list = _ventaRopaServices.FindCategorias(id);
            return Ok(list);
        }

        [HttpPut("Delete")]
        public IActionResult DeleteCategorias([FromBody] CategoriasViewModel categorias)
        {
            var item = _mapper.Map<tbCategorias>(categorias);
            var result = _ventaRopaServices.DeleteCategorias(item);
            return Ok(result);
        }
    }
}
