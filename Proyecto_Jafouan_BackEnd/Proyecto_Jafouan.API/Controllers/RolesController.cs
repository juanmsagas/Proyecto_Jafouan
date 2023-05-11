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
    public class RolesController : Controller
    {

        private readonly AccessService _accessService;
        private readonly IMapper _mapper;

        public RolesController(AccessService accessService, IMapper mapper)
        {
            _accessService = accessService;
            _mapper = mapper;
        }


        [HttpGet("Index")]
        public IActionResult ListRol()
        {
            var list = _accessService.ListRoles();

            return Ok(list);
        }

        [HttpPost("Insert")]
        public IActionResult Insert([FromBody] RolesViewModel Roles)
        {

            var item = _mapper.Map<tbRoles>(Roles);
            var response = _accessService.InsertRol(item);
            return Ok(response);
        }

        [HttpPut("Update")]
        public IActionResult Update([FromBody] RolesViewModel Rol)
        {
            var item = _mapper.Map<tbRoles>(Rol);
            var result = _accessService.UpdateRol(item);
            return Ok(result);
        }

        [HttpGet("Find")]
        public IActionResult Find(int id)
        {
            var list = _accessService.FindRol(id);
            return Ok(list);
        }

        [HttpPut("Delete")]
        public IActionResult Delete([FromBody] RolesViewModel Rol)
        {
            var item = _mapper.Map<tbRoles>(Rol);
            var result = _accessService.DeleteRol(item);
            return Ok(result);
        }


    }
}

