import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { AuthForm } from '../../components/auth/AuthForm';
import { FormInput } from '../../components/auth/FormInput';
import { SubmitButton } from '../../components/auth/SubmitButton';
import { useAuthForm } from '../../hooks/useAuthForm';

export function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { loading, error, handleSubmit } = useAuthForm({
    onSubmit: async () => {
      await signIn(email, password);
      navigate('/', { replace: true });
    }
  });

  return (
    <AuthForm
      title="Sign in to your account"
      subtitle="Welcome back"
      alternateLink={{
        text: "Don't have an account?",
        linkText: "Sign up",
        to: "/register"
      }}
    >
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <FormInput
            icon={Mail}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
          />

          <FormInput
            icon={Lock}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>

        <SubmitButton loading={loading} text="Sign in" />
      </form>
    </AuthForm>
  );
}