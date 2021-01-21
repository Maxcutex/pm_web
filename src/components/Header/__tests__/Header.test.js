import '@testing-library/jest-dom'

import React from 'react';

// import { ThemeProvider} from '@material-ui/styles';
// import { createMuiTheme } from '@material-ui/core'
import Header from '../Header'
import {ThemeProvider} from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  render,
  cleanup,
  findByTestId,
  findByText,
  waitForElement,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";

describe("TestResultsComponent", () => {
  describe("Overall", () => {
    it("should render successfully - base", async () => {
      const theme = createMuiTheme()
      const { getByText } = render(
        <ThemeProvider theme={muiTheme}>
          <MockedProvider>
            <Header />
          </MockedProvider>
        </ThemeProvider>
      );
      expect(getByText("Preview")).toBeInTheDocument();
    });
  });
})