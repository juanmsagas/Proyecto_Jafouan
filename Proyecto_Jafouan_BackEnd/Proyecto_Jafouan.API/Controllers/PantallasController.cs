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
    public class PantallasController : Controller
    {

        private readonly AccessService _accessService;
        private readonly IMapper _mapper;

        public PantallasController(AccessService accessService, IMapper mapper)
        {
            _accessService = accessService;
            _mapper = mapper;
        }


        [HttpGet("Index")]
        public IActionResult Index()
        {
            var list = _accessService.ListPantallas();

            return Ok(list);
        }

        [HttpPost("PantallasAgg")]
        public IActionResult PantallasAgg([FromBody] PantallasPorRolViewModel pr)
        {
            var item = _mapper.Map<tbPantallasPorRol>(pr);
            var result = _accessService.PantallasAgg(item);
            return Ok(result);
        }

        [HttpPost("PantallasElim")]
        public IActionResult PantallasElim([FromBody] PantallasPorRolViewModel pr)
        {

            var result = _accessService.PantallasElim((int)pr.role_Id, (int)pr.pant_Id,(int)pr.pantrol_UserCrea);
            return Ok(result);
        }

        [HttpPost("PantallasPorRol_Checked")]
        public IActionResult PantallasPorRol_Checked([FromBody] PantallasPorRolViewModel pr)
        {

            var result = _accessService.PantallasPorRol_Checked(pr.role_Id);
                return Ok(result);
        }
    }
}
