import React, {FC} from "react";
import {Box, Text, Button} from "@chakra-ui/react";
import AnimalCard from "./AnimalCard";
import { web3 } from "../contracts";

interface SaleAnimalCardProps {
    animalType: string;
    animalPrice: string;
}

const SaleAnimalCard: FC<SaleAnimalCardProps> = ({animalType, animalPrice}) => {
    return (
    <Box textAlign="center" w={150}>
        <AnimalCard animalType={animalType} />
        <Box>
            <Text d="inline-block" fontWeight="bold">
                {web3.utils.fromWei(animalPrice)} Matic
            </Text>
            <Button size="sm" colorScheme="twitter" m={2}>
                Buy
            </Button>
        </Box>
    </Box>
    );
};

export default SaleAnimalCard;