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
        CCardHeader,
        CModal,
        CModalHeader,
        CModalTitle,
        CModalBody,
        CModalFooter}
        from '@coreui/react'

function Departamentos() {
  const [usuarios, setUsuarios] = useState([])
  const [sortModel, setSortModel] = useState([{ field: 'dept_Id', sort: 'asc' }])
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [Modal, setModal] = useState(false)
  const [visibleEnca, setvisibleEnca   ] = useState(false)

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
    dept_Descripcion: '',
    dept_UserCrea:1
})
const [ElimDepartamento, setElimDepartamento] = useState({
  dept_Id: ''
})
const [EditarDepartamento, setEditarDepartamento] = useState({
  dept_Id: '',
  dept_Descripcion: '',
  dept_UserModifica:1
})

const abrireditar = (params,event) => {
  if (event) {
    event.preventDefault()
  }
  setVisible2(!visible2)
  setvisibleEnca(!visibleEnca)
  console.log(params)
  setEditarDepartamento({
    dept_Id: params.dept_Id,
    dept_Descripcion:  params.dept_Descripcion,
    dept_UserModifica:1
}
)}

const cerrarEditar = (event) => {
  event.preventDefault()
  setVisible2(!visible2)
  setvisibleEnca(!visibleEnca)
  setEditarDepartamento({
    dept_Id: '',
    dept_Descripcion: '',
    dept_UserModifica:1
}
)}

const abrirycerrarInsert = (event) => {
  event.preventDefault()
  setVisible(!visible)
  setvisibleEnca(!visibleEnca)
  setNuevoDepartamento({
    dept_Id: '',
    dept_Descripcion: '',
    dept_UserCrea:1
}
)}


const ModalFun = (params,event) => {
  if (event) {
    event.preventDefault()
  }
  setModal(!visible)
  setElimDepartamento({
    dept_Id: params,
   
}
)}


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
  }
  setValidated(true)
  if(form.checkValidity() != false){
    axios.post('api/Departamentos/Insert', nuevoDepartamento, config)
        .then((response) => {
            console.log(response.data)
            setVisible(false)
            setvisibleEnca(!visibleEnca)
            setNuevoDepartamento({
                dept_Id: '',
                dept_Descripcion: '',
                dept_UserCrea:1
            })
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
  }
  setValidated(true)
  if(form.checkValidity() != false){
  axios.put('api/Departamentos/Update', EditarDepartamento, config)
      .then((response) => {
          console.log(response.data)
          setVisible2(!visible2)
          setvisibleEnca(!visibleEnca)
          setEditarDepartamento({
            dept_Id: '',
            dept_Descripcion: '',
            dept_UserModifica:1
        })
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
  axios.put('api/Departamentos/Delete', ElimDepartamento, config)
      .then((response) => {
          console.log(response.data)
          setModal(!Modal)
          setElimDepartamento({
            dept_Id: '',
        })
        console.log(response.data)
      })
      .catch((error) => {
          console.log(error)
      })
    
}


  //peticion a la api listado   
  useEffect(() => {
    axios.get('api/Departamentos/Index').then((response) => {
      console.log('entra')
      const insertarid = response.data.map((row) => ({
        ...row,
        id: row.dept_Id,
      }))
      setUsuarios(insertarid)
    })
  }, [usuarios])

  const handleSortModelChange = (model) => {
    setSortModel(model)
  }

  const columns = [
    { field: 'dept_Id', headerName: 'ID', flex:1, },
    { field: 'dept_Descripcion', headerName: 'Departamento', flex:2, },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex:1,
      renderCell: (params) => (
        <div>
      
        
            <CButton  color="info ms-2" variant="outline">
            <VisibilityIcon />
          </CButton>

          <CButton color="warning ms-2" variant="outline" onClick={() => abrireditar(params.row)}>
        <EditIcon />
        </CButton>
          
            <CButton color="danger ms-2" variant="outline" onClick={() => ModalFun(params.row.dept_Id)}>
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

      <CCollapse visible={!visibleEnca}>

      <h1 className='h4 text-center'>Departamentos</h1>

      <div className='col-2 offset-5 mb-4'>
      <div className="d-grid gap-1">

    <CButton color="primary" variant="outline" href="#"        
    onClick={abrirycerrarInsert}
      >
      Nuevo
    </CButton>
          </div>
      </div>
    </CCollapse>

 {/*Modal Eliminar*/}

    <CModal alignment="center"  visible={Modal} onClose={() => setModal(false)}>
      
      <CModalBody className='pt-5 pb-5' style={{boxShadow:5}}>
      <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={handleSubmitD}
>
      <CFormInput
      minLength={2} maxLength={2}
        type="hidden"
    value={ElimDepartamento.dept_Id}
    id="validationCustom01"
    disabled
    required/>
            <center>
        <CModalTitle>Esta seguro que desea Eliminar este registro?</CModalTitle>
        </center>
    <center>
     <CButton color="light" type='submit' className='col-5 me-3' onClick={() => setModal(false)}>
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
      pattern="[0-9]*"
      minLength={2} maxLength={2}
        type="text"
    value={nuevoDepartamento.dept_Id}
    onChange={(e) => setNuevoDepartamento({ ...nuevoDepartamento, dept_Id: e.target.value })}
    id="validationCustom01"
    label="ID"
    required/>

    </CCol>
       <CCol md={6} className=''>

        <CFormInput
    type="text"
    value={nuevoDepartamento.dept_Descripcion}
    onChange={(e) => setNuevoDepartamento({ ...nuevoDepartamento, dept_Descripcion: e.target.value })}
    id="validationCustom01"
    label="Departamento"
    required/>

    </CCol>

    <CCol xs={12} className='offset-7'>
      <CButton color="primary"  type="submit">
        Guardar
      </CButton>
      <CButton color="danger text-light"  className='ms-2' href="#" onClick={abrirycerrarInsert}>
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
        <h1 className='h3 text-center'>Editar Departamento</h1>
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
  value={EditarDepartamento.dept_Id}
  onChange={(e) => setEditarDepartamento({ ...EditarDepartamento, dept_Id: e.target.value })}
  id="validationCustom01"
  required
    />
  </CCol>
     <CCol md={12} className=''>

      <CFormInput
  type="text"
  minLength={2}
  value={EditarDepartamento.dept_Descripcion}
  onChange={(e) => setEditarDepartamento({ ...EditarDepartamento, dept_Descripcion: e.target.value })}
  id="validationCustom01"
  label="Departamento"
  required
/>

  </CCol>

  <CCol xs={12} className='offset-7'>
    <CButton color="primary" type="submit">
      Guardar
    </CButton>
    <CButton color="danger text-light" className='ms-2' href="#"  onClick={cerrarEditar}>
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
      </CCard>
      </CCollapse>
      </CCard>
      </div>
    </div>
  )
}

export default Departamentos
