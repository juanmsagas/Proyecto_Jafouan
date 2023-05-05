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
    public class FardosRepository : IRepository<tbFardos, VW_Fardos>
    {
        public RequestStatus Delete(tbFardos item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@fard_Id", item.fard_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.DELETE_FARDOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_Fardos Find(int? id)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@fard_Id", id, DbType.Int32, ParameterDirection.Input);


            var result = db.QueryFirst<VW_Fardos>(ScriptsDataBase.FIND_FARDOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbFardos item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@fard_Descripcion", item.fard_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@fard_UserCrea", item.fard_UserCrea, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.INSERT_FARDOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_Fardos> List()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query<VW_Fardos>(ScriptsDataBase.INDEX_FARDOS, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbFardos item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@fard_Id", item.fard_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@fard_Descripcion", item.fard_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@fard_UserModifica", item.fard_UserModificacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.UPDATE_FARDOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        VW_Fardos IRepository<tbFardos, VW_Fardos>.Find(int? id)
        {
            throw new NotImplementedException();
        }

        IEnumerable<VW_Fardos> IRepository<tbFardos, VW_Fardos>.List()
        {
            throw new NotImplementedException();
        }
    }
}
