# CruiseMurder
Mystery murder text adventure game

# How to run database locally on your machine
Open dbScripts.sql in Microsoft SQL Server Management Studio. Ensure you create a database called CruiseMurderDB, then run the script on that DB.

# How to run the server locally
Go into backend folder, open backend.csproj in Visual Studio. Make sure the NuGet package swashbuckle.aspnetcore is installed.
Build and run from the command line with
`dotnet build`
`dotnet run --launch-profile UseThisOne`

#Start the app
Navigate to react-app folder. In the console, type `npm install` and `npm install react-player` to install all the necessary package.
Then type `npm run start` to start the app.

