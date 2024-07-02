type NameSortable = {
    name: string
}

export const SortByName = (t1: NameSortable, t2: NameSortable) => t1.name.localeCompare(t2.name);