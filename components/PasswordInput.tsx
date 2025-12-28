import InputField from '@/components/InputField';
import { Controller, useFormContext } from 'react-hook-form';
import { TextInputProps } from 'react-native';

interface PasswordInputProps {
  submitBehavior?: TextInputProps['submitBehavior'];
  returnKeyType?: TextInputProps['returnKeyType'];
}

function PasswordInput({
  submitBehavior = 'blurAndSubmit',
  returnKeyType = 'default',
}: PasswordInputProps) {
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      name="password"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length < 8) {
            return '비밀번호는 8자 이상 입력해주세요.';
          }
        },
      }}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          label="비밀번호"
          placeholder="비밀번호을 입력해주세요."
          submitBehavior={submitBehavior}
          returnKeyType={returnKeyType}
          secureTextEntry
          value={value}
          onChangeText={onChange}
          error={error?.message}
          onSubmitEditing={() => setFocus('passwordConfirm')}
        />
      )}
    />
  );
}

export default PasswordInput;
