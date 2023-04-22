# jokedao

Check out the live site at [jokedao.io](https://jokedao.io)!

You can also find v1 at [jokedao.jokedao.io](https://jokedao.jokedao.io).

## Pre-requisites
- `yarn` installed
- `node` version >= `17.0.0`
- Have an Ethereum wallet (like MetaMask for instance)
## Before you start
- Navigate to `packages/react-app-revamp` (the v2 site package)
- Install dependencies with `yarn install`
- Create a `.env` file and paste the following values:

```
NEXT_PUBLIC_INFURA_ID=
NEXT_PUBLIC_ALCHEMY_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_LENS_API_URL=
NEXT_PUBLIC_WEB3STORAGE_TOKEN=
```
## Getting Started

First, navigate to the top directory of this repo and run the development server with

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Usage Note
If you are not running Supabase, then the search functionality will not work. You can still access contests and the full functionality of the site, though, by visiting the URL with the format http://localhost:3000/contest/{chain}/{contest_address} where `chain` is the name of the chain that the contest is on as specified [here](https://github.com/JokeDAO/JokeDaoV2Dev/blob/staging/packages/react-app-revamp/config/wagmi/index.ts), and `contest_address` is the address of the contest contract on that chain.

## Development Notes

### Updating bytecode

Whenever you make a change to smart contracts, increment the version by x.1. Then generate the bytecode and version it as described below.

In order to generate and/or update the bytecode of your project, run 

```bash
yarn smartcheck
```

Upon a successful `forge fmt`, `forge test -vv`, and `forge build` of the smart contract code, this will copy the generated bytecode and ABI into the `react-app-revamp` (the frontend) package so that the app can access it.

You will also need to do two more things if the ABI is changed:
  - Make a copy of the bytecode and abi in the versioning folder `packages/react-app-revamp/contracts/bytecodeAndAbi` by copying the content in `Contest.sol`, which is the latest version of bytecode, into a new folder in `contracts/bytecodeAndAbi` and renaming that folder with the incremented version following the convention.
  - Update ABI parser code in `packages/react-app-revamp/helpers/getContestContractVersion.ts` to use the new version if a contract's `version()` function returns the value of your newly incremented version.
  - Repeat the above 2 steps for `RewardsModule.sol` as well if that has changed.
  
[Here](https://github.com/JokeDAO/JokeDaoV2Dev/pull/111/commits/79072b212e603bcca0418dd5057557379444194f) is an example PR that does all of these steps.

*Make sure to do all of these steps before committing any changes to the contract code to make sure that the bytecode that the site is deploying is the same as what you have written in the `hardhat` package! And also so that the site is able to correctly version a given deployed contract's ABI when reading from it.*

## Built with
- NextJS
- Tailwind CSS & Headless-UI
- ethers, wagmi, @wagmi/core, @rainbow-me/rainbowkit
- zustand
- [Vercel](https://vercel.com/?utm_source=jokedao&utm_campaign=oss).

JokeDAO V2 front-end is hosted on [Vercel](https://vercel.com/?utm_source=jokedao&utm_campaign=oss).
