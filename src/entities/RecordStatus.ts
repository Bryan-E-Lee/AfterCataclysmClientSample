import { SelectableOption } from "../components/inputs/selects/SelectableOption";

export enum RecordStatus {
    Published = 0,
    Unpublished = 1,
    Deleted = 2
}

export const RecordStatusOptions: SelectableOption<RecordStatus>[] = [
    {
        name: 'Published',
        value: RecordStatus.Published
    },
    {
        name: 'Unpublished',
        value: RecordStatus.Unpublished,
    },
    {
        name: 'Deleted',
        value: RecordStatus.Deleted
    }
]

export const RecordStatusNames = {
    [RecordStatus.Published]: "Published",
    [RecordStatus.Unpublished]: "Unpublished",
    [RecordStatus.Deleted]: "Deleted",
}