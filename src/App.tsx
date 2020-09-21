import React, { FC, useState, useRef, useEffect } from "react";
import "./App.scss";
import { Resizable } from "re-resizable";
import CodeEditor from "./components/CodeEditor";
import useLocalStoreage from "./components/hooks/useLocalStoreage";

const App: FC = () => {
  const [htmlCode, setHtmlCode] = useLocalStoreage("Html", "");
  const [jsCode, setJsCode] = useLocalStoreage("JavaScript", "");
  const [cssCode, setCssCode] = useLocalStoreage("Css", "");
  const [srcDoc, setScrDoc] = useState<string>(`
  `);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setScrDoc(`
      <html>
      <body>${htmlCode}</body>
      <style>${cssCode}</style>
      <script>${jsCode}</script>
    </html>
        `);
    }, 300);

    return () => clearTimeout(timeout);
  }, [jsCode, htmlCode, cssCode]);

  const onHtmlChange = (v: string) => {
    setHtmlCode(v);
  };
  const onCssChange = (v: string) => {
    setCssCode(v);
  };
  const onJsChange = (v: string) => {
    setJsCode(v);
  };
  return (
    <div className='editor__wrapper'>
      <div className='editor__container' style={{ height: "55%" }}>
        <CodeEditor title='Html' lang='xml' codeText={htmlCode} onCodeChange={onHtmlChange} />
        <CodeEditor title='Css' lang='css' codeText={cssCode} onCodeChange={onCssChange} />
        <CodeEditor title='JavaScript' lang='javascript' codeText={jsCode} onCodeChange={onJsChange} />
      </div>
      <div className='view__output' style={{ height: "45%" }}>
        <iframe
          title='TextEditor'
          width='100%'
          height='100%'
          sandbox='allow-scripts'
          srcDoc={srcDoc}
          frameBorder='0'
          className='view__page'></iframe>
      </div>
    </div>
  );
};

export default App;
