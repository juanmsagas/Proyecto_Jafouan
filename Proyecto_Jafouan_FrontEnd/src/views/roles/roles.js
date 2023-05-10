import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import MonitorIcon from '@mui/icons-material/Monitor';
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
        CAccordion,
        CAccordionHeader,
        CAccordionItem,
        CAccordionBody,
        }
        from '@coreui/react'
        import MultiSelect from 'react-multiselect-checkboxes';


function Roles() {
  const [roles, setRoles] = useState([])
  const [sortModel, setSortModel] = useState([{ field: 'role_Id', sort: 'asc' }])
  const [visible, setVisible] = useState(false)
  const [insertado, setinsertado] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [Modal, setModal] = useState(false)
  const [visibleEnca, setvisibleEnca   ] = useState(false)
  const [Pantallas, setPantallasDDL] = useState([]);  
  const [validated, setValidated] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [rolId, setrolId] = useState(0)


  const [Role_Id_Pant, set_Role_Id_Pant] = useState({
    role_Id: 0,
    pant_Id: 0,
    pantrol_UserCrea:1,
    role_Descripcion:''
})


const [Role_Id_PantEnvio, set_Role_Id_Pant_Envio] = useState({
  role_Id: 0,
  pant_Id: 0,
  pantrol_UserCrea:1,
})

  const [nuevoRol, setNuevoRol] = useState({
    role_Descripcion: '',
    role_UserCrea:1
})
const [ElimRol, setElimRol] = useState({
  role_Id: ''
})
const [EditarRol, setEditarRol] = useState({
  role_Id: '',
  role_Descripcion: '',
  role_UserModifica:1
})

const abrireditar = (params,event) => {
  if (event) {
    event.preventDefault()
  }
  setVisible2(!visible2)
  setvisibleEnca(!visibleEnca)
  setValidated(false)
  console.log(params)
  setEditarRol({
    role_Id: params.role_Id,
    role_Descripcion:  params.role_Descripcion,
    role_UserModifica:1
}
)}

const cerrarEditar = (event) => {
  event.preventDefault()
  setVisible2(!visible2)
  setValidated(false)
  setvisibleEnca(!visibleEnca)
  setEditarRol({
    role_Id: '',
    role_Descripcion: '',
    role_UserModifica:1
}
)}

const abrirycerrarInsert = (event) => {
  event.preventDefault()
  setVisible(!visible)
  setValidated(false)
  setvisibleEnca(!visibleEnca)
  setNuevoRol({
    role_Descripcion: '',
    role_UserCrea:1
}
)}


const ModalFun = (params,event) => {
  if (event) {
    event.preventDefault()
  }
  setModal(!visible)
  setElimRol({
    role_Id: params,
   
}
)}

useEffect(() => {
  axios.get('api/Pantallas/Index')
    .then(response => {
      setPantallasDDL(response.data);
    })
    .catch(error => { 
      console.error('Error fetching data from API:', error);
    });
}, []);
const options = Pantallas.map(pantalla => ({ label: pantalla.pant_Nombre, value: pantalla.pant_Id }));


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
    axios.post('api/Roles/Insert', nuevoRol, config)
        .then((response) => {
          console.log(response.data)

          set_Role_Id_Pant({
            role_Id:response.data[1].codeStatus,
            role_Descripcion:response.data[1].messageStatus
          })
          sessionStorage.setItem('id', response.data[1].codeStatus);
          console.log(Role_Id_Pant.role_Id)
          if (response.data[0].codeStatus==200) {
            setinsertado(!insertado)
            console.log(response.data[1].codeStatus)
            console.log(Role_Id_Pant.role_Id)
            setNuevoRol({
              role_Descripcion: '',
              role_UserCrea:1
          })
          setVisible(!visible)
          }
          
        })
        .catch((error) => {
            console.log(error)
        })
      }
}



  //peticion a la api insert pantallas al rol
  const PantallasPorRol = (pant_Id) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios.post('api/Pantallas/PantallasAgg', Role_Id_PantEnvio, config)
        .then((response) => {
          console.log(response.data)

          console.log(Role_Id_PantEnvio)
        })
        .catch((error) => {
            console.log(error)
        })
}


