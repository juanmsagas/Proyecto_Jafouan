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
    public class ProveedoresRepository : IRepository<tbProveedores, VW_Proveedores>
    {
        public RequestStatus Delete(tbProveedores item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@prov_Id", item.prov_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.DELETE_PROVEEDORES, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_Proveedores Find(int? id)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@prov_Id", id, DbType.Int32, ParameterDirection.Input);


            var result = db.QueryFirst<VW_Proveedores>(ScriptsDataBase.FIND_PROVEEDORES, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbProveedores item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@prov_Nombres", item.prov_Nombres, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_Apellidos", item.prov_ApellIdos, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_Telefono", item.prov_Telefeno, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_Direccion", item.prov_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_UserCrea", item.prov_UserCrea, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.INSERT_PROVEEDORES, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_Proveedores> List()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query<VW_Proveedores>(ScriptsDataBase.INDEX_PROVEEDORES, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbProveedores item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@prov_Id", item.prov_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@prov_Nombres", item.prov_Nombres, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_Apellidos", item.prov_ApellIdos, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_Telefono", item.prov_Telefeno, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_Direccion", item.prov_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_UserModifica", item.prov_UserModifica, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.UPDATE_PROVEEDORES, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        VW_Proveedores IRepository<tbProveedores, VW_Proveedores>.Find(int? id)
        {
            throw new NotImplementedException();
        }

        IEnumerable<VW_Proveedores> IRepository<tbProveedores, VW_Proveedores>.List()
        {
            throw new NotImplementedException();
        }
    }
}
