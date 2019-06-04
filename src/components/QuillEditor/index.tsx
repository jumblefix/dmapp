import { DeltaStatic } from 'quill';
import React, { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { Button } from '../ui/Button';

interface QuillEditorState {
  content: string;
}

const EDITOR_CONTENT = 'editorContent';

const getStoredContent = () => {
  const content = localStorage.getItem(EDITOR_CONTENT);
  if (content) {
    try {
      return JSON.parse(content);
    } catch (error) {
      console.error(error);
      return '';
    }
  }
  return '';
};

export default class QuillEditor extends Component {
  state: QuillEditorState = {
    content: '',
  };

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];

  private editorRef = React.createRef<ReactQuill>();

  onBlur = () => console.log('onBlur');

  onClick = () => {
    const { current } = this.editorRef;
    if (current) {
      const { getEditor } = current;
      const content = getEditor().getContents();
      const store = JSON.stringify(content);
      localStorage.setItem(EDITOR_CONTENT, store);
    }
  };

  componentDidMount() {
    const { current } = this.editorRef;
    if (current) {
      const { getEditor } = current;
      getEditor().setContents(getStoredContent());
      getEditor().focus();
    }
  }

  onChange = (content: string) => this.setState({ content });

  clearData = () => {
    localStorage.removeItem(EDITOR_CONTENT);
    const { current } = this.editorRef;
    if (current) {
      const { getEditor } = current;
      const emptyDelta: unknown = [{ insert: '\n' }];
      getEditor().setContents(emptyDelta as DeltaStatic);
      getEditor().focus();
    }
  };

  render() {
    return (
      <div className="text-editor">
        <ReactQuill
          theme="snow"
          onChange={this.onChange}
          modules={this.modules}
          formats={this.formats}
          onBlur={this.onBlur}
          ref={this.editorRef}
        />
        <Button onClick={this.onClick}>Save Data</Button>

        <Button onClick={this.clearData}>Clear Data</Button>
      </div>
    );
  }
}
