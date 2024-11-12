import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z
      .string()
      .nonempty('이름을 입력해주세요.')
      .min(2, '이름은 2글자 이상이어야 합니다')
      .max(10, '이름은 10글자 이하여야 합니다'),
    email: z.string().email('올바른 이메일 형식이 아닙니다'),
    password: z
      .string()
      .min(6, '비밀번호는 최소 6자 이상이어야 합니다')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        '비밀번호는 영문과 숫자를 포함해야 합니다'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
