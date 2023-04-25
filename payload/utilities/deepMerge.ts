/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: unknown): boolean {
  return Boolean(item && typeof item === 'object' && !Array.isArray(item));
}

type ObjectWithKeys = { [key: string]: any }

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export default function deepMerge<T extends ObjectWithKeys, R extends ObjectWithKeys>(target: T, source: R): T {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        // @ts-ignore
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          // @ts-ignore
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  return output;
}
