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
        CModalBody,}
        from '@coreui/react'
import { CardHeader } from 'reactstrap'

function Prendas() {
  const [prendas, setPrendas] = useState([])
  const [sortModel, setSortModel] = useState([{ field: 'pren_Id', sort: 'asc' }])
  const [visible, setVisible] = useState(false)
  const [Modal, setModal] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)
  const [descuentos, setDescuentoDDL] = useState([]);  
  const [marcas, setMarcasDDL] = useState([]);
  const [fardos, setFardosDDL] = useState([]);
  const [categorias, setCategoriasDDL] = useState([]);
  const user_Crea = parseInt(sessionStorage.getItem('user_Id'));

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

  
if (user_Crea==null ||  isNaN(user_Crea)) {
  window.location.href = '/';
}

const arregloJSONGET = sessionStorage.getItem("miArreglo");
const miArreglo = JSON.parse(arregloJSONGET);

const existeUsuarios = miArreglo.some(objeto => objeto.name === "Prendas");

if (existeUsuarios) {
  
} else {
  window.location.href = '/#/Home';
}

  const [nuevaPrendas, setNuevaPrenda] = useState({
    pren_Descripcion: '',
    pren_Talla: '',
    desc_Id: '',
    desc_Descuento: 0,
    pren_Precio: 0,
    marc_Id: '',
    cate_Id: '',
    fard_Id: '',
    pren_Imagen: '',
    pren_UserCrea: user_Crea

})
const [ElimPrenda, setElimPrenda] = useState({
  pren_Id: 0
})

const [editarPrenda, seteditarPrenda] = useState({
  pren_Id: 0,
  pren_Descripcion: '',
  pren_Talla: '',
  desc_Id: '',
  pren_Precio: 0,
  marc_Id: '',
  cate_Id: '',
  fard_Id: '',
  pren_Imagen: '',
  pren_UserModificacion: user_Crea
})

const abrirPrenda = (params,event) => {
  if (event) {
    event.preventDefault()
  }
  setVisible2(!visible2)
  setValidated(false)
  setvisibleEnca(!visibleEnca)
  console.log(params)
  seteditarPrenda({
    pren_Id: params.pren_Id,
    pren_Descripcion: params.pren_Descripcion,
    pren_Talla: params.pren_Talla,
    desc_Id: params.desc_Id,
    pren_Precio: params.pren_Precio,
    marc_Id: params.marc_Id,
    cate_Id: params.cate_Id,
    fard_Id: params.fard_Id,
    pren_Imagen: params.pren_Imagen,
    pren_UserModificacion: user_Crea
})
}

const abrirDetalles = (params,event) => {
  if (event) {
    event.preventDefault()
  }
  setVisible3(!visible3)
  setValidated(false)
  setvisibleEnca(!visibleEnca)
  console.log(params)
  seteditarPrenda({
    pren_Id: params.pren_Id,
    pren_Descripcion: params.pren_Descripcion,
    pren_Talla: params.pren_Talla,
    desc_Id: params.desc_Id,
    pren_Precio: params.pren_Precio,
    cate_Descripcion: params.cate_Descripcion,
    marc_Descripcion: params.marc_Descripcion,
    fard_Descripcion: params.fard_Descripcion,
    desc_Color: params.desc_Color,
    desc_Descuento: params.desc_Descuento,
    empl_crea: params.empl_crea,
    empl_Modifica: params.empl_Modifica,
    pren_FechaModificacion: params.pren_FechaModificacion,
    pren_FechaCreacion: params.pren_FechaCreacion,
    marc_Id: params.marc_Id,
    disponibilidad: params.disponibilidad,
    cate_Id: params.cate_Id,
    fard_Id: params.fard_Id,
    pren_Imagen: params.pren_Imagen,
    pren_UserModificacion: user_Crea
})
}

const cerrarDetalles = (event) => {
  event.preventDefault()
  setVisible3(!visible3)
  setvisibleEnca(!visibleEnca)
  seteditarPrenda({
    pren_Id: 0,
    pren_Descripcion: '',
    pren_Talla: '',
    desc_Id: '',
    pren_Precio: 0,
    marc_Id: '',
    cate_Id: '',
    fard_Id: '',
    pren_Imagen: '',
    pren_UserModificacion: user_Crea
})
}

