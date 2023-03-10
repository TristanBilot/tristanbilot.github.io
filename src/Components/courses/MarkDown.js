import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'
import RemarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import Gfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'


import 'katex/dist/katex.min.css'

import '../../Styles/projects/global.sass'

class Markdown extends Component {
    render() {
      
      return (
          <ReactMarkdown
              children={this.props.content}
              remarkPlugins={[RemarkMath, Gfm]}
              rehypePlugins={[rehypeKatex, rehypeRaw, rehypeHighlight]}
          />
      );
    }
  }
  
export default Markdown;
