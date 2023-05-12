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
  const user_Crea = parseInt(sessionStorage.getItem('user_Id'));
  const empl_Id = parseInt(sessionStorage.getItem('empl_Id'));
  const sucu_Id = sessionStorage.getItem('sucu_Id');
  const [visibleEnca, setvisibleEnca] = useState(false)
  const [validated, setValidated] = useState(false)
  const [deshabilitar, setdeshabilitar] = useState(true)




  const [nuevaFactura, setnuevaFactura] = useState({
    clie_Id: 0,
    empl_Id: empl_Id,
    sucu_Id: sucu_Id,
    meto_Id: 0,
    fact_UserCrea: user_Crea

  })

  const [Disponibles, setDisponibles] = useState({
    pren_Id: 0
  })

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
            console.log(empl_Id)
            setdeshabilitar(!deshabilitar)
            setnuevaFactura({
              clie_Id: 0,
              empl_Id: empl_Id,
              sucu_Id: sucu_Id,
              meto_Id: 0,
              fact_UserCrea: user_Crea
            })
            toast.success('Datos guardados correctamente.');

            console.log(empl_Id);

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
  }, [Facturas])

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


  const [prendas, setPrendas] = useState([]);
  useEffect(() => {
    axios.get('api/Prendas/PrendasDisponibles').then((response) => {
      const insertarid = response.data.map((row) => ({
        ...row,
        id: row.pren_Id,
      }));
      setPrendas(insertarid);
    });
  }, [prendas]);

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
    { field: 'pren_Id', headerName: 'Id', width: 90 },
    { field: 'pren_Descripcion', headerName: 'Prenda', width: 150 },
    { field: 'pren_Talla', headerName: 'Talla', width: 150 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 300,
      renderCell: (params) => (
        <div>

          <CButton color="danger ms-2" variant="outline"  onClick={(e) =>{
              eliminarPrenda(params.row.pren_Id)
          }
                          }>
            <DeleteIcon />
          </CButton>

        </div>
      ),
    },
  ]
  
  const [prendaSeleccionada, setPrendaSeleccionada] = useState(null);
  const [cartasVisibles, setCartasVisibles] = useState(prendas);
  const [prendasEliminadas, setPrendasEliminadas] = useState([]);


  const manejarClicImagen = async (params) => {
 setPrendaSeleccionada(params);
    setTabla((prevTabla) => [...prevTabla, params]);
    setPrendas((prevPrendas) => prevPrendas.filter((p) => p.id !== params.id));
    console.log(params.id);
  
    axios
      .put(`api/Prendas/Vendidas?pren_Id=${params.id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });   
  };




  const eliminarPrenda = (params) => {

    
    axios.put(`api/Prendas/Disponibles?pren_Id=${params}`)
      .then((response) => {
        console.log(response.data)
        setPrendas((prevPrendas) =>
        prevPrendas.filter((prenda) => prenda.pren_Id !== params.id)
      );
      })
      .catch((error) => {
        console.log(error)
      })
  }

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
          <CCardHeader className='rounded-top mb-4' style={{ fontFamily: "revert-layer", textAlign: 'center', fontSize: 50 }}>Factura Detalle</CCardHeader>
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
          <CCollapse visible={visible} className='col-12'>

            <div className="card" >
              <CCardBody>
                <CForm
                  className="row g-4 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmitI}>
                  <div className='col-5'>

                    <CCard className="p-3 h-40 m-4">
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
                        <CCol xs={12} className='offset-5 mt-3'>
                          <CButton color="primary" type="submit" >
                            Siguiente
                          </CButton>

                        </CCol>
                      </CCollapse>
                    </CCard>
                  </div>


                  <div className='col-7 h-40'>

                    <CCard className="p-4 h-40 m-4">
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
                          <div className="col-md-3 mb-4" key={prenda?.id}>
                            <Card className="h-100">

                              <CardImg

                                src={prenda?.pren_Imagen}
                                alt={prenda?.pren_Nombre}
                                onClick={() => manejarClicImagen(prenda)}
                                style={{ cursor: 'pointer', padding: '15px', borderRadius: '30px' }}
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




                </CForm>
              </CCardBody>
            </div>
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
