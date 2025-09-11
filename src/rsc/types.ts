/**
 * Defines the structure of the RSC (React Server Components) payload.
 * This payload is used to transfer the root React node from the server to the client.
 */
export type RscPayload = {
  root: React.ReactNode
}
