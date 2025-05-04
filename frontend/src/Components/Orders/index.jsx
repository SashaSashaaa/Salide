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


import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
  } from "@/components/ui/accordion"

import { Heading, Button, Flex, Box, Image, Text, IconButton } from '@chakra-ui/react'
import { useGetCartQuery, useAddCartMutation, useRemoveCartMutation, useUpdateCartMutation } from '../../Store/services/cart';
import { FaTrashAlt } from "react-icons/fa";
import { useParams } from 'react-router';
import { enqueueSnackbar } from 'notistack';
import { useGetUserQuery } from '../../Store/services/user';
import { useGetOrdersQuery } from '../../Store/services/order';
import { useColorMode } from '../ui/color-mode';
import Order from './Order';

export default function Orders({open, setOpen}) {
    const {colorMode} = useColorMode()
    const {data: userData} = useGetUserQuery()
    const {data, isLoading} = useGetOrdersQuery()
    
    let skip = false
    if(!userData || !userData.username){
        skip = true 
    }

    if(isLoading || !data){
        return ""
    }

    console.log(data)

    return (
        <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Замовлення</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                    <Heading size="md">
                        <AccordionRoot collapsible defaultValue={["b"]}>
                        {(data || []).map((o, index) => (
                        <AccordionItem key={index} value={o.id}>
                            <AccordionItemTrigger color={colorMode === "dark" ? "gray.100" : "gray.800"} fontSize={25}>
                                <b>{`Замовлення №${o.id}`}</b>
                            </AccordionItemTrigger>
                            <AccordionItemContent>
                                <Order data={o}/>
                            </AccordionItemContent>
                        </AccordionItem>
                        ))}
                        </AccordionRoot>
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
    console.log(data)
}

