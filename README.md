<p align="center">
  <img src="https://sqlectron.github.io/logos/logo-512.png">
</p>

A simple and lightweight SQL client with cross database and platform support.

![demo](https://sqlectron.github.io/demos/sqlectron-demo-term-v1.0.0.gif)

#### Current supported databases
* PostgreSQL
* MySQL

Do you wanna support for another SQL database? Please send a pull request to [sqlectron-core](https://github.com/sqlectron/sqlectron-core).

## Install

```bash
npm install -g sqlectron-term
```

## GUI

SQLECTRON has also a GUI interface called [sqlectron-gui](https://github.com/sqlectron/sqlectron-gui).

## Configuration

See the available configuration at [here](https://github.com/sqlectron/sqlectron-core#configuration).

## Development

Running the application:

```bash
npm install
npm run dev
```

### Routes

- /server/list
- /server/add
- /server/:id/edit
- /server/:id/remove
- /server/:id/database/:database
- /server/:id/database/:database/databases

### Features

- manage servers
- list databases
- list tables
- execute query

### TODO

- [x] highlight box based on focus
- [x] create shortcuts component with ability to add and remove shortcuts on focus / blur
- [x] show shortcuts based on focused box
- [x] execute query
- [x] show results
- [x] set query and execute on table selection
- [x] try to enhance shortcut control to work directly on screen
- [x] list databases
- [x] improve db connect action (work similar to fetchTablesIfNeeded)
- [x] improve style handling
- [x] improve servers handling (work similar to fetchTablesIfNeeded)
- [x] improve server add / edit screen (similar to database container)
- [ ] improve error handling of add / edit server screen
- [ ] show selected table name in status bar
