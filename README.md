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
    - [3.2 Developing Components and Views](#32-developing-components-and-views)
    - [3.3 Compiling, Bundling and Building your Application Code](#33-compiling-bundling-and-building-your-application-code)
    - [3.4 Testing your Application Code](#34-testing-your-application-code)
    - [3.5 Checking Test Coverage](#35-checking-test-coverage)
    - [3.6 Linting & Formatting your Application Code](#36-linting--formatting-your-application-code)
    - [3.7 Deploying your Application](#37-deploying-your-application)
    - [3.8 Updating your Application](#38-updating-your-application)
  - [4. Resources](#4-resources)

### 1.2 Feature List

Since this project elevates Next.js, it comes with pre-packed with a bunch of features. Checkout [Next.js' Features List](https://nextjs.org/docs/basic-features/pages) for an in-depth list of development features. Kit specific features are:

- Linter for TypeScript.
- Auto-formatter for TypeScript.
- Responsive sample components for scaling on mobile, tablet, small desktop, large desktop and 4K screen sizes.
- Possible to easily translate copy trough language files in order to internationalize application quickly.
- Easy setup of Twitter and Facebook thumbnails trough meta config file.
- Sample tests covering 100% of the code.\*
- Support for easily building decentralized web applications.

## 2. Getting Started

This kit assumes you have worked with Next.js before. If that is not the case, it is recommended you go trough [Next.js' Starters Learning Course](https://nextjs.org/learn/basics/create-nextjs-app) first. This project is written in TypeScript. If you are not familiar with TypeScript, [learn it](https://www.typescriptlang.org/docs/). It wil improve your life dramatically.

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

After that, you must navigate into the project's folder and install the dependencies with Node Package Manager or Yarn.

```
cd nextjs-development-kit && yarn
```

Once all dependencies are installed you should be able to start up a development server.

```
yarn dev
```

If everything went well, you should see your terminal outputting something like this:

```
$ next dev -p 3000
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
event - compiled client and server successfully in 525 ms (208 modules)

...
```

Congratulations, you are now ready to start building a web application!

### 2.3 Building a Decentralized Application

Optionally, you can use this development kit for building decentralized web applications as well. Simply checkout the `blockchain` branch of this project to include blockchain wallet support. For a more detailed features list of blockchain technologies, please see the README on the `blockchain` branch.

```
git checkout blockchain
```

## 3. Usage

Since this project elevates Next.js's tools, you can always run `yarn next --help` to check which commands you are able to run. Although, this project is setup to have its own scripts, which will simplify the process of developing your web application. It is recommended to use the scripts provided in this guide.

### 3.1 Running a Development Server

In order to start developing, you will need to run a development server. This server will compile your TypeScript into minified JavaScript, to reduce loading times for end users once in production. Also, changes you write in code will be automatically pushed by the development server, making development windows refresh automatically, which increases development efficiency. Checkout [Next.js' Getting Started Guide](https://nextjs.org/docs/getting-started) for more info on setting up a new project. To spin up a development server, run:

```
yarn dev
```

You should see your terminal outputting something like this:

```
$ next dev -p 3000
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
event - compiled client and server successfully in 525 ms (208 modules)

...
```

Now, in a browser visit `http://localhost:3000` to view your application.

### 3.2 Developing Components and Views

Now your development server is running, you can start developing components and views for your application.

Firstly, the logic for these components is written in TypeScript using React. If you have never used React before, you can checkout [React's Getting Started Guide](https://reactjs.org/docs/getting-started.html#learn-react). It is highly recommended to go trough all of React's documentation before continue reading.

Secondly, the styling of components is written in CSS using Tailwind classes. This way only code that is used gets compiled to production, limiting load times for end users. To read more about CSS, you can checkout [Mozilla's CSS documentation](https://developer.mozilla.org/en-US/docs/Web/CSS). You also can checkout [Tailwind's documentation](https://tailwindcss.com/docs) to find out which CSS properties translate to which Tailwind classes.

Lastly, Tailwind builds fully responsive React components for you to copy into your own projects. This service comes at a cost, but for more professional use cases, this can greatly improve developer experience and efficiency. This project supports direct copy-pasting Tailwind components without additional setup required. Checkout [Tailwind UI](https://tailwindui.com/) for use and pricing.

### 3.3 Compiling, Bundling and Building your Application Code

Once your application is developed, it needs to be optimized before deploying online, in order to prevent bugs from creeping in. You can first compile and then build your application using:

```
yarn build
```

If no errors pop up at this stage, you successfully wrote an application without syntax and type errors. To view your application you can now run:

```
yarn build && yarn start
```

Now, in a browser visit `http://localhost:3001` to view your application. Note that the view you see will probably not be very different from the view you saw before using the development sever. The difference is that this version runs with compiled code and should much closer resemble real world load times. Also, if errors show up at this stage, end users will experience these errors as well.

### 3.4 Testing your Application Code

To prevent errors in your builds, it is wise to write unit tests to filter out bugs in your component's logic. These tests are located in component folders, and are written in [Jest](https://jestjs.io/) using [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). As for now, only unit tests are supported. You can run your tests using:

```
yarn test
```

### 3.5 Checking Test Coverage

To see how well your tests are written, you can check how much code is covered by tests using:

```
yarn coverage
```

### 3.6 Linting & Formatting your Application Code

Code formatting should automatically happen on save. If not, you should check your editor's settings. For [Visual Studio Code](https://code.visualstudio.com/), you can add the following to your `settings.json`:

```
"editor.formatOnSave": true
```

If you want to lint the project, you can use:

```
yarn lint
```

### 3.7 Deploying your Application

Once your application is build and tested, it is ready to be deployed to the internet. The fastest way to deploy your application with zero configuration is via [Vercel](https://vercel.com/). It is as simple as creating a Vercel account with your GitHub-account, creating a new project, linking it to a GitHub repository and clicking 'Deploy'! For a more detailed guide on deploying Next.js applications, you can checkout [Vercel's Getting Started Guide](https://vercel.com/docs/concepts/get-started).

Additionally, in the project settings you can link domains to alter the hyperlink for your project.

### 3.8 Updating your Application

Now your application is deployed using Vercel, updates will automatically be uploaded to your deployed application when you push new code to your GitHub repository. You're all set and done!

## 4. Resources

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Next.js](https://nextjs.org/) - A React framework that greatly improves developer experience.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework packed with standardized classes for easy styling.
- [Tailwind UI]() - A library with pre-build and styled responsive components.
- [Jest]() - A framework for writing unit tests.
- [React Testing Library]() - A library for integrating jest tests into React components.
- [Vercel](https://vercel.com/) - Tool to easily integrate continuous

---

\* Some work is still in progress. (Complete) feature coming soon.
