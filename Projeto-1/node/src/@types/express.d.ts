// Delcaração de tipos do express
declare namespace Express {
  // Os tipos inseridos serão adicionados ao padrão que já tem no express
  export interface Request {
    user: {
      id: string;
    };
  }
}
