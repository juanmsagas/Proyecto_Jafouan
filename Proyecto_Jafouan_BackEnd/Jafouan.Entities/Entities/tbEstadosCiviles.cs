﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Jafouan.Entities.Entities
{
    public partial class tbEstadosCiviles
    {
        public tbEstadosCiviles()
        {
            tbClientes = new HashSet<tbClientes>();
            tbEmpleados = new HashSet<tbEmpleados>();
        }

        public int estc_Id { get; set; }
        public string estc_Descripcion { get; set; }
        public bool? estc_Estado { get; set; }
        public int estc_UserCrea { get; set; }
        public DateTime? estc_FechaCrea { get; set; }
        public int? estc_UserModifica { get; set; }
        public DateTime? estc_FechaModifica { get; set; }

        public virtual ICollection<tbClientes> tbClientes { get; set; }
        public virtual ICollection<tbEmpleados> tbEmpleados { get; set; }
    }
}