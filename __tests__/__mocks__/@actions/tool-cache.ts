import type {IToolRelease} from '@actions/tool-cache'

export async function getManifestFromRepo(): Promise<IToolRelease[]> {
  return [
    { version: '20.3.0', stable: true, release_url: '', files: [] },
    { version: '20.2.1', stable: true, release_url: '', files: [] },
    { version: '19.4.6', stable: false, release_url: '', files: [] },
    { version: '18.3.1', stable: true, release_url: '', files: [] },
    { version: '16.1.5', stable: true, release_url: '', files: [] }
  ]
}
