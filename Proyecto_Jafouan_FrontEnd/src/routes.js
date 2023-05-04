import React from 'react'
//aca todos los import da cada pagina
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Usuarios = React.lazy(() => import('./views/usuarios/usuarios'))
const Cargos = React.lazy(() => import('./views/cargos/cargos'))
const Roles = React.lazy(() => import('./views/roles/roles'))
const Departamentos = React.lazy(() => import('./views/departamentos/departamentos'))
const Municipios = React.lazy(() => import('./views/municipios/municipios'))



const routes = [
  //aca van todas las rutas como tal
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/usuarios', name: 'Usuarios', element: Usuarios },
  { path: '/cargos', name: 'Cargos', element: Cargos },
  { path: '/roles', name: 'Roles', element: Roles },
  { path: '/departamentos', name: 'Departamentos', element: Departamentos },
  { path: '/municipios', name: 'Municipios', element: Municipios },

]

export default routes
