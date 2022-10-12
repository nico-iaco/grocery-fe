import {MealStatistic} from "../model/mealStatistic";
import {Grid, Paper, Typography} from "@mui/material";
import {Doughnut} from "react-chartjs-2";
import React from "react";
import {ArcElement, Chart as ChartJS, ChartData, Legend, Tooltip} from "chart.js";
import {getMealTypeColor} from "../utils/colorUtils";

export interface MealStatisticsProps {
    mealStatistics: MealStatistic;
    mealKcalChartLabel: string;
    kcalLabel: string;
    costLabel: string;
}

export const MealStatisticsComponent = (props: MealStatisticsProps) => {

    ChartJS.register(ArcElement, Tooltip, Legend);

    const mealDataset: ChartData<"doughnut", number[], string> = {
        labels: props.mealStatistics.averageWeekCaloriesPerMealType.map(value => value.mealType),
        datasets: [
            {
                label: 'Average Calories',
                data: props.mealStatistics.averageWeekCaloriesPerMealType.map(value => value.avgKcal),
                backgroundColor: props.mealStatistics.averageWeekCaloriesPerMealType.map((value) => getMealTypeColor(value.mealType)),
                borderWidth: 1,
            }
        ],
    }

    return <Paper>
        <Grid container>
            <Grid item xs={12} md={6} className={"container"}>
                <Typography variant="h5" component="div">
                    <b>{props.mealKcalChartLabel}</b>
                </Typography>
                <Doughnut data={mealDataset}/>
            </Grid>
            <Grid item xs={12} md={6} className={"container center"}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="body1" component="div">
                            <b>{props.kcalLabel}:</b> {props.mealStatistics.averageWeekCalories} kcal
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" component="div">
                            <b>{props.costLabel}:</b> {props.mealStatistics.averageWeekFoodCost} €
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
}
