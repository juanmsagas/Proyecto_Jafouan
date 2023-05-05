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
    public class MunicipiosController : Controller
    {
        private readonly GeneralServices _generalServices;
        private readonly IMapper _mapper;

        public MunicipiosController(GeneralServices generalServices, IMapper mapper)
        {
            _generalServices = generalServices;
            _mapper = mapper;
        }


        [HttpGet("Index")]
        public IActionResult ListMunicipios()
        {
            var list = _generalServices.ListMunicipios();

            return Ok(list);
        }

        [HttpPost("ListarMunisDeptos")]
        public IActionResult ListarMunisDeptos(MunicipiosViewModel municipiosViewModel)
        {
            var item2 = _mapper.Map<tbMunicipios>(municipiosViewModel);
            var list = _generalServices.ListarMunicipiosPorDepto(item2);
            return Ok(list);
        }

        [HttpPost("Insert")]
        public IActionResult InsertMunicipios([FromBody] MunicipiosViewModel municipios)
        {

            var item = _mapper.Map<tbMunicipios>(municipios);
            var response = _generalServices.InsertMunicipios(item);
            return Ok(response);
        }

        [HttpPut("Update")]
        public IActionResult UpdateMunicipios([FromBody] MunicipiosViewModel municipios)
        {
            var item = _mapper.Map<tbMunicipios>(municipios);
            var result = _generalServices.UpdateMunicipios(item);
            return Ok(result);
        }

        [HttpGet("Find")]
        public IActionResult FindMunicipios(string id)
        {
            var list = _generalServices.FindMunicipios(id);
            return Ok(list);
        }

        [HttpPut("Delete")]
        public IActionResult DeleteMunicipios([FromBody] MunicipiosViewModel municipios)
        {
            var item = _mapper.Map<tbMunicipios>(municipios);
            var result = _generalServices.DeleteMunicipios(item);
            return Ok(result);
        }
    }
}
