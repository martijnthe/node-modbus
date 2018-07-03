/* global describe, it, beforeEach */
'use strict'

const assert = require('assert')
const ModbusServer = require('../src/modbus-server')

describe('ModbusServer Options.', function () {
  const propNames = ['coils', 'discrete', 'holding', 'input']

  it('defaults to 1024 bytes of zeroes for coils, discrete, holding and input', function () {
    const server = new ModbusServer()
    propNames.forEach((propName) => {
      assert.deepEqual(server[propName], Buffer.alloc(1024))
    })
  })

  it('allows Buffer objects for coils, discrete, holding and input', function () {
    const options = propNames.reduce((opts, propName) => {
      opts[propName] = Buffer.from(propName)
      return opts
    }, {})
    const server = new ModbusServer(options)
    propNames.forEach((propName) => {
      assert.deepEqual(server[propName], Buffer.from(propName))
    })
  })

  it('allows callbacks for coils, discrete, holding and input', function () {
    const options = propNames.reduce((opts, propName) => {
      opts[propName] = () => Buffer.from(propName)
      return opts
    }, {})
    const server = new ModbusServer(options)
    propNames.forEach((propName) => {
      assert.deepEqual(server[propName], Buffer.from(propName))
    })
  })
})
