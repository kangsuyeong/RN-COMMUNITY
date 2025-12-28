import EmailInput from '@/components/EmailInput';
import FixedBottomCTA from '@/components/FixedBottomCTA';
import PasswordInput from '@/components/PasswordInput';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

type Formvalues = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const loginForm = useForm<Formvalues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (formValues: Formvalues) => {
    console.log('formValue', formValues);
  };

  return (
    <FormProvider {...loginForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput />
      </View>
      <FixedBottomCTA
        label="로그인하기"
        onPress={loginForm.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
});
