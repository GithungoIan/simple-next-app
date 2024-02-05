import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Notification, rem
} from '@mantine/core';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { IconX, IconCheck } from '@tabler/icons-react';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(8, 'Password should be at least 8 characters').required('Password is required'),
});


type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;


  const onSubmit = (data: LoginFormData) => {
    if (data.email === 'you@example.com' && data.password === 'password123') {
      alert('Login successful!');
    } else {
      alert("failed to log in")
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" >
        Welcome back!
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput label="Email" placeholder="you@example.com" error={errors.email?.message} required {...register('email')} />
          <PasswordInput label="Password" placeholder="Your password" requ error={errors.password?.message}
            {...register('password')} ired mt="md" />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <div className="mb-4">
            {errors.email && (
              <Notification icon={xIcon} type="error" title="Error"  color="red" >{errors.email.message} </Notification>
            )}
            {errors.password && (
              <Notification icon={xIcon} type="error" title="Error"  color="red" >{errors.password.message}</Notification>
            )}
          </div>

          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
