export interface TreeNode {
  name: string;
  children: TreeNode[] | null;  // optional array of more TreeNodes
}