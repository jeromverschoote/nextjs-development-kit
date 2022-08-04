# Next.js Web Application Development Kit

A repo as kit to easily build, test and deploy web applications.

## 1. Introduction

### 1.1 Table of Contents

- [Next.js Web Application Development Kit](#nextjs-web-application-development-kit)
  - [1. Introduction](#1-introduction)
    - [1.1 Table of Contents](#11-table-of-contents)
    - [1.2 Feature List](#12-feature-list)
  - [2. Getting Started](#2-getting-started)
    - [2.1 Requirements](#21-requirements)
    - [2.2 Quickstart](#22-quickstart)
    - [2.3 Building a Decentralized Application](#23-building-a-decentralized-application)
  - [3. Usage](#3-usage)
    - [3.1 Running a Development Server](#31-running-a-development-server)
  - [4. Resources](#4-resources)

### 1.2 Feature List

- Linter for TypeScript.
- Auto-formatter for TypeScript.
- Responsive sample components and views.
- Sample tests covering 100%.
- CI/CD.
- Support for building decentralized web applications.

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

### 2.3 Building a Decentralized Application

Optionally, you can use this development kit for building decentralized web applications as well. Simply checkout the `web3` branch of this project to include web3 wallet support. For a more detailed features list of web3 technologies, please see the README on the `web3` branch.

```
git checkout web3
```

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

- [React]() - A JavaScript library for building user interfaces.
- [Next.js]() - A React framework that greatly improves developer experience.
- [Tailwind CSS]() - A utility-first CSS framework packed with standardized classes for easy styling.
- [Vercel]() - Tool to easily integrate continuous integration and development.
