# build frontend and backend applications and setup production package
cd Frontend; npm install; npm run build
cd ..
cd BackendAPI; dotnet publish -c Release
cd ..
mv Frontend/dist production/dist
mv BackendAPI/BackendAPI/bin/Release/net6.0/publish/* production/  -v