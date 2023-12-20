import { Prism, SyntaxHighlighterProps } from "react-syntax-highlighter";

export default function Syntax({ children, ...rest }: SyntaxHighlighterProps) {
  return <Prism {...rest}>{children}</Prism>;
}
