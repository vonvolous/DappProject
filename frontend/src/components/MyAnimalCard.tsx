import React, {ChangeEvent, FC, useState} from "react";
import {Button, Box, Text, InputGroup, Input, InputRightAddon} from "@chakra-ui/react";

import AnimalCard from "./AnimalCard";
import { saleAnimalTokenContract, web3 } from "../contracts";

export interface IMyAnimalCard {
    animalTokenId: string;
    animalType: string;
    animalPrice: string;
}

interface MyAnimalProps extends IMyAnimalCard {
    saleStatus: boolean;
    account: string;
}

const MyAnimalCard: FC<MyAnimalProps> = ({
    animalTokenId,
    animalType,
    animalPrice,
    saleStatus,
    account
}) => {

    const [sellPrice, setSellPrice] = useState<string>("");
    const [myAnimalPrice, setMyAnimalPrice] = useState<string>(animalPrice);

    const onChangeSellPrice = (e: ChangeEvent<HTMLInputElement>) => {
        setSellPrice(e.target.value);
    }

    const onClickSell = async () => {
        try {
            if (!account || !saleStatus) return;

            const response = await saleAnimalTokenContract.methods
            .setForSaleAnimalToken(animalTokenId, 
                web3.utils.toWei(sellPrice, "ether"))
            .send({from: account});

            if (response.status) {
                setMyAnimalPrice(web3.utils.toWei(sellPrice, "ether"));
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Box textAlign="center" w={150}>
            <AnimalCard animalType={animalType}/>
            <Box mt={2}>
                {myAnimalPrice === "0" ? (
                <>
                    <InputGroup>
                        <Input 
                         type="number" 
                         value={sellPrice} 
                         onChange={onChangeSellPrice}
                        />
                        <InputRightAddon fontWeight="bold" children="Matic" />
                    </InputGroup>
                    <Button size="sm" colorScheme="twitter" mt={2} onClick={onClickSell}>
                        Sell
                    </Button>
                </>
                ) : (
                <>
                    <Text d="inline-block" fontWeight="bold">
                        {web3.utils.fromWei(myAnimalPrice)} Matic
                    </Text>
                </>    
                )}
            </Box>
        </Box>
    )
};

export default MyAnimalCard;