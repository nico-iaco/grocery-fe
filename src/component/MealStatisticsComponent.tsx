import {MealStatistic} from "../model/mealStatistic";
import {Grid, Paper, Typography} from "@mui/material";
import {getMealTypeColor} from "../utils/colorUtils";
import {WarningAmber} from "@mui/icons-material";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";

export interface MealStatisticsProps {
    mealStatistics: MealStatistic;
    mealKcalChartLabel: string;
    kcalLabel: string;
    costLabel: string;
}

interface StatisticDataset {
    name: string;
    value: number;
}

export const MealStatisticsComponent = (props: MealStatisticsProps) => {

    const data: StatisticDataset[] = props.mealStatistics.averageWeekCaloriesPerMealType.map(value => {
        return {
            name: value.mealType,
            value: value.avgKcal
        }
    });


    return <Paper>
        <Grid container>
            <Grid item xs={12} md={6} className={"container"}>
                <Typography variant="h5" component="div">
                    <b>{props.mealKcalChartLabel}</b>
                </Typography>
                {
                    props.mealStatistics.averageWeekCaloriesPerMealType.length > 0 ?
                        <ResponsiveContainer aspect={1.5}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {
                                        data.map((entry, index) => (
                                            <Cell key={'cell-'+index} fill={getMealTypeColor(entry.name)} />
                                        ))
                                    }
                                    <Tooltip/>
                                    <Legend iconType="rect" verticalAlign={"top"} />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        :
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 64,
                        }}>
                            <WarningAmber style={{
                                    marginRight: 8
                            }}/>
                            <Typography variant="h6" color="textSecondary">
                                No data available
                            </Typography>
                        </div>
                }
            </Grid>
            <Grid item xs={12} md={6} className={"container center"}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="body1" component="div">
                            <b>{props.kcalLabel}:</b> {props.mealStatistics.averageWeekCalories.toFixed(2)} kcal
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" component="div">
                            <b>{props.costLabel}:</b> {props.mealStatistics.averageWeekFoodCost.toFixed(2)} €
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" component="div">
                            <b>Most eaten food: </b> {props.mealStatistics.mostConsumedFood.foodName !== "" ?
                                props.mealStatistics.mostConsumedFood.foodName + "  " + props.mealStatistics.mostConsumedFood.quantityUsed + "  " + props.mealStatistics.mostConsumedFood.unit
                                : "N/A"
                            }
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
}
