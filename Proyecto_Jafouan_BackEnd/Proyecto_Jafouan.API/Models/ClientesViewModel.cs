using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jafouan.API.Models
{
    public class ClientesViewModel
    {
        public int clie_Id { get; set; }
        public string clie_Nombres { get; set; }
        public string clie_ApellIdos { get; set; }
        public string clie_Identidad { get; set; }
        public string NombreCliente { get; set; }
        public DateTime clie_FechaNacimiento { get; set; }
        public string clie_Sexo { get; set; }
        public string clieSexo { get; set; }
        public int estc_Id { get; set; }
        public string estc_Descripcion { get; set; }
        public string clie_Telefeno { get; set; }
        public string dept_Id { get; set; }
        public string dept_Descripcion { get; set; }
        public string muni_Id { get; set; }
        public string muni_Descripcion { get; set; }
        public string clie_Direccion { get; set; }
        public bool clie_Estado { get; set; }
        public int clie_UserCrea { get; set; }
        public string empl_crea { get; set; }
        public DateTime clie_FechaCreacion { get; set; }
        public int? clie_UserModifica { get; set; }
        public string empl_Modifica { get; set; }
        public DateTime? clie_FechaModificacion { get; set; }
    }
}
