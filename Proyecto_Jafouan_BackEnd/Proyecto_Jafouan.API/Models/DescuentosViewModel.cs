using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jafouan.API.Models
{
    public class DescuentosViewModel
    {
        public int desc_Id { get; set; }
        public string desc_Color { get; set; }
        public bool? desc_Estado { get; set; }
        public string desc_ColorHexa { get; set; }
        public int desc_Descuento { get; set; }
        public int? desc_UserCrea { get; set; }
        public string empl_crea { get; set; }
        public DateTime? desc_FechaCreacion { get; set; }
        public int? desc_UserModificacion { get; set; }
        public string empl_Modifica { get; set; }
        public DateTime? desc_FechaModificacion { get; set; }
    }
}
