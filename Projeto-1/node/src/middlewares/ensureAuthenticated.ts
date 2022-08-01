import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // Desestruturação com colchetes, pois não retorna um objeto e sim uma lista
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    // Para ser aceito o termo request.user foi feito uma sobrecarda de tipos do Request no arquivo @types/express.d.ts
    request.user = {
      id: sub,
    };

    // next é a próxima função a ser chamada caso tudo dê certo no middleware.
    // Essa função deve ser enviada como parâmetro quando o middleware for chamado.
    return next();
  } catch (error) {
    throw new AppError('Invalid JWT token', 401);
  }
}
