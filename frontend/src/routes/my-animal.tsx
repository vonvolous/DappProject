import React, { FC, useState, useEffect } from "react";
import { Grid, Button, Text, Flex } from "@chakra-ui/react";
import { PiCurrencyEthBold } from "react-icons/pi";

import MyAnimalCard, { IMyAnimalCard } from "../components/MyAnimalCard";

import { mintAnimalTokenContract, saleAnimalTokenAddress } from "../contracts";

interface MyAnimalProps {
    account : string;
}

const MyAnimal: FC<MyAnimalProps> = ({account}) => {
    const [animalCardArray, setAnimalCardArray] = useState<IMyAnimalCard[]>();
    const [saleStatus, setSaleStatus] = useState<boolean>(false); // 초기값 false

    const getAnimalTokens = async () => {
        try {
            const balanceLength = await mintAnimalTokenContract.methods
            .balanceOf(account)
            .call();

            if (balanceLength === "0") return;
            
            const tempAnimalCardArray: IMyAnimalCard[] = [];

            const response = await mintAnimalTokenContract.methods
            .getAnimalTokens(account)
            .call();

            response.map((v: IMyAnimalCard) => {
                tempAnimalCardArray.push({
                    animalTokenId: v.animalTokenId,
                    animalType: v.animalType,
                    animalPrice: v.animalPrice,
                });
            });

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
                <PiCurrencyEthBold/>
                <Text display="inline-block" fontWeight="bold">
                    &nbsp; Sale Status : {saleStatus ? "True" : "False"}
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
            
            <Grid templateColumns="repeat(4, 1fr)" gap={8} mt={4}>
                {
                    animalCardArray && animalCardArray.map((v,i) => {
                        return (
                            <MyAnimalCard
                             key={i}
                             animalTokenId={v.animalTokenId}
                             animalType={v.animalType}
                             animalPrice={v.animalPrice}
                             saleStatus={saleStatus}
                             account={account}
                            />
                        )
                    })
                }
            </Grid>
        </>
    );
};

export default MyAnimal;