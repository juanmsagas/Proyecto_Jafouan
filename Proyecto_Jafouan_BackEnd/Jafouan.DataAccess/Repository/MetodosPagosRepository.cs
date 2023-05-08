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
    public class MetodosPagosRepository : IRepository<tbMetodosPagos, VW_MetodosPagos>
    {
        public RequestStatus Delete(tbMetodosPagos item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@meto_Id", item.meto_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.DELETE_METODOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_MetodosPagos Find(int? id)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@meto_Id", id, DbType.Int32, ParameterDirection.Input);


            var result = db.QueryFirst<VW_MetodosPagos>(ScriptsDataBase.FIND_METODOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbMetodosPagos item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@meto_Descripcion", item.meto_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@meto_UserCrea", item.meto_UserCrea, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.INSERT_METODOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_MetodosPagos> List()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query<VW_MetodosPagos>(ScriptsDataBase.INDEX_METODOS, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbMetodosPagos item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@meto_Id", item.meto_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@meto_Descripcion", item.meto_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@meto_UserModifica", item.meto_UserModificacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.UPDATE_METODOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

    }
}
