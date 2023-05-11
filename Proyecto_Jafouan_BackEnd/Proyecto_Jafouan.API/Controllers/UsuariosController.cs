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
    public class UsuariosController : Controller
    {
        private readonly AccessService _accessService;
        private readonly IMapper _mapper;

        public UsuariosController(AccessService accessService, IMapper mapper)
        {
            _accessService = accessService;
            _mapper = mapper;
        }


        [HttpGet("Index")]
        public IActionResult ListUsuario()
        {
            var list = _accessService.ListUsuarios();

            return Ok(list);
        }

        [HttpPost("Insert")]
        public IActionResult Insert([FromBody] UsuariosViewModel usuarios)
        {

            var item = _mapper.Map<tbUsuarios>(usuarios);
            var response = _accessService.InsertUsuario(item);
            return Ok(response);
        }

        [HttpPut("Update")]
        public IActionResult UpdateUsuario([FromBody] UsuariosViewModel Usuario)
        {
            var item = _mapper.Map<tbUsuarios>(Usuario);
            var result = _accessService.UpdateUsuario(item);
            return Ok(result);
        }

        [HttpGet("Find")]
        public IActionResult Find(int id)
        {
            var list = _accessService.FindUsuario(id);
            return Ok(list);
        }

        [HttpPut("Delete")]
        public IActionResult Delete([FromBody] UsuariosViewModel Usuario)
        {
            var item = _mapper.Map<tbUsuarios>(Usuario);
            var result = _accessService.DeleteUsuario(item);
            return Ok(result);
        }


        [HttpGet("Login")]
        public IActionResult Login(string username, string password)
        {
            var list = _accessService.Login(username, password);
            return Ok(list);
        }

        [HttpGet("Menu")]
        public IActionResult Menu(int id)
        {
            var list = _accessService.Menu(id);
            return Ok(list);
        }
    }
}
