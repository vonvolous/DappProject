import React, { FC } from "react";
import { Stack, Flex, Box, Text, Button } from "@chakra-ui/react"; 
import { Link } from "react-router-dom"; 
import { GiTwoShadows } from "../../node_modules/react-icons/gi";

const Layout: FC = ({children}) => {
    return (
        <Stack h="100vh">
            <Flex bg="telegram.200" p={4} justifyContent="space-around" alignItems="center">
                <Box display="flex" alignItems="center">
                    <GiTwoShadows color="black"/>
                    <Text fontWeight="bold">&nbsp; NFT Animals</Text>
                </Box>
                <Box></Box>
                <Box></Box>
                <Box></Box>
                <Box display="flex" alignItems="center">
                    <Link to="/">
                        <Button size="sm" colorScheme="twitter">
                            Main
                        </Button>
                    </Link>
                    <Text>&nbsp; &nbsp;</Text>
                    <Link to="my-animal">
                        <Button size="sm" colorScheme="twitter">
                            My Animal
                        </Button>
                    </Link>
                </Box>
            </Flex>
            <Flex 
            direction="column" 
            h="full" 
            justifyContent="center" 
            alignItems="center"
            >
            {children}
            </Flex>
        </Stack>
    )
}

export default Layout;