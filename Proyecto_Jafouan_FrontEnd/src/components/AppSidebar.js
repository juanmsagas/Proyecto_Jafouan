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
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex pt-3 pb-3" to="/">
      <div style={{ width: '100px', height: '100px', overflow: 'hidden', borderRadius: '80%', border: '5px solid', transition: 'border-color 2s', borderColor: borderColor }}>
                      <img src="https://i.ibb.co/j9Kn1tv/Logo-Login.png" style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '50%' }} alt="Imagen de Login" />
                    </div>
         
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
