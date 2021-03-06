# Command Line Tool App (Fruit-Basket)
Build a console application (CLI) that allows a user to process a CSV-file and produce a summary report from it.

# Prerequisites
1. **Install nodeJS:** https://nodejs.org/en/ - Download the Recommended For Most Users Option
- **WINDOWS:** On the Destination folder screen: Set the field to ‘C:\’
- **MAC:** Installs automatically where it needs to be
2. **Download the files:**
- fruit-basket.csv - full verified data
- b.csv - bad dataup – bad data results in an error
- b2.csv - bad data mockup – bad data results in an error

-	**MAC:** save these files at user level dir; for ex: Macintosh HD/Users/claffe200/fruit-basket.csv
- **WINDOWS:** save these files at user level dir; for ex: C:\User\claffe200\fruit-basket.csv

# Install the APP globally (don’t forget the ‘g’ global option):
- **MAC: Run this in Terminal:**

```
sudo npm install -g cmd-line-app
```

- **WINDOWS: Run this in Terminal**:

```
npm install -g cmd-line-app
```

**If you get access errors / permission errors, try running this and then retry npm install -g fruit-basket**

```
sudo chown -R $USER /usr/local/lib/node_modules

```

# Install Dependencies
- Go to the directory where fruit-basket app lives (For ex: 'Desktop/apps/fruit-basket'):
- Run Yarn install to get all the project dependencies - should create a 'node_modules' folfer inside of 'fruit-basket' folder

```
yarn install
```

# Make App Globally Available

- Once installed, go to the directory where fruit-basket app lives (For ex: 'Desktop/apps/fruit-basket'):

```
cd Desktop/apps/fruit-basket // for example
```

- Still inside the fruit-basket directory, enter these two lines to make the app available globally. You will be able to run a command in terminal from anywhere.

```
npm link
yarn link

// entering command 'fruit-basket' will yield the app output
```

# Run the App in Command Terminal
- To see all available commands (options: help and command: start):

```
fruit-basket
```

- Execute the following command to get help:

```
fruit-basket help
```

- Execute the following command to start the app:

```
fruit-basket start
```

- When prompted 'Enter CSV File:', insert 'fruit-basket.csv' or the full file path at '/Users/myName/fruit-basket.csv' in
field and hit Enter
- App should execute with proper outputs

# Publish to NPM
- To publish changes, call these commands in terminal:
```
npm publish
yarn publish
```