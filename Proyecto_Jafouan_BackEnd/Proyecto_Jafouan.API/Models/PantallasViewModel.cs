using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jafouan.API.Models
{
    public class PantallasViewModel
    {
        public int pant_Id { get; set; }
        public string pant_Nombre { get; set; }
        public string pant_Identificador { get; set; }
        public string pant_href { get; set; }
        public bool? pant_Estado { get; set; }
        public int pant_UserCrea { get; set; }
        public string empl_crea { get; set; }
        public DateTime? pant_FechaCrea { get; set; }
        public string empl_Modifica { get; set; }
        public int? pant_UserModifica { get; set; }
        public DateTime? pant_FechaModifica { get; set; }
    }
}
