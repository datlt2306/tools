import { env } from '@/common/utils'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm'
import { UserEntity } from '../entities/user.entity'

@EventSubscriber()
export class UserEntitySubscriber implements EntitySubscriberInterface<UserEntity> {
	constructor(private readonly configService: ConfigService) {}

	listenTo() {
		return UserEntity
	}

	async beforeInsert(event: InsertEvent<UserEntity>) {
		event.entity.password = await bcrypt.hash(
			event.entity.password,
			env('BCRYPT_SALT_ROUNDS', { serialize: (value) => parseInt(value) })
		)
	}
}
