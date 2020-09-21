import React, { FC, useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import { FaCompressAlt, FaCompressArrowsAlt, FaTrash } from "react-icons/fa";
import { PRIFIX } from "./hooks/useLocalStoreage";

interface CodeEditor {
  title: string;
  lang: string;
  theme?: string;
  onCodeChange: (v: string) => void;
  codeText: string;
}

const CodeEditor: FC<CodeEditor> = ({ title, lang, theme, onCodeChange, codeText }) => {
  const [open, setOpen] = useState<boolean>(true);
  const editorOptions = {
    mode: lang,
    theme: theme ? theme : "material",
    lineNumbers: true,
    lint: true,
    lineWrapping: true,
  };

  // onClick={() => localStorage.setItem(`${PRIFIX}${title}`, JSON.stringify(""))}

  return (
    <div className={`code__box ${open ? "" : "collapsed"}`}>
      <div className='code__header'>
        <div className='left__header'>
          <div className='reset__btn'>
            <FaTrash />
          </div>
          <h4 className='title'>{title}</h4>
        </div>
        <div className='right__header'>
          <div className='action'>
            <button
              className='collaps__btn'
              onClick={() => {
                setOpen(!open);
              }}>
              {open ? <FaCompressAlt /> : <FaCompressArrowsAlt />}
            </button>
          </div>
        </div>
      </div>
      <CodeMirror
        className='code__mirror__wrapper'
        autoCursor={true}
        value={codeText}
        options={editorOptions}
        onBeforeChange={(editor, data, value: string) => {
          onCodeChange(value);
        }}
        onChange={(editor, data, value) => {
          //onCodeChange(value);
        }}
      />
    </div>
  );
};

export default CodeEditor;
