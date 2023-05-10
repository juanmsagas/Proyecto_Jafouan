using Jafouan.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jafouan.API.Models
{
    public class PantallasPorRolViewModel
    {
        public int pantrol_Id { get; set; }
        public int role_Id { get; set; }
        public int pant_Id { get; set; }
        public bool? pantrol_Estado { get; set; }
        public int pantrol_UserCrea { get; set; }
        public DateTime? pantrol_FechaCrea { get; set; }
        public int? pantrol_UserModifica { get; set; }
        public DateTime? pantrol_FechaModifica { get; set; }

    }
}
