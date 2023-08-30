import { type InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin, createEmptyHistoryState } from "@lexical/react/LexicalHistoryPlugin";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import {TreeView} from "@lexical/react/LexicalTreeView"
import { useEffect, useRef } from "react";
import { useCreate } from "@/hooks/utils";
import React from "react";
import { type LexicalEditor, type EditorState } from "lexical";
import MathFunctionNode from "@/lexical/MathFunctionNode";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export type onEditorChangeCallback = (state: EditorState, editor: LexicalEditor) => void;

const InputDisplay: React.FC<{ onStateChange: onEditorChangeCallback }> = ({ onStateChange }) => {
    const history = useCreate(createEmptyHistoryState);

    const editorRef = useRef<LexicalEditor>()

    return (
        <LexicalComposer initialConfig={lexicalConfig}>
            <PlainTextPlugin
                contentEditable={<ContentEditable />}
                placeholder={<div />}
                ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin externalHistoryState={history} />
            <OnChangePlugin onChange={onStateChange} />
            <AutoFocusPlugin />
            {/* <TreeViewPlugin/> */}
            <EditorRefPlugin editorRef={editorRef}/>
        </LexicalComposer>
    );
};

const lexicalConfig: InitialConfigType = {
    namespace: "Calculator",
    onError: console.error,
    editable: true,
    nodes: [MathFunctionNode],
};

function TreeViewPlugin() {
    const [editor] = useLexicalComposerContext();
    return (
      <TreeView
        viewClassName="tree-view-output"
        timeTravelPanelClassName="debug-timetravel-panel"
        timeTravelButtonClassName="debug-timetravel-button"
        timeTravelPanelSliderClassName="debug-timetravel-panel-slider"
        timeTravelPanelButtonClassName="debug-timetravel-panel-button"
        treeTypeButtonClassName="debug-tree-type"
        editor={editor}
      />
    );
  }

export default InputDisplay;
