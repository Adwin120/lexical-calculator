import { type InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin, createEmptyHistoryState } from "@lexical/react/LexicalHistoryPlugin";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import {OnChangePlugin} from "@lexical/react/LexicalOnChangePlugin"
import {AutoFocusPlugin} from "@lexical/react/LexicalAutoFocusPlugin"
import { useEffect, useRef } from "react";
import { useCreate } from "@/hooks/utils";
import React from "react";
import { type LexicalEditor, type EditorState } from "lexical";

export type onEditorChangeCallback = (state: EditorState, editor: LexicalEditor) => void;

const InputDisplay: React.FC<{onStateChange: onEditorChangeCallback}> = ({onStateChange}) => {
    const history = useCreate(createEmptyHistoryState);


    return (
        <LexicalComposer initialConfig={lexicalConfig}>
            <PlainTextPlugin
                contentEditable={<ContentEditable />}
                placeholder={<div />}
                ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin externalHistoryState={history} />
            <OnChangePlugin onChange={onStateChange}/>
            <AutoFocusPlugin/>
        </LexicalComposer>
    );
};

const lexicalConfig: InitialConfigType = {
    namespace: "Calculator",
    onError: console.error,
    editable: true,
};

export default InputDisplay;
