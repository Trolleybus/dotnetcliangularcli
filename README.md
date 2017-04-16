# Dotnet CLI & Angular CLI
An empty project which connects a DOT.NET Core WebAPI with an angular app.

# Note
This project will grow over the next couple of months (16.04.2017). The Angular app can be run standalone from the frontend directory.

* Server: http://localhost:5000
* Swagger: http://localhost:5000/swagger
* API Endpoint: http://localhost:5000/api/[controller]

# Prerequisites
* Node 6.9.0 or greater
* NPM 4.5.0 or greater
* dotnet CLI 1.1.0 or greater

# Installation
* Dotnet CLI https://github.com/dotnet/cli
* Gulp ```npm install```

# Usage
To restore all dependencies:
```
gulp restore
```

To spin up the machine and have live development:
```
gulp
```

This will build the angular app and copy it into the folder backend/wwwrooot, this task is run as a watch. At the same time it runs ```dotnet watch run``` which runs at http://localhost:5000 and serves the application.

