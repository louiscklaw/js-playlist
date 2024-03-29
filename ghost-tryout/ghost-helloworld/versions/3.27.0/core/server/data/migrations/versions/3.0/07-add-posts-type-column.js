const logging = require('../../../../../shared/logging')
const commands = require('../../../schema').commands

const createLog = type => msg => logging[type](msg)

function createColumnMigration({ table, column, dbIsInCorrectState, operation, operationVerb }) {
  return function columnMigrations({ transacting }) {
    return transacting.schema
      .hasColumn(table, column)
      .then(dbIsInCorrectState)
      .then(isInCorrectState => {
        const log = createLog(isInCorrectState ? 'warn' : 'info')

        log(`${operationVerb} ${table}.${column}`)

        if (!isInCorrectState) {
          return operation(table, column, transacting)
        }
      })
  }
}

module.exports.up = createColumnMigration({
  table: 'posts',
  column: 'type',
  dbIsInCorrectState(columnExists) {
    return columnExists === true
  },
  operation: commands.addColumn,
  operationVerb: 'Adding',
})

module.exports.down = createColumnMigration({
  table: 'posts',
  column: 'type',
  dbIsInCorrectState(columnExists) {
    return columnExists === false
  },
  operation: commands.dropColumn,
  operationVerb: 'Removing',
})

module.exports.config = {
  transaction: true,
}
