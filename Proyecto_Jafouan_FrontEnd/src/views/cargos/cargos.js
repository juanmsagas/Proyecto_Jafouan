import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'
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
  CModalFooter,
}
  from '@coreui/react'

function Cargos() {
  const [cargos, setCargos] = useState([])
  const [sortModel, setSortModel] = useState([{ field: 'carg_Id', sort: 'asc' }])
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [Modal, setModal] = useState(false)
  const [visibleEnca, setvisibleEnca] = useState(false)
  const user_Crea = parseInt(sessionStorage.getItem('user_Id'));
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }


if (user_Crea==null ||  isNaN(user_Crea)) {
  window.location.href = '/';
}

const arregloJSONGET = sessionStorage.getItem("miArreglo");
const miArreglo = JSON.parse(arregloJSONGET);

const existeUsuarios = miArreglo.some(objeto => objeto.name === "Cargos");

if (existeUsuarios) {
  
} else {
  window.location.href = '/#/Home';
}

  const [nuevoCargo, setNuevaCargo] = useState({
    carg_Descripcion: '',
    carg_UserCrea: user_Crea
  })
  const [ElimCargo, setEliminarCargo] = useState({
    carg_Id: 0
  })
  const [EditarCargo, setEditarCargo] = useState({
    carg_Id: '',
    carg_Descripcion: '',
    carg_UserModifica: user_Crea
  })

  const abrireditar = (params, event) => {
    if (event) {
      event.preventDefault()
    }
    setVisible2(!visible2)
    setvisibleEnca(!visibleEnca)
    setValidated(false)
    console.log(params)
    setEditarCargo({
      carg_Id: params.carg_Id,
      carg_Descripcion: params.carg_Descripcion,
      carg_UserModifica: user_Crea
    }
    )
  }

  const cerrarEditar = (event) => {
    event.preventDefault()
    setVisible2(!visible2)
    setvisibleEnca(!visibleEnca)
    setEditarCargo({
      carg_Id: '',
      carg_Descripcion: '',
      carg_UserModifica: user_Crea
    }
    )
  }

  const abrirycerrarInsert = (event) => {
    event.preventDefault()
    setVisible(!visible)
    setvisibleEnca(!visibleEnca)
    setValidated(false)
    setNuevaCargo({
      carg_Descripcion: '',
      carg_UserCrea: user_Crea
    }
    )
  }


  const ModalFun = (params, event) => {
    if (event) {
      event.preventDefault()
    }
    setModal(!visible)
    setEliminarCargo({
      carg_Id: params,

    }
    )
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
    if (nuevoCargo.carg_Descripcion === '') {
      event.preventDefault()
      event.stopPropagation()
      toast.error('Asegúrese de llenar el campo cargo.');
    }
    else {
      if (form.checkValidity() != false) {
        axios.post('api/Cargos/Insert', nuevoCargo, config)
          .then((response) => {
            console.log(response.status   )
            if (response.data.code == 409)
            {
              toast.error('El cargo ya existe.');
            }
            else{
                          setVisible(false)
            setvisibleEnca(!visibleEnca)
            setNuevaCargo({
              carg_Descripcion: '',
              carg_UserCrea: user_Crea
            })
            console.log(user_Crea)
            toast.success('Cargo insertado correctamente.');
            }

          })
          .catch((error) => {
            console.log(error)
          })
      }

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
    }
    if (form.checkValidity() === false) {
      toast.error('No se permiten campos vacíos.');
    }
    setValidated(true)
    if (form.checkValidity() != false) {
      axios.put('api/Cargos/Update', EditarCargo, config)
        .then((response) => {
          if (response.data.code == 409)
          {
            toast.error('El cargo ya existe.');
          }
          else if(response.data.code == 500){
            toast.error('Ya hay un cargo con ese nombre.');

          }
          else{
          console.log(response.data)
          setVisible2(!visible2)
          setvisibleEnca(!visibleEnca)
          setEditarCargo({
            carg_Id: '',
            carg_Descripcion: '',
            carg_UserModifica: user_Crea
          })
          toast.success('Cargo editado correctamente.');
          console.log(response.data)
        }
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
    axios.put('api/Cargos/Delete', ElimCargo, config)
      .then((response) => {
        console.log(response.data)
        setModal(false)
        setEliminarCargo({
          carg_Id: 0,
        })
        toast.success('Cargo eliminado correctamente.');
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }


  //peticion a la api listado   
  useEffect(() => {
    axios.get('api/Cargos/Index').then((response) => {
      console.log('entra')
      const insertarid = response.data.map((row) => ({
        ...row,
        id: row.carg_Id,
      }))
      setCargos(insertarid)
    })
  }, [cargos])

  const handleSortModelChange = (model) => {
    setSortModel(model)
  }

  const columns = [
    { field: 'carg_Id', headerName: 'ID', flex: 1, },
    { field: 'carg_Descripcion', headerName: 'Cargo', flex: 2, },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 1,
      renderCell: (params) => (
        <div>



          <CButton color="warning ms-2" variant="outline" onClick={() => abrireditar(params.row)}>
            <EditIcon />
          </CButton>

          <CButton color="danger ms-2" variant="outline" onClick={() => ModalFun(params.row.carg_Id)}>
            <DeleteIcon />
          </CButton>

        </div>
      ),
    },
  ]

  return (
    <div style={{ width: '100%' }}>
      <div className='col-12'>
        <CCard className="p-5">

          <CCardHeader className='rounded-top mb-4' style={{ fontFamily: "revert-layer", textAlign: 'center', fontSize: 50 }}>Cargos</CCardHeader>
          <CCollapse visible={!visibleEnca}>


            <div className='col-2  mb-4'>
              <div className="d-grid gap-1">

                <CButton color="primary" variant="outline" href="#"
                  onClick={abrirycerrarInsert}
                >
                  <AddIcon className='nav-icon  mb-1'></AddIcon>
                  Nuevo
                </CButton>
              </div>
            </div>
          </CCollapse>

          {/*Modal Eliminar*/}

          <CModal alignment="center" visible={Modal} onClick={() => setModal(false)}>

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
                  value={ElimCargo.carg_Id}
                  id="validationCustom01"
                  disabled
                  required />
                <center>
                  <CModalTitle>Esta seguro que desea Eliminar este registro?</CModalTitle>
                </center>
                <center>
                  <CButton color="light" className='col-5 me-3' onClick={() => setModal(false)}>
                    Cancelar
                  </CButton>
                  <CButton color="danger text-light" type='submit' className='col-5'>Eliminar</CButton>
                </center>
              </CForm>
            </CModalBody>

          </CModal>


          {/*Formulario Insertar*/}

          <CCollapse visible={visible} className='col-6 offset-3'>

            <CCard className="mt-3">
              <CCardHeader>
                <h1 className='h4 text-center' style={{ fontFamily: "revert-layer" }}>Nuevo Cargo</h1>
              </CCardHeader>
              <CCardBody>
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmitI}
                >


                  <CCol md={12} className=''>

                    <CFormInput
                    className='form-control'
                      type="text"
                      value={nuevoCargo.carg_Descripcion}
                      onChange={(e) => setNuevaCargo({ ...nuevoCargo, carg_Descripcion: e.target.value })}
                      id="validationCustom01"
                      label="Cargo"
                      required
                    />

                  </CCol>

                  <CCol xs={12} className='offset-4'>
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


          {/*Formulario Editar*/}
          <CCollapse visible={visible2} className='col-6 offset-3'>

            <CCard className="mt-3">
              <CCardHeader>
                <h1 className='h3 text-center'>Editar Cargo</h1>
              </CCardHeader>
              <CCardBody>
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmitE}
                >

                  <CCol md={6} className=''>
                    <CFormInput
                      type="hidden"
                      value={EditarCargo.carg_Id}
                      onChange={(e) => setEditarCargo({ ...EditarCargo, carg_Id: e.target.value })}
                      id="validationCustom01"
                      required
                    />
                  </CCol>
                  <CCol md={12} className=''>

                    <CFormInput
                      type="text"
                      minLength={2}
                      value={EditarCargo.carg_Descripcion}
                      onChange={(e) => setEditarCargo({ ...EditarCargo, carg_Descripcion: e.target.value })}
                      id="validationCustom01"
                      label="Cargo"
                      required
                    />

                  </CCol>

                  <CCol xs={12} className='offset-4'>
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
                rows={cargos}
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

export default Cargos
