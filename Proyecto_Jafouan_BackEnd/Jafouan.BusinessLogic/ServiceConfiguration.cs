using Jafouan.BusinessLogic.Service;
using Jafouan.DataAccess;
using Jafouan.DataAccess.Repository;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Jafouan.BusinessLogic
{
    public static class ServiceConfiguration
    {
        public static void DataAcces(this IServiceCollection service, string connectionString)
        {
            #region acce
            service.AddScoped<UsuariosRepository>();
            service.AddScoped<RolesRepository>();
            service.AddScoped<PantallasPorRolRepository>();
            service.AddScoped<PantallasRepository>();
            #endregion

            #region gral
            service.AddScoped<DepartamentosRepository>();
            service.AddScoped<MunicipiosRepository>();
            service.AddScoped<EstadosCivilesRepository>();
            service.AddScoped<CargosRepository>();

            #endregion

            #region fact
            service.AddScoped<FacturaDetallesRepository>();
            service.AddScoped<FacturasRepository>();
            service.AddScoped<MetodosPagosRepository>();
            #endregion

            #region vera
            service.AddScoped<CategoriasRepository>();
            service.AddScoped<ClientesRepository>();
            service.AddScoped<EmpleadosRepository>();
            service.AddScoped<PrendasRepository>();
            service.AddScoped<ProveedoresRepository>();
            service.AddScoped<SucursalesRepository>();
            service.AddScoped<FardosRepository>();
            service.AddScoped<DescuentosRepository>();
            service.AddScoped<MarcasRepository>();

            #endregion



            Jafouan_Context.BuildConnectionString(connectionString);
        }


        public static void BussinessLogic(this IServiceCollection service)
        {
            service.AddScoped<AccessService>();
            service.AddScoped<GeneralServices>();
            service.AddScoped<FacturationServices>();
            service.AddScoped<VentaRopaServices>();

        }
    }
}
