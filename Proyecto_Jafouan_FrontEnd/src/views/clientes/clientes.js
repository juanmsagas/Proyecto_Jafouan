import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { IconButton} from '@material-ui/core'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'


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
        CFormGroup, 
        CFormRadio,
        }
        from '@coreui/react'
import { CardHeader } from 'reactstrap'

function Clientes() {
  const [Clientes, setClientes] = useState([])
  const [sortModel, setSortModel] = useState([{ field: 'clie_Id', sort: 'asc' }])
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)

  const [Departamentos, setDepartamentosDDL] = useState([]);  
  const [Municipios, setMunicipiosDDL] = useState([]);  
  const [EstCivil, setEstCivilDDL] = useState([]);
  const [Modal, setModal] = useState(false)
  const [visibleEnca, setvisibleEnca   ] = useState(false)
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

const existeUsuarios = miArreglo.some(objeto => objeto.name === "Clientes");

if (existeUsuarios) {
  
} else {
  window.location.href = '/#/Home';
}

  const [nuevoCliente, setnuevoCliente] = useState({
    clie_Nombres: '',
    clie_Apellidos: '',
    clie_FechaNacimiento: '',
    clie_Identidad:'',
    clie_Sexo: '',
    estc_Id: 0,
    clie_Telefeno: '',
    muni_Id: '',
    clie_Direccion: '',
    clie_UserCrea:user_Crea
})

const [dept_Id, setdept_Id] = useState({
    dept_Id: ''
})

const [ElimCliente, setElimCliente] = useState({
    clie_Id: 0
  })

const [EditarCliente, setEditarCliente] = useState({
    clie_Id:0,
    clie_Nombres: '',
    clie_Apellidos: '',
    carg_Id: 0,
    clie_FechaNacimiento: '',
    clie_Identidad:'',
    clie_Sexo: '',
    estc_Id: 0,
    clie_Telefeno: '',
    muni_Id: '',
    sucu_Id: 0,
    clie_Direccion: '',
    clie_UserModifica: user_Crea,
})



const abrirPrenda = (params,event) => {
  if (event) {
    event.preventDefault()
  }
  setVisible2(!visible2)
  setvisibleEnca(!visibleEnca)
  console.log(params)
  const fecha = new Date(params.clie_FechaNacimiento);
  const fechaFormateada = fecha.toISOString().slice(0, 10);
  setValidated(false)

  setEditarCliente({
    clie_Id:params.clie_Id,
    clie_Nombres: params.clie_Nombres,
    clie_ApellIdos: params.clie_ApellIdos,
    carg_Id: params.carg_Id,
    clie_FechaNacimiento: fechaFormateada,
    clie_Identidad:params.clie_Identidad,
    clie_Sexo: params.clie_Sexo,
    estc_Id: params.estc_Id,
    clie_Telefeno: params.clie_Telefeno,
    dept_Id: params.dept_Id,
    muni_Id: params.muni_Id,
    sucu_Id: params.sucu_Id,
    clie_Direccion: params.clie_Direccion,
    clie_UserModifica:user_Crea,    
})
}

const abrirDetalles = (params,event) => {
  if (event) {
    event.preventDefault()
  }
  setVisible3(!visible3)
  setvisibleEnca(!visibleEnca)
  console.log(params)
  const fecha = new Date(params.clie_FechaNacimiento);
  const fechaFormateada = fecha.toISOString().slice(0, 10);
  setValidated(false)
  console.log(params.empl_crea
    )

  setEditarCliente({
    clie_Id:params.clie_Id,
    clie_Nombres: params.clie_Nombres,
    clie_ApellIdos: params.clie_ApellIdos,
    carg_Id: params.carg_Id,
    clie_FechaNacimiento: fechaFormateada,
    muni_Descripcion: params.muni_Descripcion,
    dept_Descripcion: params.dept_Descripcion,
    estc_Descripcion: params.estc_Descripcion,
    clie_Identidad:params.clie_Identidad,
    empl_crea: params.empl_crea    ,
    empl_Modifica: params.empl_Modifica,
    clie_FechaCreacion: params.clie_FechaCreacion,
    clie_FechaModificacion: params.clie_FechaModificacion,
    clieSexo: params.clieSexo,
    estc_Id: params.estc_Id,
    clie_Telefeno: params.clie_Telefeno,
    dept_Id: params.dept_Id,
    muni_Id: params.muni_Id,
    sucu_Id: params.sucu_Id,
    clie_Direccion: params.clie_Direccion,
    clie_UserModifica:user_Crea,    
})
}

