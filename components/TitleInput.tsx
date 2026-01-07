import InputField from '@/components/InputField';
import { Controller, useFormContext } from 'react-hook-form';

function TitleInput() {
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      name="title"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length <= 0) {
            return '제목을 입력해주세요.';
          }
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          autoFocus
          label="제목"
          placeholder="제목을 입력해주세요."
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => setFocus('description')}
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
}

export default TitleInput;
