﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Jafouan.Entities.Entities
{
    public partial class VW_Marcas
    {
        public int marc_Id { get; set; }
        public string marc_Descripcion { get; set; }
        public bool marc_Estado { get; set; }
        public int marc_UserCrea { get; set; }
        public string empl_crea { get; set; }
        public DateTime marc_FechaCrea { get; set; }
        public int? marc_UserModifica { get; set; }
        public string empl_Modifica { get; set; }
        public DateTime? marc_FechaModificacion { get; set; }
    }
}