import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import AddIcon  from '@material-ui/icons/Add'
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
        CModalFooter,
        }
        from '@coreui/react'

function Descuentos() {
  const [descuentos, setDescuentos] = useState([])
  const [sortModel, setSortModel] = useState([{ field: 'desc_Id', sort: 'asc' }])
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
  const [nuevoDescuento, setNuevoDescuento] = useState({
    desc_Color: '',
    desc_Descuento: 0,
    desc_UserCrea: 1
})
const [ElimDescuento, setEliminarDescuento] = useState({
  desc_Id: 0
})
const [EditarDescuento, setEditarDescuento] = useState({
    desc_Id: 0,
    desc_Color: '',
    desc_Descuento: 0,
    desc_UserModifica: 1
})

const abrireditar = (params,event) => {
  if (event) {
    event.preventDefault()
  }
  setVisible2(!visible2)
  setvisibleEnca(!visibleEnca)
  console.log(params)
  setEditarDescuento({
    desc_Id: params.desc_Id,
    desc_Color: params.desc_Color,
    desc_Descuento:  params.desc_Descuento,
    desc_UserModifica:1
}
)}

const cerrarEditar = (event) => {
  event.preventDefault()
  setVisible2(!visible2)
  setvisibleEnca(!visibleEnca)
  setEditarDescuento({
    desc_Id: 0,
    desc_Color: '',
    desc_Descuento:  0,
    desc_UserModifica:1
}
)}

const abrirycerrarInsert = (event) => {
  event.preventDefault()
  setVisible(!visible)
  setvisibleEnca(!visibleEnca)
  setNuevoDescuento({
    desc_Color: '',
    desc_Descuento: 0,
    desc_UserCrea: 1
}
)}


const ModalFun = (params,event) => {
  if (event) {
    event.preventDefault()
  }
  setModal(!visible)
  setEliminarDescuento({
    desc_Id: params,
   
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
    axios.post('api/Descuentos/Insert', nuevoDescuento, config)
        .then((response) => {
            console.log(response.data)
            setVisible(false)
            setvisibleEnca(!visibleEnca)
            setNuevoDescuento({
                desc_Color: '',
                desc_Descuento: 0,
                desc_UserCrea: 1
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
  axios.put('api/Descuentos/Update', EditarDescuento, config)
      .then((response) => {
          console.log(response.data)
          setVisible2(!visible2)
          setvisibleEnca(!visibleEnca)
          setEditarDescuento({
            desc_Id: 0,
            desc_Color: '',
            desc_Descuento: 0,
            desc_UserModifica: 1
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
  axios.put('api/Descuentos/Delete', ElimDescuento, config)
      .then((response) => {
          console.log(response.data)
          setModal(false)
          setEliminarDescuento({
            desc_Id: 0,
        })
        console.log(response.data)
      })
      .catch((error) => {
          console.log(error)
      })
    
}


  //peticion a la api listado   
  useEffect(() => {
    axios.get('api/Descuentos/Index').then((response) => {
      console.log('entra')
      const insertarid = response.data.map((row) => ({
        ...row,
        id: row.desc_Id,
      }))
      setDescuentos(insertarid)
    })
  }, [descuentos])

  const handleSortModelChange = (model) => {
    setSortModel(model)
  }

  const columns = [
    { field: 'desc_Id', headerName: 'ID', flex:1, },
    { field: 'desc_Color', headerName: 'Color', flex:2, },
    { field: 'desc_Descuento', headerName: 'Descuento', flex:2, },
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
          
            <CButton color="danger ms-2" variant="outline" onClick={() => ModalFun(params.row.desc_Id)}>
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

      <CCardHeader className='rounded-top mb-4' style={{ fontFamily: "revert-layer",  textAlign: 'center', fontSize: 50   }}>Descuentos</CCardHeader>
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

    <CModal alignment="center"  visible={Modal} onClick={() => setModal(false)}>
      
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
    value={ElimDescuento.desc_Id}
    id="validationCustom01"
    disabled
    required/>
            <center>
        <CModalTitle>Esta seguro que desea Eliminar este registro?</CModalTitle>
        </center>
    <center>
     <CButton color="light"  className='col-5 me-3' onClick={() => setModal(false)}>
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
          <h1 className='h4 text-center' style={{ fontFamily: "revert-layer"}}>Nuevo Descuento</h1>
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
    value={nuevoDescuento.desc_Color}
    onChange={(e) => setNuevoDescuento({ ...nuevoDescuento, desc_Color: e.target.value })}
    id="validationCustom01"
    label="Color"
    required/>

    </CCol>

        <CCol md={6} className=''>

    <CFormInput
    type="text"
    value={nuevoDescuento.desc_Descuento}
    onChange={(e) => setNuevoDescuento({ ...nuevoDescuento, desc_Descuento: e.target.value })}
    id="validationCustom01"
    label="Descuento"
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
        <h1 className='h3 text-center'>Editar Descuento</h1>
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
  value={EditarDescuento.desc_Id}
  onChange={(e) => setEditarDescuento({ ...EditarDescuento, desc_Id: e.target.value })}
  id="validationCustom01"
  required
    />
  </CCol>
     <CCol md={12} className=''>

      <CFormInput
  type="text"
  minLength={2}
  value={EditarDescuento.desc_Color}
  onChange={(e) => setEditarDescuento({ ...EditarDescuento, desc_Color: e.target.value })}
  id="validationCustom01"
  label="Color"
  required
/>

  </CCol>

  <CCol md={12} className=''>

<CFormInput
type="text"
minLength={2}
value={EditarDescuento.desc_Descuento}
onChange={(e) => setEditarDescuento({ ...EditarDescuento, desc_Descuento: e.target.value })}
id="validationCustom01"
label="Descuento"
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
        rows={descuentos}
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

export default Descuentos