const cerrarDetalles = (event) => {
  event.preventDefault()
  setVisible3(!visible3)
  setvisibleEnca(!visibleEnca)
  setEditarCliente({
    clie_Id:0,
    clie_Nombres: '',
    clie_Apellidos: '',
    carg_Id: 0,
    clie_FechaNacimiento: '',
    clie_Sexo: 0,
    estc_Id: 0,
    clie_Telefeno: '',
    muni_Id: '',
    sucu_Id: '',
    clie_Direccion: '',
    clie_UserModifica:user_Crea,    
})
}



const cerrarEditar = (event) => {
  event.preventDefault()
  setVisible2(!visible2)
  setvisibleEnca(!visibleEnca)
  setEditarCliente({
    clie_Id:0,
    clie_Nombres: '',
    clie_Apellidos: '',
    carg_Id: 0,
    clie_FechaNacimiento: '',
    clie_Sexo: 0,
    estc_Id: 0,
    clie_Telefeno: '',
    muni_Id: '',
    sucu_Id: '',
    clie_Direccion: '',
    clie_UserModifica:user_Crea,    
})
}

const abrirycerrarInsert = (event) => {
  event.preventDefault()
  setVisible(!visible)
  setValidated(false)
  setvisibleEnca(!visibleEnca)
  setEditarCliente({
    clie_Nombres: '',
    clie_Apellidos: '',
    carg_Id: 0,
    clie_FechaNacimiento: '',
    clie_Sexo: '',
    estc_Id: 0,
    clie_Telefeno: '',
    muni_Id: '',
    sucu_Id: 0,
    clie_Direccion: '',
    clie_UserCrea:user_Crea,
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
  if(form.checkValidity() != false){
    axios.post('api/Clientes/Insert', nuevoCliente, config)
        .then((response) => {
          if (response.data.code == 409)
          {
            toast.error('No puede haber números de identidad repetidos.');
          }
          else{
            console.log(response.data)
            setVisible(false)
            setvisibleEnca(!visibleEnca)
            setnuevoCliente({
              pren_Descripcion: '',
              pren_Talla: '',
              desc_Id: '',
              pren_Precio: 0,
              marc_Id: '',
              cate_Id: '',
              fard_Id: '',
              pren_Imagen: '',
              pren_UserCrea: user_Crea
            })
            toast.success('Cliente insertado correctamente.')};

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
  axios.put('api/Clientes/Update', EditarCliente, config)
      .then((response) => {
          console.log(response.data)
          setVisible2(!visible2)
          setvisibleEnca(!visibleEnca)
          setEditarCliente({
            clie_Nombres: '',
            clie_Apellidos: '',
            carg_Id: 0,
            clie_FechaNacimiento: '',
            clie_Identidad:'',
            clie_Sexo: '',
            estc_Id: 0,
            clie_Telefeno: '',
            muni_Id: '',
            sucu_Id: 0,
            clie_Direccion: '',
            clie_UserCrea:user_Crea,
        })
        toast.success('Cliente editado correctamente.');

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
    axios.put('api/Clientes/Delete', ElimCliente, config)
        .then((response) => {
            console.log(response.data)
            setModal(false)
            setElimCliente({
              clie_Id: '',
          })
          toast.success('Cliente eliminado correctamente.');

          console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
      
  }

  
  //enviar id del departamento   
  const enviarDeptId = (event,departamento) => {
    if (event) {
        event.preventDefault()
      }
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    console.log(departamento);
    axios.post('api/Municipios/ListarMunisDeptos',  departamento , config)
        .then((response) => {
            console.log(response.data)     
        setMunicipiosDDL(response.data);
        
        })
        .catch((error) => {
            console.log(error)
        })
}
      
  //peticion a la api listado   
  useEffect(() => {
    axios.get('api/Clientes/Index').then((response) => {
      console.log('entra')
      const insertarid = response.data.map((row) => ({
        ...row,
        id: row.clie_Id,
      }))
      setClientes(insertarid)
    })
  }, [])

  const handleSortModelChange = (model) => {
    setSortModel(model)
  }

  const columns = [
    { field: 'clie_Id', headerName: 'ID',  width: 90},
    { field: 'nombreCliente', headerName: 'Cliente',  width: 150},
    { field: 'clie_Identidad', headerName: 'IDENTIDAD',  width: 150},
    { field: 'clieSexo', headerName: 'Sexo',  width: 150},
    { field: 'dept_Descripcion', headerName: 'Departamento',  width: 150},
    { field: 'muni_Descripcion', headerName: 'Municipio',  width: 150},
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 300,
      renderCell: (params) => (
        <div>
      
        
            <CButton  color="info ms-2" variant="outline" onClick={() => abrirDetalles(params.row)}>
            <VisibilityIcon />
          </CButton>

          <CButton color="warning ms-2" variant="outline" onClick={(e) => {
    abrirPrenda(params.row, e);
    setdept_Id(prevDept_Id => {
        const newDept_Id = { ...prevDept_Id, dept_Id:  params.row.dept_Id };
        enviarDeptId(e, newDept_Id); 
        return newDept_Id;
    });
    }}>
    <EditIcon />
        </CButton>

          
        <CButton color="danger ms-2" variant="outline" onClick={() => ModalFun(params.row.clie_Id)}>
            <DeleteIcon />
            </CButton>
        
        </div>
      ),
    },
  ]

  const ModalFun = (params,event)=>{
    if (event) {
      event.preventDefault()
    }
    setModal(!visible)
    setElimCliente({
      clie_Id: params,
     
  })
  }

  useEffect(() => {
    axios.get('api/Departamentos/Index')
    .then(response => {
      setDepartamentosDDL(response.data);
      console.log(response.data)     

    })
    .catch(error => { 
      console.error('Error fetching data from API:', error);
    });



    axios.get('/api/EstadosCiviles/Index')
    .then(response => {
      setEstCivilDDL(response.data);
      console.log(response.data)     

    })
    .catch(error => {
      console.error('Error fetching data from API:', error);
    });



  }, []);



  return (
    <div style={{ width: '100%' }}>
      <div className='col-12'>
    <CCard className="p-5">
    <CCardHeader className='rounded-top mb-4' style={{ fontFamily: "revert-layer",  textAlign: 'center', fontSize: 50   }}>Clientes</CCardHeader>
      <CCollapse visible={!visibleEnca}>

    {/*Modal Eliminar*/}

    <CModal alignment="center"  visible={Modal} onClick={() => setModal(!Modal)}>
      
      <CModalBody className='pt-5 pb-5' style={{boxShadow:5}}>
      <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={handleSubmitD}
>
      <CFormInput
        type="hidden"
    value={ElimCliente.clie_Id}
    id="validationCustom01"
    disabled
    required/>
            <center>
        <CModalTitle>Esta seguro que desea Eliminar este registro?</CModalTitle>
        </center>
    <center>
     <CButton color="light"  className='col-5 me-3' onClick={() => setModal(!Modal)}>
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
    onClick={abrirycerrarInsert}  className="ml-auto">
       <AddIcon  className="nav-icon ms-2 mb-1" />
      Nuevo
    </CButton>
          </div>
      </div>
    </CCollapse>

 {/*Formulario Insertar*/}
 
    <CCollapse visible={visible} className='col-12'>
    
      <CCard className="mt-3">
        <CCardHeader>
          <h1 className='h3 text-center'>Nuevo Cliente</h1>
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
    value={nuevoCliente.clie_Nombres}
    onChange={(e) => setnuevoCliente({ ...nuevoCliente, clie_Nombres: e.target.value })}
    id="validationCustom01"
    label="Nombres"
    required/>

    </CCol>



    <CCol md={6} className=''>

<CFormInput
type="text"
value={nuevoCliente.clie_Apellidos}
onChange={(e) => setnuevoCliente({ ...nuevoCliente, clie_Apellidos: e.target.value })}
id="validationCustom01"
label="Apellidos"
required/>

</CCol>
    

<CCol md={4} className="">
<CFormInput
type="text"
value={nuevoCliente.clie_Identidad}
onChange={(e) => setnuevoCliente({ ...nuevoCliente, clie_Identidad: e.target.value })}
id="validationCustom01"
label="Identidad"
required/>

</CCol>



<CCol md={4} className="">
  <CFormSelect
    value={nuevoCliente.estc_Id}
    onChange={(e) =>
        setnuevoCliente({ ...nuevoCliente, estc_Id: e.target.value })
    }
    id="validationCustom01"
    label="Estado Civil"
    required>
    <option value="">Seleccione un Estado Civil</option>
    {EstCivil.map((opcion) => (
      <option key={opcion.estc_Id} value={opcion.estc_Id}>
        {opcion.estc_Descripcion}
      </option>
    ))}
  </CFormSelect>

</CCol>


<CCol md={1} className="">
  <label>Sexo</label>
  <CFormCheck type="radio" name="sexo" id="Femenino" value="F" label="Femenino" required checked={nuevoCliente.clie_Sexo === "F"} onChange={(e) => setnuevoCliente({ ...nuevoCliente, clie_Sexo: e.target.value })}/> 
</CCol>
<CCol md={1} className="">
<label></label>
  <CFormCheck type="radio" name="sexo" id="Masculino" value="M" label="Masculino" required checked={nuevoCliente.clie_Sexo === "M"} onChange={(e) => setnuevoCliente({ ...nuevoCliente, clie_Sexo: e.target.value })}/>
</CCol>


    

    <CCol md={6} className="">
    <CFormSelect
  value={dept_Id.dept_Id}
  onChange={(e) => {
    setdept_Id(prevDept_Id => {
      const newDept_Id = { ...prevDept_Id, dept_Id:  e.target.value };
      enviarDeptId(e, newDept_Id); // llamada a la función que envía el dept_Id a la API
      return newDept_Id;
    }); 
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

<CCol md={6} className="">
  <CFormSelect
    value={nuevoCliente.muni_Id}
    onChange={(e) =>
        setnuevoCliente({ ...nuevoCliente, muni_Id: e.target.value })
    }
    id="validationCustom01"
    label="Municipio"
    required>
    <option value="">Seleccione un Municipio</option>
    {Municipios.map((opcion) => (
      <option key={opcion.muni_Id} value={opcion.muni_Id    }>
        {opcion.muni_Descripcion}
      </option>
    ))}
  </CFormSelect>

</CCol>


<CCol md={6} className="">
<CFormInput
    type="date"
    value={nuevoCliente.clie_FechaNacimiento}
    onChange={(e) => setnuevoCliente({ ...nuevoCliente, clie_FechaNacimiento: e.target.value })}
    id="validationCustom01"
    label="Fecha de Nacimiento"
    required/>

</CCol>



<CCol md={6} className=''>

<CFormInput
type="text"
value={nuevoCliente.clie_Telefeno}
onChange={(e) => setnuevoCliente({ ...nuevoCliente, clie_Telefeno: e.target.value })}
id="validationCustom01"
label="Telefono"
required/>

</CCol>

<CCol md={12} className=''>

<CFormInput
type="text"
value={nuevoCliente.clie_Direccion}
onChange={(e) => setnuevoCliente({ ...nuevoCliente, clie_Direccion: e.target.value })}
id="validationCustom01"
label="Dirección"
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

<CCol md={0} className=''>
<CFormInput
type="hidden"
value={EditarCliente.clie_Id}
onChange={(e) => setEditarCliente({ ...EditarCliente, clie_Id: e.target.value })}
required/>

</CCol>


<CCol md={6} className=''>

<CFormInput
type="text"
value={EditarCliente.clie_Nombres}
onChange={(e) => setEditarCliente({ ...EditarCliente, clie_Nombres: e.target.value })}
id="validationCustom01"
label="Nombres"
required/>

</CCol>



<CCol md={6} className=''>

<CFormInput
type="text"
value={EditarCliente.clie_ApellIdos}
onChange={(e) => setEditarCliente({ ...EditarCliente, clie_Apellidos: e.target.value })}
id="validationCustom01"
label="Apellidos"
required/>

</CCol>



<CCol md={4} className="">
<CFormInput
type="text"
value={EditarCliente.clie_Identidad}
onChange={(e) => setEditarCliente({ ...EditarCliente, clie_Identidad: e.target.value })}
id="validationCustom01"
label="Identidad"
required/>

</CCol>


<CCol md={4} className="">
<CFormSelect
value={EditarCliente.estc_Id}
onChange={(e) =>
setEditarCliente({ ...EditarCliente, estc_Id: e.target.value })
}
id="validationCustom01"
label="Estado Civil"
required>
<option value="">Seleccione un Estado Civil</option>
{EstCivil.map((opcion) => (
<option key={opcion.estc_Id} value={opcion.estc_Id}>
{opcion.estc_Descripcion}
</option>
))}
</CFormSelect>

</CCol>

<CCol md={1} className="">
<label>Sexo</label>
<CFormCheck type="radio" name="sexo" id="Femenino" value="F" label="Femenino" required checked={EditarCliente.clie_Sexo === "F"} onChange={(e) => setEditarCliente({ ...EditarCliente, clie_Sexo: e.target.value })}/> 
</CCol>
<CCol md={1} className="">
<label>Sexo</label>
<CFormCheck type="radio" name="sexo" id="Masculino" value="M" label="Masculino" required checked={EditarCliente.clie_Sexo === "M"} onChange={(e) => setEditarCliente({ ...EditarCliente, clie_Sexo: e.target.value })}/>
</CCol>



<CCol md={6} className="">
<CFormSelect
value={EditarCliente.dept_Id}
onChange={(e) => {
setdept_Id(prevDept_Id => {
const newDept_Id = { ...prevDept_Id, dept_Id:  e.target.value };
enviarDeptId(e, newDept_Id); // llamada a la función que envía el dept_Id a la API
return newDept_Id;
});
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

<CCol md={6} className="">
<CFormSelect
value={EditarCliente.muni_Id}
onChange={(e) =>
setEditarCliente({ ...EditarCliente, muni_Id: e.target.value })
}
id="validationCustom01"
label="Municipio"
required>
<option value="">Seleccione un Municipio</option>
{Municipios.map((opcion) => (
<option key={opcion.muni_Id} value={opcion.muni_Id    }>
{opcion.muni_Descripcion}
</option>
))}
</CFormSelect>

</CCol>


<CCol md={6} className="">
<CFormInput
type="date"
value={EditarCliente.clie_FechaNacimiento}
onChange={(e) => setEditarCliente({ ...EditarCliente, clie_FechaNacimiento: e.target.value })}
id="validationCustom01"
label="Fecha de Nacimiento"
required/>

</CCol>

<CCol md={6} className=''>

<CFormInput
type="text"
value={EditarCliente.clie_Telefeno}
onChange={(e) => setEditarCliente({ ...EditarCliente, clie_Telefeno: e.target.value })}
id="validationCustom01"
label="Telefono"
required/>

</CCol>

<CCol md={12} className=''>

<CFormInput
type="text"
value={EditarCliente.clie_Direccion}
onChange={(e) => setEditarCliente({ ...EditarCliente, clie_Direccion: e.target.value })}
id="validationCustom01"
label="Dirección"
required/>

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





   {/*Formulario Detalles*/}
   <CCollapse visible={visible3} className='col-12 '>
    
    <CCard className="mt-3">
      <CCardHeader>
        <h1 className='h3 text-center'>Detalles</h1>
      </CCardHeader>
      <CCardBody>
    <CForm
  className="row g-3 needs-validation"
>

<CCol md={0} className=''>
<CFormInput
type="hidden"
value={EditarCliente.clie_Id}
onChange={(e) => setEditarCliente({ ...EditarCliente, clie_Id: e.target.value })}
required/>

</CCol>


<CCol md={6} className=''>

<CFormInput
type="disabled"
value={EditarCliente.clie_Nombres}
onChange={(e) => setEditarCliente({ ...EditarCliente, clie_Nombres: e.target.value })}
id="validationCustom01"
label="Nombres"
disabled
required/>

</CCol>



<CCol md={6} className=''>

<CFormInput
type="disabled"
value={EditarCliente.clie_ApellIdos}
onChange={(e) => setEditarCliente({ ...EditarCliente, clie_Apellidos: e.target.value })}
id="validationCustom01"
label="Apellidos"
disabled
required/>

</CCol>



<CCol md={4} className="">
<CFormInput
type="disabled"
value={EditarCliente.clie_Identidad}
onChange={(e) => setEditarCliente({ ...EditarCliente, clie_Identidad: e.target.value })}
id="validationCustom01"
label="Identidad"
disabled
required/>

</CCol>

<CCol md={4} className="">
<CFormInput
type="disabled"
value={EditarCliente.estc_Descripcion}
onChange={(e) => setEditarCliente({ ...EditarCliente, estc_Descripcion: e.target.value })}
id="validationCustom01"
disabled
label="Estado Civil"
required/>

</CCol>

<CCol md={4} className="">
<CFormInput
type="disabled"
value={EditarCliente.clieSexo}
onChange={(e) => setEditarCliente({ ...EditarCliente, clieSexo: e.target.value })}
id="validationCustom01"
disabled
label="Sexo"
required/>

</CCol>


<CCol md={6} className="">
<CFormInput
type="disabled"
value={EditarCliente.dept_Descripcion}
onChange={(e) => setEditarCliente({ ...EditarCliente, dept_Descripcion: e.target.value })}
id="validationCustom01"
disabled
label="Departamento"
required/>

</CCol>



<CCol md={6} className="">
<CFormInput
type="disabled"
value={EditarCliente.muni_Descripcion}
onChange={(e) => setEditarCliente({ ...EditarCliente, muni_Descripcion: e.target.value })}
id="validationCustom01"
label="Municipio"
disabled
required/>

</CCol>

<CCol md={6} className="">
<CFormInput
type="disabled"
value={EditarCliente.clie_FechaNacimiento}
onChange={(e) => setEditarCliente({ ...EditarCliente, clie_FechaNacimiento: e.target.value })}
id="validationCustom01"
label="Fecha de Nacimiento"
disabled
required/>

</CCol>

<CCol md={6} className=''>

<CFormInput
type="disabled"
value={EditarCliente.clie_Telefeno}
onChange={(e) => setEditarCliente({ ...EditarCliente, clie_Telefeno: e.target.value })}
id="validationCustom01"
label="Telefono"
disabled
required/>

</CCol>

<CCol md={12} className=''>

<CFormInput
type="disabled"
value={EditarCliente.clie_Direccion}
onChange={(e) => setEditarCliente({ ...EditarCliente, clie_Direccion: e.target.value })}
id="validationCustom01"
label="Dirección"
disabled
required/>

</CCol>

<table className='table'>
                          <thead>
                            <tr>
                              <th>Accion</th>
                              <th>Usuario</th>
                              <th>Fecha</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Creación</td>
                              <td>{EditarCliente.empl_crea}</td>
                              <td>{EditarCliente.clie_FechaCreacion}</td>
                            </tr>
                            <tr>
                              <td>Modificación</td>
                              <td>{EditarCliente.empl_Modifica}</td>
                              <td>{EditarCliente.clie_FechaModificacion}</td>
                            </tr>
                          </tbody>
                        </table>




  <CCol xs={12} className='offset-5'>

    <CButton color="danger text-light" className='ms-2' href="#"  onClick={cerrarDetalles}>
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
        rows={Clientes}
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

export default Clientes
