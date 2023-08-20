import React, { FC, useState, useEffect } from "react";
import { Grid, Box, Button, Text, Flex } from "@chakra-ui/react";
import AnimalCard from "../components/AnimalCard";

import { mintAnimalTokenContract, saleAnimalTokenAddress } from "../contracts";

interface MyAnimalProps {
    account : string;
}

const MyAnimal: FC<MyAnimalProps> = ({account}) => {
    const [animalCardArray, setAnimalCardArray] = useState<string[]>();
    const [saleStatus, setSaleStatus] = useState<boolean>(false); // 초기값 false

    const getAnimalTokens = async () => {
        try {
            const balanceLength = await mintAnimalTokenContract.methods
            .balanceOf(account)
            .call();

            const tempAnimalCardArray = [];

            for (let i = 0; i < parseInt(balanceLength, 10); i++) {
                const animalTokenId = await mintAnimalTokenContract.methods
                .tokenOfOwnerByIndex(account, i)
                .call();

                const animalType = await mintAnimalTokenContract.methods
                .animalTypes(animalTokenId)
                .call();

                tempAnimalCardArray.push(animalType);
            }

            setAnimalCardArray(tempAnimalCardArray)
        } catch (error) {
            console.error(error)
        }
    };
    const getIsApprovedForAll = async () => {
        try {
            const response = await mintAnimalTokenContract.methods
            .isApprovedForAll(account, saleAnimalTokenAddress)
            .call();

            if(response) {
                setSaleStatus(response);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onClickApproveToggle = async () => {
        try {
            if (!account) return;

            const response = await mintAnimalTokenContract.methods
            .setApprovalForAll(saleAnimalTokenAddress, !saleStatus)
            .send({from:account});

            if (response.status) {
                setSaleStatus(!saleStatus);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!account) return;

        getIsApprovedForAll();
        getAnimalTokens();
    }, [account]);


    return (
        <>
            <Flex alignItems="center">
                <Text display="inline-block" fontWeight="bold">
                    Sale Status : {saleStatus ? "True" : "False"}
                </Text>
                <Button
                 size="xs"
                 ml={2}
                 colorScheme={saleStatus ? "red" : "twitter"}
                 onClick={onClickApproveToggle}
                >
                    {saleStatus ? "Cancle" : "Approve"}
                </Button>

            </Flex>
            <></>
            <Grid templateColumns="repeat(4, 1fr)" gap={8} mt={4}>
                {
                    animalCardArray && animalCardArray.map((v,i) => {
                        return (
                            <AnimalCard key={i} animalType={v}/>
                        )
                    })
                }
            </Grid>
        </>
    );
};

export default MyAnimal;