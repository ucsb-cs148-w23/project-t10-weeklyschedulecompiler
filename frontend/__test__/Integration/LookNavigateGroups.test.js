import React from 'react';
import { expect, jest, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppNavbar from '../../src/components/Nav/AppNavbar';
import Main from '../../src/pages/Main';

describe('User is looking and navigating to groups they are part of', () => {
  test('render the Home Page and check if groups tab renders', () => {
    const user = { authenticated: true };
    render(
      <BrowserRouter>
        <AppNavbar user={user} />
        <Main />
      </BrowserRouter>
    );

    expect(screen.getByText('Groups'));
  });
});
