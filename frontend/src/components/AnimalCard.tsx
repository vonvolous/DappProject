import React, {FC} from "react";
import {Image} from "@chakra-ui/react";

interface AnimalCardProps {
    animalType: string;
}

const AnimalCard: FC<AnimalCardProps> = ({animalType}) => {
    return (
        <Image borderRadius={10} w={150} h={150} src={`images/${animalType}.png`} alt="AnimalCard" />
    )
};

export default AnimalCard;