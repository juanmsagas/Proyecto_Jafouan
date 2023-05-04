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
    public class EstadosCivilesRepository : IRepository<tbEstadosCiviles, VW_EstadosCiviles>
    {
        public RequestStatus Delete(tbEstadosCiviles item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@estc_Id", item.estc_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.DELETE_ESTADOSCIVILES, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }


        public VW_EstadosCiviles Find(int? id)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@estc_Id", id, DbType.Int32, ParameterDirection.Input);


            var result = db.QueryFirst<VW_EstadosCiviles>(ScriptsDataBase.FIND_ESTADOSCIVILES, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbEstadosCiviles item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@estc_Descripcion", item.estc_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@estc_UserCrea", item.estc_UserCrea, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.INSERT_ESTADOSCIVILES, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }


        public IEnumerable<VW_EstadosCiviles> List()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query<VW_EstadosCiviles>(ScriptsDataBase.INDEX_ESTADOSCIVILES, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbEstadosCiviles item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@estc_Id", item.estc_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@estc_Descripcion", item.estc_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@estc_UserModifica", item.estc_UserCrea, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.UPDATE_ESTADOSCIVILES, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }


    }
}
