import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type Column<T = any> = {
  key: keyof T | string
  label: string
  align?: "left" | "right" | "center"
  render?: (value: any, row: T, rowIndex: number) => React.ReactNode
}

type GenericTableProps<T = any> = {
  columns: Column<T>[]
  data: T[]
}

export function GenericTable<T = any>({ columns, data }: GenericTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={String(col.key)}
              className={
                col.align === "right"
                  ? "text-right"
                  : col.align === "center"
                  ? "text-center"
                  : ""
              }
            >
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.isArray(data) && data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((col) => (
              <TableCell
                key={String(col.key)}
                className={
                  col.align === "right"
                    ? "text-right"
                    : col.align === "center"
                    ? "text-center"
                    : ""
                }
              >
                {col.render
                  ? col.render((row as any)[col.key], row, rowIndex)
                  : String((row as any)[col.key] ?? "")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
