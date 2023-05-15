using Jafouan.DataAccess.Repository;
using Jafouan.Entities.Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jafouan.BusinessLogic.Service
{
    public class VentaRopaServices
    {
        private readonly CategoriasRepository _categoriasRepository;
        private readonly ClientesRepository _clientesRepository;
        private readonly EmpleadosRepository _empleadosRepository;
        private readonly PrendasRepository _prendasRepository;
        private readonly ProveedoresRepository _proveedoresRepository;
        private readonly SucursalesRepository _sucursalesRepository;
        private readonly FardosRepository _fardosRepository;
        private readonly DescuentosRepository _descuentosRepository;
        private readonly MarcasRepository _marcasRepository;


        public VentaRopaServices
     (
          CategoriasRepository categoriasRepository,
          ClientesRepository clientesRepository,
          EmpleadosRepository empleadosRepository,
          PrendasRepository prendasRepository,
          ProveedoresRepository proveedoresRepository,
          SucursalesRepository sucursalesRepository,
          FardosRepository fardosRepository,
          DescuentosRepository descuentosRepository,
          MarcasRepository marcasRepository

     )
        {
            _categoriasRepository = categoriasRepository;
            _clientesRepository = clientesRepository;
            _empleadosRepository = empleadosRepository;
            _prendasRepository = prendasRepository;
            _proveedoresRepository = proveedoresRepository;
            _sucursalesRepository = sucursalesRepository;
            _fardosRepository = fardosRepository;
            _descuentosRepository = descuentosRepository;
            _marcasRepository = marcasRepository;
        }

        #region Categorías


        //INDEX
        public IEnumerable<VW_Categorias> ListaCategorias()
        {
            var result = new ServiceResult();
            try
            {
                var list = _categoriasRepository.List();
                return list;
            }
            catch (Exception e)
            {
                return (IEnumerable<VW_Categorias>)result.Error(e.Message);
            }
        }


        //INSERT
        public ServiceResult InsertCategorias(tbCategorias item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _categoriasRepository.Insert(item);
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
        public VW_Categorias FindCategorias(int id)
        {
            var result = new ServiceResult();

            var list = _categoriasRepository.Find(id);
            return list;
        }

        public ServiceResult UpdateCategorias(tbCategorias item)
        {
            var result = new ServiceResult();

            try
            {
                var map = _categoriasRepository.Update(item);

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

        public ServiceResult DeleteCategorias(tbCategorias item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _categoriasRepository.Delete(item);
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

        #region Clientes


        //INDEX
        public IEnumerable<VW_Clientes> ListaClientes()
        {
            var result = new ServiceResult();
            try
            {
                var list = _clientesRepository.List();
                return list;
            }
            catch (Exception e)
            {
                return (IEnumerable<VW_Clientes>)result.Error(e.Message);
            }
        }


        //INSERT
        public ServiceResult InsertClientes(tbClientes item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _clientesRepository.Insert(item);
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
        public VW_Clientes FindClientes(int id)
        {
            var result = new ServiceResult();

            var list = _clientesRepository.Find(id);
            return list;
        }

        public ServiceResult UpdateClientes(tbClientes item)
        {
            var result = new ServiceResult();

            try
            {
                var map = _clientesRepository.Update(item);

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

        public ServiceResult DeleteClientes(tbClientes item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _clientesRepository.Delete(item);
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

        #region Empleados


        //INDEX
        public IEnumerable<VW_Empleados> ListaEmpleados()
        {
            var result = new ServiceResult();
            try
            {
                var list = _empleadosRepository.List();
                return list;
            }
            catch (Exception e)
            {
                return (IEnumerable<VW_Empleados>)result.Error(e.Message);
            }
        }
        
        public IEnumerable GraficaEmpleados()
        {
            var result = new ServiceResult();
            try
            {
                var list = _empleadosRepository.GraficaEmpleados();
                return list;
            }
            catch (Exception e)
            {
                return (IEnumerable<VW_Empleados>)result.Error(e.Message);
            }
        }


        //INSERT
        public ServiceResult InsertEmpleados(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _empleadosRepository.Insert(item);
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
        public VW_Empleados FindtEmpleados(int id)
        {
            var result = new ServiceResult();

            var list = _empleadosRepository.Find(id);
            return list;
        }

        public ServiceResult UpdatetEmpleados(tbEmpleados item)
        {
            var result = new ServiceResult();

            try
            {
                var map = _empleadosRepository.Update(item);

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

        public ServiceResult DeletetEmpleados(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _empleadosRepository.Delete(item);
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

        #region Descuentos


        //INDEX
        public IEnumerable<VW_Prendas> ListaPrendas()
        {
            var result = new ServiceResult();
            try
            {
                var list = _prendasRepository.List();
                return list;
            }
            catch (Exception e)
            {
                return (IEnumerable<VW_Prendas>)result.Error(e.Message);
            }
        }

        public IEnumerable Grafica()
        {
            var result = new ServiceResult();
            try
            {
                var list = _prendasRepository.Grafica();
                return list;
            }
            catch (Exception e)
            {
                return (IEnumerable<VW_Prendas>)result.Error(e.Message);
            }
        }

        public IEnumerable<VW_Prendas> ListaPrendasDisponibles()
        {
            var result = new ServiceResult();
            try
            {
                var list = _prendasRepository.PrendasDisponibles();
                return list;
            }
            catch (Exception e)
            {
                return (IEnumerable<VW_Prendas>)result.Error(e.Message);
            }
        }


        //INSERT
        public ServiceResult InsertPrendas(tbPrendas item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _prendasRepository.Insert(item);
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
        public VW_Prendas FindPrendas(int id)
        {
            var result = new ServiceResult();

            var list = _prendasRepository.Find(id);
            return list;
        }

        public ServiceResult UpdatePrendas(tbPrendas item)
        {
            var result = new ServiceResult();

            try
            {
                var map = _prendasRepository.Update(item);

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

        public ServiceResult DeletePrendas(tbPrendas item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _prendasRepository.Delete(item);
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
        public ServiceResult PrendasDisponibles(int pren_Id)
        {
            var result = new ServiceResult();
            try
            {
                var map = _prendasRepository.Disponible(pren_Id);
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

        public ServiceResult PrendasVendidas(int pren_Id)
        {
            var result = new ServiceResult();
            try
            {
                var map = _prendasRepository.Vendida(pren_Id);
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

        #region Proveedores


        //INDEX
        public IEnumerable<VW_Proveedores> ListaProveedores()
        {
            var result = new ServiceResult();
            try
            {
                var list = _proveedoresRepository.List();
                return list;
            }
            catch (Exception e)
            {
                return (IEnumerable<VW_Proveedores>)result.Error(e.Message);
            }
        }


        //INSERT
        public ServiceResult InsertProveedores(tbProveedores item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _proveedoresRepository.Insert(item);
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
        public VW_Proveedores FindProveedores(int id)
        {
            var result = new ServiceResult();

            var list = _proveedoresRepository.Find(id);
            return list;
        }

        public ServiceResult UpdateProveedores(tbProveedores item)
        {
            var result = new ServiceResult();

            try
            {
                var map = _proveedoresRepository.Update(item);

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

        public ServiceResult DeleteProveedores(tbProveedores item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _proveedoresRepository.Delete(item);
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

        #region Sucursales


        //INDEX
        public IEnumerable<VW_Sucursales> ListaSucursales()
        {
            var result = new ServiceResult();
            try
            {
                var list = _sucursalesRepository.List();
                return list;
            }
            catch (Exception e)
            {
                return (IEnumerable<VW_Sucursales>)result.Error(e.Message);
            }
        }


        //INSERT
        public ServiceResult InsertSucursales(tbSucursales item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _sucursalesRepository.Insert(item);
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
        public VW_Sucursales FindSucursales(int id)
        {
            var result = new ServiceResult();

            var list = _sucursalesRepository.Find(id);
            return list;
        }

        public ServiceResult UpdateSucursales(tbSucursales item)
        {
            var result = new ServiceResult();

            try
            {
                var map = _sucursalesRepository.Update(item);

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

        public ServiceResult DeleteSucursales(tbSucursales item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _sucursalesRepository.Delete(item);
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

        #region Fardos


        //INDEX
        public IEnumerable<VW_Fardos> ListaFardos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _fardosRepository.List();
                return list;
            }
            catch (Exception e)
            {
                return (IEnumerable<VW_Fardos>)result.Error(e.Message);
            }
        }


        //INSERT
        public ServiceResult InsertFardos(tbFardos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _fardosRepository.Insert(item);
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
        public VW_Fardos FindFardos(int id)
        {
            var result = new ServiceResult();

            var list = _fardosRepository.Find(id);
            return list;
        }

        public ServiceResult UpdateFardos(tbFardos item)
        {
            var result = new ServiceResult();

            try
            {
                var map = _fardosRepository.Update(item);

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

        public ServiceResult DeleteFardos(tbFardos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _fardosRepository.Delete(item);
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

        #region Descuentos


        //INDEX
        public IEnumerable<VW_Descuentos> ListaDescuentos()
        {
            var result = new ServiceResult();
            try
            {
                var list = _descuentosRepository.List();
                return list;
            }
            catch (Exception e)
            {
                return (IEnumerable<VW_Descuentos>)result.Error(e.Message);
            }
        }


        //INSERT
        public ServiceResult InsertDescuentos(tbDescuentos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _descuentosRepository.Insert(item);
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
        public VW_Descuentos FindDescuentos(int id)
        {
            var result = new ServiceResult();

            var list = _descuentosRepository.Find(id);
            return list;
        }

        public ServiceResult UpdateDescuentos(tbDescuentos item)
        {
            var result = new ServiceResult();

            try
            {
                var map = _descuentosRepository.Update(item);

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

        public ServiceResult DeleteDescuentos(tbDescuentos item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _descuentosRepository.Delete(item);
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

        #region Marcas


        //INDEX
        public IEnumerable<VW_Marcas> ListaMarcas()
        {
            var result = new ServiceResult();
            try
            {
                var list = _marcasRepository.List();
                return list;
            }
            catch (Exception e)
            {
                return (IEnumerable<VW_Marcas>)result.Error(e.Message);
            }
        }


        //INSERT
        public ServiceResult InsertMarcas(tbMarcas item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _marcasRepository.Insert(item);
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
        public VW_Marcas FindMarcas(int id)
        {
            var result = new ServiceResult();

            var list = _marcasRepository.Find(id);
            return list;
        }

        public ServiceResult UpdateMarcas(tbMarcas item)
        {
            var result = new ServiceResult();

            try
            {
                var map = _marcasRepository.Update(item);

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

        public ServiceResult DeleteMarcas(tbMarcas item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _marcasRepository.Delete(item);
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
