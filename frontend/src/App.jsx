import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router"
import MainLayout from './Layouts/MainLayout'
import MainPage from './Pages/MainPage'
import ProductPage from './Pages/ProductPage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'

import { ColorModeProvider } from "@/components/ui/color-mode"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { store } from './Store/store'
import { Provider as ReduxProvider } from 'react-redux'
import { SnackbarProvider } from 'notistack'

function App() {
  return (
    <SnackbarProvider>
      <ReduxProvider store={store}>
        <ChakraProvider value={defaultSystem}>
          <ColorModeProvider>
          <BrowserRouter>
            <Routes>
            <Route path="" element={<MainLayout />}>
              <Route index element={<MainPage />} />
              <Route path='login' element={<LoginPage />} />
              <Route path='register' element={<RegisterPage />} />
              <Route path="product/:id" element={<ProductPage />} />
            </Route>  
            </Routes>
          </BrowserRouter>
          </ColorModeProvider>
        </ChakraProvider>
      </ReduxProvider>
    </SnackbarProvider>
  )
}

export default App
