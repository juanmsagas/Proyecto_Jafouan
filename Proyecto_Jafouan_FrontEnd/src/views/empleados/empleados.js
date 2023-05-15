import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { IconButton } from '@material-ui/core'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'


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

function Empleados() {
  const [empleados, setempleados] = useState([])
  const [sortModel, setSortModel] = useState([{ field: 'pren_Id', sort: 'asc' }])
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)
  const [Departamentos, setDepartamentosDDL] = useState([]);
  const [Municipios, setMunicipiosDDL] = useState([]);
  const [Cargos, setCargosDDL] = useState([]);
  const [EstCivil, setEstCivilDDL] = useState([]);
  const [sucursal, setsucursalDDL] = useState([]);
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

const existeUsuarios = miArreglo.some(objeto => objeto.name === "Empleados");

if (existeUsuarios) {
  
} else {
  window.location.href = '/#/Home';
}

  const [nuevoEmpleado, setnuevoEmpleado] = useState({
    empl_Nombres: '',
    empl_Apellidos: '',
    carg_Id: 0,
    empl_FechaNacimiento: '',
    empl_Identidad: '',
    empl_Sexo: '',
    estc_Id: 0,
    empl_Telefeno: '',
    muni_Id: '',
    sucu_Id: 0,
    empl_Direccion: '',
    empl_UserCrea: user_Crea
  })

  const [dept_Id, setdept_Id] = useState({
    dept_Id: ''
  })

  const [ElimEmpleado, setElimEmpleado] = useState({
    empl_Id: 0
  })

  const [EditarEmpleado, setEditarEmpleado] = useState({
    empl_Id: 0,
    empl_Nombres: '',
    empl_Apellidos: '',
    carg_Id: 0,
    empl_FechaNacimiento: '',
    empl_Identidad: '',
    empl_Sexo: '',
    estc_Id: 0,
    empl_Telefeno: '',
    muni_Id: '',
    sucu_Id: 0,
    empl_Direccion: '',
    empl_UserModifica: user_Crea
  })

  const abrirPrenda = (params, event) => {
    if (event) {
      event.preventDefault()
    }
    setVisible2(!visible2)
    setValidated(false)
    setvisibleEnca(!visibleEnca)
    console.log(params)
    const fecha = new Date(params.empl_FechaNacimiento);
    const fechaFormateada = fecha.toISOString().slice(0, 10);
    console.log(fechaFormateada); // '2005-02-01'

    setEditarEmpleado({
      empl_Id: params.empl_Id,
      empl_Nombres: params.empl_Nombres,
      empl_Apellidos: params.empl_Apellidos,
      carg_Id: params.carg_Id,
      empl_FechaNacimiento: fechaFormateada,
      empl_Identidad: params.empl_Identidad,
      empl_Sexo: params.empl_Sexo,
      estc_Id: params.estc_Id,
      empl_Telefeno: params.empl_Telefeno,
      dept_Id: params.dept_Id,
      muni_Id: params.muni_Id,
      sucu_Id: params.sucu_Id,
      empl_Direccion: params.empl_Direccion,
      empl_UserModifica: user_Crea
    })
  }


  const abrirDetalles = (params, event) => {
    if (event) {
      event.preventDefault()
    }
    setVisible3(!visible3)
    setValidated(false)
    setvisibleEnca(!visibleEnca)
    console.log(params)
    const fecha = new Date(params.empl_FechaNacimiento);
    const fechaFormateada = fecha.toISOString().slice(0, 10);
    console.log(fechaFormateada); // '2005-02-01'

    setEditarEmpleado({
      empl_Id: params.empl_Id,
      empl_Nombres: params.empl_Nombres,
      empl_Apellidos: params.empl_Apellidos,
      carg_Id: params.carg_Id,
      empl_FechaNacimiento: fechaFormateada,
      empl_Identidad: params.empl_Identidad,
      dept_Descripcion: params.dept_Descripcion,
      muni_Descripcion: params.muni_Descripcion,
      carg_Descripcion: params.carg_Descripcion,
      sucu_Nombre: params.sucu_Nombre,
      estc_Descripcion: params.estc_Descripcion,
      empl_crea: params.empl_crea,
      empl_Modifica: params.empl_Modifica,
      empl_FechaCreacion: params.empl_FechaCreacion,
      empl_FechaModificacion: params.empl_FechaModificacion,
      emplSexo: params.emplSexo,
      empl_Sexo: params.empl_Sexo,
      estc_Id: params.estc_Id,
      empl_Telefeno: params.empl_Telefeno,
      dept_Id: params.dept_Id,
      muni_Id: params.muni_Id,
      sucu_Id: params.sucu_Id,
      empl_Direccion: params.empl_Direccion,
      empl_UserModifica: user_Crea
    })
  }


  const cerrarDetalles = (event) => {
    event.preventDefault()
    setVisible3(!visible3)
    setvisibleEnca(!visibleEnca)
    setEditarEmpleado({
      empl_Id: 0,
      empl_Nombres: '',
      empl_Apellidos: '',
      carg_Id: 0,
      empl_FechaNacimiento: '',
      empl_Sexo: 0,
      estc_Id: 0,
      empl_Telefeno: '',
      muni_Id: '',
      sucu_Id: '',
      empl_Direccion: '',
      empl_UserModifica: user_Crea
    })
  }


  const cerrarEditar = (event) => {
    event.preventDefault()
    setVisible2(!visible2)
    setvisibleEnca(!visibleEnca)
    setEditarEmpleado({
      empl_Id: 0,
      empl_Nombres: '',
      empl_Apellidos: '',
      carg_Id: 0,
      empl_FechaNacimiento: '',
      empl_Sexo: 0,
      estc_Id: 0,
      empl_Telefeno: '',
      muni_Id: '',
      sucu_Id: '',
      empl_Direccion: '',
      empl_UserModifica: user_Crea
    })
  }

  const abrirycerrarInsert = (event) => {
    event.preventDefault()
    setVisible(!visible)
    setValidated(false)
    setvisibleEnca(!visibleEnca)
    setEditarEmpleado({
      empl_Nombres: '',
      empl_Apellidos: '',
      carg_Id: 0,
      empl_FechaNacimiento: '',
      empl_Sexo: '',
      estc_Id: 0,
      empl_Telefeno: '',
      muni_Id: '',
      sucu_Id: 0,
      empl_Direccion: '',
      empl_UserCrea: user_Crea
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
    if (form.checkValidity() != false) {
      axios.post('/api/Empleados/Insert', nuevoEmpleado, config)
        .then((response) => {
          if (response.data.code == 409)
          {
            toast.error('No puede haber números de identidad repetidos.');
          }
          else{
          console.log(response.data)
          setVisible(false)
          setvisibleEnca(!visibleEnca)
          setnuevoEmpleado({
            empl_Nombres: '',
            empl_Apellidos: '',
            carg_Id: 0,
            empl_FechaNacimiento: '',
            empl_Identidad: '',
            empl_Sexo: '',
            estc_Id: 0,
            empl_Telefeno: '',
            muni_Id: '',
            sucu_Id: 0,
            empl_Direccion: '',
            empl_UserCrea: user_Crea
          })
          toast.success('Empleado insertado correctamente.')};

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
    if (form.checkValidity() != false) {
      axios.put('api/Empleados/Update', EditarEmpleado, config)
        .then((response) => {
          console.log(response.data)
          setVisible2(!visible2)
          setvisibleEnca(!visibleEnca)
          setEditarEmpleado({
            empl_Nombres: '',
            empl_Apellidos: '',
            carg_Id: 0,
            empl_FechaNacimiento: '',
            empl_Identidad: '',
            empl_Sexo: '',
            estc_Id: 0,
            empl_Telefeno: '',
            muni_Id: '',
            sucu_Id: 0,
            empl_Direccion: '',
            empl_UserCrea: user_Crea
          })
          toast.success('Empleado editado correctamente.');

          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
          toast.success(error);

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
    axios.put('api/Empleados/Delete', ElimEmpleado, config)
      .then((response) => {
        console.log(response.data)
        setModal(false)
        setElimEmpleado({
          empl_Id: 0,
        })
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }


  //enviar id del departamento   
  const enviarDeptId = (event, departamento) => {
    if (event) {
      event.preventDefault()
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    console.log(departamento);
    axios.post('api/Municipios/ListarMunisDeptos', departamento, config)
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
    axios.get('api/Empleados/Index').then((response) => {
      const insertarid = response.data.map((row) => ({
        ...row,
        id: row.empl_Id,
      }))
      setempleados(insertarid)
    })
  }, [])

  const handleSortModelChange = (model) => {
    setSortModel(model)
  }

  const columns = [
    { field: 'empl_Id', headerName: 'ID', width: 90 },
    { field: 'nombreCliente', headerName: 'Empleado', width: 150 },
    { field: 'carg_Descripcion', headerName: 'Cargo', width: 150 },
    { field: 'emplSexo', headerName: 'Sexo', width: 150 },
    { field: 'dept_Descripcion', headerName: 'Departamento', width: 150 },
    { field: 'muni_Descripcion', headerName: 'Municipio', width: 150 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 300,
      renderCell: (params) => (
        <div>


          <CButton color="info ms-2" variant="outline" onClick={() => abrirDetalles(params.row)}>
            <VisibilityIcon />
          </CButton>

          <CButton color="warning ms-2" variant="outline" onClick={(e) => {
            abrirPrenda(params.row, e);
            setdept_Id(prevDept_Id => {
              const newDept_Id = { ...prevDept_Id, dept_Id: params.row.dept_Id };
              enviarDeptId(e, newDept_Id); // llamada a la función que envía el dept_Id a la API
              return newDept_Id;
            });
          }}>
            <EditIcon />
          </CButton>


          <CButton color="danger ms-2" variant="outline" onClick={() => ModalFun(params.row.empl_Id)}>
            <DeleteIcon />
          </CButton>

        </div>
      ),
    },
  ]

  const ModalFun = (params, event) => {
    if (event) {
      event.preventDefault()
    }
    setModal(!visible)
    setElimEmpleado({
      empl_Id: params,

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


    axios.get('/api/Sucursales/Index')
      .then(response => {
        setsucursalDDL(response.data);
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

    axios.get('api/Cargos/Index')
      .then(response => {
        setCargosDDL(response.data);
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
          <CCardHeader
            className='rounded-top mb-4'
            style={{
              fontFamily: "revert-layer",
              textAlign: 'center',
              fontSize: 50,
              backgroundPosition: '',
            }}
          >
            Empleados
          </CCardHeader>

          <CCollapse visible={!visibleEnca}>

            {/*Modal Eliminar*/}

            <CModal alignment="center" visible={Modal} onClick={() => setModal(!Modal)}>

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
                    value={ElimEmpleado.empl_Id}
                    id="validationCustom01"
                    disabled
                    required />
                  <center>
                    <CModalTitle>Esta seguro que desea Eliminar este registro?</CModalTitle>
                  </center>
                  <center>
                    <CButton color="light" className='col-5 me-3' onClick={() => setModal(!Modal)}>
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
                  onClick={abrirycerrarInsert} className="ml-auto">
                  <AddIcon className="nav-icon ms-2 mb-1" />
                  Nuevo
                </CButton>
              </div>
            </div>
          </CCollapse>

          {/*Formulario Insertar*/}

          <CCollapse visible={visible} className='col-12'>

            <CCard className="mt-3">
              <CCardHeader>
                <h1 className='h3 text-center'>Nuevo Empleado</h1>
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
                      value={nuevoEmpleado.empl_Nombres}
                      onChange={(e) => setnuevoEmpleado({ ...nuevoEmpleado, empl_Nombres: e.target.value })}
                      id="validationCustom01"
                      label="Nombres"
                      required />

                  </CCol>



                  <CCol md={6} className=''>

                    <CFormInput
                      type="text"
                      value={nuevoEmpleado.empl_Apellidos}
                      onChange={(e) => setnuevoEmpleado({ ...nuevoEmpleado, empl_Apellidos: e.target.value })}
                      id="validationCustom01"
                      label="Apellidos"
                      required />

                  </CCol>

                  <CCol md={4} className="">
                    <CFormSelect
                      value={nuevoEmpleado.carg_Id}
                      onChange={(e) =>
                        setnuevoEmpleado({ ...nuevoEmpleado, carg_Id: e.target.value })
                      }
                      id="validationCustom01"
                      label="Cargos"
                      required
                    >
                      <option value="">Seleccione un Cargo</option>
                      {Cargos.map((opcion) => (
                        <option key={opcion.carg_Id} value={opcion.carg_Id}>
                          {opcion.carg_Descripcion}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>

                  <CCol md={4} className="">
                    <CFormInput
                      type="text"
                      value={nuevoEmpleado.empl_Identidad}
                      onChange={(e) => setnuevoEmpleado({ ...nuevoEmpleado, empl_Identidad: e.target.value })}
                      id="validationCustom01"
                      label="Identidad"
                      required />

                  </CCol>

                  <CCol md={4} className="">
                    <label>Sexo</label>
                    <CFormCheck type="radio" name="sexo" id="Femenino" value="F" label="Femenino" required checked={nuevoEmpleado.empl_Sexo === "F"} onChange={(e) => setnuevoEmpleado({ ...nuevoEmpleado, empl_Sexo: e.target.value })} />
                    <CFormCheck type="radio" name="sexo" id="Masculino" value="M" label="Masculino" required checked={nuevoEmpleado.empl_Sexo === "M"} onChange={(e) => setnuevoEmpleado({ ...nuevoEmpleado, empl_Sexo: e.target.value })} />
                  </CCol>





                  <CCol md={6} className="">
                    <CFormSelect
                      value={dept_Id.dept_Id}
                      onChange={(e) => {
                        setdept_Id(prevDept_Id => {
                          const newDept_Id = { ...prevDept_Id, dept_Id: e.target.value };
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
                      value={nuevoEmpleado.muni_Id}
                      onChange={(e) =>
                        setnuevoEmpleado({ ...nuevoEmpleado, muni_Id: e.target.value })
                      }
                      id="validationCustom01"
                      label="Municipio"
                      required>
                      <option value="">Seleccione un Municipio</option>
                      {Municipios.map((opcion) => (
                        <option key={opcion.muni_Id} value={opcion.muni_Id}>
                          {opcion.muni_Descripcion}
                        </option>
                      ))}
                    </CFormSelect>

                  </CCol>


                  <CCol md={6} className="">
                    <CFormInput
                      type="date"
                      value={nuevoEmpleado.empl_FechaNacimiento}
                      onChange={(e) => setnuevoEmpleado({ ...nuevoEmpleado, empl_FechaNacimiento: e.target.value })}
                      id="validationCustom01"
                      label="Fecha de Nacimiento"
                      required />

                  </CCol>


                  <CCol md={6} className="">
                    <CFormSelect
                      value={nuevoEmpleado.estc_Id}
                      onChange={(e) =>
                        setnuevoEmpleado({ ...nuevoEmpleado, estc_Id: e.target.value })
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

                  <CCol md={6} className="">
                    <CFormSelect
                      value={nuevoEmpleado.sucu_Id}
                      onChange={(e) =>
                        setnuevoEmpleado({ ...nuevoEmpleado, sucu_Id: e.target.value })
                      }
                      id="validationCustom01"
                      label="Sucursal"
                      required>
                      <option value="">Seleccione una Sucursal</option>
                      {sucursal.map((opcion) => (
                        <option key={opcion.sucu_Id} value={opcion.sucu_Id}>
                          {opcion.sucu_Nombre}
                        </option>
                      ))}
                    </CFormSelect>

                  </CCol>



                  <CCol md={6} className=''>

                    <CFormInput
                      type="text"
                      value={nuevoEmpleado.empl_Telefeno}
                      onChange={(e) => setnuevoEmpleado({ ...nuevoEmpleado, empl_Telefeno: e.target.value })}
                      id="validationCustom01"
                      label="Telefono"
                      required />

                  </CCol>

                  <CCol md={12} className=''>

                    <CFormInput
                      type="text"
                      value={nuevoEmpleado.empl_Direccion}
                      onChange={(e) => setnuevoEmpleado({ ...nuevoEmpleado, empl_Direccion: e.target.value })}
                      id="validationCustom01"
                      label="Dirección"
                      required />

                  </CCol>


                  <CCol xs={12} className='offset-7'>
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
                      value={EditarEmpleado.empl_Id}
                      onChange={(e) => setEditarEmpleado({ ...EditarEmpleado, empl_Id: e.target.value })}
                      required />

                  </CCol>


                  <CCol md={6} className=''>

                    <CFormInput
                      type="text"
                      value={EditarEmpleado.empl_Nombres}
                      onChange={(e) => setEditarEmpleado({ ...EditarEmpleado, empl_Nombres: e.target.value })}
                      id="validationCustom01"
                      label="Nombres"
                      required />

                  </CCol>



                  <CCol md={6} className=''>

                    <CFormInput
                      type="text"
                      value={EditarEmpleado.empl_Apellidos}
                      onChange={(e) => setEditarEmpleado({ ...EditarEmpleado, empl_Apellidos: e.target.value })}
                      id="validationCustom01"
                      label="Apellidos"
                      required />

                  </CCol>

                  <CCol md={4} className="">
                    <CFormSelect
                      value={EditarEmpleado.carg_Id}
                      onChange={(e) =>
                        setEditarEmpleado({ ...EditarEmpleado, carg_Id: e.target.value })
                      }
                      id="validationCustom01"
                      label="Cargos"
                      required
                    >
                      <option value="">Seleccione un Cargo</option>
                      {Cargos.map((opcion) => (
                        <option key={opcion.carg_Id} value={opcion.carg_Id}>
                          {opcion.carg_Descripcion}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>


                  <CCol md={4} className="">
                    <CFormInput
                      type="text"
                      value={EditarEmpleado.empl_Identidad}
                      onChange={(e) => setEditarEmpleado({ ...EditarEmpleado, empl_Identidad: e.target.value })}
                      id="validationCustom01"
                      label="Identidad"
                      required />

                  </CCol>


                  <CCol md={4} className="">
                    <label>Sexo</label>
                    <CFormCheck type="radio" name="sexo" id="Femenino" value="F" label="Femenino" required checked={EditarEmpleado.empl_Sexo === "F"} onChange={(e) => setEditarEmpleado({ ...EditarEmpleado, empl_Sexo: e.target.value })} />
                    <CFormCheck type="radio" name="sexo" id="Masculino" value="M" label="Masculino" required checked={EditarEmpleado.empl_Sexo === "M"} onChange={(e) => setEditarEmpleado({ ...EditarEmpleado, empl_Sexo: e.target.value })} />
                  </CCol>





                  <CCol md={6} className="">
                    <CFormSelect
                      value={EditarEmpleado.dept_Id}
                      onChange={(e) => {
                        setdept_Id(prevDept_Id => {
                          const newDept_Id = { ...prevDept_Id, dept_Id: e.target.value };
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
                      value={EditarEmpleado.muni_Id}
                      onChange={(e) =>
                        setEditarEmpleado({ ...EditarEmpleado, muni_Id: e.target.value })
                      }
                      id="validationCustom01"
                      label="Municipio"
                      required>
                      <option value="">Seleccione un Municipio</option>
                      {Municipios.map((opcion) => (
                        <option key={opcion.muni_Id} value={opcion.muni_Id}>
                          {opcion.muni_Descripcion}
                        </option>
                      ))}
                    </CFormSelect>

                  </CCol>


                  <CCol md={6} className="">
                    <CFormInput
                      type="date"
                      value={EditarEmpleado.empl_FechaNacimiento}
                      onChange={(e) => setEditarEmpleado({ ...EditarEmpleado, empl_FechaNacimiento: e.target.value })}
                      id="validationCustom01"
                      label="Fecha de Nacimiento"
                      required />

                  </CCol>


                  <CCol md={6} className="">
                    <CFormSelect
                      value={EditarEmpleado.estc_Id}
                      onChange={(e) =>
                        setEditarEmpleado({ ...EditarEmpleado, estc_Id: e.target.value })
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

                  <CCol md={6} className="">
                    <CFormSelect
                      value={EditarEmpleado.sucu_Id}
                      onChange={(e) =>
                        setEditarEmpleado({ ...EditarEmpleado, sucu_Id: e.target.value })
                      }
                      id="validationCustom01"
                      label="Sucursal"
                      required>
                      <option value="">Seleccione una Sucursal</option>
                      {sucursal.map((opcion) => (
                        <option key={opcion.sucu_Id} value={opcion.sucu_Id}>
                          {opcion.sucu_Nombre}
                        </option>
                      ))}
                    </CFormSelect>

                  </CCol>



                  <CCol md={6} className=''>

                    <CFormInput
                      type="text"
                      value={EditarEmpleado.empl_Telefeno}
                      onChange={(e) => setEditarEmpleado({ ...EditarEmpleado, empl_Telefeno: e.target.value })}
                      id="validationCustom01"
                      label="Telefono"
                      required />

                  </CCol>

                  <CCol md={12} className=''>

                    <CFormInput
                      type="text"
                      value={EditarEmpleado.empl_Direccion}
                      onChange={(e) => setEditarEmpleado({ ...EditarEmpleado, empl_Direccion: e.target.value })}
                      id="validationCustom01"
                      label="Dirección"
                      required />

                  </CCol>




                  <CCol xs={12} className='offset-7'>
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
                              value={EditarEmpleado.empl_Id}
                              onChange={(e) => setEditarEmpleado({ ...EditarEmpleado, empl_Id: e.target.value })}
                              required />

                          </CCol>


                          <CCol md={6} className=''>

                            <CFormInput
                              type="disabled"
                              value={EditarEmpleado.empl_Nombres}
                              onChange={(e) => setEditarEmpleado({ ...EditarEmpleado, empl_Nombres: e.target.value })}
                              id="validationCustom01"
                              label="Nombres"
                              disabled
                              required />

                          </CCol>



                          <CCol md={6} className=''>

                            <CFormInput
                              type="disabled"
                              value={EditarEmpleado.empl_Apellidos}
                              onChange={(e) => setEditarEmpleado({ ...EditarEmpleado, empl_Apellidos: e.target.value })}
                              id="validationCustom01"
                              label="Apellidos"
                              disabled
                              required />

                          </CCol>



                          <CCol md={4} className="">
                            <CFormInput
                              type="disabled"
                              value={EditarEmpleado.empl_Identidad}
                              onChange={(e) => setEditarEmpleado({ ...EditarEmpleado, empl_Identidad: e.target.value })}
                              id="validationCustom01"
                              label="Identidad"
                              disabled
                              required />

                          </CCol>

                          <CCol md={4} className="">
                            <CFormInput
                              type="disabled"
                              value={EditarEmpleado.estc_Descripcion}
                              onChange={(e) => setEditarEmpleado({ ...EditarEmpleado, estc_Descripcion: e.target.value })}
                              id="validationCustom01"
                              disabled
                              label="Estado Civil"
                              required />

                          </CCol>

                          <CCol md={4} className="">
                            <CFormInput
                              type="disabled"
                              value={EditarEmpleado.emplSexo}
                              onChange={(e) => setEditarEmpleado({ ...EditarEmpleado, emplSexo: e.target.value })}
                              id="validationCustom01"
                              disabled
                              label="Sexo"
                              required />

                          </CCol>

                          <CCol md={6} className="">
                            <CFormInput
                              type="disabled"
                              value={EditarEmpleado.carg_Descripcion}
                              onChange={(e) => setEditarEmpleado({ ...EditarEmpleado, carg_Descripcion: e.target.value })}
                              id="validationCustom01"
                              disabled
                              label="Cargo"
                              required />

                          </CCol>

                          <CCol md={6} className="">
                            <CFormInput
                              type="disabled"
                              value={EditarEmpleado.sucu_Nombre}
                              onChange={(e) => setEditarEmpleado({ ...EditarEmpleado, sucu_Nombre: e.target.value })}
                              id="validationCustom01"
                              disabled
                              label="Sucursal"
                              required />

                          </CCol>


                          <CCol md={6} className="">
                            <CFormInput
                              type="disabled"
                              value={EditarEmpleado.dept_Descripcion}
                              onChange={(e) => setEditarEmpleado({ ...EditarEmpleado, dept_Descripcion: e.target.value })}
                              id="validationCustom01"
                              disabled
                              label="Departamento"
                              required />

                          </CCol>



                          <CCol md={6} className="">
                            <CFormInput
                              type="disabled"
                              value={EditarEmpleado.muni_Descripcion}
                              onChange={(e) => setEditarEmpleado({ ...EditarEmpleado, muni_Descripcion: e.target.value })}
                              id="validationCustom01"
                              label="Municipio"
                              disabled
                              required />

                          </CCol>

                          <CCol md={6} className="">
                            <CFormInput
                              type="disabled"
                              value={EditarEmpleado.empl_FechaNacimiento}
                              onChange={(e) => setEditarEmpleado({ ...EditarEmpleado, empl_FechaNacimiento: e.target.value })}
                              id="validationCustom01"
                              label="Fecha de Nacimiento"
                              disabled
                              required />

                          </CCol>

                          <CCol md={6} className=''>

                            <CFormInput
                              type="disabled"
                              value={EditarEmpleado.empl_Telefeno}
                              onChange={(e) => setEditarEmpleado({ ...EditarEmpleado, empl_Telefeno: e.target.value })}
                              id="validationCustom01"
                              label="Telefono"
                              disabled
                              required />

                          </CCol>

                          <CCol md={12} className=''>

                            <CFormInput
                              type="disabled"
                              value={EditarEmpleado.empl_Direccion}
                              onChange={(e) => setEditarEmpleado({ ...EditarEmpleado, empl_Direccion: e.target.value })}
                              id="validationCustom01"
                              label="Dirección"
                              disabled
                              required />

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
                                <td>{EditarEmpleado.empl_crea}</td>
                                <td>{EditarEmpleado.empl_FechaCreacion}</td>
                              </tr>
                              <tr>
                                <td>Modificación</td>
                                <td>{EditarEmpleado.empl_Modifica}</td>
                                <td>{EditarEmpleado.empl_FechaModificacion}</td>
                              </tr>
                            </tbody>
                          </table>




                          <CCol xs={12} className='offset-5'>

                            <CButton color="danger text-light" className='ms-2' href="#" onClick={cerrarDetalles}>
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
                rows={empleados}
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

export default Empleados
