import { intersects, major } from 'semver'
import { getManifestFromRepo } from '@actions/tool-cache'

async function getNodeMajorVersions() {
  const manifest = await getManifestFromRepo(
    'actions',
    'node-versions',
    undefined,
    'main'
  )

  const majorVersions = manifest
    .filter(({ stable }) => stable)
    .map(({ version }) => major(version).toString())

  return [...new Set(majorVersions)]
}

/**
 * Get list of allowed major Node versions from the package.json "engines" field.
 *
 * @see https://docs.npmjs.com/cli/v10/configuring-npm/package-json#engines
 */
export async function getPackageNodeVersions({
  engines
}: {
  engines?: { node?: string }
}) {
  let versions = await getNodeMajorVersions()
  const range = engines?.node

  if (range) {
    versions = versions.filter(version => intersects(version, range))
  }

  return versions
}
