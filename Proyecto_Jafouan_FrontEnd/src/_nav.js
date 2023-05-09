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
  cilTags,
  cilSettings,
  cilMap,
  cilStorage,
  cilCamera,
  cilPeople,
  cilBuilding,
  cilMoney,
  cilLibrary,
  cilMinus,
  cilBank,
  cilBadge,
  cilPaintBucket,
  cilCarAlt,
  cilRestaurant,
  cilGlobeAlt,
  cilAlignCenter,
  cilCasino,
  cilPaperclip,
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
    component: CNavTitle,
    name: 'Tablas Generales',
  },
  {
    component: CNavGroup,
    name: 'Generales',
    to: '/base',
    icon: <CIcon icon={cilGlobeAlt} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Cargos',
        to: '/Cargos',
        icon: <CIcon icon={cilTags} customClassName="nav-icon" />,
      },  {
        component: CNavItem,
        name: 'Departamentos',
        to: '/Departamentos',
        icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
      },  {
        component: CNavItem,
        name: 'Municipios',
        to: '/Municipios',
        icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
      },  {
        component: CNavItem,
        name: 'Estados Civiles',
        to: '/EstadosCiviles',
        icon: <CIcon icon={cilBadge} customClassName="nav-icon" />,
      },
]
},
{
  component: CNavTitle,
  name: 'Tablas de Facturación',
},
{
  component: CNavGroup,
  name: 'Facturación',
  to: '/base',
  icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
  items: [
    {
      component: CNavItem,
      name: 'Métodos de Pago',
      to: '/MetodosPago',
      icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Facturas',
      to: '/Facturas',
      icon: <CIcon icon={cilPaperclip} customClassName="nav-icon" />,
    },
  

]
},
{
  component: CNavTitle,
  name: 'Tablas de Venta de Ropa',
},
{
  component: CNavGroup,
  name: 'Venta de Ropa',
  to: '/base',
  icon: <CIcon icon={cilCasino} customClassName="nav-icon" />,
  items: [
    {
      component: CNavItem,
      name: 'Prendas',
      to: '/Prendas',
      icon: <CIcon icon={cilCamera } customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Empleados',
      to: '/Empleados',
      icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    },
    
    {
      component: CNavItem,
      name: 'Clientes',
      to: '/Clientes',
      icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Categorias',
      to: '/Categorias',
      icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Marcas',
      to: '/Marcas',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Descuentos',
      to: '/Descuentos',
      icon: <CIcon icon={cilMinus} customClassName="nav-icon" />,
    },
  
  
    {
      component: CNavItem,
      name: 'Fardos',
      to: '/Fardos',
      icon: <CIcon icon={cilPaintBucket} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Proveedores',
      to: '/Proveedores',
      icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Sucursales',
      to: '/Sucursales',
      icon: <CIcon icon={cilRestaurant} customClassName="nav-icon" />,
    },
  

]
},
{
  component: CNavTitle,
  name: 'Tablas de Acceso',
},
{
  component: CNavGroup,
  name: 'Acceso',
  to: '/base',
  icon: <CIcon icon={cilCasino} customClassName="nav-icon" />,
  items: [
    {
      component: CNavItem,
      name: 'Usuarios',
      to: '/Usuarios',
      icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },
  
    {
      component: CNavItem,
      name: 'Roles',
      to: '/Roles',
      icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    },
  

]
}


]

export default _nav
