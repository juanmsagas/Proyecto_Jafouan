using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jafouan.API.Models
{
    public class CategoriasViewModel
    {
        public int cate_Id { get; set; }
        public string cate_Descripcion { get; set; }
        public bool cate_Estado { get; set; }
        public int cate_UserCrea { get; set; }
        public string empl_crea { get; set; }
        public DateTime cate_FechaCrea { get; set; }
        public int? cate_UserModifica { get; set; }
        public string empl_Modifica { get; set; }
        public DateTime? cate_FechaModificacion { get; set; }
    }
}
