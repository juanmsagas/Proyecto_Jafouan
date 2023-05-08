using Dapper;
using Jafouan.Entities.Entities;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jafouan.DataAccess.Repository
{
    public class RolesRepository : IRepository<tbRoles, VW_Roles>
    {
        public RequestStatus Delete(tbRoles item)
        {
            throw new NotImplementedException();
        }

        public VW_Roles Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbRoles item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_Roles> List()
        {
            using var db = new SqlConnection(Jafouan_Context.ConnectionString);
            return db.Query<VW_Roles>(ScriptsDataBase.INDEX_ROLES, null, commandType: System.Data.CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbRoles item)
        {
            throw new NotImplementedException();
        }
    }
}
