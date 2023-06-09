﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Jafouan.Entities.Entities
{
    public partial class tbMunicipios
    {
        public tbMunicipios()
        {
            tbClientes = new HashSet<tbClientes>();
            tbEmpleados = new HashSet<tbEmpleados>();
            tbProveedores = new HashSet<tbProveedores>();
            tbSucursales = new HashSet<tbSucursales>();
        }

        public string muni_Id { get; set; }
        public string dept_Id { get; set; }
        public string muni_Descripcion { get; set; }
        public bool? muni_Estado { get; set; }
        public int muni_UserCrea { get; set; }
        public DateTime? muni_FechaCrea { get; set; }
        public int? muni_UserModifica { get; set; }
        public DateTime? muni_FechaModifica { get; set; }

        public virtual tbDepartamentos dept { get; set; }
        public virtual tbUsuarios muni_UserCreaNavigation { get; set; }
        public virtual tbUsuarios muni_UserModificaNavigation { get; set; }
        public virtual ICollection<tbClientes> tbClientes { get; set; }
        public virtual ICollection<tbEmpleados> tbEmpleados { get; set; }
        public virtual ICollection<tbProveedores> tbProveedores { get; set; }
        public virtual ICollection<tbSucursales> tbSucursales { get; set; }
    }
}