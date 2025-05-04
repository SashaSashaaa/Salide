import { Box, Center, Heading, Image, Text, Button } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router'
import { useColorMode } from '../../Components/ui/color-mode'

export default function ProductCard({data}) {
    const navigate = useNavigate()
    const {colorMode} = useColorMode()
    return (
        <Box 
            w={300} 
            onClick={()=>navigate(`product/${data.id}`)}
            bg={colorMode == "dark" ? "gray.800" : "gray.100"}
            transition={"0.4s"}
            _hover={{
                bg: colorMode == "dark" ? "gray.900" : "gray.200", 
            }}
            p={2}
            borderRadius={20}

        >
            <Heading textAlign="center" height={"60px"} size="lg">{data.name}</Heading>
            <Image src={data.thumbnail} h={200} mx="auto"/>
            <b><Text textAlign="center" color={colorMode == "dark" ? "green.400" : "green.600"}>{data.price} грн</Text></b>            
            <Text lineClamp="3">{data.main_description}</Text>
            {/* <Button bg="yellow.400" borderRadius={15} w={284}>Додати до кошика</Button> */}
        </Box>
    )
}
