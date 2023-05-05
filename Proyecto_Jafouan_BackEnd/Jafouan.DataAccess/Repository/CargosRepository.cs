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
    public class CargosRepository : IRepository<tbCargos, VW_Cargos>
    {
        public RequestStatus Delete(tbCargos item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@carg_Id", item.carg_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.DELETE_CARGO, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }


        public VW_Cargos Find(int? id)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@carg_Id", id, DbType.Int32, ParameterDirection.Input);


            var result = db.QueryFirst<VW_Cargos>(ScriptsDataBase.FIND_CARGO, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbCargos item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@carg_Descripcion", item.carg_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@carg_UserCrea", item.carg_UserCrea, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.INSERT_CARGO, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }


        public IEnumerable<VW_Cargos> List()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query<VW_Cargos>(ScriptsDataBase.INDEX_CARGO, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbCargos item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@carg_Id", item.carg_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@carg_Descripcion", item.carg_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@carg_UserModifica", item.carg_UserModifica, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.UPDATE_CARGO, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }


    }
}
