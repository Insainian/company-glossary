import { GoogleLoginGuard } from './google-login.guard';

describe('GoogleLoginGuard', () => {
  it('should be defined', () => {
    expect(new GoogleLoginGuard()).toBeDefined();
  });
});
