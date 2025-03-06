class NodeTree {
    word: string;
    leftWord: NodeTree | null;
    rightWord: NodeTree | null;

    constructor(word: string) {
        this.word = word;
        this.leftWord = null;
        this.rightWord = null;
    }
}
interface BinarySearchTreeMethod {
    insertKeyword(word: string): void;
    _findNodeWithPrefix(node: NodeTree | null, prefix: string): NodeTree | null;
    _collectWords(node: NodeTree | null): string[];
    autoComplete(prefix: string): string[];
}

class BinarySearchTree implements BinarySearchTreeMethod {
    root: NodeTree | null = null;

    insertKeyword(word: string): void {
        this.root = this._insertHelper(this.root, word);
    }

    private _insertHelper(node: NodeTree | null, word: string): NodeTree {
        if (!node) {
            return new NodeTree(word);
        }
        if (word < node.word) {
            node.leftWord = this._insertHelper(node.leftWord, word);
        } else if (word > node.word) {
            node.rightWord = this._insertHelper(node.rightWord, word);
        }
        return node;
    }

    _findNodeWithPrefix(node: NodeTree | null, prefix: string): NodeTree | null {
        if (!node) return null;
        if (node.word.startsWith(prefix)) return node;
        if (prefix < node.word) {
            return this._findNodeWithPrefix(node.leftWord, prefix);
        } else {
            return this._findNodeWithPrefix(node.rightWord, prefix);
        }
    }

    _collectWords(node: NodeTree | null): string[] {
        const words: string[] = [];
        this._inorderTraversal(node, words);
        return words;
    }

    private _inorderTraversal(node: NodeTree | null, words: string[]): void {
        if (!node) return;
        this._inorderTraversal(node.leftWord, words);
        words.push(node.word);
        this._inorderTraversal(node.rightWord, words);
    }

    autoComplete(prefix: string): string[] {
        const currentNode = this._findNodeWithPrefix(this.root, prefix);
        return currentNode ? this._collectWords(currentNode) : [];
    }
}

export const bstHistory = new BinarySearchTree();