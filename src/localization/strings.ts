import LocalizedStrings, {LocalizedStringsMethods} from 'react-localization';

export interface IStrings extends LocalizedStringsMethods {
    homeTab: string;
    mealsTab: string;
    groceryTab: string;
    profileTab: string;
    homeTitle: string;
    mealsTitle: string;
    groceryTitle: string;
    profileTitle: string;
    addItemCartTitle: string;
    addFoodConsumptionTitle: string;
    addItemTitle: string;
    addMealTitle: string;
    addTransactionTitle: string;
    editItemCartTitle: string;
    editFoodConsumptionTitle: string;
    editItemTitle: string;
    editMealTitle: string;
    editTransactionTitle: string;
    liveGroceryShoppingTitle: string;
    loginTitle: string;
    mealFoodConsumptionTitle: string;
    registerTitle: string;
    mealStatisticsAvgKcalPerMealTypeTitle: string;
    mealStatisticsKcalPerMealTypeTitle: string;
    mealStatisticsAvgKcalPerWeekLabel: string;
    mealStatisticsSumKcalPerDayLabel: string;
    mealStatisticsAvgCostPerWeekLabel: string;
    mealStatisticsSumCostPerDayLabel: string;
    mealStatisticsMostEatenFoodLabel: string;
}


export const strings: IStrings = new LocalizedStrings({
    en: {
        homeTab: 'Home',
        mealsTab: 'Meals',
        groceryTab: 'Grocery',
        profileTab: 'Profile',
        homeTitle: 'Foody',
        mealsTitle: 'Meals of {0}',
        groceryTitle: 'Food pantry',
        profileTitle: 'Profile',
        addItemCartTitle: 'Add to cart',
        addFoodConsumptionTitle: 'Add food consumption',
        addItemTitle: 'Add food',
        addMealTitle: 'Add meal',
        addTransactionTitle: 'Add transaction',
        editItemCartTitle: 'Edit item',
        editFoodConsumptionTitle: 'Edit food consumption',
        editItemTitle: 'Edit {0}',
        editMealTitle: 'Edit meal',
        editTransactionTitle: 'Edit transaction',
        liveGroceryShoppingTitle: 'Grocery cart',
        loginTitle: 'Login',
        mealFoodConsumptionTitle: 'Food consumption',
        registerTitle: 'Register',
        mealStatisticsAvgKcalPerMealTypeTitle: 'Average kcal per meal type',
        mealStatisticsKcalPerMealTypeTitle: 'Kcal per meal type',
        mealStatisticsAvgKcalPerWeekLabel: 'Average kcal of the week:',
        mealStatisticsSumKcalPerDayLabel: 'Total kcal of the day:',
        mealStatisticsAvgCostPerWeekLabel: 'Average cost of the week:',
        mealStatisticsSumCostPerDayLabel: 'Total cost of the day:',
        mealStatisticsMostEatenFoodLabel: 'Most eaten food:',
    },
    it: {
        homeTab: 'Home',
        mealsTab: 'Pasti',
        groceryTab: 'Dispensa',
        profileTab: 'Profilo',
        homeTitle: 'Foody',
        mealsTitle: 'Pasti del {0}',
        groceryTitle: 'Dispensa',
        profileTitle: 'Profilo',
        addItemCartTitle: 'Aggiungi al carrello',
        addFoodConsumptionTitle: 'Aggiungi consumo',
        addItemTitle: 'Aggiungi cibo',
        addMealTitle: 'Aggiungi pasto',
        addTransactionTitle: 'Aggiungi transazione',
        editItemCartTitle: 'Modifica elemento',
        editFoodConsumptionTitle: 'Modifica consumo',
        editItemTitle: 'Modifica {0}',
        editMealTitle: 'Modifica pasto',
        editTransactionTitle: 'Modifica transazione',
        liveGroceryShoppingTitle: 'Carrello spesa',
        loginTitle: 'Login',
        mealFoodConsumptionTitle: 'Cibi consumati',
        registerTitle: 'Registrati',
        mealStatisticsAvgKcalPerMealTypeTitle: 'Media kcal per tipo pasto',
        mealStatisticsKcalPerMealTypeTitle: 'Kcal per tipo pasto',
        mealStatisticsAvgKcalPerWeekLabel: 'Media kcal della settimana:',
        mealStatisticsSumKcalPerDayLabel: 'Totale kcal del giorno:',
        mealStatisticsAvgCostPerWeekLabel: 'Spesa media della settimana:',
        mealStatisticsSumCostPerDayLabel: 'Totale speso nel giorno:',
        mealStatisticsMostEatenFoodLabel: 'Cibo più mangiato:',
    }
});