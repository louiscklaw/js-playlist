const Nconf = require('nconf')
const path = require('path')
const _debug = require('ghost-ignition').debug._base
const debug = _debug('ghost:config')
const localUtils = require('./utils')
const env = process.env.NODE_ENV || 'development'
const _private = {}

_private.loadNconf = function loadNconf(options) {
  debug('config start')
  options = options || {}

  const baseConfigPath = options.baseConfigPath || __dirname
  const customConfigPath = options.customConfigPath || process.cwd()
  const nconf = new Nconf.Provider()

  /**
   * no channel can override the overrides
   */
  nconf.file('overrides', path.join(baseConfigPath, 'overrides.json'))

  /**
   * command line arguments
   */
  nconf.argv()

  /**
   * env arguments
   */
  nconf.env({
    separator: '__',
    parseValues: true,
  })

  nconf.file('custom-env', path.join(customConfigPath, 'config.' + env + '.json'))
  if (env !== 'testing') {
    nconf.file('local-env', path.join(customConfigPath, 'config.local.json'))
  }
  nconf.file('default-env', path.join(baseConfigPath, 'env', 'config.' + env + '.json'))
  nconf.file('defaults', path.join(baseConfigPath, 'defaults.json'))

  /**
   * transform all relative paths to absolute paths
   * transform sqlite filename path for Ghost-CLI
   */
  nconf.makePathsAbsolute = localUtils.makePathsAbsolute.bind(nconf)
  nconf.isPrivacyDisabled = localUtils.isPrivacyDisabled.bind(nconf)
  nconf.getContentPath = localUtils.getContentPath.bind(nconf)
  nconf.sanitizeDatabaseProperties = localUtils.sanitizeDatabaseProperties.bind(nconf)
  nconf.doesContentPathExist = localUtils.doesContentPathExist.bind(nconf)

  nconf.sanitizeDatabaseProperties()
  nconf.makePathsAbsolute(nconf.get('paths'), 'paths')
  if (nconf.get('database:client') === 'sqlite3') {
    nconf.makePathsAbsolute(nconf.get('database:connection'), 'database:connection')
  }
  /**
   * Check if the URL in config has a protocol
   */
  nconf.checkUrlProtocol = localUtils.checkUrlProtocol.bind(nconf)
  nconf.checkUrlProtocol()

  /**
   * Ensure that the content path exists
   */
  nconf.doesContentPathExist()

  /**
   * values we have to set manual
   */
  nconf.set('env', env)

  // Wrap this in a check, because else nconf.get() is executed unnecessarily
  // To output this, use DEBUG=ghost:*,ghost-config
  if (_debug.enabled('ghost-config')) {
    debug(nconf.get())
  }

  debug('config end')
  return nconf
}

module.exports = _private.loadNconf()
module.exports.loadNconf = _private.loadNconf
