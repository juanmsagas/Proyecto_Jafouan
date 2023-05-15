using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jafouan.DataAccess.Repository
{
    public class ScriptsDataBase
    {
        #region LOGIN
        public static string UDP_Usuarios_LOGIN = "acce.UDP_tbUsuarios_LOGIN";
        public static string UDP_Usuarios_MENU  = "acce.UDP_tbPantallasPorRol_MENU";

        #endregion

        #region Usuarios
        public static string UDP_Usuario_INDEX   = "acce.UDP_tbUsuarios_INDEX";
        public static string  UDP_Usuarios_FIND   ="acce.UDP_tbUsuarios_FIND";
        public static string UDP_Usuario_INSERT  = "acce.UDP_tbUsuarios_INSERT";
        public static string UDP_Usuarios_UPDATE = "acce.UDP_tbUsuarios_UPDATE";
        public static string UDP_Usuarios_DELETE = "acce.UDP_tbUsuarios_DELETE";
        #endregion

        #region Cargos
        public static string  INDEX_CARGO = "mant.UDP_tbCargos_INDEX";
        public static string   FIND_CARGO = "mant.UDP_tbCargos_FIND";
        public static string INSERT_CARGO = "mant.UDP_tbCargos_INSERT";
        public static string UPDATE_CARGO = "mant.UDP_tbCargos_UPDATE";
        public static string DELETE_CARGO = "mant.UDP_tbCargos_DELETE";
        #endregion

        #region Categorías
        public static string INDEX_CATEGORIAS =  "vera.UDP_tbCategorias_INDEX";
        public static string FIND_CATEGORIAS =   "vera.UDP_tbCategorias_FIND";
        public static string INSERT_CATEGORIAS = "vera.UDP_tbCategorias_INSERT";
        public static string UPDATE_CATEGORIAS = "vera.UDP_tbCategorias_UPDATE";
        public static string DELETE_CATEGORIAS = "vera.UDP_tbCategorias_DELETE";
        #endregion

        #region Clientes
        public static string  INDEX_CLIENTES = "vera.UDP_tbClientes_INDEX";
        public static string   FIND_CLIENTES = "vera.UDP_tbClientes_FIND";
        public static string INSERT_CLIENTES = "vera.UDP_tbClientes_INSERT";
        public static string UPDATE_CLIENTES = "vera.UDP_tbClientes_UPDATE";
        public static string DELETE_CLIENTES = "vera.UDP_tbClientes_DELETE";
        #endregion

        #region Departementos
        public static string  INDEX_DEPARTAMENTOS = "mant.UDP_tbDepartamentos_INDEX";
        public static string   FIND_DEPARTAMENTOS = "mant.UDP_tbDepartamentos_FIND";
        public static string INSERT_DEPARTAMENTOS = "mant.UDP_tbDepartamentos_INSERT";
        public static string UPDATE_DEPARTAMENTOS = "mant.UDP_tbDepartamentos_UPDATE";
        public static string DELETE_DEPARTAMENTOS = "mant.UDP_tbDepartamentos_DELETE";
        #endregion

        #region Descuentos
        public static string  INDEX_DESCUENTOS = "vera.UDP_tbDescuentos_INDEX";
        public static string   FIND_DESCUENTOS = "vera.UDP_tbDescuentos_FIND";
        public static string INSERT_DESCUENTOS = "vera.UDP_tbDescuentos_INSERT";
        public static string UPDATE_DESCUENTOS = "vera.UDP_tbDescuentos_UPDATE";
        public static string DELETE_DESCUENTOS = "vera.UDP_tbDescuentos_DELETE";
        #endregion

        #region Empleados
        public static string  INDEX_EMPLEADOS = "vera.UDP_tbEmpleados_INDEX";
        public static string   FIND_EMPLEADOS = "vera.UDP_tbEmpleados_FIND";
        public static string INSERT_EMPLEADOS = "vera.UDP_tbEmpleados_INSERT";
        public static string UPDATE_EMPLEADOS = "vera.UDP_tbEmpleados_UPDATE";
        public static string DELETE_EMPLEADOS = "vera.UDP_tbEmpleados_DELETE";
        #endregion

        #region Estados Civiles
        public static string  INDEX_ESTADOSCIVILES = "mant.UDP_tbEstadosCiviles_INDEX";
        public static string   FIND_ESTADOSCIVILES = "mant.UDP_tbEstadosCiviles_FIND";
        public static string INSERT_ESTADOSCIVILES = "mant.UDP_tbEstadosCiviles_INSERT";
        public static string UPDATE_ESTADOSCIVILES = "mant.UDP_tbEstadosCiviles_UPDATE";
        public static string DELETE_ESTADOSCIVILES = "mant.UDP_tbEstadosCiviles_DELETE";
        #endregion

        #region Facturas Detalles
        public static string  INDEX_FACTURADETALLES = "fact.UDP_tbFacturaDetalles_INDEX";
        public static string   FIND_FACTURADETALLES = "fact.UDP_tbFacturaDetalles_FIND";
        public static string INSERT_FACTURADETALLES = "fact.UDP_tbFacturaDetalles_INSERT";
        public static string UPDATE_FACTURADETALLES = "fact.UDP_tbFacturaDetalles_UPDATE";
        public static string DELETE_FACTURADETALLES = "fact.UDP_tbFacturaDetalles_DELETE";
        #endregion

        #region Facturas 
        public static string  INDEX_FACTURAS = "fact.UDP_tbFacturas_INDEX";
        public static string   FIND_FACTURAS = "fact.UDP_tbFacturas_FIND";
        public static string INSERT_FACTURAS = "fact.UDP_tbFacturas_INSERT";
        public static string UPDATE_FACTURAS = "fact.UDP_tbFacturas_UPDATE";
        #endregion

        #region Fardos 
        public static string  INDEX_FARDOS = "vera.UDP_tbFardos_INDEX";
        public static string   FIND_FARDOS = "vera.UDP_tbFardos_FIND";
        public static string INSERT_FARDOS = "vera.UDP_tbFardos_INSERT";
        public static string UPDATE_FARDOS = "vera.UDP_tbFardos_UPDATE";
        public static string DELETE_FARDOS = "vera.UDP_tbFardos_DELETE";
        #endregion

        #region Marcs 
        public static string  INDEX_MARCAS = "vera.UDP_tbMarcas_INDEX";
        public static string   FIND_MARCAS = "vera.UDP_tbMarcas_FIND";
        public static string INSERT_MARCAS = "vera.UDP_tbMarcas_INSERT";
        public static string UPDATE_MARCAS = "vera.UDP_tbMarcas_UPDATE";
        public static string DELETE_MARCAS = "vera.UDP_tbMarcas_DELETE";
        #endregion

        #region Métodos de Pago 
        public static string  INDEX_METODOS = "fact.UDP_tbMetodosPagos_INDEX";
        public static string   FIND_METODOS = "fact.UDP_tbMetodosPagos_FIND";
        public static string INSERT_METODOS = "fact.UDP_tbMetodosPagos_INSERT";
        public static string UPDATE_METODOS = "fact.UDP_tbMetodosPagos_UPDATE";
        public static string DELETE_METODOS = "fact.UDP_tbMetodosPagos_DELETE";
        #endregion

        #region Municipios
        public static string  INDEX_MUNICIPIOS   = "mant.UDP_tbMunicipios_INDEX";
        public static string   FIND_MUNICIPIOS   = "mant.UDP_tbMunicipios_FIND";
        public static string INSERT_MUNICIPIOS   = "mant.UDP_tbMunicipios_INSERT";
        public static string UPDATE_MUNICIPIOS   = "mant.UDP_tbMunicipios_UPDATE";
        public static string DELETE_MUNICIPIOS   = "mant.UDP_tbMunicipios_DELETE";
        public static string FILTRAR_MUNICIPIOS  = "mant.UDP_tbMunicipios_FILTER";
        #endregion

        #region Pantallas
        public static string  INDEX_PANTALLAS = "acce.UDP_tbPantallas_INDEX";
        public static string   FIND_PANTALLAS = "acce.UDP_tbPantallas_FIND";
        public static string INSERT_PANTALLAS = "acce.UDP_tbPantallas_INSERT";
        public static string UPDATE_PANTALLAS = "acce.UDP_tbPantallas_UPDATE";
        public static string DELETE_PANTALLAS = "acce.UDP_tbPantallas_DELETE";
        #endregion

        #region Pantallas Por Rol
        public static string  INDEX_PANTALLASROL = "acce.UDP_tbPantallasPorRol_INDEX";
        public static string   FIND_PANTALLASROL = "acce.UDP_tbPantallasPorRol_FIND";
        public static string INSERT_PANTALLASROL = "acce.UDP_tbPantallasPorRol_INSERT";
        public static string UPDATE_PANTALLASROL = "acce.UDP_tbPantallasPorRol_UPDATE";
        public static string DELETE_PANTALLASROL = "acce.UDP_tbPantallasPorRol_DELETE";

        public static string UDP_tbPantallasPorRol_Check = "acce.UDP_tbPantallasPorRol_Check";
        public static string UDP_tbPantallasPorRol_Checked = "acce.UDP_tbPantallasPorRol_Checked";
        #endregion

        #region Prendas
        public static string  INDEX_PRENDAS = "vera.UDP_tbPrendas_INDEX";
        public static string   FIND_PRENDAS = "vera.UDP_tbPrendas_FIND";
        public static string INSERT_PRENDAS = "vera.UDP_tbPrendas_INSERT";
        public static string UPDATE_PRENDAS = "vera.UDP_tbPrendas_UPDATE";
        public static string DELETE_PRENDAS = "vera.UDP_tbPrendas_DELETE";
        public static string DISPONIBLE_PRENDAS = "vera.UDP_tbPrendas_DISPONIBLE";
        public static string VENDIDA_PRENDAS = "vera.UDP_tbPrendas_VENDIDA";
        public static string PRENDASDISPONIBLES = "vera.UDP_tbPrendas_PRENDASDISPONIBLES";
        public static string Grafica = "vera.UDP_tbCategorias_Grafica";
        public static string Grafica2 = "vera.tbEmpleados_Grafica";
        #endregion

        #region Proveedores
        public static string  INDEX_PROVEEDORES = "vera.UDP_tbProveedores_INDEX";
        public static string   FIND_PROVEEDORES = "vera.UDP_tbProveedores_FIND";
        public static string INSERT_PROVEEDORES = "vera.UDP_tbProveedores_INSERT";
        public static string UPDATE_PROVEEDORES = "vera.UDP_tbProveedores_UPDATE";
        public static string DELETE_PROVEEDORES = "vera.UDP_tbProveedores_DELETE";
        #endregion

        #region Roles
        public static string  INDEX_ROLES = "acce.UDP_tbRoles_INDEX";
        public static string   FIND_ROLES = "acce.UDP_tbRoles_FIND";
        public static string INSERT_ROLES = "acce.UDP_tbRoles_INSERT";
        public static string UPDATE_ROLES = "acce.UDP_tbRoles_UPDATE";
        public static string DELETE_ROLES = "acce.UDP_tbRoles_DELETE";
        #endregion

        #region Sucursales
        public static string  INDEX_SUCURSALES = "vera.UDP_tbSucursales_INDEX";
        public static string   FIND_SUCURSALES = "vera.UDP_tbSucursales_FIND";
        public static string INSERT_SUCURSALES = "vera.UDP_tbSucursales_INSERT";
        public static string UPDATE_SUCURSALES = "vera.UDP_tbSucursales_UPDATE";
        public static string DELETE_SUCURSALES = "vera.UDP_tbSucursales_DELETE";
        #endregion


        #region Reporte
        public static string REPORTE = "vera.UDP_tbFacturas_Reporte";
        #endregion
















    }
}
