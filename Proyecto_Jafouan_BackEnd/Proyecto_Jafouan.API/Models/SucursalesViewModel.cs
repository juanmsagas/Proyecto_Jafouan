using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jafouan.API.Models
{
    public class SucursalesViewModel
    {
        public int sucu_Id { get; set; }
        public string sucu_Nombre { get; set; }
        public string muni_Descripcion { get; set; }
        public string muni_Id { get; set; }
        public string dept_Id { get; set; }
        public string dept_Descripcion { get; set; }
        public string sucu_Direccion { get; set; }
        public bool sucu_Estado { get; set; }
        public int sucu_UserCrea { get; set; }
        public string empl_crea { get; set; }
        public DateTime sucu_FechaCreacion { get; set; }
        public int? sucu_UserModifica { get; set; }
        public string empl_Modifica { get; set; }
        public DateTime? sucu_FechaModificacion { get; set; }
    }
}
