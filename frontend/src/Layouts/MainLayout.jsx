import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Components/Navbar'

export default function MainLayout() {
    return (
        <>
            <header>
                <Navbar/>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                
            </footer>
        </>
    )
}
