import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createFormDataRequest = (body: { [key: string]: any }) => {
  const formData = new FormData();
  for (const key of Object.keys(body)) {
    const element = body[key];
    if (element instanceof FileList && element.length > 0) {
      formData.append(key, element[0]);
    } else if (
      typeof element === 'string' ||
      typeof element === 'number' ||
      typeof element === 'boolean'
    ) {
      formData.append(key, element.toString());
    } else if (element instanceof Array && element.length > 0) {
      element.forEach((value, index) => {

        formData.append(`${key}[${index}]`, value);
      });
    } else if (typeof element === 'object') {

    }
  }
}


export function createQueryParams<T extends object>(params: Partial<Record<keyof T, string>>): string {
  const queryParams: string[] = [];

  for (const key in params) {
    if (params.hasOwnProperty(key) && params[key] !== undefined) {
      queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key] as string)}`);
    }
  }

  return queryParams.join('&');
}

export function uniqByKeepLast<T extends object>(arr: Array<T>, key: keyof T): T[] {
  return arr.reduce((acc: T[], curr: T) => {
    const foundIndex = acc.findIndex(item => item[key] === curr[key]);

    if (foundIndex !== -1) {
      // If an object with the same key already exists, replace it
      acc[foundIndex] = curr;
    } else {
      // Otherwise, add the current object to the accumulator
      acc.push(curr);
    }

    return acc;
  }, []);
}

export async function fetcher(url: string) {
  const res = await fetch(url)
  return await res.json()
}