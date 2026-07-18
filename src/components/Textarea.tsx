import type { TextareaHTMLAttributes } from 'react'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean
}

export function Textarea({ className = '', invalid = false, ...props }: TextareaProps) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={`ui-textarea${invalid ? ' ui-textarea--invalid' : ''} ${className}`.trim()}
      {...props}
    />
  )
}
