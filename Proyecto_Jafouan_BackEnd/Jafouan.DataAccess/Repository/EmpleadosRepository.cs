using Dapper;
using Jafouan.Entities.Entities;
using Microsoft.Data.SqlClient;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jafouan.DataAccess.Repository
{
    public class EmpleadosRepository : IRepository<tbEmpleados, VW_Empleados>
    {
        public RequestStatus Delete(tbEmpleados item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@empl_id", item.empl_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.DELETE_EMPLEADOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_Empleados Find(int? id)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@empl_Id", id, DbType.Int32, ParameterDirection.Input);


            var result = db.QueryFirst<VW_Empleados>(ScriptsDataBase.FIND_EMPLEADOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbEmpleados item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@empl_Nombres", item.empl_Nombres, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_Apellidos", item.empl_ApellIdos, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_Identidad", item.empl_Identidad, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_FechaNacimiento", item.empl_FechaNacimiento, DbType.Date, ParameterDirection.Input);
            parametros.Add("@empl_Sexo", item.empl_Sexo, DbType.String, ParameterDirection.Input);
            parametros.Add("@estc_Id", item.estc_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@empl_Telefono", item.empl_Telefeno, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@carg_Id", item.carg_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_Id", item.sucu_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_Direccion", item.empl_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_UserCrea", item.empl_UserCrea, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.INSERT_EMPLEADOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_Empleados> List()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query<VW_Empleados>(ScriptsDataBase.INDEX_EMPLEADOS, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public IEnumerable GraficaEmpleados()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query(ScriptsDataBase.Grafica2, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbEmpleados item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@empl_Id", item.empl_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_Nombres", item.empl_Nombres, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_Apellidos", item.empl_ApellIdos, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_Identidad", item.empl_Identidad, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_FechaNacimiento", item.empl_FechaNacimiento, DbType.Date, ParameterDirection.Input);
            parametros.Add("@empl_Sexo", item.empl_Sexo, DbType.String, ParameterDirection.Input);
            parametros.Add("@estc_Id", item.estc_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@empl_Telefono", item.empl_Telefeno, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@carg_Id", item.carg_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_Id", item.sucu_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_Direccion", item.empl_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@empl_UserModifica", item.empl_UserModifica, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.UPDATE_EMPLEADOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }


    }
}
