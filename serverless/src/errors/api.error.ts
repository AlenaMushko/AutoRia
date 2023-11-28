export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
export function myError(message: string, status: number) {
  return {
    statusCode: status,
    body: JSON.stringify({ error: message }),
  };
}
