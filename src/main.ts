import * as core from '@actions/core'
import { readFile } from 'fs/promises'
import { getPackageRunsOn } from './os'
import { getPackageNodeVersions } from './engines'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const packageJson = JSON.parse(
      await readFile('package.json', { encoding: 'utf-8' })
    )

    const runsOn = getPackageRunsOn(packageJson)
    const nodeVersion = await getPackageNodeVersions(packageJson)

    // Set outputs for other workflow steps to use
    core.setOutput('runsOn', runsOn)
    core.setOutput('nodeVersion', nodeVersion)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
