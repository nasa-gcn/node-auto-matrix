import type { IToolRelease } from '@actions/tool-cache'

export async function getManifestFromRepo(): Promise<IToolRelease[]> {
  return [
    { version: '24.15.0', stable: true, release_url: '', files: [] },
    { version: '22.22.2', stable: true, release_url: '', files: [] },
    { version: '20.20.2', stable: true, release_url: '', files: [] },
    { version: '18.20.8', stable: true, release_url: '', files: [] },
    { version: '16.20.2', stable: true, release_url: '', files: [] }
  ]
}
