import { render } from '@testing-library/react';

import { SectionInput } from '.';

describe('SectionInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SectionInput />);
    expect(baseElement).toBeTruthy();
  });
});
