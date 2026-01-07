import InputField from '@/components/InputField';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

function PasswordConfirmInput() {
  const { control } = useFormContext();
  const password = useWatch({ control, name: 'password' });
  return (
    <Controller
      name="passwordConfirm"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data !== password) {
            return '비밀번호가 일치하지 않습니다.';
          }
        },
      }}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          label="비밀번호 확인"
          placeholder="비밀번호을 입력해주세요."
          textContentType="oneTimeCode"
          value={value}
          secureTextEntry
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
}

export default PasswordConfirmInput;
