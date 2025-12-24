# Hahn Software Morocco — Internship Technical Test
### Technologies used.
- **Docker**: used to run the SqlServer Database.
- **.NET 10 and Entity Framework Core**: used for backend server and ORM respectively.
- **BUN and NextJS**: Used for Javascript runtime and UI framework respectively.
 
### Running the .NET Backend.
1. change direcotry into API directory which containes the backend.
2. Execute `dotnet tool install --global dotnet-ef` to install Entity Framework Core.
3. Execute `dotnet restore` to install the dependencies.
4. Run `docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=UU11ll//" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest` to start the databse. (Keep the password the same or change it in the connection string in `API/appSettings.json`)
5. Set up the databse by executing `dotnet ef migrations add InitialCreate` then `
dotnet ef database update`.
6. Now the database is ready you can run the backend server by running `dotnet run`.

### Running the NextJS Frontend.
1. change directory into `ui` folder.
2. run `bun install`. (I'm using bun javascript runtime you can use npm or yarn i don't think there is going to be a big problem).
3. now run `bun dev` to start the dev server and open a browser and go to `http://localhost:3000`. *(Note: It is important to run the server in port 3000 because the backend server CORS is configured with this url, you can easily change the CORS settings in `API/Program.cs`)*
