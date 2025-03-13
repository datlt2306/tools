import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import { DATA_SOURCE } from './constants'

@Module({
	imports: [
		// * PostgreSQL database connection
		TypeOrmModule.forRootAsync({
			name: DATA_SOURCE,
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return configService.getOrThrow<TypeOrmModuleAsyncOptions>('database')
			}
		})
	]
})
export class DatabaseModule {}
