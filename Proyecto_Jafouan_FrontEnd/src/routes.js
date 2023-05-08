import React from 'react'
//aca todos los import da cada pagina
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Usuarios = React.lazy(() => import('./views/usuarios/usuarios'))
const Cargos = React.lazy(() => import('./views/cargos/cargos'))
const Roles = React.lazy(() => import('./views/roles/roles'))
const Departamentos = React.lazy(() => import('./views/departamentos/departamentos'))
const Municipios = React.lazy(() => import('./views/municipios/municipios'))
const Prendas = React.lazy(() => import('./views/prendas/prendas'))
const Empleados = React.lazy(() => import('./views/empleados/empleados'))
const Categorias = React.lazy(() => import('./views/categorias/categorias'))
const Descuentos = React.lazy(() => import('./views/descuentos/descuentos'))
const EstadosCiviles = React.lazy(() => import('./views/estadosciviles/estadosciviles'))
const Marcas = React.lazy(() => import('./views/marcas/marcas'))
const MetodosPagos = React.lazy(() => import('./views/metodospago/metodospago'))
const Fardos = React.lazy(() => import('./views/fardos/fardos'))






const routes = [
  //aca van todas las rutas como tal
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/usuarios', name: 'Usuarios', element: Usuarios },
  { path: '/cargos', name: 'Cargos', element: Cargos },
  { path: '/roles', name: 'Roles', element: Roles },
  { path: '/departamentos', name: 'Departamentos', element: Departamentos },
  { path: '/municipios', name: 'Municipios', element: Municipios },
  { path: '/prendas', name: 'Prendas', element: Prendas },
  { path: '/empleados', name: 'Empleados', element: Empleados },
  { path: '/categorias', name: 'Categorias', element: Categorias },
  { path: '/marcas', name: 'Marcas', element: Marcas },
  { path: '/descuentos', name: 'Descuentos', element: Descuentos },
  { path: '/estadosciviles', name: 'EstadosCiviles', element: EstadosCiviles },
  { path: '/metodospago', name: 'MetodosPagos', element: MetodosPagos },
  { path: '/fardos', name: 'Fardos', element: Fardos },


]

export default routes
