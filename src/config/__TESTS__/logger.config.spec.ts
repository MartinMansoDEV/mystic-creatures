import { loggerConfig } from '@config';

describe('loggerConfig', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.NODE_ENV = 'production';
  });

  afterEach(() => {
    jest.resetAllMocks();
    delete process.env.NODE_ENV;
  });

  it('should return the correct transport in production', () => {
    process.env.NODE_ENV = 'production';

    expect(loggerConfig()).toEqual({ pinoHttp: { transport: undefined } });
  });

  it('should return the correct transport in development', () => {
    process.env.NODE_ENV = 'development';

    expect(loggerConfig()).toEqual({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            colorize: true,
          },
        },
      },
    });
  });
});
