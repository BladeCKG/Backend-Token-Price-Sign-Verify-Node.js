import { ethers, utils } from "ethers";
const abi = require("@chainlink/contracts/abi/v0.8/AggregatorV3Interface.json");

const getTokenPrice = async (token)=>{
    let oracleAddress;
    switch (token) {
        case "MATIC":
            oracleAddress = "0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676";
            break;
        case "ETH":
            oracleAddress = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
            break;
        case "BNB":
            oracleAddress = "0x14e613AC84a31f709eadbdF89C6CC390fDc9540A";
            break;
    
        default:
            return '0';
            break;
    }
    const provider = ethers.getDefaultProvider();
    const contract = new ethers.Contract(oracleAddress, abi, provider)
    const price = await contract.latestRoundData()
    console.log(price);
    const decimals = await contract.decimals()

    const priceUsd = utils.formatUnits(price["answer"], decimals);
    console.log(priceUsd);
    return priceUsd;
}

export default getTokenPrice;