import React, { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';

interface QuillEditorState {
  content: string;
}

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
      ['link', 'image'],
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
  ];

  private editorRef = React.createRef<ReactQuill>();

  onBlur = () => console.log('onBlur');

  onClick = () => {
    const { current } = this.editorRef;
    if (current) {
      const { getEditor } = current;
      const content = getEditor().getContents();
      const text = getEditor().getText();
      const length = getEditor().getLength();
      console.log(content, text, length);
    }
  };

  onChange = (content: string) => this.setState({ content });

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
        <button onClick={this.onClick}>Get Data</button>
      </div>
    );
  }
}
