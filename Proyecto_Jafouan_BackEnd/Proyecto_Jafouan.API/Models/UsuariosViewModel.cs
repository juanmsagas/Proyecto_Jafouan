using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jafouan.API.Models
{
    public class UsuariosViewModel
    {
        public int user_Id { get; set; }
        public string user_NombreUsuario { get; set; }
        public int empl_Id { get; set; }
        public string user_Contraseña { get; set; }
        public string nombreEmpleado { get; set; }
        public bool user_Admin { get; set; }
        public string EsAdmin { get; set; }
        public int? role_Id { get; set; }
        public string role_Descripcion { get; set; }
        public bool? user_Estado { get; set; }
        public int user_UserCrea { get; set; }
        public string empl_Crea { get; set; }
        public DateTime? user_FechaCrea { get; set; }
        public int? user_UserModifica { get; set; }
        public string empl_Modifica { get; set; }
        public DateTime? user_FechaModifica { get; set; }
    }
}
