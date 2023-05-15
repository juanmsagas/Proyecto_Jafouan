import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

function Municipios() {
  const [usuarios, setUsuarios] = useState([])
  const [sortModel, setSortModel] = useState([{ field: 'muni_Id', sort: 'asc' }])
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [Modal, setModal] = useState(false)
  const [visibleEnca, setvisibleEnca   ] = useState(false)
  const [Departamentos, setDepartamentosDDL] = useState([]);  
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

const existeUsuarios = miArreglo.some(objeto => objeto.name === "Municipios");

if (existeUsuarios) {
  
} else {
  window.location.href = '/#/Home';
}

  const [nuevoMunicipio, setNuevoMunicipio] = useState({
    muni_Id: '',
    muni_Descripcion: '',
    dept_Id:'',
    muni_UserCrea:user_Crea
})
const [ElimMunicipio, setElimMunicipio] = useState({
  muni_Id: ''
})
const [EditarMunicipio, setEditarMunicipio] = useState({
  muni_Id: '',
  muni_Descripcion: '',
  dept_Id:'',
  muni_UserModifica:user_Crea
})

useEffect(() => {
  axios.get('api/Departamentos/Index')
  .then(response => {
    setDepartamentosDDL(response.data);
    console.log(response.data)     
  })
  .catch(error => { 
    console.error('Error fetching data from API:', error);
  });
}, []); // <-- array vac


const abrireditar = (params,event) => {
  if (event) {
    event.preventDefault()
  }
  setVisible2(!visible2)
  setValidated(false)
  setvisibleEnca(!visibleEnca)
  console.log(params)
  setEditarMunicipio({
    muni_Id: params.muni_Id,
    muni_Descripcion:  params.muni_Descripcion,
    dept_Id:params.dept_Id,
    muni_UserModifica:user_Crea
}
)}

const cerrarEditar = (event) => {
  event.preventDefault()
  setVisible2(!visible2)
  setvisibleEnca(!visibleEnca)
  setEditarMunicipio({
    muni_Id: '',
    muni_Descripcion: '',
    dept_Id:'',
    muni_UserModifica:user_Crea
}
)}

const abrirycerrarInsert = (event) => {
  event.preventDefault()
  setVisible(!visible)
  setValidated(false)
  setvisibleEnca(!visibleEnca)
  setNuevoMunicipio({
    muni_Id: '',
    muni_Descripcion: '',
    dept_Id:'',
    muni_UserCrea:user_Crea
}
)}


const ModalFun = (params,event) => {
  if (event) {
    event.preventDefault()
  }
  setModal(!visible)
  setElimMunicipio({
    muni_Id: params,
   
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
    toast.error('No se permiten campos vacíos.');

  }
  setValidated(true)
  if(form.checkValidity() != false){
    axios.post('api/Municipios/Insert', nuevoMunicipio, config)
        .then((response) => {
          if (response.data.code == 409)
          {
            toast.error('El municipio ya existe.');
          }
          else{
            console.log(response.data)
            setVisible(false)
            setvisibleEnca(!visibleEnca)
            setNuevoMunicipio({
                muni_Id: '',
                muni_Descripcion: '',
                dept_Id:'',
                muni_UserCrea:user_Crea
            })
            toast.success('Municipio insertado correctamente.')};

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
  if(form.checkValidity() != false){
  axios.put('api/Municipios/Update', EditarMunicipio, config)
      .then((response) => {
        if(response.data.code == 500){
          toast.error('Ya hay un municipio con ese nombre')
        }
        else{         
           console.log(response.data)
          setVisible2(!visible2)
          setvisibleEnca(!visibleEnca)
          setEditarMunicipio({
            muni_Id: '',
            muni_Descripcion: '',
            muni_UserModifica:user_Crea
        })  
        toast.success('Municipio editado correctamente.')

        }
;

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
  axios.put('api/Municipios/Delete', ElimMunicipio, config)
      .then((response) => {
          console.log(response.data)
          setModal(false)
          setElimMunicipio({
            muni_Id: '',
        })
        toast.success('Municipio eliminado correctamente.');

        console.log(response.data)
      })
      .catch((error) => {
          console.log(error)
      })
    
}


  //peticion a la api listado   
  useEffect(() => {
    axios.get('api/Municipios/Index').then((response) => {
      console.log('entra')
      const insertarid = response.data.map((row) => ({
        ...row,
        id: row.muni_Id,
      }))
      setUsuarios(insertarid)
    })
  }, [usuarios])

  const handleSortModelChange = (model) => {
    setSortModel(model)
  }


  
  const columns = [
    { field: 'muni_Id', headerName: 'ID', flex:1, },
    { field: 'dept_Descripcion', headerName: 'Departamentos', flex:1, },
    { field: 'muni_Descripcion', headerName: 'Municipio', flex:2, },
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
          
            <CButton color="danger ms-2" variant="outline" onClick={() => ModalFun(params.row.muni_Id)}>
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

      <CCardHeader className='rounded-top mb-4' style={{ fontFamily: "revert-layer",  textAlign: 'center', fontSize: 50   }}>Municipios</CCardHeader>
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
         minLength={4} maxLength={4}
        type="hidden"
    value={ElimMunicipio.muni_Id}
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
          <h1 className='h3 text-center'>Nuevo Municipio</h1>
        </CCardHeader>
        <CCardBody>
      <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={handleSubmitI}
>

      
    <CCol md={6} className="">
    <CFormSelect
  value={nuevoMunicipio.dept_Id}
  onChange={(e) => {
    setNuevoMunicipio({ ...nuevoMunicipio, dept_Id: e.target.value })
  }}
  id="validationCustom01"
  label="Departamento"
  required
>
  <option value="">Seleccione un Departamento</option>
  {Departamentos.map((opcion) => (
    <option key={opcion.dept_Id} value={opcion.dept_Id}>
      {opcion.dept_Descripcion}
    </option>
  ))}
</CFormSelect>
</CCol>


       <CCol md={6} className=''>
      <CFormInput
      pattern="[0-9]*"  
      minLength={4} maxLength={4}
        type="text"
    value={nuevoMunicipio.muni_Id}
    onChange={(e) => setNuevoMunicipio({ ...nuevoMunicipio, muni_Id: e.target.value })}
    id="validationCustom01"
    label="ID"
    required/>



    </CCol>
       <CCol md={12} className=''>

        <CFormInput
    type="text"
    value={nuevoMunicipio.muni_Descripcion}
    onChange={(e) => setNuevoMunicipio({ ...nuevoMunicipio, muni_Descripcion: e.target.value })}
    id="validationCustom01"
    label="Municipio"
    required/>

    </CCol>


    <CCol xs={12} className='offset-4'>
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
        <h1 className='h3 text-center'>Editar Municipio</h1>
      </CCardHeader>
      <CCardBody>
    <CForm
  className="row g-3 needs-validation"
  noValidate
  validated={validated}
  onSubmit={handleSubmitE}
>



     <CCol md={0} className=''>
    <CFormInput
      type="hidden"
  value={EditarMunicipio.muni_Id}
  onChange={(e) => setEditarMunicipio({ ...EditarMunicipio, muni_Id: e.target.value })}
  id="validationCustom01"
  required
    />
  </CCol>


  <CCol md={6} className="">
    <CFormSelect
  value={EditarMunicipio.dept_Id}
  onChange={(e) => {
    setEditarMunicipio({ ...EditarMunicipio, dept_Id: e.target.value })
  }}
  id="validationCustom01"
  label="Departamento"
  required
>
  <option value="">Seleccione un Departamento</option>
  {Departamentos.map((opcion) => (
    <option key={opcion.dept_Id} value={opcion.dept_Id}>
      {opcion.dept_Descripcion}
    </option>
  ))}
</CFormSelect>
</CCol>
  
     <CCol md={6} className=''>

      <CFormInput
  type="text"
  minLength={2}
  value={EditarMunicipio.muni_Descripcion}
  onChange={(e) => setEditarMunicipio({ ...EditarMunicipio, muni_Descripcion: e.target.value })}
  id="validationCustom01"
  label="Municipio"
  required
/>

  </CCol>



  <CCol xs={12} className='offset-4'>
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
      <ToastContainer />

    </div>
  )
}

export default Municipios
