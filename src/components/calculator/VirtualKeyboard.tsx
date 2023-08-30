import { type PropsWithChildren, createContext, useContext } from "react";
import { useCallback } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $applyNodeReplacement, $createTextNode, $insertNodes, CONTROLLED_TEXT_INSERTION_COMMAND, type LexicalEditor } from "lexical";
import { $createMathFunctionNode } from "@/lexical/MathFunctionNode";

const KeyboardContext = createContext<{
    editor: LexicalEditor | null;
}>({ editor: null });

const VirtualKeyboard: React.FC<{ editor: LexicalEditor }> = ({ editor }) => {
    return (
        <div className="grid grid-cols-4 gap-0.5">
            <KeyboardContext.Provider value={{ editor }}>
                <button className="bg-red-500">1</button>
                <button className="bg-red-500">2</button>
                <button className="bg-red-500">3</button>
                <button className="bg-red-500">4</button>
                <button className="bg-red-500">5</button>
                <button className="bg-red-500">6</button>
                <button className="bg-red-500">7</button>
                <button className="bg-red-500">8</button>
                <DigitButton>test</DigitButton>
                <FunctionButton>function test</FunctionButton>
            </KeyboardContext.Provider>
        </div>
    );
};

const DigitButton: React.FC<PropsWithChildren> = ({ children }) => {
    const { editor } = useContext(KeyboardContext);
    const onClick = useCallback(() => {
        editor!.dispatchCommand(CONTROLLED_TEXT_INSERTION_COMMAND, "test");
    }, [editor]);

    return (
        <button className="bg-red-500" onClick={onClick}>
            {children}
        </button>
    );
};

const FunctionButton: React.FC<PropsWithChildren> = ({children}) => {
    const { editor } = useContext(KeyboardContext);
    const onClick = useCallback(() => {
        editor!.update(() => {
            $insertNodes([$createMathFunctionNode("log")])
        });
    }, [editor]);

    return (
        <button className="bg-green-700" onClick={onClick}>{children}</button>
    )
}

export default VirtualKeyboard;
