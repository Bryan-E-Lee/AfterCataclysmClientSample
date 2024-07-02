import { v4 } from 'uuid';

export const getUniqueIdentifier = (): string => {
  return v4();
}