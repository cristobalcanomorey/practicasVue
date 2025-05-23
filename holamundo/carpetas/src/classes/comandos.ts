// export type Comando = {
//   id: number
// 	help: string
// 	cname: string
// 	option: string
// 	args: string[]
// 	action: () => void
// }

export class Comando {
  constructor(
    public id: number = -1,
    public help: string = '',
    public cname: string = '',
    public option: string = '',
    public args: string[] = [],
    public action: () => void = () => {}
  ) {}
}