const logging = require('../../../../../shared/logging')
const commands = require('../../../schema').commands
const table = 'webhooks'
const newColumnNames = ['name', 'secret', 'api_version', 'integration_id', 'status', 'last_triggered_at', 'last_triggered_status', 'last_triggered_error']

function printResult(operation, columnName) {
  return `${operation} column ${columnName} in ${table} table`
}

module.exports.up = options => {
  const connection = options.connection
  return Promise.map(newColumnNames, newColumnName => {
    return connection.schema.hasColumn(table, newColumnName).then(exists => {
      if (exists) {
        logging.warn(printResult('Adding', newColumnName))
        return
      }
      logging.info(printResult('Adding', newColumnName))
      return commands.addColumn(table, newColumnName, connection)
    })
  })
}

module.exports.down = options => {
  const connection = options.connection
  return Promise.map(newColumnNames, newColumnName => {
    return connection.schema.hasColumn(table, newColumnName).then(exists => {
      if (!exists) {
        logging.warn(printResult('Dropping', newColumnName))
        return
      }
      logging.info(printResult('Dropping', newColumnName))
      return commands.dropColumn(table, newColumnName, connection)
    })
  })
}
