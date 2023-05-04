using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jafouan.API.Models
{
    public class FacturaDetallesViewModel
    {
        public int fade_Id { get; set; }
        public int fact_Id { get; set; }
        public int pren_Id { get; set; }
        public string pren_Descripcion { get; set; }
        public int fade_Cantidad { get; set; }
        public decimal fade_Total { get; set; }
        public int? fade_UserCrea { get; set; }
        public DateTime? fade_FechaCreacion { get; set; }
        public int? fade_UserModificacion { get; set; }
        public DateTime? fade_FechaModificacion { get; set; }
        public bool? fade_Estado { get; set; }
    }
}
