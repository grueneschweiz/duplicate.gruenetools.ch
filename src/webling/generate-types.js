/* eslint-disable */

// Read the JSON data from stdin
let json = ''
process.stdin.on('data', (chunk) => {
  json += chunk
})

// Generate TypeScript type definition from the JSON data
process.stdin.on('end', () => {
  json = JSON.parse(json)

  let tsType = 'export type WeblingRecord = {\n'
  json.mappings.forEach((mapping) => {
    tsType += '  ' + mapping.key + ': null | '
    if (mapping.type === 'SelectField') {
      const values = mapping.values
        .map((value) => Object.keys(value)[0])
        .join("' | '")
      tsType += "'" + values + "'"
    } else if (mapping.type === 'MultiSelectField') {
      const values = mapping.values
        .map((value) => Object.keys(value)[0])
        .join("' | '")
      tsType += "Array<'" + values + "'>"
    } else {
      tsType += 'string'
    }
    tsType += '\n'
  })
  // Add additional fields
  tsType += '  id: number\n'
  tsType += '  groups: null | number[]\n'
  tsType += '  firstLevelGroupNames: null | string\n'

  tsType += '}'

  // Write the TypeScript type definition to stdout
  process.stdout.write(tsType)
})
