import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import MonitorIcon from "@mui/icons-material/Monitor";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
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
  CModalFooter,
  CAccordion,
  CAccordionHeader,
  CAccordionItem,
  CAccordionBody,
} from "@coreui/react";
import MultiSelect from "react-multiselect-checkboxes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parse } from "date-fns";

function Roles() {
  const [roles, setRoles] = useState([]);
  const [sortModel, setSortModel] = useState([
    { field: "role_Id", sort: "asc" },
  ]);
  const [visible, setVisible] = useState(false);
  const [insertado, setinsertado] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [Modal, setModal] = useState(false);
  const [visibleEnca, setvisibleEnca] = useState(false);
  const [Pantallas, setPantallasDDL] = useState([]);
  const [validated, setValidated] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDeOptions, setSelectedDeOptions] = useState([]);
  const user_Crea = parseInt(parseInt(sessionStorage.getItem('user_Id')));

  const [array, setarray] = useState(false);
  const [abrirPants, setabrirPants] = useState(false);

  if (user_Crea == null || isNaN(user_Crea)) {
    window.location.href = '/';
  }

  const arregloJSONGET = sessionStorage.getItem("miArreglo");
  const miArreglo = JSON.parse(arregloJSONGET);

  const existeUsuarios = miArreglo.some(objeto => objeto.name === "Roles");

  if (existeUsuarios) {

  } else {
    window.location.href = '/#/Home';
  }

  const [Role_Id_Pant, set_Role_Id_Pant] = useState({
    role_Id: 0,
    pant_Id: 0,
    pantrol_UserCrea: user_Crea,
    role_Descripcion: "",
  });

  const [Role_Id_PantEnvio, set_Role_Id_Pant_Envio] = useState({
    role_Id: 0,
    pant_Id: 0,
    pantrol_UserCrea: parseInt(user_Crea)
  });

  const [nuevoRol, setNuevoRol] = useState({
    role_Descripcion: "",
    role_UserCrea: user_Crea
  });
  const [ElimRol, setElimRol] = useState({
    role_Id: 0,
  });
  const [EditarRol, setEditarRol] = useState({
    role_Id: 0,
    role_Descripcion: "",
    role_UserModifica: user_Crea
  });

  const abrireditar = (params, event) => {
    if (event) {
      event.preventDefault();
    }
    setVisible2(!visible2);
    setvisibleEnca(!visibleEnca);
    setValidated(false);
    console.log(params);
    setEditarRol({
      role_Id: parseInt(params.role_Id),
      role_Descripcion: params.role_Descripcion,
      role_UserModifica: user_Crea
    });
  };

  const cerrarEditar = (event) => {
    event.preventDefault();
    setVisible2(!visible2);
    setValidated(false);
    setvisibleEnca(!visibleEnca);
    setEditarRol({
      role_Id: 0,
      role_Descripcion: "",
      role_UserModifica: user_Crea
    });
  };

  const cerrarPantallas = (event) => {
    event.preventDefault();
    setvisibleEnca(!visibleEnca);
    setabrirPants(!abrirPants);
  }

  const abrirycerrarInsert = (event) => {
    event.preventDefault();
    setVisible(!visible);
    setValidated(false);
    setvisibleEnca(!visibleEnca);
    setNuevoRol({
      role_Descripcion: "",
      role_UserCrea: user_Crea
    });
  };

  const ModalFun = (params, event) => {
    if (event) {
      event.preventDefault();
    }
    setModal(!visible);
    setElimRol({
      role_Id: parseInt(params),
    });
  };

  useEffect(() => {
    axios
      .get("api/Pantallas/Index")
      .then((response) => {
        setPantallasDDL(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, []);
  const options = Pantallas.map((pantalla) => ({
    label: pantalla.pant_Nombre,
    value: pantalla.pant_Id,
  }));

  //peticion a la api insert
  const handleSubmitI = (event) => {
    event.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() != false) {
      axios
        .post("api/Roles/Insert", nuevoRol, config)
        .then((response) => {


            set_Role_Id_Pant({
              role_Id: parseInt(response.data[1].codeStatus),
              role_Descripcion: response.data[1].messageStatus,
            });
            sessionStorage.setItem("role_Id", response.data[1].codeStatus);
            if (response.data[0].codeStatus == 200) {
              setinsertado(!insertado);
              setNuevoRol({
                role_Descripcion: "",
                role_UserCrea: user_Crea
              });
              setVisible(!visible);
            }
          

        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  {
    /*Inicio de Pantallas Por Rol*/
  }
  const handleOptionChange = (selected) => {
    setSelectedOptions(selected);
  };
  {/*Edit Pantallas*/ }
  const handleOptionChangeEdit = (selected) => {
    setSelectedDeOptions(selected);
  };

  useEffect(() => {
    const rolePantArray = [];

    selectedOptions.forEach((option) => {
      const role_Id = sessionStorage.getItem("role_Id");
      const rolePantObj = {
        role_Id: parseInt(role_Id),
        pant_Id: option.value,
        pantrol_UserCrea: user_Crea
      };

      rolePantArray.push(rolePantObj);
    });

    set_Role_Id_Pant_Envio(rolePantArray);
    console.log(set_Role_Id_Pant_Envio)
  }, [selectedOptions]);

  {/*Edit Pantallas*/ }
  useEffect(() => {
    const rolePantArrayEdit = [];

    selectedDeOptions.forEach((option) => {
      const role_Id = sessionStorage.getItem("role_IdEdit");
      const rolePantObj = {
        role_Id: parseInt(role_Id),
        pant_Id: option.value,
        pantrol_UserCrea: parseInt(user_Crea)
      };

      rolePantArrayEdit.push(rolePantObj);
    });

    set_Role_Id_Pant_Envio(rolePantArrayEdit);
  }, [selectedDeOptions]);


  useEffect(() => {
    if (Role_Id_PantEnvio.length > 0) {
      setarray(true);
    }
    if (Role_Id_PantEnvio.length === 0) {
      setarray(false);
    }
  }, [Role_Id_PantEnvio]);


  {/*Edit Pantallas*/ }
  useEffect(() => {
    console.log(Role_Id_PantEnvio)
    if (Role_Id_PantEnvio.length > 0) {
      setarray(true);
    }
    if (Role_Id_PantEnvio.length === 0) {
      setarray(false);
    }
  }, [Role_Id_PantEnvio]);

  //peticion a la api insert pantallas al rol
  const PantallasPorRol = (event) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    Role_Id_PantEnvio.forEach((rolePant, index) => {
      const postData = {
        ...rolePant,
        index: index + 1,
      };

      axios
        .post("api/Pantallas/PantallasAgg", postData, config)
        .then((response) => {
          console.log(response.data);
          console.log(`Request for index ${index + 1} completed.`);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    setinsertado(!insertado);
    setvisibleEnca(!visibleEnca);
    toast.success("El Rol y sus Permisos fueron Agregados con exito");
  };


  //peticion a la api insert pantallas al rol
  const PantallasPorRolEdit = (event) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    Role_Id_PantEnvio.forEach((rolePant, index) => {
      const postData = {
        ...rolePant,
        index: index + 1,
      };
      console.log(postData)
      axios
        .post("api/Pantallas/PantallasElim", postData, config)
        .then((response) => {
          console.log(response.data);
          console.log(`Request for index ${index + 1} completed.`);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    setabrirPants(!abrirPants);
    setvisibleEnca(!visibleEnca);
    toast.success("Lo Permisos fueron Editados con exito");
  };


  const abrirPantallas = (params, event) => {
    if (event) {
      event.preventDefault();
    }
    setabrirPants(!abrirPants);
    setvisibleEnca(!visibleEnca);
    sessionStorage.setItem("role_IdEdit", params.role_Id);
    set_Role_Id_Pant({
      role_Id: parseInt(params.role_Id),
      role_Descripcion: params.role_Descripcion
    });

  };


  const handleButtonClick = (role_Id) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = {
      role_id: parseInt(role_Id),
    };

    axios
      .post("/api/Pantallas/PantallasPorRol_Checked", data, config)
      .then((response) => {
        const selectedData = response.data.map((item) => ({
          value: item.pant_Id,
        }));
        setSelectedDeOptions(selectedData);
        console.log(selectedData)
      })
      .catch((error) => {
        console.log(error);
      });

  };

  {
    /*Fin de Pantallas Por Rol*/
  }

  //peticion a la api Editar
  const handleSubmitE = (event) => {
    event.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() != false) {
      axios
        .put("api/Roles/Update", EditarRol, config)
        .then((response) => {
          console.log(response.data);
          setVisible2(!visible2);
          setvisibleEnca(!visibleEnca);
          setEditarRol({
            role_Id: 0,
            role_Descripcion: "",
            role_UserModifica: user_Crea
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //peticion a la api Eliminar
  const handleSubmitD = (event) => {
    event.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .put("api/Roles/Delete", ElimRol, config)
      .then((response) => {
        console.log(response.data);
        setModal(false);
        setElimRol({
          role_Id: 0,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //peticion a la api listado
  useEffect(() => {
    axios.get("api/Roles/Index").then((response) => {
      const insertarid = response.data.map((row) => ({
        ...row,
        id: row.role_Id,
      }));
      setRoles(insertarid);
    });
  }, []);

  const handleSortModelChange = (model) => {
    setSortModel(model);
  };

  const columns = [
    { field: "role_Id", headerName: "ID", flex: 1 },
    { field: "role_Descripcion", headerName: "Rol", flex: 1 },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => (
        <div>
          <CButton color="info ms-2" variant="outline">
            <VisibilityIcon />
          </CButton>

          <CButton
            color="warning ms-2"
            variant="outline"
            onClick={() => abrireditar(params.row)}
          >
            <EditIcon />
          </CButton>

          <CButton
            color="dark ms-2"
            variant="outline"
            onClick={() => {
              abrirPantallas(params.row);
              handleButtonClick(params.row.role_Id);
            }}
          >
            <MonitorIcon />
          </CButton>


          <CButton
            color="danger ms-2"
            variant="outline"
            onClick={() => ModalFun(params.row.role_Id)}
          >
            <DeleteIcon />
          </CButton>
        </div>
      ),
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <div className="col-12">
        <CCard className="p-5">
          <CCardHeader
            className="rounded-top mb-4"
            style={{
              fontFamily: "revert-layer",
              textAlign: "center",
              fontSize: 50,
            }}
          >
            Roles
          </CCardHeader>
          <CCollapse visible={!visibleEnca}>
            <div className="col-2  mb-4">
              <div className="d-grid gap-1">
                <CButton
                  color="primary"
                  variant="outline"
                  href="#"
                  onClick={abrirycerrarInsert}
                >
                  <AddIcon className="nav-icon  mb-1"></AddIcon>
                  Nuevo
                </CButton>
              </div>
            </div>
          </CCollapse>

          {/*Modal Eliminar*/}

          <CModal
            alignment="center"
            visible={Modal}
            onClick={() => setModal(false)}
          >
            <CModalBody className="pt-5 pb-5" style={{ boxShadow: 5 }}>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmitD}
              >
                <CFormInput
                  minLength={2}
                  maxLength={2}
                  type="hidden"
                  value={ElimRol.role_Id}
                  id="validationCustom01"
                  disabled
                  required
                />
                <center>
                  <CModalTitle>
                    Esta seguro que desea Eliminar este registro?
                  </CModalTitle>
                </center>
                <center>
                  <CButton
                    color="light"
                    className="col-5 me-3"
                    onClick={() => setModal(false)}
                  >
                    Cancelar
                  </CButton>
                  <CButton
                    color="danger text-light"
                    type="submit"
                    className="col-5"
                  >
                    Eliminar
                  </CButton>
                </center>
              </CForm>
            </CModalBody>
          </CModal>

          <CCollapse visible={insertado} className="col-8 offset-2">
            <CCard className="mt-3">
              <CCardHeader>
                <h1
                  className="h4 text-center"
                  style={{ fontFamily: "revert-layer" }}
                >
                  Asignacion de accesos
                </h1>
              </CCardHeader>
              <CCardBody>
                <CForm
                  onSubmit={PantallasPorRol}
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                >
                  <CCol md={0} className="offset-1 mt-5">
                    <CFormInput
                      type="hidden"
                      value={Role_Id_Pant.role_Id}
                      id="validationCustom01"
                      required
                    />
                  </CCol>

                  <CCol md={6} className="offset-1">
                    <CFormInput
                      type="text"
                      label="Rol"
                      value={Role_Id_Pant.role_Descripcion}
                      id="validationCustom01"
                      disabled
                      required
                    />
                  </CCol>

                  <CCol md={4}>
                    <label className="label mb-2">Pantallas Asignadas</label>
                    <MultiSelect
                      key={options}
                      options={options}
                      value={selectedOptions}
                      onChange={handleOptionChange}
                      labelledBy="Pantallas"
                      placeholder="Pantallas"
                    />
                  </CCol>

                  <CCollapse visible={array} className="col-8 offset-2">
                    <center>
                      <CCol xs={12}>
                        <CButton color="primary" type="submit">
                          Guardar
                        </CButton>
                      </CCol>
                    </center>
                  </CCollapse>
                </CForm>
              </CCardBody>
            </CCard>
          </CCollapse>


          {/** edicion de pantallas*/}
          <CCollapse visible={abrirPants} className="col-8 offset-2">
            <CCard className="mt-3">
              <CCardHeader>
                <h1
                  className="h4 text-center"
                  style={{ fontFamily: "revert-layer" }}
                >
                  Edición de accesos
                </h1>
              </CCardHeader>
              <CCardBody>
                <CForm
                  onSubmit={PantallasPorRolEdit}
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                >
                  <CCol md={0} className=" mt-5">
                    <CFormInput
                      type="hidden"
                      value={Role_Id_Pant.role_Id}
                      id="validationCustom01"
                      required
                    />
                  </CCol>

                  <CCol md={6} className="offset-1">
                    <CFormInput
                      type="text"
                      label="Rol"
                      value={Role_Id_Pant.role_Descripcion}
                      id="validationCustom01"
                      disabled
                      required
                    />
                  </CCol>

                  <CCol md={4}>
                    <label className="label mb-2">Pantallas Asignadas</label>
                    <MultiSelect

                      key={options}
                      options={options}
                      value={selectedDeOptions}
                      onChange={handleOptionChangeEdit}
                      labelledBy="Pantallas"
                      placeholder="Pantallas"
                      _propTypes
                    />
                  </CCol>



                  <center>
                    <CButton disabled={!array} color="primary" type="submit">
                      Guardar
                    </CButton>

                    <CButton
                      color="danger text-light"
                      className="ms-2"
                      href="#"
                      onClick={
                        cerrarPantallas
                      }
                    >
                      Cancelar
                    </CButton>
                  </center>
                </CForm>
              </CCardBody>
            </CCard>
          </CCollapse>
          {/*Formulario Insertar*/}

          <CCollapse visible={visible} className="">
            <CCol md={8} className="offset-2">
              <CCard className="mt-3">
                <CCardHeader>
                  <h1
                    className="h4 text-center"
                    style={{ fontFamily: "revert-layer" }}
                  >
                    Nuevo Rol
                  </h1>
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
                        onChange={(e) =>
                          setNuevoRol({
                            ...nuevoRol,
                            role_Descripcion: e.target.value,
                          })
                        }
                        id="validationCustom01"
                        label="Nombre Rol"
                        required
                      />
                    </CCol>

                    <CCol xs={12} className="offset-4 ">
                      <CButton color="primary" type="submit">
                        Guardar
                      </CButton>
                      <CButton
                        color="danger text-light"
                        className="ms-2"
                        href="#"
                        onClick={abrirycerrarInsert}
                      >
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
            <CCol md={8} className="offset-2">
              <CCard className="mt-3">
                <CCardHeader>
                  <h1 className="h3 text-center">Editar Rol</h1>
                </CCardHeader>
                <CCardBody>
                  <CForm
                    className="row g-3 needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmitE}
                  >
                    <CCol md={6} className="">
                      <CFormInput
                        type="hidden"
                        value={EditarRol.role_Id}
                        onChange={(e) =>
                          setEditarRol({ ...EditarRol, role_Id: e.target.value })
                        }
                        id="validationCustom01"
                        required
                      />
                    </CCol>
                    <CCol md={12} className="">
                      <CFormInput
                        type="text"
                        minLength={2}
                        value={EditarRol.role_Descripcion}
                        onChange={(e) =>
                          setEditarRol({
                            ...EditarRol,
                            role_Descripcion: e.target.value,
                          })
                        }
                        id="validationCustom01"
                        label="Nombre Rol"
                        required
                      />
                    </CCol>
                    <center>
                      <CCol xs={12} className="">
                        <CButton color="primary" type="submit">
                          Guardar
                        </CButton>
                        <CButton
                          color="danger text-light"
                          className="ms-2"
                          href="#"
                          onClick={cerrarEditar}
                        >
                          Cancelar
                        </CButton>
                      </CCol>
                    </center>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
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
      <ToastContainer />
    </div>
  );
}

export default Roles;
