interface ServiceResponse<T extends Object = any> {
  statusCode?: number;
  body: { message: string; data?: T };
}
