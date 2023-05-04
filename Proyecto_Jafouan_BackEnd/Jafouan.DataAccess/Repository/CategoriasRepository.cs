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
    public class CategoriasRepository : IRepository<tbCategorias, VW_Categorias>
    {
        public RequestStatus Delete(tbCategorias item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@cate_Id", item.cate_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.DELETE_CATEGORIAS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_Categorias Find(int? id)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@cate_Id", id, DbType.Int32, ParameterDirection.Input);


            var result = db.QueryFirst<VW_Categorias>(ScriptsDataBase.FIND_CATEGORIAS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbCategorias item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@cate_Descripcion", item.cate_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@cate_UserCrea", item.cate_UserCrea, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.INSERT_CATEGORIAS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_Categorias> List()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query<VW_Categorias>(ScriptsDataBase.INDEX_CATEGORIAS, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbCategorias item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@cate_Id", item.cate_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@cate_Descripcion", item.cate_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@cate_UserModifica", item.cate_UserModifica, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.UPDATE_CATEGORIAS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        VW_Categorias IRepository<tbCategorias, VW_Categorias>.Find(int? id)
        {
            throw new NotImplementedException();
        }

        IEnumerable<VW_Categorias> IRepository<tbCategorias, VW_Categorias>.List()
        {
            throw new NotImplementedException();
        }
    }
}
