import { getPackageRunsOn } from '../src/os'

describe('wait.ts', () => {
  it.each([[undefined], [[]], [['darwin', 'linux', 'win32']]])(
    'returns correct runs-on value for os=%p',
    os => {
      expect(getPackageRunsOn({ os }).sort()).toEqual([
        'macos-latest',
        'ubuntu-latest',
        'windows-latest'
      ])
    }
  )

  it.each([[['darwin']], [['darwin', '!linux']], [['!linux', '!win32']]])(
    'returns correct runs-on value for os=%p',
    os => {
      expect(getPackageRunsOn({ os }).sort()).toEqual(['macos-latest'])
    }
  )
})
