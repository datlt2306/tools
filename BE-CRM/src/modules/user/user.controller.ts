import { AuthGuard, HttpMethod, Route, User } from '@/common/decorators'
import { ZodValidationPipe } from '@/common/pipes'
import {
	Body,
	Controller,
	DefaultValuePipe,
	HttpStatus,
	Param,
	ParseBoolPipe,
	ParseIntPipe,
	Query
} from '@nestjs/common'
import { PaginationDTO, paginationDTO } from '../_base/dto/pagination.dto'
import { UserRoles } from './constants'
import { CreateUserDTO, createUserDTO, updateProfileDTO, UpdateUserDTO, updateUserDTO } from './dto/user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Route({
		endpoint: '',
		method: HttpMethod.GET,
		statusCode: HttpStatus.OK,
		message: 'Ok'
	})
	@AuthGuard(UserRoles.CNBM)
	async all(@Query(new ZodValidationPipe(paginationDTO)) query: PaginationDTO) {
		const users = await this.userService.paginate({}, { ...query, select: ['id', 'email', 'display_name', 'role'] })
		return users
	}

	@Route({
		endpoint: 'create',
		method: HttpMethod.POST,
		statusCode: HttpStatus.CREATED,
		message: 'Thêm người dùng thành công'
	})
	@AuthGuard(UserRoles.CNBM)
	async createUser(@Body(new ZodValidationPipe(createUserDTO)) payload: CreateUserDTO) {
		return this.userService.createUser(payload)
	}

	@Route({
		endpoint: 'update/:id',
		method: HttpMethod.PATCH,
		statusCode: HttpStatus.CREATED,
		message: 'Cập nhật người dùng thành công'
	})
	@AuthGuard(UserRoles.CNBM)
	async updateUser(
		@Param('id', ParseIntPipe) id: number,
		@Body(new ZodValidationPipe(updateUserDTO)) payload: UpdateUserDTO
	) {
		return this.userService.updateOneById(id, payload)
	}

	@Route({
		endpoint: 'delete/:id',
		method: HttpMethod.DELETE,
		statusCode: HttpStatus.NO_CONTENT,
		message: 'Xóa người dùng thành công'
	})
	@AuthGuard(UserRoles.CNBM)
	async deleteUser(
		@Param('id', ParseIntPipe) id: number,
		@Query('force', new DefaultValuePipe(false), new ParseBoolPipe()) force: boolean
	) {
		if (force) return this.userService.deleteOneById(id)
		else return this.userService.softDeleteOneById(id)
	}

	@Route({
		endpoint: 'profile',
		method: HttpMethod.GET,
		message: 'Ok'
	})
	async getProfile(@User('id') userId: number) {
		return await this.userService.getProfile(userId)
	}

	@Route({
		endpoint: 'profile/update',
		method: HttpMethod.PATCH,
		message: 'Ok'
	})
	@AuthGuard()
	async updateProfile(
		@User('id') userId: number,
		@Body(new ZodValidationPipe(updateProfileDTO)) payload: UpdateUserDTO
	) {
		return await this.userService.updateOneById(userId, payload)
	}
}
