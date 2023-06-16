import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Sample', () => {
  test('テキスト確認', async () => {
    render(
      <div>Sample Html View</div>
    )
    expect(screen.getByText('Sample Html View')).toBeInTheDocument();
  });
});