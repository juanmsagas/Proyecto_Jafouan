import { useState, useEffect } from 'react'
import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading) return;

    axios.get('/api/Usuarios/Login/', { params: { username, password }})
      .then((response) => {
        if(response.data.user_Id!=0){
          console.log(response.data)
          sessionStorage.setItem("user_Id", response.data.user_Id);
          sessionStorage.setItem("user_NombreUsuario", response.data.user_NombreUsuario);
          sessionStorage.setItem("sucu_Id", response.data.sucu_Id);
          sessionStorage.setItem("nombreEmpleado", response.data.nombreEmpleado);
          navigate('/home');
        }
        else{
          toast.error(response.data.user_NombreUsuario);
        }
      })
      .catch((error) => {
        setError(error.message); 
      })
      .finally(() => {
        setLoading(false);
      });

      const user_Id = parseInt(sessionStorage.getItem('user_Id'));

      axios
      .get(`api/Usuarios/Menu?id=${user_Id}`)
      .then((response) => {
        const menu = response.data.map((item) => ({
          name: item.pant_Nombre,
          to: item.pant_href,
          identificador: item.pant_Identificador.substring(0, 4),
        }));
      
        console.log(menu);
        const arregloJSON = JSON.stringify(menu);
      
        sessionStorage.setItem('miArreglo', arregloJSON);
      

        })
        .catch((error) => {
          console.log(error);
        });
    
  }, [loading, username, password, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4" disabled={loading}>
                          {loading ? 'Loading...' : 'Login'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                    {error && <p className="text-danger">{error}</p>}
                  </CForm>
                </CCardBody>
              </CCard>  
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer />
    </div>
  )
}

export default Login
