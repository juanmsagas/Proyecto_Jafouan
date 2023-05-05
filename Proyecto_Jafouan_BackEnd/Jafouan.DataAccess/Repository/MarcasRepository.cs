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
    public class MarcasRepository : IRepository<tbMarcas, VW_Marcas>
    {
        public RequestStatus Delete(tbMarcas item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@marc_Id", item.marc_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.DELETE_MARCAS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_Marcas Find(int? id)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@marc_Id", id, DbType.Int32, ParameterDirection.Input);


            var result = db.QueryFirst<VW_Marcas>(ScriptsDataBase.FIND_MARCAS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbMarcas item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@marc_Descripcion", item.marc_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@marc_UserCrea", item.marc_UserCrea, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.INSERT_MARCAS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_Marcas> List()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query<VW_Marcas>(ScriptsDataBase.INDEX_MARCAS, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbMarcas item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@marc_Id", item.marc_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@marc_Descripcion", item.marc_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@marc_UserModifica", item.marc_UserModifica, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.UPDATE_MARCAS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        VW_Marcas IRepository<tbMarcas, VW_Marcas>.Find(int? id)
        {
            throw new NotImplementedException();
        }

        IEnumerable<VW_Marcas> IRepository<tbMarcas, VW_Marcas>.List()
        {
            throw new NotImplementedException();
        }
    }
}
