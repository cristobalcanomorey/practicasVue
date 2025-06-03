import type { AnyObject } from "@/types";

export function objectHasPath(obj: any, path: string): boolean {
	return path.split('.').every(key => {
		if (obj && typeof obj === 'object' && key in obj) {
			obj = obj[key];
			return true;
		}
		return false;
	});
}

/**
 * Devuelve true si, en todos los niveles anidados, a y b tienen exactamente las mismas claves.
 * @param a un objeto con claves
 * @param b otro objeto con claves
 * @returns igualdad de claves
 */
export function haveSameKeysDeep(a: AnyObject, b: AnyObject): boolean {
	const keysA = Object.keys(a);
	const keysB = Object.keys(b);

	// Si en este nivel difieren en número de claves, no coinciden
	if (keysA.length !== keysB.length) return false;

	for (const key of keysA) {
		// Si B no tiene la clave que A sí tiene → distinto
		if (!(key in b)) return false;

		const valA = a[key];
		const valB = b[key];

		const isObjA = typeof valA === 'object' && valA !== null && !Array.isArray(valA);
		const isObjB = typeof valB === 'object' && valB !== null && !Array.isArray(valB);

		if (isObjA && isObjB) {
			// Ambos valores son objetos literales → descendemos recursivamente
			if (!haveSameKeysDeep(valA, valB)) return false;
		} else {
			// Si uno es objeto y el otro no → estructura distinta
			if (isObjA !== isObjB) return false;
			// Si ambos no son objetos, no hay más claves internas que chequear
		}
	}

	return true;
}

/**
 * Devuelve un objeto con las claves (y valores) que existen en b pero no en a (respetando la estructura anidada).
 * @param a Objeto supuestamente incompleto
 * @param b Objeto supuestamente completo
 * @returns Las claves y valores de b que faltan en a
 */
export function getDeepMissing<A extends AnyObject, B extends AnyObject>(
	a: A,
	b: B
): Partial<B> {
	const result: Partial<B> = {};

	for (const key of Object.keys(b)) {
		const valB = b[key as keyof B];

		// Si A no tiene la clave en absoluto, la copiamos entera en 'result'
		if (!(key in a)) {
			result[key as keyof B] = valB;
			continue;
		}

		// Si A tiene la clave y ambos valores son objetos literales → descendemos
		const valA = (a as any)[key];
		const isObjA = typeof valA === 'object' && valA !== null && !Array.isArray(valA);
		const isObjB = typeof valB === 'object' && valB !== null && !Array.isArray(valB);

		if (isObjA && isObjB) {
			// Llamada recursiva para ver claves faltantes en el interior
			const childMissing = getDeepMissing(valA, valB);
			if (Object.keys(childMissing).length > 0) {
				// Solo guardamos esta rama si hay algo faltante adentro
				result[key as keyof B] = childMissing as any;
			}
		}
		// Si A tiene la clave y NO son ambos objetos, no hay claves “faltantes” en niveles más profundos
	}

	return result;
}

/**
 * Copia en `target` todas las claves (y subclaves) de `source` que aún no existan en `target`.
 * Si ambas ramas (target[key] y source[key]) son objetos literales, desciende recursivamente.
 * @param target Objeto con claves y values
 * @param source Objeto con otras claves y values
 * @returns La fusión de ambos objetos
 */
export function mergeDeep<T extends AnyObject>(
  target: T,
  source: Partial<T>
): T {
  for (const key of Object.keys(source)) {
    const valSource = (source as AnyObject)[key];

    // Si en source es un objeto literal (no null, no array)...
    const isObjectSource =
      typeof valSource === 'object' &&
      valSource !== null &&
      !Array.isArray(valSource);

    if (isObjectSource) {
      // Si target ya tiene esa clave y es también objeto literal, descendemos
      if (
        key in target &&
        typeof (target as AnyObject)[key] === 'object' &&
        (target as AnyObject)[key] !== null &&
        !Array.isArray((target as AnyObject)[key])
      ) {
        
        mergeDeep((target as AnyObject)[key], valSource);
      } else {
        // Si target no tenía esa clave, la “prendemos” entera copiando el objeto origen
        (target as AnyObject)[key] = valSource;
      }
    } else {
      // Si no es un objeto (cadena, número, etc.), simplemente asignamos
      (target as AnyObject)[key] = valSource;
    }
  }

  return target;
}

export function diffKeys<A extends object, B extends object>(a: A, b: B): Partial<B> {
	const result: Partial<B> = {};

	for (const key in b) {
		if (!(key in a)) {
			result[key] = b[key];
		}
	}

	return result;
}