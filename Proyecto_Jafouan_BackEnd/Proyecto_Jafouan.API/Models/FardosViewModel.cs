using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jafouan.API.Models
{
    public class FardosViewModel
    {
        public int fard_Id { get; set; }
        public string fard_Descripcion { get; set; }
        public bool? fard_Estado { get; set; }
        public int? fard_UserCrea { get; set; }
        public string empl_crea { get; set; }
        public DateTime? fard_FechaCreacion { get; set; }
        public int? fard_UserModificacion { get; set; }
        public string empl_Modifica { get; set; }
        public DateTime? fard_FechaModificacion { get; set; }
    }
}
