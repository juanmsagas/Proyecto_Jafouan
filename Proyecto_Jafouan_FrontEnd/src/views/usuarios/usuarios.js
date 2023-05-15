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
        CFormSwitch,
        }
        from '@coreui/react'

function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [sortModel, setSortModel] = useState([{ field: 'user_Id', sort: 'asc' }])
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [Modal, setModal] = useState(false)
  const [visibleEnca, setvisibleEnca   ] = useState(false)
  const [Empleados, setEmpleadosDDL] = useState([]);  
  const [Roles, setRolesDDL] = useState([]);  
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

const existeUsuarios = miArreglo.some(objeto => objeto.name === "Usuarios");

if (existeUsuarios) {
  
} else {
  window.location.href = '/#/Home';
}

  const [nuevousuario, setNuevousuario] = useState({
    user_Id: 0,
    user_NombreUsuario: '',
    empl_Id:0,
    user_Admin:false,
    user_Contraseña:'',
    role_Id:0,
    user_UserCrea:1
})
const [Elimusuario, setElimusuario] = useState({
  user_Id: ''
})
const [Editarusuario, setEditarusuario] = useState({
    user_Id: 0,
    user_NombreUsuario: '',
    empl_Id:0,
    user_Admin:false,
    role_Id:0,
    user_UserModifica:1
})

useEffect(() => {
  axios.get('api/Empleados/Index')
  .then(response => {
    setEmpleadosDDL(response.data);
    console.log(response.data)     
  })
  .catch(error => { 
    console.error('Error fetching data from API:', error);
  });
}, []); // <-- array vac


