using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jafouan.API.Models
{
    public class MunicipiosViewModel
    {
        public string muni_Id { get; set; }
        public string dept_Id { get; set; }
        public string muni_Descripcion { get; set; }
        public bool? muni_Estado { get; set; }
        public int muni_UserCrea { get; set; }
        public string empl_crea { get; set; }
        public DateTime? muni_FechaCrea { get; set; }
        public int? muni_UserModifica { get; set; }
        public string empl_Modifica { get; set; }
        public DateTime? muni_FechaModifica { get; set; }
    }
}
