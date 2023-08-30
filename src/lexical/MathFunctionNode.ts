import {
    ElementNode,
    type EditorConfig,
    type LexicalEditor,
    type LexicalNode,
    type NodeKey,
    type SerializedElementNode,
    type SerializedLexicalNode,
    TextNode,
    type SerializedTextNode,
    type TextModeType,
} from "lexical";

interface JSONRepresentation extends SerializedTextNode {}

export default class MathFunctionNode extends TextNode {
    static getType(): string {
        return "math-function";
    }

    static clone(node: MathFunctionNode): MathFunctionNode {
        return new MathFunctionNode(node.__text, node.__key);
    }

    constructor(name: string, key?: NodeKey) {
        super(name, key);
    }

    createDOM(_config: EditorConfig): HTMLElement {
        const dom = super.createDOM(_config);
        dom.style.color = "blue"
        return dom;
    }

    exportJSON(): JSONRepresentation {
        return {
            ...super.exportJSON(),
            type: MathFunctionNode.getType(),
            version: 1,
        };
    }

    updateDOM(_prevNode: MathFunctionNode, _dom: HTMLElement, _config: EditorConfig): boolean {
        return super.updateDOM(_prevNode, _dom, _config);
    }

    static importJSON(jsonNode: JSONRepresentation): MathFunctionNode {
        return new MathFunctionNode(jsonNode.text);
    }
}

export function $createMathFunctionNode(name: string) {
    return new MathFunctionNode(name).setMode("token");
}