const handleOptionChange = (selected) => {
  setSelectedOptions(selected);
  const id = selectedOptions[selectedOptions.lastIndex].value
  const rol=  sessionStorage.getItem('id');

  
  set_Role_Id_Pant_Envio({
    pant_Id:id,
    role_Id:rol,
    pantrol_UserCrea:1
  })
  PantallasPorRol(id);
};

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
  axios.put('api/Roles/Update', EditarRol, config)
      .then((response) => {
          console.log(response.data)
          setVisible2(!visible2)
          setvisibleEnca(!visibleEnca)
          setEditarRol({
            role_Id: '',
            role_Descripcion: '',
            role_UserModifica:1
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
  axios.put('api/Roles/Delete', ElimRol, config)
      .then((response) => {
          console.log(response.data)
          setModal(false)
          setElimRol({
            role_Id: '',
        })
        console.log(response.data)
      })
      .catch((error) => {
          console.log(error)
      })
    
}


  //peticion a la api listado   
  useEffect(() => {
    axios.get('api/Roles/Index').then((response) => {
      console.log('entra')
      const insertarid = response.data.map((row) => ({
        ...row,
        id: row.role_Id,
      }))
      setRoles(insertarid)
    })
  }, [])

  const handleSortModelChange = (model) => {
    setSortModel(model)
  }

  const columns = [
    { field: 'role_Id', headerName: 'ID', flex:1, },
    { field: 'role_Descripcion', headerName: 'Rol', flex:2, },
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
          
            <CButton color="dark ms-2" variant="outline" >
              <MonitorIcon/>
            </CButton>

            <CButton color="danger ms-2" variant="outline" onClick={() => ModalFun(params.row.role_Id)}>
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

      <CCardHeader className='rounded-top mb-4' style={{ fontFamily: "revert-layer",  textAlign: 'center', fontSize: 50   }}>Roles</CCardHeader>
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
    value={ElimRol.role_Id}
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



  <CCollapse visible={insertado} className='col-8 offset-2'>
    <CCard className="mt-3">
        <CCardHeader>
          <h1 className='h4 text-center' style={{ fontFamily: "revert-layer"}}>Asignacion de accesos</h1>
        </CCardHeader>
        <CCardBody>
      <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={handleSubmitI}
>
   
      
<CCol md={0}  className='offset-1 mt-5'>
<CFormInput
type="hidden"
value={Role_Id_Pant.role_Id}
id="validationCustom01"
required/>
</CCol>
   
<CCol md={7} className='offset-1'>
<CFormInput
type="text"
label='Rol'
value={Role_Id_Pant.role_Descripcion}
id="validationCustom01"
disabled
required/>

</CCol>

<CCol md={3}>
  <label className='label mb-2'>Pantallas Asignadas</label>
  <MultiSelect 
    key={options}
    options={options}
    value={selectedOptions}
    onChange={handleOptionChange}
    labelledBy="Pantallas"
  />
</CCol>

<center>
  <CCol xs={12}>
      <CButton color="primary"  type="submit">
        Guardar
      </CButton>
    </CCol>
</center>
  </CForm>

  

        </CCardBody>
      </CCard>
</CCollapse>

 {/*Formulario Insertar*/}
 
    <CCollapse visible={visible} className=''>
 <CCol md={8} className='offset-2'>
      <CCard className="mt-3">
        <CCardHeader>
          <h1 className='h4 text-center' style={{ fontFamily: "revert-layer"}}>Nuevo Rol</h1>
        </CCardHeader>
        <CCardBody>
      <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={handleSubmitI}
>

      
       <CCol md={12}>
        <CFormInput
    type="text"
    value={nuevoRol.role_Descripcion}
    onChange={(e) => setNuevoRol({ ...nuevoRol, role_Descripcion: e.target.value })}
    id="validationCustom01"
    label="Nombre Rol"
    required/>

    </CCol>
  

    <CCol xs={12} className='offset-4 '>
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
</CCol>
    </CCollapse>


    

 {/*Formulario Editar*/}
    <CCollapse visible={visible2}>
    
    <CCard className="mt-3">
      <CCardHeader>
        <h1 className='h3 text-center'>Editar Rol</h1>
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
  value={EditarRol.role_Id}
  onChange={(e) => setEditarRol({ ...EditarRol, role_Id: e.target.value })}
  id="validationCustom01"
  required
    />
  </CCol>
     <CCol md={12} className=''>

      <CFormInput
  type="text"
  minLength={2}
  value={EditarRol.role_Descripcion}
  onChange={(e) => setEditarRol({ ...EditarRol, role_Descripcion: e.target.value })}
  id="validationCustom01"
  label="Nombre Rol"
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
        rows={roles}
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

export default Roles
