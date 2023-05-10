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
    public class DescuentosRepository : IRepository<tbDescuentos, VW_Descuentos>
    {
        public RequestStatus Delete(tbDescuentos item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@desc_Id", item.desc_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.DELETE_DESCUENTOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_Descuentos Find(int? id)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@desc_Id", id, DbType.Int32, ParameterDirection.Input);


            var result = db.QueryFirst<VW_Descuentos>(ScriptsDataBase.FIND_DESCUENTOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbDescuentos item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@desc_Color", item.desc_Color, DbType.String, ParameterDirection.Input);
            parametros.Add("@desc_ColorHexa", item.desc_ColorHexa, DbType.String, ParameterDirection.Input);
            parametros.Add("@desc_Descuento", item.desc_Descuento, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@desc_UserCrea", item.desc_UserCrea, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.INSERT_DESCUENTOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_Descuentos> List()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query<VW_Descuentos>(ScriptsDataBase.INDEX_DESCUENTOS, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbDescuentos item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@desc_Id", item.desc_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@desc_Color", item.desc_Color, DbType.String, ParameterDirection.Input);
            parametros.Add("@desc_ColorHexa", item.desc_ColorHexa, DbType.String, ParameterDirection.Input);
            parametros.Add("@desc_Descuento", item.desc_Descuento, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@desc_UserModifica", item.desc_UserModificacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.UPDATE_DESCUENTOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        VW_Descuentos IRepository<tbDescuentos, VW_Descuentos>.Find(int? id)
        {
            throw new NotImplementedException();
        }

        IEnumerable<VW_Descuentos> IRepository<tbDescuentos, VW_Descuentos>.List()
        {
            throw new NotImplementedException();
        }
    }
}
