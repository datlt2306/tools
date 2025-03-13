import { UserRoles } from '@/modules/user/constants'
import { UserEntity } from '@/modules/user/entities'
import { faker } from '@faker-js/faker'
import { Logger } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { Seeder } from 'typeorm-extension'

export class UserSeeder implements Seeder {
	track = false

	public async run(dataSource: DataSource): Promise<any> {
		try {
			const repository = dataSource.getRepository(UserEntity)

			const data = new Array(100).fill(null).map(() => {
				const sampleData = new UserEntity({
					email: faker.internet.email(),
					password: '123456',
					display_name: faker.person.fullName(),
					role: UserRoles.GV
				})
				return sampleData
			})

			await repository.insert(data)
		} catch (error) {
			Logger.error(error)
		}
	}
}
