import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

export type City = {
    geoname_id: string;
    name: string;
    cou_name_en: string;
    population: number;
    timezone: string;
    dem: number;
}

export const columns: ColumnDef<City>[] = [
  {
    accessorKey: "geoname_id",
    header: "Geoname Id",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            City
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "cou_name_en",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Country
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
},
  {
    accessorKey: "population",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Population
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
},
  {
    accessorKey: "timezone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Timezone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },{
    accessorKey: "dem",
    header: ({ column }) => {
        return (
          <Button
          
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Dem
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      }, 
},
  
]
