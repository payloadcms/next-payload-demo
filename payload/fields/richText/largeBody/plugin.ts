const withLargeBody = (incomingEditor: any) => {
  const editor = incomingEditor;
  const { shouldBreakOutOnEnter } = editor;

  editor.shouldBreakOutOnEnter = (element: any) => (element.type === 'large-body' ? true : shouldBreakOutOnEnter(element));

  return editor;
};

export default withLargeBody;
