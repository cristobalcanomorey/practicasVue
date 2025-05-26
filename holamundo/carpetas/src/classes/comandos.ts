import type { TreeNode } from '@/types/TreeNode'
import { ref } from 'vue'
import type { Ref } from 'vue'
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
		public action: () => void = () => {},
	) {}
}

export class Cmd {
	public tree: Ref<TreeNode>
	public wd: string = '/'
  public openedFolders: Ref<string> = ref('')

	constructor() {
		this.tree = ref({} as TreeNode)
		this.wd += this.tree.value.name
    this.openedFolders.value = this.wd
	}

	public pwd(): void {}
}
