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
    public class UsuariosRepository : IRepository<tbUsuarios, VW_Usuarios>
    {
        public RequestStatus Delete(tbUsuarios item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@user_Id", item.user_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_Usuarios_DELETE, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_Usuarios Find(int? id)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@user_Id", id, DbType.Int32, ParameterDirection.Input);


            var result = db.QueryFirst<VW_Usuarios>(ScriptsDataBase.UDP_Usuarios_FIND, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbUsuarios item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@user_NombreUsuario", item.user_NombreUsuario, DbType.String, ParameterDirection.Input);
            parametros.Add("@user_Contraseña", item.user_Contraseña, DbType.String, ParameterDirection.Input);
            parametros.Add("@user_Admin", item.user_Admin, DbType.Boolean, ParameterDirection.Input);
            parametros.Add("@empl_Id", item.empl_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@role_Id", item.role_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@user_UserCrea", item.user_UserCrea, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_Usuario_INSERT, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_Usuarios> List()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query<VW_Usuarios>(ScriptsDataBase.UDP_Usuario_INDEX, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbUsuarios item)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();


            parametros.Add("@user_Id", item.user_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@empl_Id", item.empl_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@user_Admin", item.user_Admin, DbType.Boolean, ParameterDirection.Input);
            parametros.Add("@role_Id", item.role_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@user_UserModifica", item.user_UserModifica, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.UDP_Usuarios_UPDATE, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_Usuarios Login(string username, string password)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@user_NombreUsuario", username, DbType.String, ParameterDirection.Input);
            parametros.Add("@user_Contraseña", password, DbType.String, ParameterDirection.Input);

            var result = db.QueryFirst<VW_Usuarios>(ScriptsDataBase.UDP_Usuarios_LOGIN, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_Pantallas> Menu(int id)
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@user_Id", id, DbType.String, ParameterDirection.Input);

            var result = db.Query<VW_Pantallas>(ScriptsDataBase.UDP_Usuarios_MENU, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }
    }
}
