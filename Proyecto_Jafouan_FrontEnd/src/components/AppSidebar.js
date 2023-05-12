import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  
const Menu = () => {
  const [menuDataAcce, setmenuDataAcce] = useState([]);
  const [menuDataMant, setmenuDataMant] = useState([]);
  const [menuDataVera, setmenuDataVera] = useState([]);

  useEffect(() => {
    const sessionId = parseInt(sessionStorage.getItem('user_Id'));
    console.log(sessionId)
    if (sessionId) {
      axios
        .get(`/api/Usuarios/menu?id=${sessionId}`)
        .then((response) => {
          menuDataAcce(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.error('Error al obtener los datos del menú:', error);
        });
    }
  }, []);
}



  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
