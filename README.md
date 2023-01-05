# finance_tracking_app
## Summary
### Brief:
- A tool for managing personal finances, by tracking income abd expenses, and generating reports
### Tech Stack:
**Backend**:
- C# ASPNET 6
- MSSQL Server as Database

**Frontend**:
- React (.jsx with Vite)
- Bootstrap for styling

### Build Instructions:
**Developement**
- "npm run dev" on terminal inside Frontend directory (relies on vite)
- run Backend in Visual Studios or build and run "dotnet Backend.dll" on terminal
**Production**
- run "bash makerelease.sh"
- goto production directory and run "dotnet Backend.dll" on terminal
- use "bash cleanup.sh" to cleanup release files before running makerelease.sh again
## Dashboards
### Finances:

**Full List of Transactions**:

<img src="https://user-images.githubusercontent.com/55718737/210779731-f2b70f61-3e69-4487-9208-6b131e4ddce5.png" width="600">

**Add Transaction Modal**:

<img src="https://user-images.githubusercontent.com/55718737/210780548-a1f63fd8-aa64-4702-a780-7364fbb47c37.png" width="600">

**Edit Transaction Modal**:

<img src="https://user-images.githubusercontent.com/55718737/210780123-adce8970-1051-4a0c-bb8b-417938469f36.png" width="600">

### LineChart:

<img src="https://user-images.githubusercontent.com/55718737/210780242-a7fa185d-afd2-4e7d-af61-ec79a0d756dd.png" width="600">
