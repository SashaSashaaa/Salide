import { Button, Center, Flex, Heading, Box, Input, InputGroup } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useGetProductsQuery } from '../../Store/services/products'
import ProductCard from './ProductCard'

import { For, HStack, Stack } from "@chakra-ui/react"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination"
import { useSearchParams } from 'react-router'
import { h1 } from 'motion/react-client'
import { color } from 'motion/react'
import { LuSearch } from "react-icons/lu"
import { useColorMode } from '../../Components/ui/color-mode'

export default function MainPage() {
    const {colorMode, toggleColorMode} = useColorMode()
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchName, setSearchName] = useState("")
    let page = searchParams.get("page")
    let name = searchParams.get("name")
    let name_string = ""
    if (name){
        name_string = `&name=${name}`
    }

    if(!page){
        page = 1
    }
    const {isLoading, data, isError} = useGetProductsQuery(`page=${page}${name_string}`)

    if(isLoading){
        return "LOADING..."
    }

    // console.log(data)

    return (
        <div>
            <Heading fontSize={30} color='red' textAlign='center'><b>НЕ Є МАГАЗИНОМ, ЦЕ ТЕСТОВИЙ САЙТ, КУПИТИ НІЧОГО НЕ ВИЙДЕ!!!!!</b></Heading>
            <Box mt={5} mb={3} p={2} bg={colorMode == "dark"? "gray.800" : "gray.300"} textAlign="center">
                <InputGroup border="2px solid gray" borderRadius={10} w={300} mx={"auto"} p={2} display='flex' startElement={<LuSearch />} endElement={<Button size={"sm"} bg={colorMode == "dark"? "gray.500" : "gray.400"} color={colorMode == "dark"? "white" : "black"} onClick={()=>setSearchParams({name: searchName})}>Пошук</Button>}>
                    <Input border={'none'} w={300} value={searchName} onChange={(e)=>{setSearchName(e.target.value)}} placeholder="Пошук..." />
                </InputGroup>
            </Box>
            <Flex gap={"10px"} wrap="wrap" justify="center" align="center">
                {
                    data.results.map(product => <ProductCard data={product} key={product.id}/>)
                }
            </Flex>
            <PaginationRoot
                count={data.count}
                pageSize={10}
                defaultPage={1}
                onPageChange={(e)=>{ setSearchParams({page: e.page}) }}
                size="lg"
            >
                <HStack justify="center" mt={2}>
                <PaginationPrevTrigger />
                <PaginationItems />
                <PaginationNextTrigger />
                </HStack>
            </PaginationRoot>
        </div>
    )
}
