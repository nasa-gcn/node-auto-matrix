import * as core from '@actions/core'

const map: Record<string, string> = {
  darwin: 'macos',
  linux: 'linux',
  win32: 'windows'
}

function getRunsOnForPlatform(platform: string): string {
  return core.getInput(`runner-${map[platform] ?? platform}`)
}

const all = ['darwin', 'linux', 'win32']

/**
 * Get list of allowed process.platform values from the package.json "os" field.
 *
 * @see https://docs.npmjs.com/cli/v10/configuring-npm/package-json#os
 * @see https://nodejs.org/api/process.html#processplatform
 */
function getPackagePlatforms(os: string[] = []): string[] {
  const forbidden: string[] = []
  let allowed: string[] = []

  for (const o of os) {
    if (o.startsWith('!')) {
      forbidden.push(o.slice(1))
    } else {
      allowed.push(o)
    }
  }

  if (!allowed.length) {
    allowed = all
  }

  return allowed.filter(o => !forbidden.includes(o))
}

/**
 * Get list of allowed runs-on values from the package.json "os" field.
 *
 * @see https://docs.npmjs.com/cli/v10/configuring-npm/package-json#os
 * @see https://nodejs.org/api/process.html#processplatform
 */
export function getPackageRunsOn({ os }: { os?: string[] }): string[] {
  return getPackagePlatforms(os ?? []).map(getRunsOnForPlatform)
}
