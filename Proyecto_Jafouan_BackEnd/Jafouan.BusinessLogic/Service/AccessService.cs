using Jafouan.DataAccess.Repository;
using Jafouan.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jafouan.BusinessLogic.Service
{
    public class AccessService
    {
        private readonly UsuariosRepository _usuarioRepository;
        private readonly RolesRepository    _rolesRepository;


        public AccessService
        (
            UsuariosRepository usuarioRepository,
            RolesRepository rolesRepository


        )
        {
            _usuarioRepository  = usuarioRepository;
            _rolesRepository = rolesRepository;

        }

        #region LOGIN
        public VW_Usuarios Login(string username, string password)
        {
            var result = new ServiceResult();

            var list = _usuarioRepository.Login(username, password);
            return list;
        }
        #endregion

        #region Usuarios

        //INDEX
        public IEnumerable<VW_Usuarios> ListUsuarios()
        {
            var result = new ServiceResult();
            try
            {
                var list = _usuarioRepository.List();
                return list;
            }
            catch (Exception e)
            {
                return (IEnumerable<VW_Usuarios>)result.Error(e.Message);
            }
        }


        //INSERT
        public ServiceResult InsertUsuario(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _usuarioRepository.Insert(item);
                if (map.CodeStatus == 200)
                {
                    return result.SetMessage(map.MessageStatus, ServiceResultType.Success);

                }
                else if (map.CodeStatus == 409)
                {
                    return result.SetMessage(map.MessageStatus, ServiceResultType.Conflict);
                }
                else
                {
                    return result.SetMessage(map.MessageStatus, ServiceResultType.Error);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        //FIND
        public VW_Usuarios FindUsuario(int id)
        {
            var result = new ServiceResult();

            var list = _usuarioRepository.Find(id);
            return list;
        }

        public ServiceResult UpdateUsuario(tbUsuarios item)
        {
            var result = new ServiceResult();

            try
            {
                var map = _usuarioRepository.Update(item);

                if (map.CodeStatus == 200)
                {
                    return result.SetMessage(map.MessageStatus, ServiceResultType.Success);

                }
                else if (map.CodeStatus == 409)
                {
                    return result.SetMessage(map.MessageStatus, ServiceResultType.Conflict);
                }
                else
                {
                    return result.SetMessage(map.MessageStatus, ServiceResultType.Error);
                }

            }
            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }

        public ServiceResult DeleteUsuario(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _usuarioRepository.Delete(item);
                if (map.CodeStatus == 200)
                {
                    return result.SetMessage(map.MessageStatus, ServiceResultType.Success);

                }
                else if (map.CodeStatus == 409)
                {
                    return result.SetMessage(map.MessageStatus, ServiceResultType.Conflict);
                }
                else
                {
                    return result.SetMessage(map.MessageStatus, ServiceResultType.Error);
                }
            }
            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }

        }
        #endregion



        #region Roles

        //INDEX
        public IEnumerable<VW_Roles> ListRoles()
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolesRepository.List();
                return list;
            }
            catch (Exception e)
            {
                return (IEnumerable<VW_Roles>)result.Error(e.Message);
            }
        }


        //INSERT
        public ServiceResult InsertUsuario(tbRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _rolesRepository.Insert(item);
                if (map.CodeStatus == 200)
                {
                    return result.SetMessage(map.MessageStatus, ServiceResultType.Success);

                }
                else if (map.CodeStatus == 409)
                {
                    return result.SetMessage(map.MessageStatus, ServiceResultType.Conflict);
                }
                else
                {
                    return result.SetMessage(map.MessageStatus, ServiceResultType.Error);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        //FIND
        public VW_Roles FindRol(int id)
        {
            var result = new ServiceResult();

            var list = _rolesRepository.Find(id);
            return list;
        }

        public ServiceResult UpdateUsuario(tbRoles item)
        {
            var result = new ServiceResult();

            try
            {
                var map = _rolesRepository.Update(item);

                if (map.CodeStatus == 200)
                {
                    return result.SetMessage(map.MessageStatus, ServiceResultType.Success);

                }
                else if (map.CodeStatus == 409)
                {
                    return result.SetMessage(map.MessageStatus, ServiceResultType.Conflict);
                }
                else
                {
                    return result.SetMessage(map.MessageStatus, ServiceResultType.Error);
                }

            }
            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }

        public ServiceResult DeleteUsuario(tbRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _rolesRepository.Delete(item);
                if (map.CodeStatus == 200)
                {
                    return result.SetMessage(map.MessageStatus, ServiceResultType.Success);

                }
                else if (map.CodeStatus == 409)
                {
                    return result.SetMessage(map.MessageStatus, ServiceResultType.Conflict);
                }
                else
                {
                    return result.SetMessage(map.MessageStatus, ServiceResultType.Error);
                }
            }
            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }

        }
        #endregion

    }
}
