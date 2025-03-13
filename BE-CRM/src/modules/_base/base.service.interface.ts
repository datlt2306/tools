import { DeepPartial, DeleteResult, FindManyOptions, FindOptionsWhere, InsertResult, UpdateResult } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { BaseAbstractEntity } from './base.abstract.entity'
import { PaginationDTO } from './dto/pagination.dto'

export interface IBaseService<Entity extends BaseAbstractEntity> {
	insertOne(payload: DeepPartial<Entity>): Promise<Entity>
	insertMany(payload: DeepPartial<Entity>[]): Promise<InsertResult>
	findAll(): Promise<Entity[]>
	findOneById(id: number): Promise<Entity>
	updateOneById(id: number, partialEntity: QueryDeepPartialEntity<Entity>): Promise<UpdateResult>
	deleteOneById(id: number): Promise<DeleteResult>
	softDeleteOneById(id: number): Promise<DeleteResult>
	paginate(
		condition: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
		{ page, limit, ...options }: PaginationDTO & Omit<FindManyOptions<Entity>, 'where'>
	)
}
