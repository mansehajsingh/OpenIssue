import React from "react";
import ReactMarkdown from 'react-markdown';
import remarkBreaks from "remark-breaks";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from "./styles.module.scss";

const EditorPreview = ({ value }) => {
    return (
        <div className={styles.container}>
            <ReactMarkdown 
                children={value}
                remarkPlugins={[remarkBreaks]}
                components={{
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, '')}
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    }
                  }}
            />
        </div>
    );
}

export default EditorPreview;