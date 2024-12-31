import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { AuthForm } from '../../components/auth/AuthForm';
import { FormInput } from '../../components/auth/FormInput';
import { RoleSelect } from '../../components/auth/RoleSelect';
import { SubmitButton } from '../../components/auth/SubmitButton';
import { useAuthForm } from '../../hooks/useAuthForm';
import { validatePassword } from '../../utils/auth';
import type { SignUpData } from '../../types/auth';

interface RegisterFormData extends Omit<SignUpData, 'role'> {
  email: string;
  password: string;
  role: string;
}

export function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    organization: '',
    role: ''
  });

  const { loading, error, handleSubmit: onSubmit } = useAuthForm({
    onSubmit: async () => {
      const { email, password, ...userData } = formData;
      
      // Validate required fields
      if (!email || !password || !userData.firstName || !userData.lastName || !userData.role) {
        throw new Error('Please fill in all required fields');
      }

      // Validate password
      const passwordError = validatePassword(password);
      if (passwordError) {
        throw new Error(passwordError);
      }

      await signUp(email, password, {
        ...userData,
        role: userData.role as SignUpData['role']
      });

      navigate('/', { replace: true });
    }
  });

  return (
    <AuthForm
      title="Create your account"
      subtitle="Join ManuscriptFlow"
      alternateLink={{
        text: "Already have an account?",
        linkText: "Sign in",
        to: "/login"
      }}
    >
      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <FormInput
            icon={Mail}
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Email address"
          />

          <FormInput
            icon={Lock}
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            placeholder="Password"
          />

          <div className="flex space-x-4">
            <FormInput
              icon={User}
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              placeholder="First Name"
            />

            <FormInput
              icon={User}
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              placeholder="Last Name"
            />
          </div>

          <FormInput
            icon={Building}
            type="text"
            value={formData.organization}
            onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
            placeholder="Organization (optional)"
          />

          <RoleSelect
            value={formData.role}
            onChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
          />
        </div>

        <SubmitButton loading={loading} text="Create Account" />
      </form>
    </AuthForm>
  );
}