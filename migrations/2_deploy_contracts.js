const FlatsharesToken = artifacts.require("./FlatsharesToken.sol");
const FlatsharesTokenOffering = artifacts.require("./FlatsharesTokenOffering.sol");
const FlatsharesPayments = artifacts.require("./FlatsharesPayments.sol");

module.exports = function (deployer, network, accounts) {
    console.log(`Accounts: ${accounts}`);

    let shrToken = null;
    let shrOffering = null;
    let shrPayments = null;

    const owner = accounts[0];
    const admin = accounts[1];

    return deployer.deploy(
        FlatsharesToken, admin, { from: owner }
    ).then(() => {
        return FlatsharesToken.deployed().then(instance => {
            shrToken = instance;
            console.log(`FlatsharesToken deployed at \x1b[36m${instance.address}\x1b[0m`)
        });
    }).then(() => {
        const rate = 5000;
        const beneficiary = accounts[1];
        const baseCap = 10**17;

        return deployer.deploy(
            FlatsharesTokenOffering, rate, beneficiary, baseCap, shrToken.address, { from: owner }
        ).then(() => {
            return FlatsharesTokenOffering.deployed().then(instance => {
                shrOffering = instance;
                console.log(`FlatsharesTokenOffering deployed at \x1b[36m${instance.address}\x1b[0m`)

                shrToken.setTokenOffering(instance.address, 0);
            });
        })
    }).then(() => {
        const arbitrationAddress = accounts[1];
        const arbitrationFee = 10;
        return deployer.deploy(
            FlatsharesPayments, arbitrationAddress, arbitrationFee, { from: owner }
        ).then(() => {
            return FlatsharesPayments.deployed().then(instance => {
                shrPayments = instance;
                console.log(`FlatsharesPayments deployed at \x1b[36m${instance.address}\x1b[0m`)
            })
        })
    });
};