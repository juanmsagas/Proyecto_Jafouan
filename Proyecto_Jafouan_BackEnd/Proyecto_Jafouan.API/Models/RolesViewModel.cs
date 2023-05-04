using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jafouan.API.Models
{
    public class RolesViewModel
    {
        public int role_Id { get; set; }
        public string role_Descripcion { get; set; }
        public bool? role_Estado { get; set; }
        public int role_UserCrea { get; set; }
        public string empl_crea { get; set; }
        public DateTime? role_FechaCrea { get; set; }
        public int? role_UserModifica { get; set; }
        public string empl_Modifica { get; set; }
        public DateTime? role_FechaModifica { get; set; }
    }
}
