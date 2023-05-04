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
    public class DepartamentosRepository : IRepository<tbDepartamentos, VW_Departamentos>
    {
        public RequestStatus Delete(tbDepartamentos item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@dept_Id", item.dept_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.DELETE_DEPARTAMENTOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }


        public VW_Departamentos Find(int? id)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@dept_Id", id, DbType.Int32, ParameterDirection.Input);


            var result = db.QueryFirst<VW_Departamentos>(ScriptsDataBase.FIND_DEPARTAMENTOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbDepartamentos item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@dept_Id", item.dept_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@dept_Descripcion", item.dept_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@dept_UserCrea", item.dept_UserCrea, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.INSERT_DEPARTAMENTOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }


        public IEnumerable<VW_Departamentos> List()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query<VW_Departamentos>(ScriptsDataBase.INDEX_DEPARTAMENTOS, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbDepartamentos item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@dept_Id", item.dept_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@dept_Descripcion", item.dept_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@dept_UserModifica", item.dept_UserModifica, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.UPDATE_DEPARTAMENTOS, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }


    }
}
