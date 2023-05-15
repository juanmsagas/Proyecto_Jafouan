using AutoMapper;
using Jafouan.BusinessLogic.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jafouan.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReporteController : Controller
    {
        private readonly FacturationServices _facturationServices;
        private readonly IMapper _mapper;

        public ReporteController(FacturationServices facturationServices, IMapper mapper)
        {
            _facturationServices = facturationServices;
            _mapper = mapper;
        }


        [HttpGet("Info")]
        public IActionResult Info()
        {
            var list = _facturationServices.Reporte();

            return Ok(list);
        }
    }
}
