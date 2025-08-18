import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

interface SkeletonProps {
    height: number;
}

const Skeleton = styled('div', {
    shouldForwardProp: (prop) => prop !== 'height',
})<SkeletonProps>(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
}));

export default function DashboardContent() {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}><Skeleton height={14} /></Grid>
            <Grid item xs={12}><Skeleton height={14} /></Grid>
            <Grid item xs={4}><Skeleton height={100} /></Grid>
            <Grid item xs={8}><Skeleton height={100} /></Grid>
            <Grid item xs={12}><Skeleton height={150} /></Grid>
            <Grid item xs={12}><Skeleton height={14} /></Grid>
            <Grid item xs={3}><Skeleton height={100} /></Grid>
            <Grid item xs={3}><Skeleton height={100} /></Grid>
            <Grid item xs={3}><Skeleton height={100} /></Grid>
            <Grid item xs={3}><Skeleton height={100} /></Grid>
        </Grid>
    );
}
