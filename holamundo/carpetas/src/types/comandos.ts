export type Comando = {
  id: number,
  cname: string,
  attr: string[],
  action: () => void
}