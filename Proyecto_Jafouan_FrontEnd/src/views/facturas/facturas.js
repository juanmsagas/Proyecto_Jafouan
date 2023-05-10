import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { IconButton } from '@material-ui/core'
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
  const [Modal, setModal] = useState(false)

  const [visibleEnca, setvisibleEnca] = useState(false)


  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }
  const [nuevaFactura, setnuevaFactura] = useState({
    clie_Id: 0,
    empl_Id: 0,
    sucu_Id: 0,
    meto_Id: 0,
    fact_UserCrea: 1

  })



  const [ElimFacturas, setElimFacturas] = useState({
    fact_Id: 0
  })

  const [EditarFactura, setEditarFactura] = useState({
    fact_Id: 0,
    clie_Id: 0,
    empl_Id: 0,
    sucu_Id: 0,
    meto_Id: 0,
    fact_UserModifica: 1
  })

  const abrirPrenda = (params, event) => {
    if (event) {
      event.preventDefault()
    }
    setVisible2(!visible2)
    setValidated(false)
    setvisibleEnca(!visibleEnca)
    console.log(params)

    setEditarFactura({
      fact_Id: params.fact_Id,
      clie_Id: params.clie_Id,
      empl_Id: params.empl_Id,
      sucu_Id: params.sucu_Id,
      meto_Id: params.meto_Id,
      fact_UserModifica: 1,
    })
  }


  const cerrarEditar = (event) => {
    event.preventDefault()
    setVisible2(!visible2)
    setvisibleEnca(!visibleEnca)
    setEditarFactura({
      fact_Id: 0,
      clie_Id: 0,
      empl_Id: 0,
      sucu_Id: 0,
      meto_Id: 0,
      fact_UserModifica: 1
    })
  }

  const abrirycerrarInsert = (event) => {
    event.preventDefault()
    setVisible(!visible)
    setValidated(false)
    setvisibleEnca(!visibleEnca)
    setEditarFactura({
      fact_Id: 0,
      clie_Id: 0,
      empl_Id: 0,
      sucu_Id: 0,
      meto_Id: 0,
      fact_UserModifica: 1
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
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      toast.error('No se permiten campos vacíos.');

    }
    setValidated(true)
    if (form.checkValidity() != false) {
      axios.post('api/Factura/Insert', nuevaFactura, config)
        .then((response) => {
          console.log(response.data)
          setVisible(false)
          setvisibleEnca(!visibleEnca)
          setnuevaFactura({
            clie_Id: 0,
            empl_Id: 0,
            sucu_Id: 0,
            meto_Id: 0,
            fact_UserCrea: 1
          })
          toast.success('Factura insertada correctamente.');

        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  //peticion a la api Editar   
  const handleSubmitE = (event) => {
    event.preventDefault()

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      toast.error('No se permiten campos vacíos.');

    }
    setValidated(true)
    if (form.checkValidity() != false) {
      axios.put('api/Facturas/Update', EditarFactura, config)
        .then((response) => {
          console.log(response.data)
          setVisible2(!visible2)
          setvisibleEnca(!visibleEnca)
          setEditarFactura({
            fact_Id: 0,
            clie_Id: 0,
            empl_Id: 0,
            sucu_Id: 0,
            meto_Id: 0,
            fact_UserModifica: 1
          })
          toast.success('Factura editada correctamente.');

          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  //peticion a la api Eliminar   
  const handleSubmitD = (event) => {
    event.preventDefault()

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    axios.put('api/Facturas/Delete', ElimFacturas, config)
      .then((response) => {
        console.log(response.data)
        setModal(false)
        setEditarFactura({
          fact_Id: '',
        })
        toast.success('Factura eliminada correctamente.');

        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }
  const ModalFun = (params, event) => {
    if (event) {
      event.preventDefault()
    }
    setModal(!visible)
    setEditarFactura({
      fact_Id: params,

    })
  }





  //peticion a la api listado   
  useEffect(() => {
    axios.get('api/Facturas/Index').then((response) => {
      console.log('entra')
      const insertarid = response.data.map((row) => ({
        ...row,
        id: row.fact_Id,
      }))
      setFacturas(insertarid)
    })
  }, [Facturas])

  axios.get('api/MetodosPagos/Index')
    .then(response => {
      setMetodosDDL(response.data);
      console.log(response.data)

    })
    .catch(error => {
      console.error('Error fetching data from API:', error);
    });

  axios.get('api/Clientes/Index')
    .then(response => {
      setClientesDDL(response.data);
      console.log(response.data)

    })
    .catch(error => {
      console.error('Error fetching data from API:', error);
    });

  const [prendas, setPrendas] = useState([]);
  useEffect(() => {
    axios.get('api/Prendas/Index').then((response) => {
      const insertarid = response.data.map((row) => ({
        ...row,
        id: row.pren_Id,
      }));
      setPrendas(insertarid);
    });
  }, []);


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


          <CButton color="info ms-2" variant="outline">
            <VisibilityIcon />
          </CButton>

          <CButton color="warning ms-2" variant="outline" onClick={(e) => abrirPrenda(params.row)}>
            <EditIcon />
          </CButton>


          <CButton color="danger ms-2" variant="outline" onClick={() => ModalFun(params.row.fact_Id)}>
            <DeleteIcon />
          </CButton>

        </div>
      ),
    },
  ]

  const prens = [
    { field: 'pren_Id', headerName: 'Id', width: 90 },
    { field: 'pren_Descripcion', headerName: 'Prenda', width: 150 },
    { field: 'pren_Talla', headerName: 'Talla', width: 150 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 300,
      renderCell: (params) => (
        <div>

          <CButton color="danger ms-2" variant="outline" onClick={() => eliminarPrenda(params.row.pren_Id)}>
            <DeleteIcon />
          </CButton>

        </div>
      ),
    },
  ]
  const [prendaSeleccionada, setPrendaSeleccionada] = useState(null);
  const [cartasVisibles, setCartasVisibles] = useState(prendas);

  const manejarClicImagen = (prenda) => {
    setPrendaSeleccionada(prenda);
    setTabla((prevTabla) => [...prevTabla, prenda]);
    setPrendas((prevPrendas) => prevPrendas.filter((p) => p !== prenda));
  };
  
  
const eliminarPrenda = (id) => {
  setTabla((prevTabla) => prevTabla.filter((p) => p.pren_Id !== id));
  setCartasVisibles((prevCartasVisibles) => [...prevCartasVisibles, prendaSeleccionada]);
  setPrendaSeleccionada(null);
};



  return (
    <div style={{ width: '100%' }}>
      <div className='col-12'>
        <CCard className="p-5   ">
          <CCardHeader className='rounded-top mb-4' style={{ fontFamily: "revert-layer", textAlign: 'center', fontSize: 50 }}>Factura Detalle</CCardHeader>
          <CCollapse visible={!visibleEnca}>

            {/*Modal Eliminar*/}

            <CModal alignment="center" visible={Modal} onClick={() => setModal(!Modal)}>

              <CModalBody className='pt-5 pb-5' style={{ boxShadow: 5 }}>
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmitD}
                >
                  <CFormInput
                    minLength={2} maxLength={2}
                    type="hidden"
                    value={ElimFacturas.prov_Id}
                    id="validationCustom01"
                    disabled
                    required />
                  <center>
                    <CModalTitle>Esta seguro que desea Eliminar este registro?</CModalTitle>
                  </center>
                  <center>
                    <CButton color="light" className='col-5 me-3' onClick={() => setModal(!Modal)}>
                      Cancelar
                    </CButton>
                    <CButton color="danger text-light" type='submit' className='col-5'>Eliminar</CButton>
                  </center>
                </CForm>
              </CModalBody>

            </CModal>



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
          <center>
            <CCollapse visible={visible} className='col-12'>

              <CCard className="mt-6" >
                <CCardBody>
                  <CForm
                    className="row g-4 needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmitI}>
                    <div className='col-4'>

                      <CCard className="p-3 h-40 m-4">
                        <CCol md={12} className="">
                          <CFormSelect
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
                      </CCard>
                    </div>


                    <div className='col-8 h-40'>

                      <CCard className="p-3 h-40 m-4">
                        <CCol md={12} className="">


                          <DataGrid
                            rows={tabla}
                            columns={prens}
                            sortModel={sortModel}
                            onSortModelChange={handleSortModelChange}
                            components={{
                              Toolbar: GridToolbar,
                              Search: SearchIcon,
                            }}
                            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                          />

                        </CCol>
                      </CCard>
                    </div>


                    <div className='col-12'>

                      <CCard className="p-3 h-100 m-4" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                        <div className="row">
                          {prendas.map((prenda) => (
                              <div className="col-md-3 mb-4" key={prenda.id}>
                                <Card className="h-100">

                                  <CardImg

                                    src={prenda.pren_Imagen}
                                    alt={prenda.pren_Nombre}
                                    onClick={() => manejarClicImagen(prenda)}
                                    style={{ cursor: 'pointer', padding: '15px', borderRadius: '30px' }}
                                  />
                                  {prenda.desc_Descuento && (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        top: '190px',
                                        left: '15px',
                                        backgroundColor: prenda.desc_ColorHexa,
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
                                      - {prenda.desc_Descuento}%
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

                                    Precio: $ {prenda.pren_Precio}
                                  </div>


                                  <CardBody>
                                    <CardSubtitle tag="h6" className="mb-5" style={{ textAlign: "center", fontFamily: 'cursive', color: 'black' }}>
                                      {prenda.pren_Descripcion}
                                    </CardSubtitle>

                                  </CardBody>

                                </Card>
                              </div>
                            ))}
                        </div>
                      </CCard>
                    </div>










                    <CCol xs={6} className='offset-3'>
                      <CButton color="primary" type="submit">
                        Guardar
                      </CButton>
                      <CButton color="danger text-light" className='ms-2' href="#" onClick={abrirycerrarInsert}>
                        Cancelar
                      </CButton>
                    </CCol>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCollapse>
          </center>

          {/*Formulario Editar*/}
          <CCollapse visible={visible2} className='col-12 '>

            <CCard className="mt-3">
              <CCardHeader>
                <h1 className='h3 text-center'>Editar</h1>
              </CCardHeader>
              <CCardBody>
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmitE}
                >



                  <CCol xs={12} className='offset-7'>
                    <CButton color="primary" type="submit">
                      Guardar
                    </CButton>
                    <CButton color="danger text-light" className='ms-2' href="#" onClick={cerrarEditar}>
                      Cancelar
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
