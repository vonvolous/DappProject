// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0; //컴파일러

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MintAnimalToken is ERC721Enumerable {
    constructor() ERC721("h662Animals", "HAS") {} //ERC721(name, symbol)

    mapping(uint256 => uint256) public animalTypes; 
    //앞의 uint256은 animalTokenId이고 뒤에는 animalTypes, 그래서 아이디 주면 타입 나옴

    function mintAnimalToken() public {
        uint256 animalTokenId = totalSupply() + 1;

        uint256 animalType = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, animalTokenId))) % 5 + 1;

        animalTypes[animalTokenId] = animalType;

        _mint(msg.sender, animalTokenId); // mint 함수
    }
} //ownerOf : minting의 주인 나타냄