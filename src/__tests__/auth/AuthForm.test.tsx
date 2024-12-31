```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthForm } from '../../components/auth/AuthForm';

describe('AuthForm Component', () => {
  it('renders with correct title and subtitle', () => {
    render(
      <BrowserRouter>
        <AuthForm
          title="Test Title"
          subtitle="Test Subtitle"
          alternateLink={{
            text: "Test link text",
            linkText: "Click here",
            to: "/test"
          }}
        >
          <div>Test content</div>
        </AuthForm>
      </BrowserRouter>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Test link text')).toBeInTheDocument();
    expect(screen.getByText('Click here')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <BrowserRouter>
        <AuthForm
          title="Test"
          subtitle="Test"
          alternateLink={{
            text: "Test",
            linkText: "Test",
            to: "/test"
          }}
        >
          <div data-testid="test-content">Child content</div>
        </AuthForm>
      </BrowserRouter>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });
});
```