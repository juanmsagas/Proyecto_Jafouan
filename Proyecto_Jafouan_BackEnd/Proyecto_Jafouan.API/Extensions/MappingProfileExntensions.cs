using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Jafouan.API.Models;
using Jafouan.Entities.Entities;


namespace Jafouan.API.Extensions
{
    public class MappingProfileExntensions : Profile
    {
        public MappingProfileExntensions()
        {
            #region acce
            CreateMap<UsuariosViewModel, tbUsuarios>().ReverseMap();
            CreateMap<RolesViewModel, tbRoles>().ReverseMap();
            CreateMap<PantallasViewModel, tbPantallas>().ReverseMap();
            CreateMap<PantallasPorRolViewModel, tbPantallasPorRol>().ReverseMap();
            #endregion

            #region gral
            CreateMap<EstadosCivilesViewModel, tbEstadosCiviles>().ReverseMap();
            CreateMap<DepartamentosViewModel, tbDepartamentos>().ReverseMap();
            CreateMap<MunicipiosViewModel, tbMunicipios>().ReverseMap();
            CreateMap<CargosViewModel, tbCargos>().ReverseMap();
            #endregion

            #region fact
            CreateMap<FacturaDetallesViewModel, tbFacturaDetalles>().ReverseMap();
            CreateMap<FacturasViewModel, tbFacturas>().ReverseMap();
            CreateMap<MetodosPagpsViewModel, tbMetodosPagos>().ReverseMap();
            #endregion

            #region vera
            CreateMap<CategoriasViewModel, tbCategorias>().ReverseMap();
            CreateMap<ClientesViewModel, tbClientes>().ReverseMap();
            CreateMap<EmpleadosViewModel, tbEmpleados>().ReverseMap();
            CreateMap<FardosViewModel, tbFardos>().ReverseMap();
            CreateMap<ProveedoresViewModel, tbProveedores>().ReverseMap();
            CreateMap<MarcasViewModel, tbMarcas>().ReverseMap();
            CreateMap<DescuentosViewModel, tbDescuentos>().ReverseMap();
            CreateMap<SucursalesViewModel, tbSucursales>().ReverseMap();
            CreateMap<PrendasViewModel, tbPrendas>().ReverseMap();

            #endregion
        }

    }
}
