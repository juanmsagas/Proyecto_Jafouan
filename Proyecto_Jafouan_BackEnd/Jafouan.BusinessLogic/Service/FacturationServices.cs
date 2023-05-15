using Jafouan.DataAccess.Repository;
using Jafouan.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jafouan.BusinessLogic.Service
{
    public class FacturationServices
    {
        private readonly FacturaDetallesRepository _facturaDetallesRepository;
        private readonly FacturasRepository _facturasRepository;
        private readonly MetodosPagosRepository _metodosPagosRepository;


        public FacturationServices
     (
          FacturaDetallesRepository facturaDetallesRepository,
          FacturasRepository facturasRepository,
          MetodosPagosRepository metodosPagosRepository


     )
        {
            _facturaDetallesRepository = facturaDetallesRepository;
            _facturasRepository = facturasRepository;
            _metodosPagosRepository = metodosPagosRepository;

        }

        #region Reporte
        public IEnumerable<VW_Reporte> Reporte()
        {
            var result = new ServiceResult();
            try
            {
                var list = _facturaDetallesRepository.Reporte();
                return list;
            }
            catch (Exception e)
            {
                _= e.Message;
                return Enumerable.Empty<VW_Reporte>();
            }
        }

        #endregion

        #region Factura Detalles


        //INDEX
        public IEnumerable<VW_FacturaDetalles> ListFacturaDetalles()
        {
            var result = new ServiceResult();
            try
            {
                var list = _facturaDetallesRepository.List();
                return list;
            }
            catch (Exception e)
            {
                return (IEnumerable<VW_FacturaDetalles>)result.Error(e.Message);
            }
        }


        //INSERT
        public ServiceResult InsertFacturaDetalles(tbFacturaDetalles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _facturaDetallesRepository.Insert(item);
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
        public IEnumerable<VW_FacturaDetalles> FindFacturaDetalles(int id)
        {
            var result = new ServiceResult();

            var list = _facturaDetallesRepository.FindDetalles(id);
            return list;
        }

        public ServiceResult UpdateFacturaDetalles(tbFacturaDetalles item)
        {
            var result = new ServiceResult();

            try
            {
                var map = _facturaDetallesRepository.Update(item);

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

        public ServiceResult DeleteFacturaDetalles(tbFacturaDetalles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _facturaDetallesRepository.Delete(item);
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

        #region Factura 


        //INDEX
        public IEnumerable<VW_Facturas> ListFactura()
        {
            var result = new ServiceResult();
            try
            {
                var list = _facturasRepository.List();
                return list;
            }
            catch (Exception e)
            {
                return (IEnumerable<VW_Facturas>)result.Error(e.Message);
            }
        }


        //INSERT
        public ServiceResult InsertFactura(tbFacturas item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _facturasRepository.Insert(item);
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
        public VW_Facturas FindFactura(int id)
        {
            var result = new ServiceResult();

            var list = _facturasRepository.Find(id);
            return list;
        }

        public ServiceResult UpdateFactura(tbFacturas item)
        {
            var result = new ServiceResult();

            try
            {
                var map = _facturasRepository.Update(item);

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

        public ServiceResult DeleteFactura(tbFacturas item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _facturasRepository.Delete(item);
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

        #region Métodos de Pago 


        //INDEX
        public IEnumerable<VW_MetodosPagos> ListMetodosPagos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _metodosPagosRepository.List();
                return list;
            }
            catch (Exception e)
            {
                return (IEnumerable<VW_MetodosPagos>)result.Error(e.Message);
            }
        }


        //INSERT
        public ServiceResult InsertMetodosPagos(tbMetodosPagos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _metodosPagosRepository.Insert(item);
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
        public VW_MetodosPagos FindMetodosPagos(int id)
        {
            var result = new ServiceResult();

            var list = _metodosPagosRepository.Find(id);
            return list;
        }

        public ServiceResult UpdateMetodosPagos(tbMetodosPagos item)
        {
            var result = new ServiceResult();

            try
            {
                var map = _metodosPagosRepository.Update(item);

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

        public ServiceResult DeleteMetodosPagos(tbMetodosPagos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _metodosPagosRepository.Delete(item);
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
