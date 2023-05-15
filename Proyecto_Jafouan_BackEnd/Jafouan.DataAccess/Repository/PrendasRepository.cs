using Dapper;
using Jafouan.Entities.Entities;
using Microsoft.Data.SqlClient;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jafouan.DataAccess.Repository
{
    public class PrendasRepository : IRepository<tbPrendas, VW_Prendas>
    {
        public RequestStatus Delete(tbPrendas item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@pren_Id", item.pren_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.DELETE_PRENDAS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }
        public RequestStatus Disponible(int pren_Id)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@pren_Id", pren_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.DISPONIBLE_PRENDAS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Vendida(int pren_Id)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@pren_Id", pren_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.VENDIDA_PRENDAS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }


        public VW_Prendas Find(int? id)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@pren_Id", id, DbType.Int32, ParameterDirection.Input);


            var result = db.QueryFirst<VW_Prendas>(ScriptsDataBase.FIND_PRENDAS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbPrendas item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@pren_Descripcion", item.pren_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@pren_Talla", item.pren_Talla, DbType.String, ParameterDirection.Input);
            parametros.Add("@desc_Id", item.desc_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@pren_Precio", item.pren_Precio, DbType.Decimal, ParameterDirection.Input);
            parametros.Add("@marc_Id", item.marc_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@cate_Id", item.cate_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@fard_Id", item.fard_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@pren_Imagen", item.pren_Imagen, DbType.String, ParameterDirection.Input);
            parametros.Add("@pren_UserCrea", item.pren_UserCrea, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.INSERT_PRENDAS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_Prendas> List()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query<VW_Prendas>(ScriptsDataBase.INDEX_PRENDAS, null, commandType: System.Data.CommandType.StoredProcedure);
        }        public IEnumerable<VW_Prendas> PrendasDisponibles()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query<VW_Prendas>(ScriptsDataBase.PRENDASDISPONIBLES, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbPrendas item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@pren_Id", item.pren_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@pren_Descripcion", item.pren_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@pren_Talla", item.pren_Talla, DbType.String, ParameterDirection.Input);
            parametros.Add("@desc_Id", item.desc_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@pren_Precio", item.pren_Precio, DbType.Decimal, ParameterDirection.Input);
            parametros.Add("@marc_Id", item.marc_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@cate_Id", item.cate_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@fard_Id", item.fard_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@pren_Imagen", item.pren_Imagen, DbType.String, ParameterDirection.Input);
            parametros.Add("@pren_UserModifica", item.pren_UserModificacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.UPDATE_PRENDAS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        VW_Prendas IRepository<tbPrendas, VW_Prendas>.Find(int? id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable Grafica()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query(ScriptsDataBase.Grafica, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        IEnumerable<VW_Prendas> IRepository<tbPrendas, VW_Prendas>.List()
        {
            throw new NotImplementedException();
        }
    }
}
