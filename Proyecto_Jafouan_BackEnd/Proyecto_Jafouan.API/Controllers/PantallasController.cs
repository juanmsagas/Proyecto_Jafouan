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

    }
}
