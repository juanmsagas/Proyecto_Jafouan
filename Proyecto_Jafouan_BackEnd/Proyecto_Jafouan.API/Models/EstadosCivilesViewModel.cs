using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jafouan.API.Models
{
    public class EstadosCivilesViewModel
    {
        public int estc_Id { get; set; }
        public string estc_Descripcion { get; set; }
        public bool? estc_Estado { get; set; }
        public int estc_UserCrea { get; set; }
        public string empl_crea { get; set; }
        public DateTime? estc_FechaCrea { get; set; }
        public int? estc_UserModifica { get; set; }
        public string empl_Modifica { get; set; }
        public DateTime? estc_FechaModifica { get; set; }
    }
}
