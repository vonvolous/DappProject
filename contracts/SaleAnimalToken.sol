// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "MintAnimalToken.sol";

contract SaleAnimalToken {
    MintAnimalToken public mintAnimalTokenAddress;

    constructor (address _mintAnimalTokenAddress) {
        mintAnimalTokenAddress = MintAnimalToken(_mintAnimalTokenAddress);    
    }

    mapping(uint256 => uint256) public animalTokenPrices;

    uint256[] public onSaleAnimalTokenArray;

    // 토큰 판매 함수
    function setForSaleAnimalToken(uint256 _animalTokenId, uint256 _price) public {
        address animalTokenOwner = mintAnimalTokenAddress.ownerOf(_animalTokenId);

        //소유자가 아니라면 에러 메세지 출력
        require(animalTokenOwner == msg.sender, "Caller is not animal token owner.");
    
        // 판매가격이 0 이하가 아니어야 함
        require(_price > 0, "Price is zero or lower.");

        require(animalTokenPrices[_animalTokenId] == 0, "This animal token is already on sale");

        // 소유자가 판매 권한을 줬는는지
        require(mintAnimalTokenAddress.isApprovedForAll(animalTokenOwner, address(this)), "Animal token owner did not approve token.");
    
        animalTokenPrices[_animalTokenId] = _price;

        onSaleAnimalTokenArray.push(_animalTokenId);
    }

    // 토큰 구매 함수
    function purchaseAnimalToken(uint256 _animalTokenId) public payable {
        uint256 price = animalTokenPrices[_animalTokenId];
        address animalTokenOwner = mintAnimalTokenAddress.ownerOf(_animalTokenId);

        require(price > 0, "Animal token not sale.");
        require(price <= msg.value, "Caller sent lower than price.");
        require(animalTokenOwner != msg.sender, "Caller is animal token owner.");

        // 돈은 NFT 소유주에게 주고
        payable(animalTokenOwner).transfer(msg.value);

        // NFT는 사는 사람에게 주고
        mintAnimalTokenAddress.safeTransferFrom(animalTokenOwner, msg.sender, _animalTokenId);

        animalTokenPrices[_animalTokenId] = 0; // 판매된 NFT의 가격을 0으로 바꿔줌

        for(uint256 i = 0; i < onSaleAnimalTokenArray.length; i++) {
            if(animalTokenPrices[onSaleAnimalTokenArray[i]] == 0) { // 판매가 된 NFT를 sale array에서 제거거
                onSaleAnimalTokenArray[i] = onSaleAnimalTokenArray[onSaleAnimalTokenArray.length - 1];
                onSaleAnimalTokenArray.pop();
            }
        }
    }

    function getOnSaleAnimalTokenArrayLength() view public returns (uint256) {
        // 프론트에서 이 sale array 길이를 받아서 사용함!!
        return onSaleAnimalTokenArray.length;
    }
}