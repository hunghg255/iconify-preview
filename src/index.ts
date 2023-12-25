import type { ExtensionContext } from 'vscode'
import { version } from '../package.json'
import { Log } from './utils'
import { RegisterCompletion } from './completions'
import { RegisterAnnotations } from './annotation'
import { RegisterCommands } from './commands'
import { LoadCustomCollections } from './config'

export async function activate(ctx: ExtensionContext) {
  Log.info(`🈶 Activated, v${version}`)

  await LoadCustomCollections()

  RegisterCommands(ctx)
  RegisterCompletion(ctx)
  RegisterAnnotations(ctx)
}

export function deactivate() {
  Log.info('🈚 Deactivated')
}