const cerrarEditar = (event) => {
  event.preventDefault()
  setVisible2(!visible2)
  setvisibleEnca(!visibleEnca)
  seteditarPrenda({
    pren_Id: 0,
    pren_Descripcion: '',
    pren_Talla: '',
    desc_Id: '',
    pren_Precio: 0,
    marc_Id: '',
    cate_Id: '',
    fard_Id: '',
    pren_Imagen: '',
    pren_UserModificacion: user_Crea
})
}

const abrirycerrarInsert = (event) => {
  event.preventDefault()
  setVisible(!visible)
  setvisibleEnca(!visibleEnca)
  setValidated(false)
  setNuevaPrenda({
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

}

const ModalFun = (params,event) => {
  if (event) {
    event.preventDefault()
  }
  setModal(!visible)
  setElimPrenda({
    pren_Id: params,
   
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
    axios.post('api/Prendas/Insert', nuevaPrendas, config)
        .then((response) => {
          if (response.data.code == 409)
          {
            toast.error('La prenda ya existe.');
          }
          else{
            console.log(response.data)
            setVisible(false)
            setvisibleEnca(!visibleEnca)
            nuevaPrendas({
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
            toast.error('Prenda insertada correctamente.')};

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
  axios.put('api/Prendas/Update', editarPrenda, config)
      .then((response) => {
          console.log(response.data)
          setVisible2(!visible2)
          setvisibleEnca(!visibleEnca)
          seteditarPrenda({
            pren_Id: 0,
            pren_Descripcion: '',
            pren_Talla: '',
            desc_Id: '',
            pren_Precio: 0,
            marc_Id: '',
            cate_Id: '',
            fard_Id: '',
            pren_Imagen: '',
            pren_UserModificacion: user_Crea
        })
        toast.success('Prenda editada correctamente.');

        console.log(response.data)
      })
      .catch((error) => {
          console.log(error)
      })
    }
}


  //peticion a la api listado   
  useEffect(() => {
    axios.get('api/Prendas/Index').then((response) => {
      console.log('entra')
      const insertarid = response.data.map((row) => ({
        ...row,
        id: row.pren_Id,
      }))
      setPrendas(insertarid)
    })
  }, [prendas])

  const handleSortModelChange = (model) => {
    setSortModel(model)
  }

  /*Peticion pa eliminar */
  const handleSubmitD = (event) => {
    event.preventDefault()
  
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios.put('api/Prendas/Delete', ElimPrenda, config)
        .then((response) => {
            console.log(response.data)
            setModal(false)
            setElimPrenda({
              pren_Id: 0,
          })
          toast.success('Prenda eliminada correctamente.');

          console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
      
  }

  const columns = [
    { field: 'pren_Id', headerName: 'ID',  width: 90},
    { field: 'pren_Descripcion', headerName: 'Descripcion',  width: 450},
    { field: 'pren_Talla', headerName: 'Talla',  width: 65},
    { field: 'desc_Descuento', headerName: 'Descuento',  width: 100},
    { field: 'disponibilidad', headerName: 'Disponibilidad', width: 150 },
    { field: 'pren_Precio', headerName: 'Precio',  width: 70},
    { field: 'marc_Descripcion', headerName: 'Marca',  width: 90},
    { field: 'cate_Descripcion', headerName: 'Categoría',  width: 100},
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 300,
      renderCell: (params) => (
        <div>
      
        
            <CButton  color="info ms-2" variant="outline"  onClick={() => abrirDetalles(params.row)}>
            <VisibilityIcon />
          </CButton>

          <CButton color="warning ms-2" variant="outline" onClick={() => abrirPrenda(params.row)}>
        <EditIcon />
        </CButton>
          
        <CButton color="danger ms-2" variant="outline" onClick={() => ModalFun(params.row.pren_Id)}>
            <DeleteIcon />
            </CButton>
        
        </div>
      ),
    },
  ]



  useEffect(() => {
    axios.get('api/Descuentos/Index')
    .then(response => {
      setDescuentoDDL(response.data);
    })
    .catch(error => { 
      console.error('Error fetching data from API:', error);
    });
  
    axios.get('api/Marcas/Index')
    .then(response => {
      setMarcasDDL(response.data);
    })
    .catch(error => {
      console.error('Error fetching data from API:', error);
    });

    axios.get('api/Categorias/Index')
    .then(response => {
      setCategoriasDDL(response.data);
    })
    .catch(error => {
      console.error('Error fetching data from API:', error);
    });

    axios.get('api/Fardos/Index')
    .then(response => {
      setFardosDDL(response.data);
    })
    .catch(error => {
      console.error('Error fetching data from API:', error);
    });


  }, []);



  return (
    <div style={{ width: '100%' }}>
      <div className='col-12'>
    <CCard className="p-5">
    <CCardHeader className='rounded-top mb-4' style={{ fontFamily: "revert-layer",  textAlign: 'center', fontSize: 50   }}>Prendas</CCardHeader>

      <CCollapse visible={!visibleEnca}>


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

    {/*Modal pa eliminar*/}

    <CModal alignment="center"  visible={Modal} onClick={() => setModal(false)}>
   
   <CModalBody className='pt-5 pb-5' style={{boxShadow:5}}>
   <CForm
 className="row g-3 needs-validation"
 noValidate
 validated={validated}
 onSubmit={handleSubmitD}
>
   <CFormInput
     type="hidden"
 value={ElimPrenda.pren_Id}
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
 
    <CCollapse visible={visible} className='col-12'>
    
      <CCard className="mt-3">
        <CCardHeader>
          <h1 className='h3 text-center'>Nueva Prenda</h1>
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
    value={nuevaPrendas.pren_Descripcion}
    onChange={(e) => setNuevaPrenda({ ...nuevaPrendas, pren_Descripcion: e.target.value })}
    id="validationCustom01"
    label="Nombre"
    required/>

    </CCol>

    <CCol md={6} className=''>

    <CFormInput
    type="text"
    value={nuevaPrendas.pren_Talla}
    onChange={(e) => setNuevaPrenda({ ...nuevaPrendas, pren_Talla: e.target.value })}
    id="validationCustom01"
    label="Talla"
    required/>

    </CCol>

    

    <CCol md={6} className="">
  <CFormSelect
    value={nuevaPrendas.desc_Id}
    onChange={(e) =>
      setNuevaPrenda({ ...nuevaPrendas, desc_Id: e.target.value })
    }
    id="validationCustom01"
    label="Descuentos"
    required>
    <option value="">Seleccione un Descuento</option>
    {descuentos.map((opcion) => (
      <option key={opcion.desc_Id} value={opcion.desc_Id}>
        {opcion.desc_Color}
      </option>
    ))}
  </CFormSelect>

</CCol>

        <CCol md={6} className=''>

    <CFormInput
    type="text"
    value={nuevaPrendas.pren_Precio}
    onChange={(e) => setNuevaPrenda({ ...nuevaPrendas, pren_Precio: e.target.value })}
    id="validationCustom01"
    label="Precio"
    required/>

    </CCol>

    <CCol md={6} className="">
  <CFormSelect
    value={nuevaPrendas.marc_Id}
    onChange={(e) =>
      setNuevaPrenda({ ...nuevaPrendas, marc_Id: e.target.value })
    }
    id="validationCustom01"
    label="Marca"
    required>
    <option value="">Seleccione una Marca</option>
    {marcas.map((opcion) => (
      <option key={opcion.marc_Id} value={opcion.marc_Id}>
        {opcion.marc_Descripcion}
      </option>
    ))}
  </CFormSelect>

</CCol>

<CCol md={6} className="">
  <CFormSelect
    value={nuevaPrendas.cate_Id}
    onChange={(e) =>
      setNuevaPrenda({ ...nuevaPrendas, cate_Id: e.target.value })
    }
    id="validationCustom01"
    label="Categorías"
    required>
    <option value="">Seleccione una Categoría</option>
    {categorias.map((opcion) => (
      <option key={opcion.cate_Id} value={opcion.cate_Id}>
      {opcion.cate_Descripcion}
      </option>
    ))}
  </CFormSelect>

</CCol>





<CCol md={6} className="">
  <CFormSelect
    value={nuevaPrendas.fard_Id}
    onChange={(e) =>
      setNuevaPrenda({ ...nuevaPrendas, fard_Id: e.target.value })
    }
    id="validationCustom01"
    label="Fardo"
    required>
    <option value="">Seleccione un Fardo</option>
    {fardos.map((opcion) => (
      <option key={opcion.fard_Id} value={opcion.fard_Id}>
        {opcion.fard_Descripcion}
      </option>
    ))}
  </CFormSelect>

</CCol>


    <CCol md={6} className=''>

    <CFormInput
    type="text"
    value={nuevaPrendas.pren_Imagen}
    onChange={(e) => setNuevaPrenda({ ...nuevaPrendas, pren_Imagen: e.target.value })}
    id="validationCustom01"
    label="Imagen"
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

     <CCol md={6} className=''>
    <CFormInput
      type="hidden"
  value={editarPrenda.pren_Id}
  onChange={(e) => seteditarPrenda({ ...editarPrenda, pren_Id: e.target.value })}
  id="validationCustom01"
  required
    />
  </CCol>


       <CCol md={12 } className=''>

        <CFormInput
    type="text"
    value={editarPrenda.pren_Descripcion}
    onChange={(e) => seteditarPrenda({ ...editarPrenda, pren_Descripcion: e.target.value })}
    id="validationCustom01"
    label="Nombre"
    required/>

    </CCol>

    <CCol md={6} className=''>

    <CFormInput
    type="text"
    value={editarPrenda.pren_Talla}
    onChange={(e) => seteditarPrenda({ ...editarPrenda, pren_Talla: e.target.value })}
    id="validationCustom01"
    label="Talla"
    required/>

    </CCol>

    




        <CCol md={6} className=''>

    <CFormInput
    type="text"
    value={editarPrenda.pren_Precio}
    onChange={(e) => seteditarPrenda({ ...editarPrenda, pren_Precio: e.target.value })}
    id="validationCustom01"
    label="Precio"
    required/>

    </CCol>

    <CCol md={6} className="">
  <CFormSelect
    value={editarPrenda.desc_Id}
    onChange={(e) =>
      seteditarPrenda({ ...editarPrenda, desc_Id: e.target.value })
    }
    id="validationCustom01"
    label="Descuentos"
    required>
    <option value="">Seleccione un Descuento</option>
    {descuentos.map((opcion) => (
      <option key={opcion.desc_Id} value={opcion.desc_Id}>
        {opcion.desc_Color}
      </option>
    ))}
  </CFormSelect>

</CCol>


<CCol md={6} className="">
  <CFormSelect
    value={editarPrenda.marc_Id}
    onChange={(e) =>
      seteditarPrenda({ ...editarPrenda, marc_Id: e.target.value })
    }
    id="validationCustom01"
    label="Marca"
    required>
    <option value="">Seleccione una Marca</option>
    {marcas.map((opcion) => (
      <option key={opcion.marc_Id} value={opcion.marc_Id}>
        {opcion.marc_Descripcion}
      </option>
    ))}
  </CFormSelect>

</CCol>

<CCol md={6} className="">
  <CFormSelect
    value={editarPrenda.cate_Id}
    onChange={(e) =>
      seteditarPrenda({ ...editarPrenda, cate_Id: e.target.value })
    }
    id="validationCustom01"
    label="Categorías"
    required>
    <option value="">Seleccione una Categoría</option>
    {categorias.map((opcion) => (
      <option key={opcion.cate_Id} value={opcion.cate_Id}>
      {opcion.cate_Descripcion}
      </option>
    ))}
  </CFormSelect>

</CCol>





<CCol md={6} className="">
  <CFormSelect
    value={editarPrenda.fard_Id}
    onChange={(e) =>
      seteditarPrenda({ ...editarPrenda, fard_Id: e.target.value })
    }
    id="validationCustom01"
    label="Fardo"
    required>
    <option value="">Seleccione un Fardo</option>
    {fardos.map((opcion) => (
      <option key={opcion.fard_Id} value={opcion.fard_Id}>
        {opcion.fard_Descripcion}
      </option>
    ))}
  </CFormSelect>

</CCol>



    <CCol md={12} className=''>

    <CFormInput
    type="text"
    value={editarPrenda.pren_Imagen}
    onChange={(e) => seteditarPrenda({ ...editarPrenda, pren_Imagen: e.target.value })}
    id="validationCustom01"
    label="Imagen"
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
                              value={editarPrenda.pren_Id}
                              onChange={(e) => seteditarPrenda({ ...editarPrenda, pren_Id: e.target.value })}
                              required />

                          </CCol>


                          <CCol md={6} className=''>

                            <CFormInput
                              type="disabled"
                              value={editarPrenda.pren_Descripcion}
                              onChange={(e) => seteditarPrenda({ ...editarPrenda, pren_Descripcion: e.target.value })}
                              id="validationCustom01"
                              label="Descripcion"
                              disabled
                              required />

                          </CCol>



                          <CCol md={6} className=''>

                            <CFormInput
                              type="disabled"
                              value={editarPrenda.pren_Talla}
                              onChange={(e) => seteditarPrenda({ ...editarPrenda, pren_Talla: e.target.value })}
                              id="validationCustom01"
                              label="Talla"
                              disabled
                              required />

                          </CCol>



                          <CCol md={4} className="">
                            <CFormInput
                              type="disabled"
                              value={editarPrenda.desc_Color}
                              onChange={(e) => seteditarPrenda({ ...editarPrenda, desc_Color: e.target.value })}
                              id="validationCustom01"
                              label="Color de descuento"
                              disabled
                              required />

                          </CCol>

                          <CCol md={4} className="">
                            <CFormInput
                              type="disabled"
                              value={editarPrenda.desc_Descuento}
                              onChange={(e) => seteditarPrenda({ ...editarPrenda, desc_Descuento: e.target.value })}
                              id="validationCustom01"
                              disabled
                              label="Descuento"
                              required />

                          </CCol>

                          <CCol md={4} className="">
                            <CFormInput
                              type="disabled"
                              value={editarPrenda.pren_Precio}
                              onChange={(e) => seteditarPrenda({ ...editarPrenda, pren_Precio: e.target.value })}
                              id="validationCustom01"
                              disabled
                              label="Precio"
                              required />

                          </CCol>

                          <CCol md={6} className="">
                            <CFormInput
                              type="disabled"
                              value={editarPrenda.marc_Descripcion}
                              onChange={(e) => seteditarPrenda({ ...editarPrenda, marc_Descripcion: e.target.value })}
                              id="validationCustom01"
                              disabled
                              label="Marca"
                              required />

                          </CCol>

                          <CCol md={6} className="">
                            <CFormInput
                              type="disabled"
                              value={editarPrenda.cate_Descripcion}
                              onChange={(e) => seteditarPrenda({ ...editarPrenda, cate_Descripcion: e.target.value })}
                              id="validationCustom01"
                              disabled
                              label="Categoría"
                              required />

                          </CCol>


                          <CCol md={6} className="">
                            <CFormInput
                              type="disabled"
                              value={editarPrenda.fard_Descripcion}
                              onChange={(e) => seteditarPrenda({ ...editarPrenda, fard_Descripcion: e.target.value })}
                              id="validationCustom01"
                              disabled
                              label="Fardo"
                              required />

                          </CCol>

                          <CCol md={6} className="">
                            <CFormInput
                              type="disabled"
                              value={editarPrenda.disponibilidad}
                              onChange={(e) => seteditarPrenda({ ...editarPrenda, disponibilidad: e.target.value })}
                              id="validationCustom01"
                              disabled
                              label="Disponibilidad"
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
                                <td>{editarPrenda.empl_crea}</td>
                                <td>{editarPrenda.pren_FechaCreacion}</td>
                              </tr>
                              <tr>
                                <td>Modificación</td>
                                <td>{editarPrenda.empl_Modifica}</td>
                                <td>{editarPrenda.pren_FechaModificacion}</td>
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
        rows={prendas}
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
      <ToastContainer></ToastContainer>


    </div>
  )
}

export default Prendas
