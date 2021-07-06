const defaultSchema = {
  reflexAttribute: 'data-reflex',
  reflexPermanentAttribute: 'data-reflex-permanent',
  reflexRootAttribute: 'data-reflex-root',
  reflexDatasetAttribute: 'data-reflex-dataset',
  reflexDatasetAllAttribute: 'data-reflex-dataset-all',
  reflexSerializeFormAttribute: 'data-reflex-serialize-form'
}

let schema = {}

export default {
  set (application) {
    schema = { ...defaultSchema, ...application.schema }
    for (const attribute in schema)
      Object.defineProperty(this, attribute.slice(0, -9), {
        get: () => {
          return schema[attribute]
        }
      })
  }
}
