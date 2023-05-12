using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jafouan.API.Models
{
    public class PrendasViewModel
    {
        public int pren_Id { get; set; }
        public string pren_Descripcion { get; set; }
        public string pren_Talla { get; set; }
        public int desc_Id { get; set; }
        public string desc_Color { get; set; }
        public string desc_ColorHexa { get; set; }
        public int desc_Descuento { get; set; }
        public decimal pren_Precio { get; set; }
        public int marc_Id { get; set; }
        public string marc_Descripcion { get; set; }
        public int cate_Id { get; set; }
        public string cate_Descripcion { get; set; }
        public int fard_Id { get; set; }
        public string fard_Descripcion { get; set; }
        public string pren_Imagen { get; set; }
        public bool? prend_EstadoTienda { get; set; }
        public string Disponibilidad { get; set; }
        public bool? pren_Estado { get; set; }
        public int? pren_UserCrea { get; set; }
        public string empl_crea { get; set; }
        public DateTime? pren_FechaCreacion { get; set; }
        public int? pren_UserModificacion { get; set; }
        public string empl_Modifica { get; set; }
        public DateTime? pren_FechaModificacion { get; set; }
    }
}
