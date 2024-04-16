import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";

export type City = {
  geoname_id: string;
  name: string;
  cou_name_en: string;
  population: number;
  timezone: string;
  dem: number;
};

export const columns: ColumnDef<City>[] = [
  {
    accessorKey: "geoname_id",
    header: ({ column }) => {
      return (
        <div className="flex items-center bg-zinc-200 justify-center ">
          <Button className="text-xl"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Geoname Id
            <ArrowUpDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="flex items-center bg-zinc-400 justify-center">
        <Button className="text-xl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          City
          <ArrowUpDown className="ml-2 h-5 w-5" />
        </Button>
      </div>
    ),
    cell: ({ cell }) => {
      const cityName = cell.row.original.name;
      const geonameId = cell.row.original.geoname_id;
      return (
        <div className="text-right">
          <Link
            to={`/city/${geonameId}/${encodeURIComponent(cityName)}`}
            className="font-medium mr-2 hover:text-sky-700 text-teal-900"
          >
            {cityName}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "cou_name_en",
    header: ({ column }) => {
      return (
        <div className="flex items-center bg-zinc-200 justify-center">
          <Button className="text-xl"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Country
            <ArrowUpDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "population",
    header: ({ column }) => {
      return (
        <div className="flex items-center bg-zinc-400 justify-center">
          <Button className="text-xl"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Population
            <ArrowUpDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "timezone",
    header: ({ column }) => {
      return (
        <div className="flex items-center bg-zinc-200 justify-center">
          <Button className="text-xl"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Timezone
            <ArrowUpDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "dem",
    header: ({ column }) => {
      return (
        <div className="flex items-center bg-zinc-400 justify-center">
          <Button className="text-xl"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Dem
            <ArrowUpDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      );
    },
  },
];
