import z from 'zod'
import { UserRoles } from '../constants'

export const createUserDTO = z.object({
	email: z
		.string({ required_error: 'Email là trường bắt buộc' })
		.nonempty({ message: 'Email là trường bắt buộc' })
		.email({ message: 'Email không hợp lệ' }),
	password: z
		.string({ required_error: 'Mật khẩu là trường bắt buộc' })
		.nonempty({ message: 'Mật khẩu là trường bắt buộc' }),
	display_name: z.string().nonempty({ message: 'Tên người dùng là trường bắt buộcbuộc' }),
	role: z.nativeEnum(UserRoles, { message: 'Vai trò không hợp lệ' })
})

export const updateProfileDTO = z.object({
	email: z
		.string({ required_error: 'Email là trường bắt buộc' })
		.nonempty({ message: 'Email là trường bắt buộc' })
		.email({ message: 'Email không hợp lệ' })
		.optional(),
	password: z
		.string({ required_error: 'Mật khẩu là trường bắt buộc' })
		.nonempty({ message: 'Mật khẩu là trường bắt buộc' })
		.optional(),
	display_name: z.string().nonempty({ message: 'Tên người dùng là trường bắt buộcbuộc' }).optional()
})

export const updateUserDTO = updateProfileDTO.extend({
	role: z.nativeEnum(UserRoles, { message: 'Vai trò không hợp lệ' }).optional()
})

export type CreateUserDTO = z.infer<typeof createUserDTO>
export type UpdateProfileDTO = z.infer<typeof updateProfileDTO>
export type UpdateUserDTO = z.infer<typeof updateUserDTO>
