import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import SearchIcon from '@material-ui/icons/Search'
import {CButton,
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
        CCardHeader}
        from '@coreui/react'

function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [sortModel, setSortModel] = useState([{ field: 'user_Id', sort: 'asc' }])
  const [visible, setVisible] = useState(false)
  
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }
  //peticion a la api 
  useEffect(() => {
    axios.get('api/Usuarios/Index').then((response) => {
      console.log('entra')
      const insertarid = response.data.map((row) => ({
        ...row,
        id: row.user_Id,
      }))
      setUsuarios(insertarid)
    })
  }, [])

  const handleSortModelChange = (model) => {
    setSortModel(model)
  }

  const columns = [
    { field: 'user_Id', headerName: 'ID', width: 1 },
    { field: 'user_NombreUsuario', headerName: 'Usuario', width: 300 },
    { field: 'nombreEmpleado', headerName: 'Empleado', width: 150 },
    { field: 'esAdmin', headerName: 'Estado Admin', width: 200 },
    { field: 'role_Descripcion', headerName: 'Rol', width: 150 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 300,
      renderCell: (params) => (
        <div>
          <IconButton color="secondary">
            <DeleteIcon />
          </IconButton>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
          <IconButton>
            <VisibilityIcon />
          </IconButton>
        </div>
      ),
    },
  ]

  return (
    <div style={{ width: '100%' }}>
      <div className='col-12'>
      <CCollapse visible={!visible}>

      <h1 className='h4 text-center'>Usuarios</h1>

      <div className='col-2 offset-5 mb-4'>
      <div className="d-grid gap-1">

    <CButton color="primary" variant="outline" href="#" onClick={(event) => {
      event.preventDefault()
      setVisible(!visible)
    }}>
      Nuevo
    </CButton>
          </div>
      </div>
    </CCollapse>


    <CCollapse visible={visible}>
    
      <CCard className="mt-3">
        <CCardHeader>
          <h1 className='h3 text-center'>Nuevo Usuario</h1>
        </CCardHeader>
        <CCardBody>
        <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={handleSubmit}
  >
    <CCol md={4}>
      <CFormInput
        type="text"
        defaultValue="Mark"
        feedbackValid="Looks good!"
        id="validationCustom01"
        label="First name"
        required
      />
    </CCol>
    <CCol md={4}>
      <CFormInput
        type="text"
        defaultValue="Otto"
        feedbackValid="Looks good!"
        id="validationCustom02"
        label="First name"
        required
      />
    </CCol>
    <CCol md={4}>
      <CFormLabel htmlFor="validationCustomUsername">Username</CFormLabel>
      <CInputGroup className="has-validation">
        <CInputGroupText>@</CInputGroupText>
        <CFormInput
          type="text"
          aria-describedby="inputGroupPrependFeedback"
          feedbackValid="Please choose a username."
          id="validationCustomUsername"
          required
        />
      </CInputGroup>
    </CCol>
    <CCol md={6}>
      <CFormInput
        type="text"
        aria-describedby="validationCustom03Feedback"
        feedbackInvalid="Please provide a valid city."
        id="validationCustom03"
        label="City"
        required
      />
    </CCol>
    <CCol md={3}>
      <CFormSelect
        aria-describedby="validationCustom04Feedback"
        feedbackInvalid="Please select a valid state."
        id="validationCustom04"
        label="State"
        required
      >
        <option disabled>Choose...</option>
        <option>...</option>
      </CFormSelect>
    </CCol>
    <CCol md={3}>
      <CFormInput
        type="text"
        aria-describedby="validationCustom05Feedback"
        feedbackInvalid="Please provide a valid zip."
        id="validationCustom05"
        label="Zip"
        required
      />
    </CCol>
    <CCol xs={12}>
      <CFormCheck
        type="checkbox"
        id="invalidCheck"
        label="Agree to terms and conditions"
        required
      />
      <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
    </CCol>
    <CCol xs={12}>
      <CButton color="primary" type="submit">
        Guardar
      </CButton>
      <CButton color="danger"  href="#" onClick={(event) => {
      event.preventDefault()
      setVisible(!visible)
    }}>
      Cancelar
    </CButton>
    </CCol>
  </CForm>
        </CCardBody>
      </CCard>
    </CCollapse>


      <CCollapse visible={!visible}>
      <DataGrid
        rows={usuarios}
        columns={columns}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        components={{
          Toolbar: GridToolbar,
          Search: SearchIcon,
        }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      />
      </CCollapse>
      </div>
    </div>
  )
}

export default Usuarios
