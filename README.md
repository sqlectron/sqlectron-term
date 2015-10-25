# sqlectron-term
sqlectron terminal-based interface

## development
Running the application:
```bash
npm install
npm run dev
```

## routes

- /server/list
- /server/add
- /server/:id/edit
- /server/:id/remove
- /server/:id/database/:database
- /server/:id/database/:database/databases

## features

- manage servers
- list databases
- list tables
- execute query

## todo

- [x] highlight box based on focus
- [x] create shortcuts component with ability to add and remove shortcuts on focus / blur
- [x] show shortcuts based on focused box
- [x] execute query
- [x] show results
- [x] set query and execute on table selection
- [x] try to enhance shortcut control to work directly on screen
- [x] list databases
- [x] improve db connect action (work similar to fetchTablesIfNeeded)
- [ ] improve style handling
- [ ] improve servers handling (work similar to fetchTablesIfNeeded)
- [ ] show selected table name in status bar
- [ ] improve server add / edit screen (similar to database container)
