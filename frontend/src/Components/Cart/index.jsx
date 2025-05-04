import React from 'react'
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
    DialogActionTrigger,
  } from "@/components/ui/dialog"

import { Heading, Button, Flex, Box, Image, Text, IconButton } from '@chakra-ui/react'
import { useGetCartQuery, useAddCartMutation, useRemoveCartMutation, useUpdateCartMutation } from '../../Store/services/cart';
import { useParams } from 'react-router';
import { enqueueSnackbar } from 'notistack';
import { useGetUserQuery } from '../../Store/services/user';
import { useColorMode } from '../ui/color-mode';
import { useCheckoutMutation } from '../../Store/services/order';

export default function Cart({open, setOpen}) {
    const {colorMode} = useColorMode()
    const {data: userData} = useGetUserQuery()
    const [updateCart] = useUpdateCartMutation()
    const [removeProduct] = useRemoveCartMutation()
    const [checkout] = useCheckoutMutation()

    let skip = false
    if(!userData || !userData.username){
        skip = true 
    }

    const { data, isLoading, refetch } = useGetCartQuery(null, {skip})

    if(!data || isLoading){
        return ""
    }

    const addCartHandler = (product_id, quantity) =>{
        updateCart({product_id, quantity: quantity + 1})
        .unwrap()
        .then(data=>{
            enqueueSnackbar("Кількість товару змінена!", {variant: "success"})
        })
    }

    const removeCartHandler = (product_id, quantity) =>{
        if(quantity > 1){
            updateCart({product_id, quantity: quantity - 1})
            .unwrap()
            .then(data=>{
                enqueueSnackbar("Кількість товару змінена!", {variant: "success"})
            })
        }
        else{
            removeProduct({product_id}).unwrap()
            .then(data => {
                if(data.detail == "success"){
                    enqueueSnackbar("Товар успішно видалено з кошика!", {variant: "success"})
                }
            })
        }
    }
    
    const orderHandler = ()=>{
        checkout()
        .unwrap()
        .then(data=>{
            if(data && data.detail == "success"){
                enqueueSnackbar("Змовлення успішно замовлено!", { variant: "success" })
                refetch()
            }
        })
    }

    return (
        <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Кошик</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        {
                            !data.items.length ? <Heading>- Кошик пустий -</Heading> : (
                                <>
                                <Flex wrap="wrap" gap={5} justify="center">
                                    {
                                        data.items.map(pr=>{
                                            const p = pr.product
                                            return(
                                                <Box bg={colorMode == "dark" ? "gray.800" : "gray.100"} transition={"0.4s"} _hover={{ bg: colorMode == "dark" ? "gray.900" : "gray.200"}} key={p.id} w={300} p={5} borderRadius={10}>
                                                    <Heading>{p.name}</Heading>
                                                    <Image h={100} mx="auto" src={p.image}></Image>
                                                    <Heading>{`Ціна: ${p.price}`}</Heading>
                                                    <Heading>{`Кількість: ${pr.quantity}`}</Heading>
                                                    <Heading>{`Разом: ${pr.total_price} грн`}</Heading>
                                                    <Box>
                                                        <Button onClick={()=>addCartHandler(p.id, +pr.quantity)} colorPalette={"green"}>+</Button>
                                                        <Button onClick={()=>removeCartHandler(p.id, +pr.quantity)} colorPalette={"red"}>-</Button>
                                                    </Box>
                                                </Box>
                                            ) 
                                        })
                                    }
                                </Flex>
                                <Text fontSize={"2xl"}>{`Загальна ціна: ${data.total_price} грн`}</Text>
                                </>
                            )
                        }
                    </DialogBody>
                    <DialogFooter>
                            {data.items.length ? <Button onClick={orderHandler} mx={2}>Замовити</Button> : ""}
                        {/* <DialogActionTrigger asChild>
                            <Button variant="outline">Закрити</Button>
                        </DialogActionTrigger> */}
                    </DialogFooter>
                    <DialogCloseTrigger />
                </DialogContent>
        </DialogRoot>
    )
}
