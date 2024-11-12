import { render } from '@testing-library/react';

import { SectionItem } from '.';

describe('SectionItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SectionItem />);
    expect(baseElement).toBeTruthy();
  });
});
