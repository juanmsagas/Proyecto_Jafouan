﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Jafouan.Entities.Entities
{
    public partial class VW_Facturas
    {
        public int fact_Id { get; set; }
        public int clie_Id { get; set; }
        public string clie_Nombres { get; set; }
        public string clie_ApellIdos { get; set; }
        public int empl_Id { get; set; }
        public string empl_Nombres { get; set; }
        public string empl_ApellIdos { get; set; }
        public DateTime fact_Fecha { get; set; }
        public int sucu_Id { get; set; }
        public string sucu_Nombre { get; set; }
        public int meto_Id { get; set; }
        public string meto_Descripcion { get; set; }
        public int? fact_UserCrea { get; set; }
        public string empl_crea { get; set; }
        public DateTime? fact_FechaCreacion { get; set; }
        public int? fact_UserModificacion { get; set; }
        public string empl_Modifica { get; set; }
        public DateTime? fact_FechaModificacion { get; set; }
    }
}