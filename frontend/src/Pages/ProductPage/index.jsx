import React from 'react'
import "./style.css"
import { useGetOneProductQuery } from '../../Store/services/products'
import { useParams } from 'react-router'
import { Container, Spinner, Heading, Image, Box, Text, IconButton } from '@chakra-ui/react'

import { FaStar } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaCartPlus} from "react-icons/fa";
import { BsCartDashFill } from "react-icons/bs";

import Loader from '../../Components/Loader'
import { useColorMode } from '../../Components/ui/color-mode'
import { useGetFavoriteQuery, useSetFavoriteMutation, useRemoveFavoriteMutation } from '../../Store/services/favoriteList'
import { enqueueSnackbar } from 'notistack'
import { useAddCartMutation, useGetCartQuery } from '../../Store/services/cart'
import { motion, useScroll } from "motion/react"

export default function ProductPage() {
    const {id} = useParams()
    const {isLoading, data} = useGetOneProductQuery(id)
    const {colorMode} = useColorMode()
    const { scrollYProgress } = useScroll(0)
    
    const {data: favoriteData, isLoading: isFavoriteLoading} = useGetFavoriteQuery() 
    const {data: cartData, isLoading: isCartLoading} = useGetCartQuery()
    const [addCart] = useAddCartMutation() 

    const [addFavorite] = useSetFavoriteMutation()
    const [removeFavorite] = useRemoveFavoriteMutation()

    if(isLoading || isFavoriteLoading || isCartLoading){
        return <Loader/>
    }

    const addToCartHandler = ()=>{
        addCart({product_id: id})
        .unwrap()
        .then((data)=>{
            if(data.detail == "success"){
                enqueueSnackbar("Товар додано до кошика!", {variant: "success"})
            }
            else{
                enqueueSnackbar("Помилка!", {variant: "error"})
            }
        })
    }

    const addFavoriteHandler = ()=>{
        addFavorite({product_id: id})
        .unwrap()
        .then(data=>{
            enqueueSnackbar("Товар додано до списку улюбленого!", {variant: "success"})
        })
    }
    const removeFavoriteHandler =  ()=>{
        removeFavorite({product_id: id})
        .unwrap()
        .then(data=>{
            enqueueSnackbar("Товар видалино зі списку улюбленого!", {variant: "success"})
        })
    }

    // console.log(favoriteData)

    let isFavorite = false
    if(cartData && cartData.items && cartData.items.length){
        for(let p of favoriteData.products){
            if(p.id == id){
                isFavorite = true
                break
            }
        }
    }

    let isInCart = false
    if(cartData && cartData.items && cartData.items.length){
        for(let p of cartData.items){
            if(p.product.id == id){
                isInCart = true
                break
            }
        }
    }
    else{
        // isInCart = true
    }

    return (
        <>
      <motion.div
        id="scroll-indicator"
        initial={{
            scaleX: 0,
        }}
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          originX: 0,
          backgroundColor: "rgb(255, 191, 15)",
          zIndex: 10
        }}
      />
            <Container maxW={1400}>
            <Heading>{data.name}</Heading>
            
            {
                favoriteData && favoriteData.products ? (
                    <IconButton borderRadius="full" color="yellow.400" bg={'none'} onClick={isFavorite ? removeFavoriteHandler : addFavoriteHandler}>
                        {isFavorite ? <FaTrashAlt/> : <FaStar/>}
                    </IconButton>
                ) : ""
            }
            {
                isInCart ? "" : (
                <IconButton ml={2} borderRadius="full" color="yellow.400" bg={'none'} onClick={addToCartHandler}>
                    {<FaCartPlus/>}
                </IconButton>
                )
            }
            
            <Box>
                <Text display="inline" color={colorMode == "dark" ? "green.400" : "green.600"}>{data.price}</Text>
                <Text ml={2} display="inline" >грн</Text>
            </Box>
            <Image src={data.image}/>
            
            <Box className={`editor-text-${colorMode}`} dangerouslySetInnerHTML={{__html: data.description}}></Box>
        </Container>
        </>     
    )
}
