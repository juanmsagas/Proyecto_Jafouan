using Dapper;
using Jafouan.Entities.Entities;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jafouan.DataAccess.Repository
{
    public class SucursalesRepository : IRepository<tbSucursales, VW_Sucursales>
    {
        public RequestStatus Delete(tbSucursales item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@sucu_Id", item.sucu_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.DELETE_SUCURSALES, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_Sucursales Find(int? id)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@sucu_Id", id, DbType.Int32, ParameterDirection.Input);


            var result = db.QueryFirst<VW_Sucursales>(ScriptsDataBase.FIND_SUCURSALES, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbSucursales item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@sucu_Nombre", item.sucu_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_Direcion", item.sucu_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_UserCrea", item.sucu_UserCrea, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.INSERT_SUCURSALES, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_Sucursales> List()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query<VW_Sucursales>(ScriptsDataBase.INDEX_SUCURSALES, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbSucursales item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@sucu_Id", item.sucu_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@sucu_Nombre", item.sucu_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_Direcion", item.sucu_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@sucu_UserModifica", item.sucu_UserModifica, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.UPDATE_SUCURSALES, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        VW_Sucursales IRepository<tbSucursales, VW_Sucursales>.Find(int? id)
        {
            throw new NotImplementedException();
        }

        IEnumerable<VW_Sucursales> IRepository<tbSucursales, VW_Sucursales>.List()
        {
            throw new NotImplementedException();
        }
    }
}
