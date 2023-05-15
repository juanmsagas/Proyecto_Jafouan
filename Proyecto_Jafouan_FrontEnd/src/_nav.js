import React from "react";
import CIcon from "@coreui/icons-react";

//import de los iconos a usar en la navbar
import {
  cilHome,
  cilBank,
  cilLockLocked,
  cibLibreoffice,
  cilCash,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";



const arregloJSONGET = sessionStorage.getItem("miArreglo");
const miArreglo = JSON.parse(arregloJSONGET);
console.log(miArreglo);



const Vera_Items = [];
const Mant_Items = [];
const Acce_Items = [];
const Fact_Items = [];

const Menu  = [];

const user_Crea = parseInt(parseInt(sessionStorage.getItem('user_Id')));

if (user_Crea==null ||  isNaN(user_Crea)) {
  window.location.href = '/';
}
if (miArreglo==null){
  console.log("a")
}
else{
miArreglo.forEach((element) => {
  if(element.identificador == "acce"){
    Acce_Items.push({
    component: CNavItem,
    name: element.name,
    to: element.to,
    })
  }
  if(element.identificador == "mant"){
    Mant_Items.push({
    component: CNavItem,
    name: element.name,
    to: element.to,
    })
  }
  if(element.identificador == "vera"){
    Vera_Items.push({
    component: CNavItem,
    name: element.name,
    to: element.to,
    })
  }
  if(element.identificador == "fact"){
    Fact_Items.push({
    component: CNavItem,
    name: element.name,
    to: element.to,
    })
  }
});
}


if(Acce_Items.length!=0){
  
  Menu.push (
  {
    component: CNavTitle,
    name: 'Esquema de Seguridad',
  },
  {
  component: CNavGroup,
  name: 'Seguridad',
  to: '/base',
  icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
  items: [...Acce_Items]
})

}
if(Mant_Items.length!=0){

  Menu.push (
    {
      component: CNavTitle,
      name: 'Esquema Mantenimiento',
    },
    {
    component: CNavGroup,
    name: 'Mantenimiento',
    to: '/base',
    icon: <CIcon icon={cibLibreoffice} customClassName="nav-icon" />,
    items: [...Mant_Items]
  })

}
if(Vera_Items.length!=0){
  Menu.push (
    {
      component: CNavTitle,
      name: 'Esquema Tienda',
    },
    {
    component: CNavGroup,
    name: 'Tienda',
    to: '/base',
    icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
    items: [...Vera_Items]
  })
}
if(Fact_Items.length!=0){
  Menu.push (
    {
      component: CNavTitle,
      name: 'Esquema de Facturación',
    },
    {
    component: CNavGroup,
    name: 'Facturación',
    to: '/base',
    icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
    items: [...Fact_Items]
  })
}




const pantalla = [
  {
    component: CNavItem,
    name: "Inicio",
    to: "/home",
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  ...Menu
];




const _nav = pantalla;

export default _nav;
