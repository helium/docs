# Installation Guide: Running the Server Locally

#### Prerequisites:

- Node.js installed on your machine. You can download it from
  [the official Node.js website](https://nodejs.org/).
- Yarn package manager installed. You can install it by following the instructions below:

#### Steps (Assuming you have Node.js Installed):

1. **Install Yarn:**

   - Download and install Yarn by following the instructions on the
     [Yarn website](https://classic.yarnpkg.com/lang/en/docs/install/).
     - You can also install Yarn globally using npm:
     ```
     npm install -g yarn
     ```
   - After installing, you can verify the installation by running:
     ```
     yarn --version
     ```
   - This should display the installed Yarn version.

2. **Fork the Project Repository:**

   - Fork the project repository to your GitHub account by clicking the "Fork" button at the top
     right of the repository page.

3. **Clone the Project Repository:**

   - Clone the project repository to your local machine using Git:
     ```
     git clone https://github.com/your-username/project-repository-name.git
     ```
   - Change into the project's `docs/` folder:
     ```
     cd project-repository/docs
     ```

4. **Install Dependencies:**

   - Inside the `docs/` folder, install project dependencies and start the server using:
     ```
     yarn && yarn start
     ```
   - This command should install project dependencies and start the server, automatically opening
     the project's documentation in your default web browser.

5. **Access the Documentation:**
   - The local server should now be running, and you can view the documentation by navigating to:
     ```
     http://localhost:3000/
     ```
   - This will open the documentation website locally, allowing you to browse and interact with the
     project's documentation.

#### Start Contributing:

- After running the server, you can open the project in your preferred code editor, such as Visual
  Studio Code.
- Make changes to the documentation files, and as you save them, you will see the updates reflected
  in the browser window opened by the local server.

### Example Commands:

```bash
# Clone the repository
git clone https://github.com/your-username/project-repository.git
cd project-repository/docs

# Install Yarn (if not already installed)
npm install -g yarn

# Install project dependencies
yarn

# Start the local server
yarn start
```

#### Notes:

- Make sure to replace `your-username/project-repository` with the actual URL of the project
  repository.
- These instructions assume you are running these commands in a terminal or command prompt.
- The local server typically runs on `http://localhost:3000/`, but it might vary depending on the
  project configuration.
