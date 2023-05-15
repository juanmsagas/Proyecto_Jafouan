import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { Collapse, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import SearchIcon from '@material-ui/icons/Search'
import { toast, ToastContainer } from 'react-toastify';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@material-ui/icons/Add'
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap'

import {
  CButton,
  CCollapse,
  CCard,
  CCardBody,
  CForm,
  CFormLabel,
  CCol,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CFormCheck,
  CFormFeedback,
  CCardHeader,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormGroup,
  CFormRadio,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CCardTitle,
}
  from '@coreui/react'
import { CardHeader } from 'reactstrap'

function Facturas() {
  const [Facturas, setFacturas] = useState([])
  const [sortModel, setSortModel] = useState([{ field: 'fact_Id', sort: 'asc' }])
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)


  const [Metodo, setMetodosDDL] = useState([]);
  const [Clientes, setClientesDDL] = useState([]);
  const [tabla, setTabla] = useState([]);

  const [tablaDetalles, setTablaDetalles] = useState([]);


  const user_Crea = parseInt(sessionStorage.getItem('user_Id'));
  const empl_Id = parseInt(sessionStorage.getItem('empl_Id'));
  const sucu_Id = sessionStorage.getItem('sucu_Id');

  const [visibleEnca, setvisibleEnca] = useState(false)
  const [validated, setValidated] = useState(false)
  const [deshabilitar, setdeshabilitar] = useState(true)
  const [detalles, setdetalles] = useState(false)
  const [Total, setTotal] = useState(0)
  const [SubTotal, setSubTotal] = useState(0)
  

  
if (user_Crea==null ||  isNaN(user_Crea)) {
  window.location.href = '/';
}

const arregloJSONGET = sessionStorage.getItem("miArreglo");
const miArreglo = JSON.parse(arregloJSONGET);

const existeUsuarios = miArreglo.some(objeto => objeto.name === "Facturas");

if (existeUsuarios) {
  
} else {
  window.location.href = '/#/Home';
}


  const[detallesInfo, setdetallesInfo] = useState({
    clie_Nombre:"",
    empl_Nombre:"",
    fact_Fecha:"",
    sucu_Nombre:"",
    meto_Descripcion:"",
    empl_crea:"",
    fact_FechaCreacion:"",
    fact_UserModificacion:"",
    empl_Modifica:"",
    fact_FechaModificacion:""
  })

  const [nuevaFactura, setnuevaFactura] = useState({
    clie_Id: 0,
    empl_Id: empl_Id,
    sucu_Id: sucu_Id,
    meto_Id: 0,
    fact_UserCrea: user_Crea
  })




  const abrirDetallesInfo = (params, event) => {
    if (event) {
      event.preventDefault()
    }
    setVisible2(!visible2)
    setValidated(false)
    setvisibleEnca(!visibleEnca)
    console.log(params)
    const fecha = new Date(params.fact_Fecha);
    const fechaFormateada = fecha.toISOString().slice(0, 10);
    const fecha2 = new Date(params.fact_FechaCreacion);
    const fechaFormateada2 = fecha2.toISOString().slice(0, 10);
    const fecha3 = new Date(params.fact_FechaModificacion);
    const fechaFormateada3 = fecha3.toISOString().slice(0, 10);


    axios.get(`api/FacturaDetalles/Find?id=${params.fact_Id}`)
    .then((response) => {
      console.log(response.data)
      setTablaDetalles(response.data);

    })
    .catch((error) => {
      console.log(error)
    })

    setdetallesInfo({
    clie_Nombre:            params.clie_Nombre ,
    empl_Nombre:            params.empl_Nombre ,
    fact_Fecha:             fechaFormateada ,
    sucu_Nombre:            params.sucu_Nombre ,
    meto_Descripcion:       params.meto_Descripcion ,
    empl_crea:              params.empl_crea ,
    fact_FechaCreacion:     fechaFormateada2 ,
    empl_Modifica:          params.empl_Modifica ,
    fact_FechaModificacion: fechaFormateada3
    })
  }

  
  const cerrarDetallesInfo = (event) => {
    event.preventDefault()
    setVisible2(!visible2)
    setvisibleEnca(!visibleEnca)
    setdetallesInfo({
      clie_Nombre:"",
      empl_Nombre:"",
      fact_Fecha:"",
      sucu_Nombre:"",
      meto_Descripcion:"",
      empl_crea:"",
      fact_FechaCreacion:"",
      fact_UserModificacion:"",
      empl_Modifica:"",
      fact_FechaModificacion:""
    })
  }


  const abrirycerrarInsert = (event) => {
    event.preventDefault()
    setVisible(!visible)
    setValidated(false)
    setvisibleEnca(!visibleEnca)
    setnuevaFactura({
      clie_Id: 0,
      empl_Id: empl_Id,
      sucu_Id: sucu_Id,
      meto_Id: 0,
      user_Crea: user_Crea
    })

  }

  //peticion a la api insert   
  const handleSubmitI = (event) => {
    event.preventDefault()

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    setValidated(true)

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    if (nuevaFactura.meto_Id === 0) {
      toast.error('Debe de seleccionar un método de pago.');

    }
    if (nuevaFactura.clie_Id === 0) {
      toast.error('Debe de seleccionar un cliente.');

    }
    else {
      if (form.checkValidity() != false) {
        axios.post('api/Facturas/Insert', nuevaFactura, config)
          .then((response) => {
            setdeshabilitar(!deshabilitar)
            setdetalles(!detalles)
            console.log(response.data)


            axios.get('api/Facturas/Index').then((response) => {
              const insertarid = response.data.map((row) => ({
                ...row,
                id: row.fact_Id,
              }))
              setFacturas(insertarid)
            })
        

            toast.success('Datos guardados correctamente.');


          })
          .catch((error) => {
            console.log(error)
          })
      }
    }

  }

  useEffect(() => {
    axios.get('api/Facturas/Index').then((response) => {
      const insertarid = response.data.map((row) => ({
        ...row,
        id: row.fact_Id,
      }))
      setFacturas(insertarid)
    })

    axios.get('api/Prendas/PrendasDisponibles').then((response) => {
      const insertarid = response.data.map((row) => ({
        ...row,
        id: row.pren_Id,
      }));
      setPrendas(insertarid);
    });

    axios.get('api/MetodosPagos/Index')
    .then(response => {
      setMetodosDDL(response.data);

    })
    .catch(error => {
      console.error('Error fetching data from API:', error);
    });

  axios.get('api/Clientes/Index')
    .then(response => {
      setClientesDDL(response.data);

    })
    .catch(error => {
      console.error('Error fetching data from API:', error);
    });

  }, [])

 


  const [prendas, setPrendas] = useState([]);

  const enviarDatos = async () => {
    for (const prenda of tabla) {
      const { pren_Id } = prenda;
  
        axios.post(`api/FacturaDetalles/Insert?pren_Id=${pren_Id}&fade_UserCrea=${user_Crea}`)
        .then(response => {
          if (response.status==200) {
            axios.get('api/Prendas/PrendasDisponibles').then((response) => {
              const insertarid = response.data.map((row) => ({
                ...row,
                id: row.pren_Id,
              }));
              setPrendas(insertarid);
            });        
          }
          else{
            toast.error('Ha ocurrido un Error Inesperado, Intente más tarde')
          }
        })
        .catch(error => {
          console.error('Error fetching data from API:', error);
        });
    }
    setTabla([]);
    setvisibleEnca(!visibleEnca);
    setdeshabilitar(!deshabilitar);
    setVisible(!visible);
    setnuevaFactura({
    clie_Id: 0,
    empl_Id: empl_Id,
    sucu_Id: sucu_Id,
    meto_Id: 0,
    fact_UserCrea: user_Crea
    });
    setSubTotal(0);
    setTotal(0);
    setdetalles(!detalles);
    toast.success('Compra Finalizada con Éxito');
  };
  


  


  const handleSortModelChange = (model) => {
    setSortModel(model)
  }

  const columns = [
    { field: 'fact_Id', headerName: 'ID', width: 90 },
    { field: 'clie_Nombre', headerName: 'Cliente', width: 150 },
    { field: 'empl_Nombre', headerName: 'Empleado', width: 150 },
    { field: 'fact_Fecha', headerName: 'Fecha', width: 150 },
    { field: 'sucu_Nombre', headerName: 'Sucursal', width: 150 },
    { field: 'meto_Descripcion', headerName: 'Método de Pago', width: 150 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 300,
      renderCell: (params) => (
        <div>


          
          <CButton color="info ms-2" variant="outline" onClick={() => abrirDetallesInfo(params.row)}>
            <VisibilityIcon />
          </CButton>


          <CButton color="warning ms-2" variant="outline" onClick={(e) => (params.row)}>
            <EditIcon />
          </CButton>


          <CButton color="danger ms-2" variant="outline" onClick={() => (params.row.fact_Id)}>
            <DeleteIcon />
          </CButton>

        </div>
      ),
    },
  ]

  const prens = [
    { field: 'pren_Precio', headerName: 'Precio', width: 70 },
    { field: 'pren_Descripcion', headerName: 'Prenda', width: 150 },
    { field: 'pren_Talla', headerName: 'Talla', width: 50},
    {
      renderCell: (params) => (
        <div>
          <img className='img-fluid'  src={params.row.pren_Imagen}></img>        
        </div>
      ),
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 90,
      renderCell: (params) => (
        <div>
          <CButton color="danger ms-2" variant="outline"  onClick={(e) =>{
              eliminarPrenda(params.row)
          }
                          }>
            <DeleteIcon />
          </CButton>

        </div>
      ),
    },
  ]

  const datos_Detalle = [
    { field: 'fade_Total', headerName: 'Precio', flex: 1 },
    { field: 'pren_Descripcion', headerName: 'Prenda', flex: 1 },
    { field: 'pren_Talla', headerName: 'Talla', flex: 1 },
    {
      
      renderCell: (params) => (
        <div>
          <img className='img-fluid'  src={params.row.pren_Imagen}></img>        
        </div>
      ),
    },
  ]
  
  const manejarClicImagen = async (params) => {
    setTabla((prevTabla) => [...prevTabla, params]);
    setPrendas((prevPrendas) => prevPrendas.filter((p) => p.id !== params.id));

  };

  useEffect(() => {
    const totalidad = tabla.reduce((total, prenda) => {
      const descuento = prenda.desc_Descuento || 0;
      const precioConDescuento = prenda.pren_Precio * (1 - descuento / 100);
      return total + precioConDescuento;
    }, 0);
    const sumaTotal = tabla.reduce((total, prenda) => total + prenda.pren_Precio, 0);
    setSubTotal(sumaTotal);
    setTotal(totalidad)

  }, [tabla]);
  

const eliminarPrenda = (params) => {
  setTabla((prevTabla) => prevTabla.filter((prenda) => prenda.pren_Id !== params.pren_Id));
  setPrendas((prevPrendas) => [...prevPrendas, { ...params }]);
};

  

  
  /*
      const eliminarPrenda = async (pren_Id) => {
      try {
        const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
        axios.put('api/Prendas/Vendidas', Disponibles, config)
        .then((response) => {
            console.log(response.data)
            setModal(false)
            setDisponibles({
              pren_Id: 0,
          })
          console.log(pren_Id)
        })
  
        // Actualizar el estado local eliminando la prenda
        setPrendas((prevPrendas) =>
          prevPrendas.map((prenda) => {
            if (prenda.pren_Id === pren_Id) {
              return { ...prenda, eliminado: true };
            }
            return prenda;
          })
        );
  
  
      } catch (error) {
        console.error('Error al eliminar la prenda:', error);
      }
    };
  */

  return (
    <div style={{ width: '100%' }}>
      <div className='col-12'>
        <CCard className="p-5   ">
          <CCardHeader className='rounded-top mb-4' style={{ fontFamily: "revert-layer", textAlign: 'center', fontSize: 50 }}>Facturación</CCardHeader>
          <CCollapse visible={!visibleEnca}>


            <div className='col-2  mb-4'>
              <div className="d-grid gap-1">

                <CButton color="primary" variant="outline" href="#"
                  onClick={abrirycerrarInsert} className="ml-auto">
                  <AddIcon className="nav-icon ms-2 mb-1" />
                  Nuevo
                </CButton>
              </div>
            </div>
          </CCollapse>

          {/*Formulario Insertar*/}
          <CCollapse visible={visible} className='col-12' >
            
            <div className="card" >
              
              <CCardBody>
                <CForm
                  className="row  needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmitI}>
                  <div className='col-5'>

                    <CCard className="p-3 pr-5 h-40 m-4">
                    <CardHeader className='mb-5'>
                    <CardTitle>Datos de Facturación</CardTitle>
                    </CardHeader>
                      <CCol md={12} className="">
                        <CFormSelect
                          disabled={!deshabilitar}
                          value={nuevaFactura.clie_Id}
                          onChange={(e) =>
                            setnuevaFactura({ ...nuevaFactura, clie_Id: e.target.value })
                          }
                          id="validationCustom01"
                          label="Cliente"
                          required>
                          <option value="">Seleccione un Cliente</option>
                          {Clientes.map((opcion) => (
                            <option key={opcion.clie_Id} value={opcion.clie_Id}>
                              {opcion.nombreCliente}
                            </option>
                          ))}
                        </CFormSelect>

                      </CCol>
                      <br></br>

                      <CCol md={12} className="">
                        <CFormSelect
                          disabled={!deshabilitar}
                          value={nuevaFactura.meto_Id}
                          onChange={(e) =>
                            setnuevaFactura({ ...nuevaFactura, meto_Id: e.target.value })
                          }
                          id="validationCustom01"
                          label="Método de Pago"
                          required>
                          <option value="">Seleccione un Método de Pago</option>
                          {Metodo.map((opcion) => (
                            <option key={opcion.meto_Id} value={opcion.meto_Id}>
                              {opcion.meto_Descripcion}
                            </option>
                          ))}
                        </CFormSelect>

                      </CCol>
                      <CCollapse visible={deshabilitar}>
                        <CCol xs={12} className='offset-3 mt-3'>
                          <CButton color="primary" type="submit" >
                            Siguiente
                          </CButton>
                          <CButton color="danger ms-2 text-light" onClick={abrirycerrarInsert}>
                            Cancelar
                          </CButton>
                        </CCol>
                      </CCollapse>
                      <CCollapse visible={!deshabilitar}>
                        <CCol xs={12} className='offset-4 mt-3'>
                          <CButton color="primary"  onClick={enviarDatos}>
                            Terminar Compra
                          </CButton>

                        </CCol>
                      </CCollapse>
                    </CCard>

                <CCollapse visible={detalles} >
                    <CCard className="p-3  h-40 m-4">
                 <div className='row'>
                 <CCol md={6} className=''>
                    <CFormInput
                    type="text"
                    label="Subtotal"
                    value={'$'+' '+SubTotal }
                    id="validationCustom01"
                    disabled
                    />
                        </CCol>

                    <CCol md={6} className=''>

                     <CFormInput
                    type="text"
                    label="Total Con Descuento"
                    value={'$'+' '+Total}
                    id="validationCustom01"
                    disabled
                    />
                        </CCol>
                    </div>
                    </CCard>
                </CCollapse>
                  </div>

    {/*Tabla con las prendas*/}
    <CCollapse
  visible={detalles}
  className='col-7 h-70'>
                  <div >
  <CCard className="p-4  h-40 m-4"  >
    <CCol md={12} className="">
      <div style={{ height: '426px', overflow: 'auto' }}>
        <DataGrid
          rows={tabla.map((row, index) => ({ ...row, id: index }))}
          columns={prens}
          sortModel={sortModel}
          onSortModelChange={handleSortModelChange}
          components={{
            Toolbar: GridToolbar,
            Search: SearchIcon,
          }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          getRowId={(row) => row.id}
          getRowHeight={(params) => 100}
        />
      </div>
    </CCol>
  </CCard>
</div>
</CCollapse>

    {/*Cards con las prendas*/}
    <CCollapse visible={detalles} className='col-12'>
                  <div className='col-12'>
                    <CCard className="p-3 h-100 m-4" style={{ maxHeight: '600px', overflowY: 'auto'}}>
                      <div className="row">
                        {prendas.map((prenda) => (
                          <div className="col-md-3 mb-4" key={prenda?.id}>
                            <Card className="h-100">

                              <CardImg

                                src={prenda?.pren_Imagen}
                                alt={prenda?.pren_Nombre}
                                onClick={() => manejarClicImagen(prenda)}
                                style={{ cursor: 'pointer', padding: '15px', borderRadius: '30px' }}
                                title="Agregar"
                              />
                              {prenda?.desc_Descuento && (
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: '190px',
                                    left: '15px',
                                    backgroundColor: prenda?.desc_ColorHexa,
                                    color: 'white',
                                    padding: '5px',
                                    borderTopRightRadius: '15px',
                                    borderBottomRightRadius: '15px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                  }}
                                >
                                  - {prenda?.desc_Descuento}%
                                </div>
                              )}

                              <div
                                className='mt-5'
                                style={{
                                  position: 'absolute',
                                  top: '320px',
                                  right: '20px',
                                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                  color: 'black ',
                                  padding: '5px',
                                  borderTopRightRadius: '15px',
                                  borderBottomRightRadius: '15px',
                                  borderTopLeftRadius: '15px',
                                  borderBottomLeftRadius: '15px',
                                  fontSize: '14px',
                                  fontWeight: 'bold',
                                  textTransform: 'uppercase',
                                  width: '80%',
                                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',

                                }}
                              >

                                Precio: $ {prenda?.pren_Precio}
                              </div>


                              <CardBody>
                                <CardSubtitle tag="h6" className="mb-5" style={{ textAlign: "center", fontFamily: 'cursive', color: 'black' }}>
                                  {prenda?.pren_Descripcion}
                                </CardSubtitle>

                              </CardBody>

                            </Card>
                          </div>
                        ))}
                      </div>
                    </CCard>
                  </div>
</CCollapse>



                </CForm>
              </CCardBody>
            </div>
          </CCollapse>


          <CCollapse visible={visible2} className='col-12 '>

<CCard className="mt-3">
  <CCardHeader>
    <h1 className='h3 text-center'>Detalles</h1>
  </CCardHeader>
  <CCardBody>
    <CForm
      className="row g-3 needs-validation"
    >



      <CCol md={6} className=''>

        <CFormInput
          type="disabled"
          value={detallesInfo.clie_Nombre}
          id="validationCustom01"
          label="Cliente"
          disabled
          required />

      </CCol>



      <CCol md={6} className=''>

        <CFormInput
          type="disabled"
          value={detallesInfo.fact_Fecha}
          id="validationCustom01"
          label="Empleado"
          disabled
          required />

      </CCol>



      <CCol md={4} className="">
        <CFormInput
          type="disabled"
          value={detallesInfo.fact_Fecha}
          id="validationCustom01"
          label="Fecha de Facturación"
          disabled
          required />

      </CCol>

      <CCol md={4} className="">
        <CFormInput
          type="disabled"
          value={detallesInfo.meto_Descripcion}
          id="validationCustom01"
          disabled
          label="Metodo de pago"
          required />

      </CCol>



      <CCol md={4} className="">
        <CFormInput
          type="disabled"
          value={detallesInfo.sucu_Nombre}
          id="validationCustom01"
          disabled
          label="Sucursal"
          required />

      </CCol>


    

      <table className='table'>
        <thead>
          <tr>
            <th>Accion</th>
            <th>Usuario</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Creación</td>
            <td>{detallesInfo.empl_crea}</td>
            <td>{detallesInfo.fact_FechaCreacion}</td>
          </tr>
          <tr>
            <td>Modificación</td>
            <td>{detallesInfo.empl_Modifica}</td>
            <td>{detallesInfo.fact_FechaModificacion}</td>
          </tr>
        </tbody>
      </table>
  <CCard className="p-2"  >
    <CCardHeader>
      <CCardTitle>Prendas Compradas</CCardTitle>
    </CCardHeader>
    <CCol md={12} className="">
      <div style={{ height: '300px', overflow: 'auto' }}>
      <DataGrid
          rows={tablaDetalles.map((row, index) => ({ ...row, id: index }))}
          columns={datos_Detalle}
          sortModel={sortModel}
          onSortModelChange={handleSortModelChange}
          components={{
            Toolbar: GridToolbar,
            Search: SearchIcon,
          }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          getRowId={(row) => row.id}
          getRowHeight={(params) => 100}
        />
</div>
</CCol>
</CCard>


      <CCol xs={12} className='offset-5'>
        <CButton color="danger text-light" className='ms-2' href="#" onClick={cerrarDetallesInfo}>
          Cerrar
        </CButton>
      </CCol>
    </CForm>
  </CCardBody>
</CCard>
</CCollapse>
          <CCollapse visible={!visibleEnca}>
            <CCard className="mt-3 p-1">

              <DataGrid
                rows={Facturas}
                columns={columns}
                sortModel={sortModel}
                onSortModelChange={handleSortModelChange}
                components={{
                  Toolbar: GridToolbar,
                  Search: SearchIcon,
                }}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              />
            </CCard>
          </CCollapse>
        </CCard>
      </div>
      <ToastContainer />

    </div>
  )
}

export default Facturas
