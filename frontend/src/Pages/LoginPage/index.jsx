import { Button, Container, Heading } from "@chakra-ui/react";
import { Group, Input, InputAddon, Stack } from "@chakra-ui/react";
import React from "react";
import { useColorMode } from "../../Components/ui/color-mode";
import { useLoginMutation } from "../../Store/services/user";
import { useRef } from "react";
import { redirect, useNavigate } from "react-router";

export default function LoginPage() {
    const {colorMode, toggleColorMode} = useColorMode()
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const [login] = useLoginMutation()
    const navigate = useNavigate()

    const onLogin = ()=>{
        const username = usernameRef.current.value
        const password = passwordRef.current.value

        login({ username, password })
        .unwrap()
        .then(data =>{
            // console.log(data)
            navigate("/")
        })
    }

  return (
    <Container>
      <Heading size="xl">Вхід в акаунт</Heading>
      <Stack gap="10" mx="auto" w={300}>
        <Group attached>
          <InputAddon>Логін:</InputAddon>
          <Input ref={usernameRef} placeholder="логін" />
        </Group>

        <Group attached>
          <InputAddon>Пароль:</InputAddon>
          <Input ref={passwordRef} type="password" placeholder="пароль" />
        </Group>
        <Button onClick={onLogin} bg={colorMode == "dark" ? "gray.800" : "gray.200"} color={colorMode == "dark" ? "white" : "black"} w={"max"}>Увійти</Button>
      </Stack>
    </Container>
  );
}
