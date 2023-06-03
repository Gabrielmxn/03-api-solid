import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  async setup() {
    console.log('Execuotu')

    return {
      teardown() {
        console.log('teardown')
      },
    }
  },
}
