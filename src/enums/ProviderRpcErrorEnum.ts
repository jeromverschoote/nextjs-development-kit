/*

https://eips.ethereum.org/EIPS/eip-1474#error-code
https://eips.ethereum.org/EIPS/eip-1193#provider-errors

*/

export const ProviderRpcErrorEnum: { [key: string]: string } = {
  // Missing or invalid parameters.
  '-32000': 'provider.error.invalidInput',

  // Requested resource not found	.
  '-32001': 'provider.error.resourceNotFound',

  // Requested resource not available.
  '-32002': 'provider.error.resourceUnavailable',

  // Transaction rejected.
  '-32003': 'provider.error.transactionRejected',

  // Method not supported.
  '-32004': 'provider.error.methodNotSupported',

  // Request limit exceeded.
  '-32005': 'provider.error.limitExceeded',

  // Version of JSON-RPC protocol is not supported	.
  '-32006': 'provider.error.jsonVersionNotSupported',

  // JSON is not a valid request object.
  '-32600': 'provider.error.invalidRequest',

  // Method does not exist.
  '-32601': 'provider.error.methodNotFound',

  // Invalid method parameter(s).
  '-32602': 'provider.error.invalidParams',

  // Internal JSON-RPC error.
  '-32603': 'provider.error.internalError',

  // Invalid JSON.
  '-32700': 'provider.error.parseError',

  // The user rejected the request.
  '4001': 'provider.error.userRejectedRequest',

  // The requested method and/or account has not been authorized by the user.
  '4100': 'provider.error.unauthorized',

  // The Provider does not support the requested method.
  '4200': 'provider.error.unsupportedMethod',

  // The Provider is disconnected from all chains.
  '4900': 'provider.error.disconnected',

  // The Provider is not connected to the requested chain.
  '4901': 'provider.error.chainDisconnected',
};
