import { Injectable } from '@nestjs/common'
import { DeepPartial, DeleteResult, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { BaseAbstractEntity } from './base.abstract.entity'
import { IBaseService } from './base.service.interface'
import { PaginationDTO } from './dto/pagination.dto'

@Injectable()
export abstract class BaseAbstractService<Entity extends BaseAbstractEntity> implements IBaseService<Entity> {
	protected constructor(private repository: Repository<Entity>) {}

	async insertOne(payload: DeepPartial<Entity>) {
		const newRecord = this.repository.create(payload)
		return await this.repository.save(newRecord)
	}

	async insertMany(payload: DeepPartial<Entity>[]) {
		const newRecords = this.repository.create(payload)
		return await this.repository.insert(newRecords as FirstParameter<typeof this.repository.insert>)
	}

	async findAll(): Promise<Entity[]> {
		return await this.repository.find()
	}

	async findOneById(id: number): Promise<Entity> {
		return await this.repository.findOneBy({ id: id } as FindOptionsWhere<Entity>)
	}

	async updateOneById(id: number, partialEntity: QueryDeepPartialEntity<Entity>) {
		return await this.repository.update(id, partialEntity)
	}

	async deleteOneById(id: number): Promise<DeleteResult> {
		return await this.repository.delete(id)
	}

	async softDeleteOneById(id: number): Promise<DeleteResult> {
		return await this.repository.createQueryBuilder().softDelete().where('id = :id', { id }).execute()
	}

	async restoreById(id: number): Promise<DeleteResult> {
		return await this.repository.createQueryBuilder().restore().where('id = :id', { id }).execute()
	}

	async paginate(
		condition: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
		{ page, limit, ...options }: PaginationDTO & Omit<FindManyOptions<Entity>, 'where'>
	) {
		const [data, total_rows] = await this.repository.findAndCount({
			skip: (page - 1) * limit,
			take: limit,
			where: condition,
			...options
		})
		const total_pages = Math.ceil(total_rows / limit)

		return {
			data,
			total_rows,
			total_pages,
			has_next_page: page < total_pages,
			has_prev_page: page > 1,
			limit,
			page
		} satisfies Pagination<Entity>
	}
}
