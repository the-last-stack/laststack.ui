import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';
type TableSize = 'sm' | 'md';
type TableProps = HTMLAttributes<HTMLTableElement> & {
    size?: TableSize;
    /**
     * The table's own title, rendered as a `<caption>`. Prefer this to a heading
     * beside the table: a caption is announced as the table's name, so a screen
     * reader landing on a cell can say which table it belongs to.
     */
    caption?: string;
};
/**
 * A data table. Real `<table>` markup rather than a grid of divs, so rows and
 * columns are navigable and header cells are announced with the data they
 * label. For layout, use Stack or Inline instead.
 *
 * Wrapped in a scroller: a table is as wide as its content needs, and on a
 * narrow viewport the overflow should scroll rather than force the page to.
 */
export declare function Table({ className, size, caption, children, ...props }: TableProps): import("react").JSX.Element;
export declare function TableHead({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>): import("react").JSX.Element;
export declare function TableBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>): import("react").JSX.Element;
export declare function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>): import("react").JSX.Element;
/**
 * `numeric` right-aligns and switches to tabular figures, so digits line up
 * down the column and a number doesn't change width as it changes value.
 */
type TableHeaderCellProps = ThHTMLAttributes<HTMLTableCellElement> & {
    numeric?: boolean;
};
export declare function TableHeaderCell({ className, numeric, scope, ...props }: TableHeaderCellProps): import("react").JSX.Element;
type TableCellProps = TdHTMLAttributes<HTMLTableCellElement> & {
    numeric?: boolean;
};
export declare function TableCell({ className, numeric, ...props }: TableCellProps): import("react").JSX.Element;
export {};
