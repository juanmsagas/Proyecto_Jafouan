﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jafouan.API.Models
{
    public class EmpleadosViewModel
    {
        public int empl_Id { get; set; }
        public string empl_Nombres { get; set; }
        public string empl_Apellidos { get; set; }
        public string empl_Identidad { get; set; }
        public string NombreCliente { get; set; }
        public int carg_Id { get; set; }
        public string carg_Descripcion { get; set; }
        public DateTime empl_FechaNacimiento { get; set; }
        public string empl_Sexo { get; set; }
        public string emplSexo { get; set; }
        public int estc_Id { get; set; }
        public string estc_Descripcion { get; set; }
        public string empl_Telefeno { get; set; }
        public string dept_Id { get; set; }
        public string dept_Descripcion { get; set; }
        public string muni_Id { get; set; }
        public string muni_Descripcion { get; set; }
        public int sucu_Id { get; set; }
        public string sucu_Nombre { get; set; }
        public string empl_Direccion { get; set; }
        public bool empl_Estado { get; set; }
        public int empl_UserCrea { get; set; }
        public string empl_crea { get; set; }
        public DateTime empl_FechaCreacion { get; set; }
        public int? empl_UserModifica { get; set; }
        public string empl_Modifica { get; set; }
        public DateTime? empl_FechaModificacion { get; set; }
    }
}

