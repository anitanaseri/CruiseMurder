# CruiseMurder
Mystery murder text adventure game

# How to run database locally on your machine
Run dbScripts.sql in Microsoft SQL Server Management Studio. The script is currently using a database called
SQL_Workshop_2018. If you don't have such a database but another database ready, modify the first line to 'use your-db-name'

# How to run the server locally
Go into backend folder, open backend.csproj in Visual Studio, modify databaseName variable in both ScenesController.cs and ChoicesController.cs so that it matches your database name. Build and run the file.

#Start the app
Navigate to react-app folder. In the console, type 'npm install' to install all the necessary package. Then type 'npm start' to start the app


## run the following in order to make the player working
npm install react-player