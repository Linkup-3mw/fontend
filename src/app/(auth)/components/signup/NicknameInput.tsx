import { useEffect, useState } from 'react';
import {
  FieldValues,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
} from 'react-hook-form';
import Input from '@common/components/form/Input';
import InputBox from '@common/components/form/InputBox';
import { NICKNAME_VALIDATION } from '@/app/(auth)/constants/validation';
import { validateNickname } from '@/app/service/auth';

interface Props {
  error: FieldValues | undefined;
  register: UseFormRegister<FieldValues>;
  setError: UseFormSetError<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
}

export default function NicknameInput({
  error,
  register,
  setError,
  clearErrors,
}: Props) {
  const [message, setMessage] = useState('');

  const verifyNickname = async (username: string) => {
    if (username.length == 0) {
      setMessage('');
      clearErrors('username');
      return;
    }

    const res = await validateNickname(username);
    if (res.status_code === 200) {
      setMessage('사용할 수 있는 닉네임입니다.');
      clearErrors('username');
    } else {
      setMessage('');
      setError('username', {
        message: '이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해 주세요.',
      });
    }
  };

  useEffect(() => {
    register('username', {
      onBlur: (e) => verifyNickname(e.target.value),
    });
  }, [verifyNickname]);

  return (
    <InputBox text="닉네임" errorMsg={error?.username?.message} msg={message}>
      <Input
        placeholder="6자 이내의 한글/영문/숫자를 사용해 주세요."
        register={register}
        name="username"
        isError={error?.username !== undefined}
        validation={NICKNAME_VALIDATION}
      />
    </InputBox>
  );
}
