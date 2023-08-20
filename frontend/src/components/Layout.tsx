import React, { FC } from "react";
import { Stack, Flex, Box, Text, Button } from "@chakra-ui/react"; 
import { Link } from "react-router-dom"; 
import { GiTwoShadows } from "../../node_modules/react-icons/gi";

const Layout: FC = ({children}) => {
    return (
        <Stack h="100vh" ml={20} mr={20} mt={4}>
            <Flex bg="telegram.100" p={4} justifyContent="space-around" alignItems="center" borderRadius={8}>
                <Box display="flex" alignItems="center">
                    <GiTwoShadows color="#191970"/>
                    <Text fontWeight="bold" color="#191970">&nbsp; NFT Animals</Text>
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
            borderRadius={8}
            bgColor="#FAFAFA"
            >
            {children}
            </Flex>
        </Stack>
    )
}

export default Layout;