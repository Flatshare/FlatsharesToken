# FlatsharesToken

## Installation 

`npm install` or `npm i`

## Run tests and coverage

* Run all tests

`npm run test`

* Run all tests and report test coverage

`npm run cover`

* Run single test

`./node_modules/./bin/truffle test test/FlatsharesToken.test.js`

## Smart contracts features

### FlatsharesToken

* ERC-20 compatible token.
* Has fixed supply of tokens.
* Has ability to burn tokens.
* Tokens are allocated until FlatsharesTokenOffering is established.

### FlatsharesTokenOffering

* Crowdsale smart-contract with white-list.
* During the first 48-hours, users have an opportunity to purchase more tokens.
* After 96 hours, any remaining tokens can be purchased by whitelisted users without restrictions up until the end date.
* Tokens are allocated to contributors until the token offering process establishing.

Upon reaching the ETH contribution cap or end time of the token offering:

* Allocate tokens to participants
* Burn all unallocated tokens
* Enable the ability to transfer tokens for everyone

Once these final two steps are performed, the distribution of tokens is complete.

We use OpenZeppelin code for `SafeMath`, `Ownable`, `Burnable`, `Pausable`, and `StandardToken` logic.
