import { env } from '@/common/utils'
import { BaseAbstractEntity } from '@/modules/_base/base.abstract.entity'
import * as bcrypt from 'bcrypt'
import { Column, Entity, Unique } from 'typeorm'
import { UserRoles } from '../constants'

@Entity({ database: env('POSTGRES_DB'), schema: 'dbo', name: 'users', synchronize: true })
export class UserEntity extends BaseAbstractEntity {
	@Column({ name: 'email', nullable: false, type: 'varchar', length: 100 })
	@Unique('unq_idx_email', ['email'])
	email: string

	@Column({ name: 'password', nullable: false, type: 'varchar', length: 255 })
	password: string

	@Column({ name: 'display_name', nullable: false, type: 'varchar', length: 100 })
	display_name: string

	@Column({ name: 'role', nullable: false, type: 'enum', enum: UserRoles })
	role: UserRoles

	authenticate(password: string) {
		return bcrypt.compareSync(password, this.password)
	}

	constructor(user: Partial<UserEntity>) {
		super()
		Object.assign(this, user)
	}
}
