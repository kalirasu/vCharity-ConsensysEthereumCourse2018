---------------------------------------------------------------
SECTION1 : vCharity - Charity Platform for making Change together with Transparency
--------------------------------------------------------------
1.Objective: vCharity - A social funding and impact management platform built on the Ethereum blockchain.
Each charity project encodes a list of "goals" that the charity aims to achieve, and each goal is assigned a price that the charity will receive if/when the goal is provably achieved.

    1. Transparent Donation

    2. Track your donation
    3. Only pay if it works


2. What's Implemented in This Project:
       1. Solidity Contract to implement the Charity platform. 

       2. The UI is based off react and it will tell story to the point
            Screen 1 : Project Catalog of Funding platform

            Screen 2 : Donation of project with uPort and IPFS Integration

     3. Deployed in Rinkebey Testnet

     4. Design Pattern Implemented - Contract Upgradability, Circuit Breaker, Emergency Stop, Fail as early and loudly as possible, Limit the amount of funds deposited
     5. Library - openzeppelin-solidity ownable, safeMath and StringUtils implementation/Integration
     6. Project uses uPort
     7. project uses IPFS
     8. project uses upgradability.
     9. Project deployed in Rinkebey Testnet.


----------------------------------------------------------------------
SECTION2 : SETTINGUP THE vCharity Platform
----------------------------------------------------------------------
1. Install latest versions of npm, truffleInstallation
This project requires node-js runtime and uses truffle as the Ethereum smart contract development framework.

2.In order to run it, install truffle first:

npm install -g truffle

3. Then install all of the node-js dependencies

npm install

4. Since the contract configuration is tailored for rinkebey testnet, you are ready directly to run the UI(DAPP).


----------------------------------------------------------------------
SECTION3 : Running the UI
----------------------------------------------------------------------
1. npm run start
- Local development server will be running to host a beautiful DAPP and yes you can donate to "Kerala Flood Relief"(test platform though), if you have uPort App installed with Rinkebey configured.
- You can also visualise the transparency of goal set/target/current status.

2.  This demo dApp should be available at: http://localhost:3000/ and look like in the screenshot attached.
    ----------
    Live Demo
    ---------
    http://ec2-18-217-240-130.us-east-2.compute.amazonaws.com:3000
    
3. once uPort transaction is signed, please wait for few seconds(5-8) to get the Donors and targeted goals update. If not update, please do refresh of the page which would fetch the state and display the Donors count and goals correctly from the Rinkeby blockchain.

4. Please note that, DAPP is tailored to run only with Desktop/Laptop view factor and hence the live demo url link will only work with desktop/Laptop URI. Experience the live demo experience with Desktop/Laptop(Not with Mobile browser).
