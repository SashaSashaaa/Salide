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
import { useGetFavoriteQuery, useRemoveFavoriteMutation, useSetFavoriteMutation } from '../../Store/services/favoriteList'
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router';
import { enqueueSnackbar } from 'notistack';
import { useGetUserQuery } from '../../Store/services/user';
import { useColorMode } from '../ui/color-mode';

export default function FavoriteList({open, setOpen}) {
    const [remove] = useRemoveFavoriteMutation()
    const {data: userData} = useGetUserQuery()
    const {colorMode} = useColorMode()
    const navigate = useNavigate()
    
    let skip = false
    if(!userData || !userData.username){
        skip = true 
    }
    console.log(skip, userData)
    const {data, isLoading, isError} = useGetFavoriteQuery(null, {skip})
    
    if(isLoading || isError || !data){
        return "..."
    }
    

    // console.log(id)

    const removeFavoriteHandler = (id)=>{
        remove({product_id: id})
            .unwrap()
            .then(data=>{
                enqueueSnackbar("Товар видалино зі списку улюбленого!", {variant: "success"})
            })
        }

    return (
        <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Список улюбленого</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                    <Heading size="md">
                        <Flex wrap="wrap" gap={5} justify="center">
                            {
                                data.products.map(product=>{
                                    return(
                                        <Box onClick={()=>navigate(`product/${product.id}`)} bg={colorMode == "dark" ? "gray.800" : "gray.100"} transition={"0.4s"} _hover={{ bg: colorMode == "dark" ? "gray.900" : "gray.200"}} key={product.id} borderRadius={10} p={2} w={300}>
                                            <Heading>{product.name}</Heading>
                                            <Image h={100} mx="auto" src={product.thumbnail}/>
                                            <Text>{`Ціна: ${product.price}`}</Text>
                                            <IconButton borderRadius="full" color="yellow.400" bg={'none'} onClick={() => removeFavoriteHandler(product.id)}>
                                                {<FaTrashAlt/>}
                                            </IconButton>
                                        </Box>
                                    )
                                })
                            }
                        </Flex>
                    </Heading>
                    </DialogBody>
                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button variant="outline">Закрити</Button>
                        </DialogActionTrigger>
                    </DialogFooter>
                    <DialogCloseTrigger />
                </DialogContent>
        </DialogRoot>
    )
}
