import { Button, Container, Heading } from "@chakra-ui/react";
import { Group, Input, InputAddon, Stack } from "@chakra-ui/react";
import React from "react";
import { useColorMode } from "../../Components/ui/color-mode";
import { useLoginMutation, useRegisterMutation } from "../../Store/services/user";
import { useRef } from "react";
import { redirect, useNavigate } from "react-router";
import { enqueueSnackbar } from "notistack";

export default function RegisterPage() {
    const {colorMode, toggleColorMode} = useColorMode()
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const confPasswordRef = useRef(null)
    const emailRef = useRef(null)
    const firstnameRef = useRef(null)
    const lastnameRef = useRef(null)

    const [register] = useRegisterMutation()
    const navigate = useNavigate()

    const onRegister = ()=>{
        const username = usernameRef.current.value
        const password = passwordRef.current.value
        const passwordconf = confPasswordRef.current.value
        const email = emailRef.current.value
        const first_name = firstnameRef.current.value
        const last_name = lastnameRef.current.value

        if(password != passwordconf){
          enqueueSnackbar("Паролі не співпадають", {variant: "error"})
        }

        register({ username, password, email, first_name, last_name })
        .unwrap()
        .then(data =>{
            enqueueSnackbar("Реєстрація успішна", {variant: "success"})
            // console.log(data)
            navigate("/")
        })
    }

  return (
    <Container>
      <Heading size="xl">Реєстрація</Heading>
      <Stack gap="10" mx="auto" w={300}>
        <Group attached>
          <InputAddon>Логін:</InputAddon>
          <Input ref={usernameRef} placeholder="логін" />
        </Group>
        
        <Group attached>
          <InputAddon>Пошта:</InputAddon>
          <Input ref={emailRef} type="email" placeholder="email" />
        </Group>

        <Group attached>
          <InputAddon>Ім'я:</InputAddon>
          <Input ref={firstnameRef} type="text" placeholder="ім'я" />
        </Group>

        <Group attached>
          <InputAddon>Прізвище:</InputAddon>
          <Input ref={lastnameRef} type="text" placeholder="прізвище" />
        </Group>

        <Group attached>
          <InputAddon>Пароль:</InputAddon>
          <Input ref={passwordRef} type="password" placeholder="пароль" />
        </Group>

        <Group attached>
          <InputAddon>Повторіть пароль:</InputAddon>
          <Input ref={confPasswordRef} type="password" placeholder="пароль" />
        </Group>

        <Button onClick={onRegister} bg={colorMode == "dark" ? "gray.800" : "gray.200"} color={colorMode == "dark" ? "white" : "black"} w={"max"}>Реєстрація</Button>
      </Stack>
    </Container>
  );
}
