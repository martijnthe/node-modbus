let EventEmitter = require('events')

class ModbusServer extends EventEmitter {
  constructor (options) {
    super()

    this._options = options || {}

    this._coils = this._options.coils || Buffer.alloc(1024)
    this._discrete = this._options.discrete || Buffer.alloc(1024)
    this._holding = this._options.holding || Buffer.alloc(1024)
    this._input = this._options.input || Buffer.alloc(1024)
  }

  _getBuffer (bufferOrCallback) {
    if (bufferOrCallback instanceof Buffer) {
      return bufferOrCallback
    }
    return bufferOrCallback()
  }

  get coils () {
    return this._getBuffer(this._coils)
  }

  get discrete () {
    return this._getBuffer(this._discrete)
  }

  get holding () {
    return this._getBuffer(this._holding)
  }

  get input () {
    return this._getBuffer(this._input)
  }
}

module.exports = ModbusServer
