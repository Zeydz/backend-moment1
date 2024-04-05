## Backend moment1, anslutning till databas
I detta moment har jag använt mig av Express, EJS & PostgreSQL för att ansluta till en databas, ta bort/lägga till data i databasen samt visa detta på en webbplats. 
Jag har skapat en install.js fil där användaren ansluter till databasen genom en dotenv fil som innehåller inloggningsuppgifter, samt skapar en tabell. I server.js filen definieras en view engine, i detta fall "ejs".
Vidare i filen anger jag vilken mapp som ska vara statisk för min css och liknande. Därefter används express för att hantera de olika anropen som ska skickas. Genom att använda post/get kan jag hämta/skicka data till databasen.
