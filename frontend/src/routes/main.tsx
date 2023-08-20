import React, {FC, useState} from 'react'; // FC : Functional component
import {Box, Text, Flex, Button} from "@chakra-ui/react"; //div랑 동일 기능
import { mintAnimalTokenContract } from '../contracts';
import AnimalCard from "../components/AnimalCard";

interface MainProps {
    account: string;
}

const Main: FC<MainProps> = ({ account }) => {
    const [newAnimalType, setNewAnimalType] = useState<string>();

    const onClickMint = async () => {
        try {
            if (!account) return;

            const response = await mintAnimalTokenContract.methods
            .mintAnimalToken()
            .send({ from: account });

            if(response.status) {
                const balanceLength = await mintAnimalTokenContract.methods
                .balanceOf(account)
                .call();

                const animalTokenId = await mintAnimalTokenContract.methods
                .tokenOfOwnerByIndex(account, parseInt(balanceLength.length, 10) - 1)
                .call();

                const animalType = await mintAnimalTokenContract.methods
                .animalTypes(animalTokenId)
                .call();

                setNewAnimalType(animalType);
            }
        } catch(error) {
            console.error(error);
        }
    };

    return (
        <Flex 
        w="full" 
        h="100vh" 
        justifyContent="center" 
        alignItems="center"
        direction="column">
            <Box>
                { newAnimalType ? (
                <AnimalCard animalType={newAnimalType}/>
                ) : (
                <Text fontWeight="bold">Let's mint AnimalCard!!</Text>
                )}
            </Box>
            <Button mt={4} size="sm" colorScheme='twitter' onClick={onClickMint}>Mint</Button>
        </Flex>
    );
};

export default Main;