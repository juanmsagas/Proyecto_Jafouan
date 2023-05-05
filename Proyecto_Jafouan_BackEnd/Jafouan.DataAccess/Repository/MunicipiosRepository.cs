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
    public class MunicipiosRepository : IRepository<tbMunicipios, VW_Municipios>
    {
        public RequestStatus Delete(tbMunicipios item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.DELETE_MUNICIPIOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }


        public VW_Municipios Find(string id)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@muni_Id", id, DbType.String, ParameterDirection.Input);


            var result = db.QueryFirst<VW_Municipios>(ScriptsDataBase.FIND_MUNICIPIOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_Municipios Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbMunicipios item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@dept_Id", item.dept_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Descripcion", item.muni_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_UserCrea", item.muni_UserCrea, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.INSERT_MUNICIPIOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<tbMunicipios> ListarMunisDeptos(tbMunicipios tbMunicipios)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@dept_Id", tbMunicipios.dept_Id, DbType.String, ParameterDirection.Input);
            return db.Query<tbMunicipios>(ScriptsDataBase.FILTRAR_MUNICIPIOS, parametros, commandType: CommandType.StoredProcedure);

        }


        public IEnumerable<VW_Municipios> List()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query<VW_Municipios>(ScriptsDataBase.INDEX_MUNICIPIOS, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbMunicipios item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@dept_Id", item.dept_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Descripcion", item.muni_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_UserModifica", item.muni_UserModifica, DbType.Int32, ParameterDirection.Input);
            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.UPDATE_MUNICIPIOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }


    }
}
