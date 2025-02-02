import { useSandpack } from "@codesandbox/sandpack-react";
 
const SimpleCodeViewer = () => {
  const { sandpack } = useSandpack();
  const { files, activeFile } = sandpack;
 
  const code = files[activeFile].code;
  return (<pre>{code}</pre>);
};

export default SimpleCodeViewer;