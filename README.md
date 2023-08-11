Go to /home/anish/WorkingDirectory/Code/CCXT/wormhole/xdapp-book/projects/wormhole-local-validator
Read the local README.md and setup the three services
    - npm run evm
    - npm run solana
    - npm run wormhole

Go to /home/anish/WorkingDirectory/Code/CCXT/solana/swap-contract/testing
Run setup.sh to setup the swap contract on solana

Go to /home/anish/WorkingDirectory/Code/CCXT/wormhole/xdapp-book/projects/evm-tokenbridge
Run the following to attest from solana to evm0 and evm1
    - node treasury.js solana attest_from_solana evm0
    - node treasury.js solana attest_from_solana evm1
Note down the deployment addresses

Go to /home/anish/WorkingDirectory/Code/CCXT/solidity_study
Delete any files existing in ./build/deployments to clear the previous deployment cache
Run the following:
    - brownie console --network evm0
    - running ISCToken gives a list of previous deployments which should be []
    - a = accounts.load('wormhole')
    - ISCToken.deploy({'from':accounts})
    - Swap.deploy('0xC09C99332ea9A5Aa7DBe471fD2B9C674dFd25344', '0x8914a9E5C5E234fDC3Ce9dc155ec19F43947ab59', {'from':a})
    - ISCToken[0].mint('0x7231ECd1355a60251eE56Bf81f987969fc9bAe29', 1000, {'from':a})

Go to /home/anish/WorkingDirectory/Code/CCXT/wormhole/end_to_end/nextjs/config
Edit config.json, evm0 values

Go to /home/anish/WorkingDirectory/Code/CCXT/wormhole/end_to_end/nextjs
Run the app: npm run dev
