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
import { CardHeader } from 'reactstrap'

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [si, setsi] = useState(true);

  useEffect(() => {
    if (!loading) return;
    if(username.length==0 ){
      toast.warning("Usuario es requerido");
      setLoading(false);
      setsi(false)
    }

    if(password.length==0){
      toast.warning("Contraseña es requerida");
      setLoading(false);
      setsi(false)
    }

    if(password.length!=0 && username.length!=0 ){
      axios.get('/api/Usuarios/Login/', { params: { username, password }})
      .then((response) => {
        if(response.data.user_Id!=0){
          console.log(response.data)
          sessionStorage.setItem("user_Id", response.data.user_Id);
          sessionStorage.setItem("user_NombreUsuario", response.data.user_NombreUsuario);
          sessionStorage.setItem("sucu_Id", response.data.sucu_Id);
          sessionStorage.setItem("nombreEmpleado", response.data.nombreEmpleado);
          sessionStorage.setItem("empl_Id", response.data.empl_Id);
          setUsername("");
          setPassword("");
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
      }
  }, [loading, username, password, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  };

 const [borderColor, setBorderColor] = useState('#ffffff');

  useEffect(() => {
    const interval = setInterval(() => {
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      setBorderColor(randomColor);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center" style={{backgroundImage: "url('https://fotografias.antena3.com/clipping/cmsimages02/2022/02/08/65C13E6A-E9F2-4375-9060-A8D305A28134/tienda-ropa-segunda-mano_98.jpg?crop=1920,1080,x0,y200&width=1900&height=1069&optimize=high&format=webply')",backgroundSize:'cover',backgroundRepeat:'no-repeat'}}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4 pb-5 pt-5" style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',border: '5px solid', transition: 'border-color 2s', borderColor: borderColor}}>
                <div className='CardHeader  align-items-center'>
                <center>
                <div style={{ width: '200px', height: '200px', overflow: 'hidden', borderRadius: '50%', border: '5px solid', transition: 'border-color 2s', borderColor: borderColor }}>
                      <img src="https://i.ibb.co/j9Kn1tv/Logo-Login.png" style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '50%' }} alt="Imagen de Login" />
                    </div>
                    <h1 className='h3 text-light mt-5'>Inicio de Sesión</h1>
                    </center>
                </div>
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Usuario"
                        autoComplete="Usuario"
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
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        
                      />
                    </CInputGroup>
                    <CRow>
                      <center>
                      <CCol xs={6}>
                        <CButton type="submit" color="light lg" variant='outline' style={{border: '1px solid', transition: 'border-color 1s', borderColor: borderColor}} className="px-4 btn-lg" disabled={loading}>
                          {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        
                      </CCol>
                      </center>
                    </CRow>
                    {error && <p className="text-danger">{error}</p>}
                  </CForm>
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
