import React from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface LaTeXRendererProps {
  latex: string;
  className?: string;
}

const LaTeXRenderer: React.FC<LaTeXRendererProps> = ({ latex, className }) => {
  const html = katex.renderToString(latex, {
    throwOnError: false,
  });

  return (
    <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default LaTeXRenderer;
