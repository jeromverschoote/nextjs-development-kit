# Next.js dApp Development Kit

A repo as kit to easily build, test and deploy decentralized web applications.

## 1. Introduction

### 1.1 Table of Contents

- [Next.js dApp Development Kit](#nextjs-dapp-development-kit)
  - [1. Introduction](#1-introduction)
    - [1.1 Table of Contents](#11-table-of-contents)
    - [1.2 Feature List](#12-feature-list)
  - [2. Getting Started](#2-getting-started)
    - [2.1 Requirements](#21-requirements)
    - [2.2 Quickstart](#22-quickstart)
  - [3. Usage](#3-usage)
    - [3.1 Running a Development Server](#31-running-a-development-server)
  - [4. Resources](#4-resources)

### 1.2 Feature List

- Features from `main` branch.
- Interacting with smart contracts, sending funds and signing messages via MetMask for desktop wallets.
- Interacting with smart contracts, sending funds and signing messages via WalletConnect for mobile wallets.
- Interacting with smart contracts, sending funds and signing messages via Venly Wallet for email based wallets.
- Disabled connect buttons while connecting, to prevent unintended transactions.
- Automatic refresh when a network or account changes, to prevent unintended transactions.
- Error notifications with human readable error messages.
- Success notifications to confirm user actions.
- Dummy sign button for easily testing a sign action.
- Dummy transaction button for easily testing a transaction action.

## 2. Getting Started

This project is written in TypeScript. If you are not familiar with TypeScript, [learn it](https://www.typescriptlang.org/docs/). It wil improve your life dramatically.

### 2.1 Requirements

To run this project you will need to have some tools and dependencies installed:

- [Git](https://git-scm.com/) - For cloning this project as a template to your machine, and use as your own.
- [Node.js](https://nodejs.org/en/) - For running Next.js and tools in this project.
- [Node Package Manager](https://www.npmjs.com/) (NPM) / [Yarn](https://yarnpkg.com/) - For installing dependencies.

### 2.2 Quickstart

To run the project you must first clone it as a template onto your machine. You can do this by navigating in a terminal to a location you are comfortable downloading the project in, and running:

```
git clone https://github.com/jeromverschoote/nextjs-development-kit/
```

After that, you must navigate into the project's folder and install the dependencies with Node Package Manager. Yarn will not work here.

```
cd nextjs-development-kit && yarn
```

Once all dependencies are installed you should be able to start up a development server.

```
yarn dev
```

If everything went well, you should see your terminal outputting something like this:

```
$ next dev
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
event - compiled client and server successfully in 525 ms (208 modules)

...
```

Congratulations, you are now ready to start building a web application!

## 3. Usage

Since this project elevates Hardhat's tools, you can always run `yarn next --help` to check which commands you are able to run. Although, this project is setup to have its own scripts, which will simplify the process of developing contracts. It is recommended to use the scripts provided in this guide.

### 3.1 Running a Development Server

In order to start developing, you will need to run a development node. This node emulates a real blockchain where you can perform test transactions without needing real currency. Spin up a development node using:

```
yarn dev
```

You should see your terminal outputting something like this:

```
$ next dev
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
event - compiled client and server successfully in 525 ms (208 modules)

...
```

## 4. Resources

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Next.js](https://nextjs.org/) - A React framework that greatly improves developer experience.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework packed with standardized classes for easy styling.
- [Vercel](https://vercel.com/) - Tool to easily integrate continuous integration and development.
- [MetaMask](https://metamask.io/) - A crypto wallet client, mainly for desktop users.
- [WalletConnect](https://walletconnect.com/) - A crypto wallet protocol, mainly for mobile users.
- [Venly Wallet](https://www.venly.io/) - A crypto wallet solution.
- [ethers.js](https://docs.ethers.io/v5/) - A JavaScript library for interacting with Solidity smart contracts.
