import { getPackageNodeVersions } from '../src/engines'
import * as tc from '@actions/tool-cache'

const getManifestFromRepoMock = jest.spyOn(tc, 'getManifestFromRepo')

describe('engines.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it.each([
    [undefined],
    [{ node: undefined }],
    [{ node: '>=16' }],
    [{ node: '>=16.1 <21.3.5' }]
  ])('returns correct Node major versions when engines=%p', async engines => {
    const result = await getPackageNodeVersions({ engines })
    expect(getManifestFromRepoMock).toHaveBeenCalled()
    console.log(result)
    expect(result).toEqual(['20', '18', '16'])
  })

  it.each([[{ node: '18' }], [{ node: '18.x' }], [{ node: '>=18 <19' }]])(
    'returns correct Node major versions when engines=%p',
    async engines => {
      const result = await getPackageNodeVersions({ engines })
      expect(getManifestFromRepoMock).toHaveBeenCalled()
      console.log(result)
      expect(result).toEqual(['18'])
    }
  )
})
