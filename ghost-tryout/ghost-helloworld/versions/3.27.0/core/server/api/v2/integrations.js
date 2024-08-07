const { i18n } = require('../../lib/common')
const errors = require('@tryghost/errors')
const models = require('../../models')

module.exports = {
  docName: 'integrations',
  browse: {
    permissions: true,
    options: ['include', 'limit'],
    validation: {
      options: {
        include: {
          values: ['api_keys', 'webhooks'],
        },
      },
    },
    query({ options }) {
      return models.Integration.findPage(options)
    },
  },
  read: {
    permissions: true,
    data: ['id'],
    options: ['include'],
    validation: {
      data: {
        id: {
          required: true,
        },
      },
      options: {
        include: {
          values: ['api_keys', 'webhooks'],
        },
      },
    },
    query({ data, options }) {
      return models.Integration.findOne(data, Object.assign(options, { require: true })).catch(models.Integration.NotFoundError, () => {
        throw new errors.NotFoundError({
          message: i18n.t('errors.api.resource.resourceNotFound', {
            resource: 'Integration',
          }),
        })
      })
    },
  },
  edit: {
    permissions: true,
    data: ['name', 'icon_image', 'description', 'webhooks'],
    options: ['id', 'include'],
    validation: {
      options: {
        id: {
          required: true,
        },
        include: {
          values: ['api_keys', 'webhooks'],
        },
      },
    },
    query({ data, options }) {
      return models.Integration.edit(data, Object.assign(options, { require: true })).catch(models.Integration.NotFoundError, () => {
        throw new errors.NotFoundError({
          message: i18n.t('errors.api.resource.resourceNotFound', {
            resource: 'Integration',
          }),
        })
      })
    },
  },
  add: {
    statusCode: 201,
    permissions: true,
    data: ['name', 'icon_image', 'description', 'webhooks'],
    options: ['include'],
    validation: {
      data: {
        name: {
          required: true,
        },
      },
      options: {
        include: {
          values: ['api_keys', 'webhooks'],
        },
      },
    },
    query({ data, options }) {
      const dataWithApiKeys = Object.assign(
        {
          api_keys: [{ type: 'content' }, { type: 'admin' }],
        },
        data,
      )
      return models.Integration.add(dataWithApiKeys, options)
    },
  },
  destroy: {
    statusCode: 204,
    permissions: true,
    options: ['id'],
    validation: {
      options: {
        id: {
          required: true,
        },
      },
    },
    query({ options }) {
      return models.Integration.destroy(Object.assign(options, { require: true })).catch(models.Integration.NotFoundError, () => {
        return Promise.reject(
          new errors.NotFoundError({
            message: i18n.t('errors.api.resource.resourceNotFound', {
              resource: 'Integration',
            }),
          }),
        )
      })
    },
  },
}
