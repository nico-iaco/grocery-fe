import {Skeleton, Stack} from "@mui/material";

export interface ListLoadingComponentProps {
    listItemNumber: number
}

export const ListLoadingComponent = (props: ListLoadingComponentProps) => {
    const skeletons = [];
    for (let i = 0; i < props.listItemNumber; i++) {
        skeletons.push(<Skeleton key={i} variant="rectangular" height={80}/>);
    }
    return <Stack spacing={1}>{skeletons}</Stack>;
}