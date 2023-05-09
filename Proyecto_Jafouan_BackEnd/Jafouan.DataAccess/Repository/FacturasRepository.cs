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
    public class FacturasRepository : IRepository<tbFacturas, VW_Facturas>
    {
        public RequestStatus Delete(tbFacturas item)
        {
            throw new NotImplementedException();
        }

        public VW_Facturas Find(int? id)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@fact_Id", id, DbType.Int32, ParameterDirection.Input);


            var result = db.QueryFirst<VW_Facturas>(ScriptsDataBase.FIND_FACTURAS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbFacturas item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@clie_Id", item.clie_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@empl_Id", item.empl_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@sucu_Id", item.sucu_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@meto_Id", item.meto_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@fact_UserCrea", item.fact_UserCrea, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.INSERT_FACTURAS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_Facturas> List()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query<VW_Facturas>(ScriptsDataBase.INDEX_FACTURAS, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbFacturas item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@fact_Id", item.fact_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@clie_Id", item.clie_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@empl_Id", item.empl_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@sucu_Id", item.sucu_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@meto_Id", item.meto_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@fact_UserModifica", item.fact_UserModificacion, DbType.Int32, ParameterDirection.Input);
            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.UPDATE_FACTURAS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        VW_Facturas IRepository<tbFacturas, VW_Facturas>.Find(int? id)
        {
            throw new NotImplementedException();
        }

        IEnumerable<VW_Facturas> IRepository<tbFacturas, VW_Facturas>.List()
        {
            throw new NotImplementedException();
        }
    }
}
