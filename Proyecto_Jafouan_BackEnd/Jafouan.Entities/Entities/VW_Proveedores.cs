﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Jafouan.Entities.Entities
{
    public partial class VW_Proveedores
    {
        public int prov_Id { get; set; }
        public string prov_Nombres { get; set; }
        public string prov_ApellIdos { get; set; }
        public string prov_Telefeno { get; set; }
        public string dept_Id { get; set; }
        public string dept_Descripcion { get; set; }
        public string muni_Id { get; set; }
        public string prov_Direccion { get; set; }
        public bool prov_Estado { get; set; }
        public int prov_UserCrea { get; set; }
        public string empl_crea { get; set; }
        public DateTime prov_FechaCreacion { get; set; }
        public int? prov_UserModifica { get; set; }
        public string empl_Modifica { get; set; }
        public DateTime? prov_FechaModificacion { get; set; }
    }
}