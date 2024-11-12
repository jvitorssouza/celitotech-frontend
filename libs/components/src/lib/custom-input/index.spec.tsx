import { render } from '@testing-library/react';

import { CustomInput } from '.';

describe('CustomInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomInput />);
    expect(baseElement).toBeTruthy();
  });
});
