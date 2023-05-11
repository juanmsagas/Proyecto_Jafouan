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
    public class RolesRepository : IRepository<tbRoles, VW_Roles>
    {
        public RequestStatus Delete(tbRoles item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@role_Id", item.role_Id, DbType.String, ParameterDirection.Input);
            return db.QueryFirst<RequestStatus>(ScriptsDataBase.DELETE_ROLES, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }

        public VW_Roles Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbRoles item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<RequestStatus> InsertYId(tbRoles item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@role_Descripcion", item.role_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@role_UserCrea", item.role_UserCrea, DbType.Int32, ParameterDirection.Input);
            return db.Query<RequestStatus>(ScriptsDataBase.INSERT_ROLES, parametros, commandType: System.Data.CommandType.StoredProcedure);

        }


        public IEnumerable<VW_Roles> List()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query<VW_Roles>(ScriptsDataBase.INDEX_ROLES, null, commandType: System.Data.CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbRoles item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@role_Id", item.role_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@role_Descripcion", item.role_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@role_UserModifica", item.role_UserModifica, DbType.Int32, ParameterDirection.Input);
            return db.QueryFirst<RequestStatus>(ScriptsDataBase.UPDATE_ROLES, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }
    }
}
