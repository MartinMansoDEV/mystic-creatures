import { RequestMethod } from '@nestjs/common';

export const loggerConfig = () => {
  const transport =
    process.env.NODE_ENV === 'production'
      ? undefined
      : {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            colorize: true,
          },
        };
  return {
    pinoHttp: {
      transport,
    },
    exclude: [
      { method: RequestMethod.ALL, path: '/graphql' },
      { method: RequestMethod.ALL, path: '/' },
    ],
  };
};
