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

function Departamentos() {
  const [usuarios, setUsuarios] = useState([])
  const [sortModel, setSortModel] = useState([{ field: 'dept_Id', sort: 'asc' }])
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
  const [nuevoDepartamento, setNuevoDepartamento] = useState({
    dept_Id: '',
    dept_Descripcion: ''
})

const handleSubmitI = (event) => {
    event.preventDefault()

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios.post('api/Departamentos/Insert', nuevoDepartamento, config)
        .then((response) => {
            console.log(response.data)
            setVisible(false)
            setNuevoDepartamento({
                dept_Id: '',
                dept_Descripcion: ''
            })
        })
        .catch((error) => {
            console.log(error)
        })
}



  //peticion a la api 
  useEffect(() => {
    axios.get('api/Departamentos/Index').then((response) => {
      console.log('entra')
      const insertarid = response.data.map((row) => ({
        ...row,
        id: row.dept_Id,
      }))
      setUsuarios(insertarid)
    })
  }, [])

  const handleSortModelChange = (model) => {
    setSortModel(model)
  }

  const columns = [
    { field: 'dept_Id', headerName: 'ID', width: 1 },
    { field: 'dept_Descripcion', headerName: 'Departamento', width: 300 },
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

      <h1 className='h4 text-center'>Departamentos</h1>

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
          <h1 className='h3 text-center'>Nuevo Departamento</h1>
        </CCardHeader>
        <CCardBody>
      <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={handleSubmitI}
>

       <CCol md={6} className=''>
      <CFormInput
        type="text"
    value={nuevoDepartamento.dept_Id}
    onChange={(e) => setNuevoDepartamento({ ...nuevoDepartamento, dept_Id: e.target.value })}
    id="validationCustom01"
    label="Departamento"
    required
      />
    </CCol>
       <CCol md={6} className=''>

        <CFormInput
    type="text"
    value={nuevoDepartamento.dept_Descripcion}
    onChange={(e) => setNuevoDepartamento({ ...nuevoDepartamento, dept_Descripcion: e.target.value })}
    id="validationCustom01"
    label="Departamento"
    required
/>

    </CCol>

    <CCol xs={12}>
      <CButton color="primary" type="submit">
        Guardar
      </CButton>
      <CButton color="danger" className='m' href="#" onClick={(event) => {
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

export default Departamentos
