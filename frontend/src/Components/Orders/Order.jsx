import { Box, Heading, Image, Text, Flex } from '@chakra-ui/react'
import React from 'react'
import { useColorMode } from '../ui/color-mode';

export default function Order({data}) {
    const {colorMode} = useColorMode()
    console.log(data)

    const statuses = {
        pending: "Очікується обробка",
        processing: "Комплектується",
    }
    return (
        <>
            <Text fontSize={'xl'}>{`Статус: ${statuses[data.status]}`}</Text>
            <Text fontSize={'xl'}>{`Ціна всього: ${data.total_price}`}</Text>
            <Flex direction='column' gap={2} justify='center' align="center">
                {data.items.map(item=>{
                    const p = item.product
                    return(
                    <Box bg={colorMode == "dark" ? "gray.800" : "gray.100"} transition={"0.4s"} _hover={{ bg: colorMode == "dark" ? "gray.900" : "gray.200"}} w={300} p={5} borderRadius={10}>
                        <Heading>{p.name}</Heading>
                        <Heading>{`Ціна за один: ${p.price} грн`}</Heading>
                        <Heading>{`Кількість: ${item.quantity}`}</Heading>
                        <Image mx="auto" maxH={"100px"} src={p.image}/>
                        <Heading>{`Загальна ціна: ${item.total_price} грн`}</Heading>
                    </Box>
                    )
                })}
            </Flex>
        </>
    )
}
