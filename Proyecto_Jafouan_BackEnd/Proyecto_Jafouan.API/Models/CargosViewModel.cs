using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jafouan.API.Models
{
    public class CargosViewModel
    {

        public int carg_Id { get; set; }
        public string carg_Descripcion { get; set; }
        public bool carg_Estado { get; set; }
        public int carg_UserCrea { get; set; }
        public string empl_crea { get; set; }
        public DateTime carg_FechaCrea { get; set; }
        public int? carg_UserModifica { get; set; }
        public string empl_Modifica { get; set; }
        public DateTime? carg_FechaModificacion { get; set; }
    }
}
