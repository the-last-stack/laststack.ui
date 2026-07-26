import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'

type TableSize = 'sm' | 'md'

type TableProps = HTMLAttributes<HTMLTableElement> & {
  size?: TableSize
  /**
   * The table's own title, rendered as a `<caption>`. Prefer this to a heading
   * beside the table: a caption is announced as the table's name, so a screen
   * reader landing on a cell can say which table it belongs to.
   */
  caption?: string
}

/**
 * A data table. Real `<table>` markup rather than a grid of divs, so rows and
 * columns are navigable and header cells are announced with the data they
 * label. For layout, use Stack or Inline instead.
 *
 * Wrapped in a scroller: a table is as wide as its content needs, and on a
 * narrow viewport the overflow should scroll rather than force the page to.
 */
export function Table({ className = '', size = 'md', caption, children, ...props }: TableProps) {
  return (
    <div className="ui-table__scroll">
      <table className={`ui-table ui-table--${size} ${className}`.trim()} {...props}>
        {caption ? <caption className="ui-table__caption">{caption}</caption> : null}
        {children}
      </table>
    </div>
  )
}

export function TableHead({ className = '', ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={`ui-table__head ${className}`.trim()} {...props} />
}

export function TableBody({ className = '', ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={`ui-table__body ${className}`.trim()} {...props} />
}

export function TableRow({ className = '', ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={`ui-table__row ${className}`.trim()} {...props} />
}

/**
 * `numeric` right-aligns and switches to tabular figures, so digits line up
 * down the column and a number doesn't change width as it changes value.
 */
type TableHeaderCellProps = ThHTMLAttributes<HTMLTableCellElement> & {
  numeric?: boolean
}

export function TableHeaderCell({
  className = '',
  numeric = false,
  scope = 'col',
  ...props
}: TableHeaderCellProps) {
  return (
    <th
      className={`ui-table__header${numeric ? ' ui-table__header--numeric' : ''} ${className}`.trim()}
      scope={scope}
      {...props}
    />
  )
}

type TableCellProps = TdHTMLAttributes<HTMLTableCellElement> & {
  numeric?: boolean
}

export function TableCell({ className = '', numeric = false, ...props }: TableCellProps) {
  return (
    <td
      className={`ui-table__cell${numeric ? ' ui-table__cell--numeric' : ''} ${className}`.trim()}
      {...props}
    />
  )
}
