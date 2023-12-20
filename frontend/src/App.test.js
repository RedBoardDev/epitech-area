import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('checks if the App component renders without errors', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
});
