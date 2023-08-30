"use client";

import { useCallback, useRef, useState } from "react";
import InputDisplay, { type onEditorChangeCallback } from "./InputDisplay";
import VirtualKeyboard from "./VirtualKeyboard";
import type { EditorState, LexicalEditor } from "lexical";

interface InputState {
    editorState: EditorState;
    editor: LexicalEditor;
}


const Calculator: React.FC = () => {
    const [inputState, setInputState] = useState<InputState>();
    const onInputStateChange = useCallback<onEditorChangeCallback>(
        (state, editor) => setInputState({ editorState: state, editor }),
        []
    );
    
    return (
        <>
            <InputDisplay onStateChange={onInputStateChange} />
            <VirtualKeyboard editor={inputState?.editor!} />
        </>
    );
};

export default Calculator;
