import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsInsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'
let gymsRepository: InMemoryGymsInsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsInsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -22.8363558,
      longitude: -43.3004774,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -22.8363558,
      longitude: -43.3004774,
    })

    const { gyms } = await sut.execute({
      query: 'TypeScript Gym',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'TypeScript Gym' })])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `TypeScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -22.8363558,
        longitude: -43.3004774,
      })
    }

    const { gyms } = await sut.execute({
      query: 'TypeScript Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'TypeScript Gym 21' }),
      expect.objectContaining({ title: 'TypeScript Gym 22' }),
    ])
  })
})
