import EmailInput from '@/components/EmailInput';
import FixedBottomCTA from '@/components/FixedBottomCTA';
import PasswordConfirmInput from '@/components/PasswordConfirmInput';
import PasswordInput from '@/components/PasswordInput';
import useAuth from '@/hooks/queries/useAuth';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

type Formvalues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function SignupScreen() {
  const { signupMutation } = useAuth();
  const sighupForm = useForm<Formvalues>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = (formValues: Formvalues) => {
    const { email, password } = formValues;
    signupMutation.mutate({
      email,
      password,
    });
  };

  return (
    <FormProvider {...sighupForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput submitBehavior="submit" returnKeyType="next" />
        <PasswordConfirmInput />
      </View>
      <FixedBottomCTA
        label="회원가입하기"
        onPress={sighupForm.handleSubmit(onSubmit)}
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
