# NFT Decentralized Application

The website was made using a cummalation of multiple dfinity canisters deployed on the blockchain. This project is an experiment with React frontend, Three.js capabilities, and communicating mechanisms with a motoko backend responsible for canisters - that deal with creation of an NFT canister, Ownership funcitonalities canister and a local Chilicoin account management canister (self-created decentralized token canister deployed at https://osphh-syaaa-aaaal-aa3ja-cai.raw.ic0.app/).

Due to the production limitation of cycles, this project is functional only at a locally simulated ICP blockchain.
The frontend canister however is hosted at https://d3azs-faaaa-aaaal-abada-cai.ic0.app . 

### To Run The Project Locally Follow The Following Steps:

1. Start a simulated blockchain

```
dfx start
```
2. Deploy the NFT canister using the mentioned parameters

```
dfx deploy --argument='("<NFT NAME>", principal "<YOUR LOCAL PRINCIPAL ID>", (vec {132;123;.....<BYTE REPRESENTATION OF A SAMPLE IMAGE>}))'
```
3. Download The Chilicoin repository https://github.com/hasnain40247/ChiliCoin-decentralised-crypto-faucet

Deploy the project onto the same simulated blockchain
```
dfx deploy
```
