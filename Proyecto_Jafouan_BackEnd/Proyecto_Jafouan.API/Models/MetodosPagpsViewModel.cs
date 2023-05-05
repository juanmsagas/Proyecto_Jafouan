using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jafouan.API.Models
{
    public class MetodosPagpsViewModel
    {
        public int meto_Id { get; set; }
        public string meto_Descripcion { get; set; }
        public bool? meto_Estado { get; set; }
        public int? meto_UserCrea { get; set; }
        public string empl_crea { get; set; }
        public DateTime? meto_FechaCreacion { get; set; }
        public int? meto_UserModificacion { get; set; }
        public string empl_Modifica { get; set; }
        public DateTime? meto_FechaModificacion { get; set; }
    }
}
