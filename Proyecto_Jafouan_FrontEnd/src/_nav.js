import React from 'react'
import CIcon from '@coreui/icons-react'
//import de los iconos a usar en la navbar
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilHome,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
  cilContact,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Inicio',
    to: '/home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Usuarios',
    to: '/Usuarios',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Cargos',
    to: '/Cargos',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Roles',
    to: '/Roles',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Departamentos',
    to: '/Departamentos',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Municipios',
    to: '/Municipios',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Prendas',
    to: '/Prendas',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Empleados',
    to: '/Empleados',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  
  {
    component: CNavItem,
    name: 'Clientes',
    to: '/Clientes',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Categorias',
    to: '/Categorias',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Marcas',
    to: '/Marcas',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Descuentos',
    to: '/Descuentos',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Métodos de Pago',
    to: '/MetodosPago',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Estados Civiles',
    to: '/EstadosCiviles',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Fardos',
    to: '/Fardos',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Proveedores',
    to: '/Proveedores',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Sucursales',
    to: '/Sucursales',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },



]

export default _nav
