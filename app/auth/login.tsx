import EmailInput from '@/components/EmailInput';
import FixedBottomCTA from '@/components/FixedBottomCTA';
import PasswordInput from '@/components/PasswordInput';
import useAuth from '@/hooks/queries/useAuth';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

type Formvalues = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const { loginMutation } = useAuth();
  // const { expoPushToken } = usePushNotification();
  // console.log('expoPushToken', expoPushToken);
  const loginForm = useForm<Formvalues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (formValues: Formvalues) => {
    const { email, password } = formValues;
    loginMutation.mutate({ ...formValues });
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
