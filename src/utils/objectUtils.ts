/**
 * Modern alternative to deprecated util._extend
 * Using Object.assign instead of the deprecated utility
 * 
 * @param target The target object to extend
 * @param source The source object to copy properties from
 * @returns The extended target object
 */
export function extendObject<T, U>(target: T, source: U): T & U {
  return { ...target, ...source } as T & U;
}

/**
 * Deep merge utility for merging objects with nested properties
 * 
 * @param target The target object to merge into
 * @param source The source object to merge from
 * @returns The merged target object
 */
export function deepMerge<T extends object, U extends object>(target: T, source: U): T & U {
  const output = { ...target } as T & U;
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key as keyof U])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key as keyof U] });
        } else {
          (output as any)[key] = deepMerge(
            (target as any)[key],
            (source as any)[key]
          );
        }
      } else {
        Object.assign(output, { [key]: source[key as keyof U] });
      }
    });
  }
  
  return output;
}

function isObject(item: any): item is object {
  return item && typeof item === 'object' && !Array.isArray(item);
}
