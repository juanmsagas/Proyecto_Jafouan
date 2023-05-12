import React from "react";
import CIcon from "@coreui/icons-react";
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

miArreglo.forEach((element) => {
  if(element.identificador == "acce"){
    Acce_Items.push({
    component: CNavItem,
    name: element.name,
    to: element.to,
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    })
  }
  if(element.identificador == "mant"){
    Mant_Items.push({
    component: CNavItem,
    name: element.name,
    to: element.to,
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    })
  }
  if(element.identificador == "vera"){
    Vera_Items.push({
    component: CNavItem,
    name: element.name,
    to: element.to,
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    })
  }
  if(element.identificador == "fact"){
    Fact_Items.push({
    component: CNavItem,
    name: element.name,
    to: element.to,
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    })
  }
});



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
  icon: <CIcon icon={cilCasino} customClassName="nav-icon" />,
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
    icon: <CIcon icon={cilGlobeAlt} customClassName="nav-icon" />,
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
    name: 'Mantenimiento',
    to: '/base',
    icon: <CIcon icon={cilCasino} customClassName="nav-icon" />,
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
    icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
    items: [...Fact_Items]
  })
}




console.log(Menu)
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
