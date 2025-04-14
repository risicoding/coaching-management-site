export type InferSuccess<T>=T extends {status:200}?T :never
