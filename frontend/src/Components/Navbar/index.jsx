import { Flex, Box, Link, Button, Image, Text, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useColorMode } from '../ui/color-mode'
import { LuMoon, LuSun } from 'react-icons/lu'
import { IconButton } from "@chakra-ui/react"
import { FaUserCircle } from "react-icons/fa";
import LogoImg from "./logo.png"
import MainPage from '../../Pages/MainPage'
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
  } from "@/components/ui/menu"

import { useNavigate } from 'react-router'
import { useGetUserQuery, useLogoutMutation } from '../../Store/services/user'
import FavoriteList from '../FavoriteList'
import Cart from '../Cart'
import Orders from '../Orders'
import "./style.css"

export default function Navbar() {
    const {colorMode, toggleColorMode} = useColorMode()
    const [logout] = useLogoutMutation()
    const [open, setOpen] = useState(false)
    const [openCart, setOpenCart] = useState(false)
    const [openOrders, setOpenOrders] = useState(false)
    const navigate = useNavigate()
    const {data: userData, isLoading, isError} = useGetUserQuery()

    const onLogout = ()=>{
        logout().unwrap()
            .then(data=>{
                console.log(data)
            })
    }

    const onMenuClick = ({value}) => {
        if(value == "register"){
            navigate("register")
        }
        else if(value == "login") {
            navigate("login")
        }        
        else if(value == "favorite") {
            //menu
            setOpen(true)
        }
        else if(value == "cart") {
            //menu
            setOpenCart(true)
        }
        else if(value == "orders") {
            //menu
            setOpenOrders(true)
        }
        else if(value == "logout") {
            onLogout()
        }
    }

    if(isLoading){
        return ""
    }

    // console.log(userData)

    return (
        <Flex mb={5} bg={colorMode == "dark"? "gray.800" : "gray.300"} p={2} align='center' justify='space-around'>
            <Image className="rotating-image" src={LogoImg} onClick={()=>navigate("/")} rounded="full" w={20}/>
            <b><Text fontSize={42}>Salide</Text></b>
            {/* <Box>
                <Link color={colorMode == "dark"? "white.100" : "black.900"}>Корисне</Link>
                <Link color={colorMode == "dark"? "white.100" : "black.900"}>Про нас</Link>
            </Box> */}
            <Box>
                <IconButton border="2px solid black" bg={colorMode == "dark"? "blue.800" : "yellow.400"} onClick={toggleColorMode} rounded="full" w="20px">
                    {
                        colorMode == "dark"? <LuMoon color='white'/> : <LuSun color='black'/>
                    }
                </IconButton>
                    <MenuRoot onSelect={onMenuClick}>
                        <MenuTrigger asChild>
                            <IconButton border="2px solid black" color={'black'} bg={'yellow.400'} borderRadius={"full"} ml={10} variant="outline" size="md">
                                <FaUserCircle />
                            </IconButton>
                        </MenuTrigger>
                        <MenuContent>
                            {userData && userData.username ? (<>
                                <MenuItem value="cart">Кошик</MenuItem>
                                <MenuItem value="favorite">Обране</MenuItem>
                                <MenuItem value="orders">Замовлення</MenuItem>
                                <MenuItem value="logout">Вийти</MenuItem>
                            </>) : (<>
                                <MenuItem value="login">Логін</MenuItem>
                                <MenuItem value="register">Реєстрація</MenuItem>
                            </>)}
                        </MenuContent>
                    </MenuRoot>
            </Box>

            <FavoriteList open={open} setOpen={setOpen}/>
            <Cart open={openCart} setOpen={setOpenCart}/>
            <Orders open={openOrders} setOpen={setOpenOrders}/>

        </Flex>
    
    )
}
