# innov8-152

`The project aims to integrate with ChatGPT to generate and build E2E test files using Nightwatch to execute the tests.`<br/>
This repo has two projects, one is the **server-side application** (root level) and the another one is the **client-side** (app/my-app).

### 1. Structure

#### 1.1. Main folders

- `app/my-app` - It's the directory for the client-side application which is developed using React.
- `src` - Server-side code built using NodeJS and ExpressJS

#### 1.2. Dynamically generated files and folders

The folders below are generated dynamically according to the usage of the application:

- `prompts` - It's the folder that contains all the test cases scenarios that will be sent to ChatGPT to generate the test code files.
  - `*.txt` - All files are generated with a file name ending with the extension `.txt`
- `tests` - It's the folder that will contain all E2E test files generated according to the prompt file used.
  - `*.e2e.js` - All files are generated with a file name ending with the extension `.e2e.js` and with the same file name prefix used and stored in the **prompts** directory.

### 2. Interface

There is a GUI, which is the react APP, that provides a way to send to ChatGPT the file name (that is used to generate the files on `prompts` and `tests` folders) and an expression (that is stored in the `prompts` folder according to the file name defined).

When the user submits the request to the application server it will integrate with ChatGPT to retrieve the test code result. It will then generate the test file and include that in the `tests` folder.

Once the request is completely done, the GUI also has the ability to render the result of the test file generated as an output.

There is an option to test the expression once submitted. It will start a chrome instance and run through the expression and show the results if the generated test code is working as expected.

<img src="/assets/interface-sample.png" alt="GUI" />

### 3. Endpoints

The server application provides two endpoints

- `(POST) <protocol>://<base_url>/` - Create a test code file sending the test case scenario in the request to ChatGPT and also storing the prompt and test files
- `(PATCH) <protocol>://<base_url>/` - Create a test code file according to expression files stored in `src/scripts`

### 4. How to run?

#### 4.1. Pre requirements

Go to the root folder of the project and execute:

```
npm install
```

Go to the react app folder `app/my-app` and execute:

```
npm install
```

#### 4.2. Commands

##### 4.2.1. Server side

Go to the root folder of this project and execute:

```
npm run dev
```

##### 4.2.2. Client side

Go to the `app/my-app` folder of this project and execute:

```
npm start
```