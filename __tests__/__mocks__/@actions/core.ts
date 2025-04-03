import type * as core from '@actions/core'
export { setFailed, setOutput } from '@actions/core'

const map: Record<string, string> = {
  'runner-macos': 'macos-latest',
  'runner-linux': 'ubuntu-latest',
  'runner-windows': 'windows-latest'
}

export const getInput: typeof core.getInput = name => map[name]