useEffect(() => {
  axios.get('api/Roles/Index')
  .then(response => {
    setRolesDDL(response.data);
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
  setvisibleEnca(!visibleEnca)
  setValidated(false)
  setEditarusuario({
    user_Id: params.user_Id,
    user_NombreUsuario:  params.user_NombreUsuario,
    empl_Id:params.empl_Id,
    role_Id:params.role_Id,
    user_Admin:params.user_Admin,
    user_UserModifica:1
}
)}

const cerrarEditar = (event) => {
  event.preventDefault()
  setVisible2(!visible2)
  setvisibleEnca(!visibleEnca)
  setEditarusuario({
    user_Id: 0,
    user_NombreUsuario:  '',
    empl_Id:0,
    role_Id:0,
    user_Admin:false,
    user_UserModifica:1
}
)}

const abrirycerrarInsert = (event) => {
  event.preventDefault()
  setVisible(!visible)
  setValidated(false)
  setvisibleEnca(!visibleEnca)
  setNuevousuario({
    user_NombreUsuario: '',
    empl_Id:0,
    user_Admin:false,
    user_Contraseña:'',
    role_Id:0,
}
)}


const ModalFun = (params,event) => {
  if (event) {
    event.preventDefault()
  }
  setModal(!visible)
  setElimusuario({
    user_Id: params,
   
}
)}


  //peticion a la api insert   
const handleSubmitI = (event) => {
    event.preventDefault()

  if (nuevousuario.user_Admin===undefined) {
    setNuevousuario({
      user_Admin:false
    })
  }
  console.log(nuevousuario.user_Admin);

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
    axios.post('api/Usuarios/Insert', nuevousuario, config)
        .then((response) => {
            console.log(response.data)
            setVisible(false)
            setvisibleEnca(!visibleEnca)
            setNuevousuario({
                user_Id: '',
                user_NombreUsuario: '',
                nombreEmpleado:'',
                user_UserCrea:1
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
  axios.put('api/Usuarios/Update', Editarusuario, config)
      .then((response) => {
          console.log(response.data)
          setVisible2(!visible2)
          setvisibleEnca(!visibleEnca)
          setEditarusuario({
            user_Id: '',
            user_NombreUsuario: '',
            user_UserModifica:1
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
  axios.put('api/Usuarios/Delete', Elimusuario, config)
      .then((response) => {
          console.log(response.data)
          setModal(false)
          setElimusuario({
            user_Id: '',
        })
        console.log(response.data)
      })
      .catch((error) => {
          console.log(error)
      })
    
}


  //peticion a la api listado   
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
    { field: 'user_Id', headerName: 'ID', width:130, },
    { field: 'user_NombreUsuario', headerName: 'Nombre Usuario', width:130, },
    { field: 'nombreEmpleado', headerName: 'Empleado', width:130, },
    { field: 'esAdmin', headerName: 'Estado Admin', width:120, },
    { field: 'role_Descripcion', headerName: 'Rol', width:200, },
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
          
            <CButton color="danger ms-2" variant="outline" onClick={() => ModalFun(params.row.user_Id)}>
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

      <CCardHeader className='rounded-top mb-4' style={{ fontFamily: "revert-layer",  textAlign: 'center', fontSize: 50   }}>Usuarios</CCardHeader>
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
    value={Elimusuario.user_Id}
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
 
    <CCollapse visible={visible} className='col-8 offset-2'>
    
      <CCard className="mt-3">
        <CCardHeader>
          <h1 className='h3 text-center'>Nuevo usuario</h1>
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
          pattern="^[a-zA-Z]+$"  
          type="text"
          value={nuevousuario.user_NombreUsuario}
          onChange={(e) => setNuevousuario({ ...nuevousuario, user_NombreUsuario: e.target.value })}
          id="validationCustom01"
          label="Nombre de Usuario"
          required/>
      </CCol>


      <CCol md={6} className=''>
        <CFormInput
          pattern="^[a-zA-Z0-9._-]+$"  
          type="text"
          value={nuevousuario.user_Contraseña}
          onChange={(e) => setNuevousuario({ ...nuevousuario, user_Contraseña: e.target.value })}
          id="validationCustom01"
          label="Constraseña"
          required/>
      </CCol>
      
<CCol md={6} className="">
    <CFormSelect
  value={nuevousuario.empl_Id}
  onChange={(e) => {
    setNuevousuario({ ...nuevousuario, empl_Id: e.target.value })
  }}
  id="validationCustom01"
  label="Empleado Asignado"
  required
>
  <option value="">Seleccione un Empleado</option>
  {Empleados.map((opcion) => (
    <option key={opcion.empl_Id} value={opcion.empl_Id}>
      {opcion.nombreCliente}
    </option>
  ))}
</CFormSelect>
</CCol>


<CCol md={6} className="">
    <CFormSelect
  value={nuevousuario.role_Id}
  onChange={(e) => {
    setNuevousuario({ ...nuevousuario, role_Id: e.target.value })
  }}
  id="validationCustom01"
  label="Rol"
>
  <option value="">Seleccione un Rol</option>
  {Roles.map((opcion) => (
    <option key={opcion.role_Id} value={opcion.role_Id}>
      {opcion.role_Descripcion}
    </option>
  ))}
</CFormSelect>
</CCol>

<CCol md={1} className="">
  <CFormSwitch
    label="Admin"
    value={nuevousuario.user_Admin}
    id="formSwitchCheckChecked"
    defaultChecked={nuevousuario.user_Admin === true}
    onChange={(e) => {
      setNuevousuario({ ...nuevousuario, user_Admin: e.target.checked ? true : false });
    }}
  />
</CCol>


    <CCol xs={12} className='offset-8'>
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
    <CCollapse visible={visible2} className='col-8 offset-2'>
    
    <CCard className="mt-3">
      <CCardHeader>
        <h1 className='h3 text-center'>Editar usuario</h1>
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
          type="text"
          value={Editarusuario.user_NombreUsuario}
          id="validationCustom01"
          label="Nombre de Usuario"
          required
          disabled/>
      </CCol>


<CCol md={6} className="">
    <CFormSelect
  value={Editarusuario.empl_Id}
  onChange={(e) => {
    setEditarusuario({ ...Editarusuario, empl_Id: e.target.value })
  }}
  id="validationCustom01"
  label="Empleado Asignado"
  required
>
  <option value="">Seleccione un Empleado</option>
  {Empleados.map((opcion) => (
    <option key={opcion.empl_Id} value={opcion.empl_Id}>
      {opcion.nombreCliente}
    </option>
  ))}
</CFormSelect>
</CCol>


<CCol md={6} className="">
    <CFormSelect
  value={Editarusuario.role_Id}
  onChange={(e) => {
    setEditarusuario({ ...Editarusuario, role_Id: e.target.value })
  }}
  id="validationCustom01"
  label="Rol"
>
  <option value="">Seleccione un Rol</option>
  {Roles.map((opcion) => (
    <option key={opcion.role_Id} value={opcion.role_Id}>
      {opcion.role_Descripcion}
    </option>
  ))}
</CFormSelect>
</CCol>

<CCol md={1} className="m-5">
  <CFormSwitch
    label="Admin"
    id="formSwitchCheckChecked"
    value={Editarusuario.user_Admin}
    defaultChecked={Editarusuario.user_Admin === true}
    onChange={(e) => {
      setEditarusuario({ ...Editarusuario, user_Admin: e.target.checked ? true : false });
    }}
  />
</CCol>


  <CCol xs={12} className='offset-8 col-12'>
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

export default Usuarios
