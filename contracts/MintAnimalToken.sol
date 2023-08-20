// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0; //컴파일러

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "./SaleAnimalToken.sol";

contract MintAnimalToken is ERC721Enumerable {
    constructor() ERC721("h662Animals", "HAS") {} //ERC721(name, symbol)

    SaleAnimalToken public saleAnimalToken;

    mapping(uint256 => uint256) public animalTypes; 
    //앞의 uint256은 animalTokenId이고 뒤에는 animalTypes, 그래서 아이디 주면 타입 나옴

    struct AnimalTokenData {
        uint256 animalTokenId;
        uint256 animalType;
        uint256 animalPrice;
    }

    function mintAnimalToken() public {
        uint256 animalTokenId = totalSupply() + 1;

        uint256 animalType = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, animalTokenId))) % 5 + 1;

        animalTypes[animalTokenId] = animalType;

        _mint(msg.sender, animalTokenId); // mint 함수
    }

    function getAnimalTokens(address _animalTokenOwner) view public returns (AnimalTokenData[] memory) { //memory type data: 일시저장됨, storage: 영구 저장
        uint256 balanceLength = balanceOf(_animalTokenOwner);

        require(balanceLength != 0, "Owner didn't have token.");

        AnimalTokenData[] memory animalTokenData = new AnimalTokenData[](balanceLength);

        for (uint256 i = 0; i < balanceLength; i++) {
            uint256 animalTokenId = tokenOfOwnerByIndex(_animalTokenOwner, i);
            uint256 animalType = animalTypes[animalTokenId];
            uint256 animalPrice = saleAnimalToken.getAnimalTokenPrice(animalTokenId);

            animalTokenData[i] = AnimalTokenData(animalTokenId, animalType, animalPrice);
        }

        return animalTokenData;
    }

    function setSaleAnimalToken(address _saleAnimalToken) public {
        saleAnimalToken = SaleAnimalToken(_saleAnimalToken);
    }
//ownerOf : minting의 주인 나타냄
}