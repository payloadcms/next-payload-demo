const withLabel = (incomingEditor: any) => {
  const editor = incomingEditor;
  const { shouldBreakOutOnEnter } = editor;

  editor.shouldBreakOutOnEnter = (element: any) => (element.type === 'label' ? true : shouldBreakOutOnEnter(element));

  return editor;
};

export default withLabel;
