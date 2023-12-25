import type { OutputChannel } from 'vscode'
import { window } from 'vscode'
import { EXT_NAME } from '../meta'

export class Log {
  private static _channel: OutputChannel

  static get outputChannel(): OutputChannel {
    if (!this._channel)
      this._channel = window.createOutputChannel(EXT_NAME)
    return this._channel
  }

  static raw(...values: any[]) {
    this.outputChannel.appendLine(values.map(i => i.toString()).join(' '))
  }

  static info(message: string, intend = 0) {
    this.outputChannel.appendLine(`${'\t'.repeat(intend)}${message}`)
  }

  static warning(message: string, prompt = false, intend = 0) {
    if (prompt)
      window.showWarningMessage(message)
    Log.info(`⚠ WARN: ${message}`, intend)
  }

  static async error(err: Error | string | any = {}, prompt = true, intend = 0) {
    if (typeof err !== 'string')
      Log.info(`🐛 ERROR: ${err.name}: ${err.message}\n${err.stack}`, intend)

    if (prompt) {
      const openOutputButton = 'Error Log'
      const message = typeof err === 'string'
        ? err
        : `${EXT_NAME} Error: ${err.toString()}`

      const result = await window.showErrorMessage(message, openOutputButton)
      if (result === openOutputButton)
        this.show()
    }
  }

  static show() {
    this._channel.show()
  }

  static divider() {
    this.outputChannel.appendLine('\n――――――\n')
  }
}
