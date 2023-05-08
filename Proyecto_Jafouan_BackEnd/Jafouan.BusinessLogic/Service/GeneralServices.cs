using Jafouan.DataAccess.Repository;
using Jafouan.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jafouan.BusinessLogic.Service
{
    public class GeneralServices
    {
        private readonly CargosRepository _cargosRepository;
        private readonly DepartamentosRepository _departamentosRepository;
        private readonly MunicipiosRepository _municipiosRepository;
        private readonly EstadosCivilesRepository _estadosCivilesRepository;


           public GeneralServices
        (
            CargosRepository cargosRepository,
            DepartamentosRepository departamentosRepository,
            MunicipiosRepository municipiosRepository,
            EstadosCivilesRepository estadosCivilesRepository

        )
        {
            _cargosRepository = cargosRepository;
            _departamentosRepository = departamentosRepository;
            _municipiosRepository = municipiosRepository;
            _estadosCivilesRepository = estadosCivilesRepository;

        }

        #region Cargos


        //INDEX
        public IEnumerable<VW_Cargos> ListCargos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _cargosRepository.List();
                return list;
            }
            catch (Exception e)
            {
                return (IEnumerable<VW_Cargos>)result.Error(e.Message);
            }
        }


        //INSERT
        public ServiceResult InsertCargo(tbCargos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _cargosRepository.Insert(item);
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
        public VW_Cargos FindCargo(int id)
        {
            var result = new ServiceResult();

            var list = _cargosRepository.Find(id);
            return list;
        }

        public ServiceResult UpdateCargo(tbCargos item)
        {
            var result = new ServiceResult();

            try
            {
                var map = _cargosRepository.Update(item);

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

        public ServiceResult DeleteCargo(tbCargos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _cargosRepository.Delete(item);
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

        #region Departamentos


        //INDEX
        public IEnumerable<VW_Departamentos> ListDepartamentos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _departamentosRepository.List();
                return list;
            }
            catch (Exception e)
            {
                return (IEnumerable<VW_Departamentos>)result.Error(e.Message);
            }
        }


        //INSERT
        public ServiceResult InsertDepartamentos(tbDepartamentos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _departamentosRepository.Insert(item);
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
        public VW_Departamentos FindDepartamentos(int id)
        {
            var result = new ServiceResult();

            var list = _departamentosRepository.Find(id);
            return list;
        }

        public ServiceResult UpdateDepartamentos(tbDepartamentos item)
        {
            var result = new ServiceResult();

            try
            {
                var map = _departamentosRepository.Update(item);

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

        public ServiceResult DeleteDepartamentos(tbDepartamentos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _departamentosRepository.Delete(item);
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

        #region Estados Civiles


        //INDEX
        public IEnumerable<VW_EstadosCiviles> ListEstadosCiviles()
        {
            var result = new ServiceResult();
            try
            {
                var list = _estadosCivilesRepository.List();
                return list;
            }
            catch (Exception e)
            {
                return (IEnumerable<VW_EstadosCiviles>)result.Error(e.Message);
            }
        }


        //INSERT
        public ServiceResult InsertEstadosCiviles(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _estadosCivilesRepository.Insert(item);
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
        public VW_EstadosCiviles FindEstadosCiviles(int id)
        {
            var result = new ServiceResult();

            var list = _estadosCivilesRepository.Find(id);
            return list;
        }

        public ServiceResult UpdateEstadosCiviles(tbEstadosCiviles item)
        {
            var result = new ServiceResult();

            try
            {
                var map = _estadosCivilesRepository.Update(item);

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

        public ServiceResult DeleteEstadosCiviles(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _estadosCivilesRepository.Delete(item);
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

        #region Municipios


        //INDEX
        public IEnumerable<VW_Municipios> ListMunicipios()
        {
            var result = new ServiceResult();
            try
            {
                var list = _municipiosRepository.List();
                return list;
            }
            catch (Exception e)
            {
                return (IEnumerable<VW_Municipios>)result.Error(e.Message);
            }
        }
        public IEnumerable<tbMunicipios> ListarMunicipiosPorDepto(tbMunicipios item)
        {
            try
            {
                var list = _municipiosRepository.ListarMunisDeptos(item);
                return list;
            }
            catch (Exception ex)
            {
                _ = ex.Message;
                return Enumerable.Empty<tbMunicipios>();
            }
        }



        //INSERT
        public ServiceResult InsertMunicipios(tbMunicipios item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _municipiosRepository.Insert(item);
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
        public VW_Municipios FindMunicipios(string id)
        {
            var result = new ServiceResult();

            var list = _municipiosRepository.Find(id);
            return list;
        }

        public ServiceResult UpdateMunicipios(tbMunicipios item)
        {
            var result = new ServiceResult();

            try
            {
                var map = _municipiosRepository.Update(item);

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

        public ServiceResult DeleteMunicipios(tbMunicipios item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _municipiosRepository.Delete(item);
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
