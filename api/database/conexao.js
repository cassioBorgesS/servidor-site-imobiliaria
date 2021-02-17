const path = require('path')
const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database(path.resolve(__dirname,'..', '..', 'db.sqlite'))

db.serialize(() => {
    db.run('PRAGMA foreign_keys=ON')
});
  
  process.on('SIGINT', () =>
    db.close(() => {
      process.exit(0);
    })
  );
  

module.exports = db