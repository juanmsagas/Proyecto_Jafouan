using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jafouan.API.Models
{
    public class DepartamentosViewModel
    {
        public string dept_Id { get; set; }
        public string dept_Descripcion { get; set; }
        public bool? dept_Estado { get; set; }
        public int dept_UserCrea { get; set; }
        public DateTime? dept_FechaCrea { get; set; }
        public int? dept_UserModifica { get; set; }
        public DateTime? dept_FechaModifica { get; set; }
    }
}
