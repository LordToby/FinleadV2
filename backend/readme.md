Dette er et simpelt eksempel på entity framework med postgresSQL

Følgende pakker bør være installeret, hvis de ikker er der i forvejen.

Microsoft.EntityFrameworkCore
Microsoft.EntityFrameworkCore.Design
Microsoft.EntityFrameworkCore.Tools
Npsql
Npsql.EntityFrameWorkCore.PostgreSQL
Swashbucke.AspNetCore //Dette er for at man kan bruge Swagger

----------------------------------------------------------
Migrationer:

Hvis man fra dotnet tilføjer eller fjerne en attribut til en klasse, der repræsenterer en tabel, så skal man lave en migration til databasen, så den får den nye attribut også.

Sådan gør du:
1. Sørg for at have Microsoft.EntityFrameworkCore.Tools installeret som pakke.Det gør at du kan skrive migrations kommandoerne
2. Tilføj eller fjern en attribut i en klasse der repræsenterer en tabel.
3. Gå til Package Manger Console
4. Skrive add-migration something. //Det der kommer efter add-migration er valgfrit og er et navn på din migration
5. skrive update-database. // Nu er ændringerne også kommet til databasen.