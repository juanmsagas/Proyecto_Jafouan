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
    public class FacturaDetallesRepository : IRepository<tbFacturaDetalles, VW_FacturaDetalles>
    {
        public RequestStatus Delete(tbFacturaDetalles item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@fade_Id", item.fade_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.DELETE_FACTURADETALLES, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_FacturaDetalles Find(int? id)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@fade_Id", id, DbType.Int32, ParameterDirection.Input);


            var result = db.QueryFirst<VW_FacturaDetalles>(ScriptsDataBase.FIND_FACTURADETALLES, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_FacturaDetalles> FindDetalles(int? id)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@fact_Id", id, DbType.Int32, ParameterDirection.Input);


            var result = db.Query<VW_FacturaDetalles>(ScriptsDataBase.FIND_FACTURADETALLES, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbFacturaDetalles item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@pren_Id", item.pren_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@fade_UserCrea", item.fade_UserCrea, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.INSERT_FACTURADETALLES, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_FacturaDetalles> List()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query<VW_FacturaDetalles>(ScriptsDataBase.INDEX_FACTURADETALLES, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public IEnumerable<VW_Reporte> Reporte()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query<VW_Reporte>(ScriptsDataBase.REPORTE, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbFacturaDetalles item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@fade_Id", item.fade_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@fact_Id", item.fact_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@pren_Id", item.pren_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@fade_Cantidad", item.fade_Cantidad, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@fade_Total", item.fade_Total, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@fade_UserModifica", item.fade_UserModificacion, DbType.Int32, ParameterDirection.Input);
            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.UPDATE_FACTURADETALLES, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        VW_FacturaDetalles IRepository<tbFacturaDetalles, VW_FacturaDetalles>.Find(int? id)
        {
            throw new NotImplementedException();
        }

        IEnumerable<VW_FacturaDetalles> IRepository<tbFacturaDetalles, VW_FacturaDetalles>.List()
        {
            throw new NotImplementedException();
        }
    }
}
