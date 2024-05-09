const { run } = require("hardhat");

const verifyUpload = async (contractAddress, args) => {
    console.log("Verifying Upload contract...")

    try {
        await run(`verify:verify`, {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        if(error.message.toLowerCase().includes('already verified')){
            console.log("Contract already verified")
        } else {
            console.error(error)
        }
    }

};
module.exports = { verifyUpload };
