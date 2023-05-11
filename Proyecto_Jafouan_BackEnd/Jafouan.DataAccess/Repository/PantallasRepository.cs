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
    public class PantallasRepository : IRepository<tbPantallas, VW_Pantallas>
    {
        public RequestStatus Delete(tbPantallas item)
        {
            throw new NotImplementedException();
        }

        public VW_Pantallas Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbPantallas item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_Pantallas> PantallasPorRol_Checked(int role_Id)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@role_Id", role_Id, DbType.String, ParameterDirection.Input);
            return db.Query<VW_Pantallas>(ScriptsDataBase.UDP_tbPantallasPorRol_Checked, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }

        public IEnumerable<VW_Pantallas> List()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query<VW_Pantallas>(ScriptsDataBase.INDEX_PANTALLAS, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus InsertP(tbPantallasPorRol item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@role_Id", item.role_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@pant_Id", item.pant_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@pantrol_UserCrea", item.pantrol_UserCrea, DbType.Int32, ParameterDirection.Input);


            return (RequestStatus)db.QueryFirst(ScriptsDataBase.INSERT_PANTALLASROL, parametros, commandType: CommandType.StoredProcedure);
        }


        public RequestStatus DeleteP(int role_Id, int pant_Id, int pantrol_UserCrea)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@role_Id", role_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@pant_Id", pant_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@pantrol_UserCrea", pantrol_UserCrea, DbType.Int32, ParameterDirection.Input);

            return (RequestStatus)db.QueryFirst(ScriptsDataBase.DELETE_PANTALLASROL, parametros, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbPantallas item)
        {
            throw new NotImplementedException();
        }
    }
}
