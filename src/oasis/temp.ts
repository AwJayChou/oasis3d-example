type myPick<T, K extends keyof T> = { [P in K]: T[K]} 
type myOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>