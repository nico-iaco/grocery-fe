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
    previousButtonLabel: string;
    nextButtonLabel: string;
    skipButtonLabel: string;
    doneButtonLabel: string;
    featureNotAvailableError: string;
    foodConsumptionNameLabel: string;
    foodConsumptionQuantityLabel: string;
    foodConsumptionUnitLabel: string;
    foodConsumptionQuantityGramsLabel: string;
    foodConsumptionKcalLabel: string;
    foodConsumptionCostLabel: string;
    itemNameLabel: string;
    itemBarcodeLabel: string;
    itemVendorLabel: string;
    itemStatisticsFoodInExpirationTitle: string;
    itemStatisticsFoodAlmostFinishedTitle: string;
    languageSelectionDialogTitle: string;
    languageSelectionItalianLabel: string;
    languageSelectionEnglishLabel: string;
    mealNameLabel: string;
    mealDescriptionLabel: string;
    mealTypeLabel: string;
    mealDateLabel: string;
    melaTypeBreakfastLabel: string;
    mealTypeLunchLabel: string;
    mealTypeDinnerLabel: string;
    mealTypeOtherLabel: string;
    noDataAvailableLabel: string;
    transactionSellerLabel: string;
    transactionQuantityLabel: string;
    transactionUnitLabel: string;
    transactionQuantityGramsLabel: string;
    transactionAvailableQuantityLabel: string;
    transactionPriceLabel: string;
    transactionExpirationDateLabel: string;
    transactionPurchaseDateLabel: string;
    transactionRowSubtitle: string;
    addFoodConsumptionSelectFoodStepTitle: string;
    addFoodConsumptionSelectTransactionStepTitle: string;
    addFoodConsumptionCompleteStepTitle: string;
    addButtonLabel: string;
    addToCartButtonLabel: string;
    editButtonLabel: string;
    deleteButtonLabel: string;
    fabLiveGroceryShoppingLabel: string;
    fabAddItemLabel: string;
    fabAddMealLabel: string;
    searchLabel: string;
    shoppingCartTotalLabel: string;
    shoppingCartApplyButtonLabel: string;
    shoppingCartDiscardButtonLabel: string;
    emailLabel: string;
    passwordLabel: string;
    rememberMeLabel: string;
    loginButtonLabel: string;
    registerButtonLabel: string;
    logoutButtonLabel: string;
    noAuthMainTitle: string;
    profileGreetingsLabel: string;
    profileEmailLabel: string;
    profileLanguageLabel: string;
    profileReportBugPrimaryLabel: string;
    profileReportBugSecondaryLabel: string;
    profileApplicationVersionLabel: string;
    registrationNameLabel: string;
    registrationEmailLabel: string;
    registrationPasswordLabel: string;
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
        previousButtonLabel: 'Previous',
        nextButtonLabel: 'Next',
        skipButtonLabel: 'Skip',
        doneButtonLabel: 'Add',
        featureNotAvailableError: 'Feature not available',
        foodConsumptionNameLabel: 'Food name',
        foodConsumptionQuantityLabel: 'Quantity',
        foodConsumptionUnitLabel: 'Unit',
        foodConsumptionQuantityGramsLabel: 'Quantity ing grams',
        foodConsumptionKcalLabel: 'Kcal',
        foodConsumptionCostLabel: 'Cost',
        itemNameLabel: 'Name',
        itemBarcodeLabel: 'Barcode',
        itemVendorLabel: 'Vendor',
        itemStatisticsFoodInExpirationTitle: 'Foods in expiration',
        itemStatisticsFoodAlmostFinishedTitle: 'Foods almost finished',
        languageSelectionDialogTitle: 'Select language',
        languageSelectionItalianLabel: 'Italian',
        languageSelectionEnglishLabel: 'English',
        mealNameLabel: 'Name',
        mealDescriptionLabel: 'Description',
        mealTypeLabel: 'Meal type',
        mealDateLabel: 'Meal date',
        melaTypeBreakfastLabel: 'Breakfast',
        mealTypeLunchLabel: 'Lunch',
        mealTypeDinnerLabel: 'Dinner',
        mealTypeOtherLabel: 'Other',
        noDataAvailableLabel: 'No data available',
        transactionSellerLabel: 'Seller',
        transactionQuantityLabel: 'Quantity',
        transactionUnitLabel: 'Unit',
        transactionQuantityGramsLabel: 'Quantity in grams',
        transactionAvailableQuantityLabel: 'Available quantity',
        transactionPriceLabel: 'Price',
        transactionExpirationDateLabel: 'Expiration date',
        transactionPurchaseDateLabel: 'Purchase date',
        transactionRowSubtitle: 'Expiration date: {0} {1}/{2} {3}',
        addFoodConsumptionSelectFoodStepTitle: 'Select food',
        addFoodConsumptionSelectTransactionStepTitle: 'Select transaction',
        addFoodConsumptionCompleteStepTitle: 'Complete',
        addButtonLabel: 'Add',
        addToCartButtonLabel: 'Add to cart',
        editButtonLabel: 'Edit',
        deleteButtonLabel: 'Delete',
        fabLiveGroceryShoppingLabel: 'Live grocery shopping',
        fabAddItemLabel: 'Add food',
        fabAddMealLabel: 'Add meal',
        searchLabel: 'Search',
        shoppingCartTotalLabel: 'Total:',
        shoppingCartApplyButtonLabel: 'Apply',
        shoppingCartDiscardButtonLabel: 'Discard',
        emailLabel: 'Email',
        passwordLabel: 'Password',
        rememberMeLabel: 'Remember me',
        loginButtonLabel: 'Login',
        registerButtonLabel: 'Register',
        logoutButtonLabel: 'Logout',
        noAuthMainTitle: 'You are not logged in',
        profileGreetingsLabel: 'Hi {0} 👋',
        profileEmailLabel: 'Email',
        profileLanguageLabel: 'Language',
        profileReportBugPrimaryLabel: 'Report a bug',
        profileReportBugSecondaryLabel: 'Open a github issue',
        profileApplicationVersionLabel: 'Application version',
        registrationNameLabel: 'Name',
        registrationEmailLabel: 'Email',
        registrationPasswordLabel: 'Password',
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
        previousButtonLabel: 'Indietro',
        nextButtonLabel: 'Avanti',
        skipButtonLabel: 'Salta',
        doneButtonLabel: 'Aggiungi',
        featureNotAvailableError: 'Funzionalità non disponibile',
        foodConsumptionNameLabel: 'Nome cibo',
        foodConsumptionQuantityLabel: 'Quantità',
        foodConsumptionUnitLabel: 'Unità',
        foodConsumptionQuantityGramsLabel: 'Quantità in grammi',
        foodConsumptionKcalLabel: 'Kcal',
        foodConsumptionCostLabel: 'Costo',
        itemNameLabel: 'Nome',
        itemBarcodeLabel: 'Barcode',
        itemVendorLabel: 'Produttore',
        itemStatisticsFoodInExpirationTitle: 'Cibi in scadenza',
        itemStatisticsFoodAlmostFinishedTitle: 'Cibi quasi finiti',
        languageSelectionDialogTitle: 'Seleziona lingua',
        languageSelectionItalianLabel: 'Italiano',
        languageSelectionEnglishLabel: 'Inglese',
        mealNameLabel: 'Nome',
        mealDescriptionLabel: 'Descrizione',
        mealTypeLabel: 'Tipo pasto',
        mealDateLabel: 'Data pasto',
        melaTypeBreakfastLabel: 'Colazione',
        mealTypeLunchLabel: 'Pranzo',
        mealTypeDinnerLabel: 'Cena',
        mealTypeOtherLabel: 'Altro',
        noDataAvailableLabel: 'Nessun dato disponibile',
        transactionSellerLabel: 'Venditore',
        transactionQuantityLabel: 'Quantità',
        transactionUnitLabel: 'Unità',
        transactionQuantityGramsLabel: 'Quantità in grammi',
        transactionAvailableQuantityLabel: 'Quantità disponibile',
        transactionPriceLabel: 'Prezzo',
        transactionExpirationDateLabel: 'Data di scadenza',
        transactionPurchaseDateLabel: 'Data di acquisto',
        transactionRowSubtitle: 'Data di scadenza: {0} {1}/{2} {3}',
        addFoodConsumptionSelectFoodStepTitle: 'Seleziona cibo',
        addFoodConsumptionSelectTransactionStepTitle: 'Seleziona transazione',
        addFoodConsumptionCompleteStepTitle: 'Completa',
        addButtonLabel: 'Aggiungi',
        addToCartButtonLabel: 'Aggiungi al carrello',
        editButtonLabel: 'Modifica',
        deleteButtonLabel: 'Elimina',
        fabLiveGroceryShoppingLabel: 'Carrello spesa',
        fabAddItemLabel: 'Aggiungi cibo',
        fabAddMealLabel: 'Aggiungi pasto',
        searchLabel: 'Cerca',
        shoppingCartTotalLabel: 'Totale:',
        shoppingCartApplyButtonLabel: 'Applica',
        shoppingCartDiscardButtonLabel: 'Annulla',
        emailLabel: 'Email',
        passwordLabel: 'Password',
        rememberMeLabel: 'Ricordami',
        loginButtonLabel: 'Login',
        registerButtonLabel: 'Registrati',
        logoutButtonLabel: 'Logout',
        noAuthMainTitle: 'Non sei loggato',
        profileGreetingsLabel: 'Ciao {0} 👋',
        profileEmailLabel: 'Email',
        profileLanguageLabel: 'Lingua',
        profileReportBugPrimaryLabel: 'Segnala un bug',
        profileReportBugSecondaryLabel: 'Apri un issue su github',
        profileApplicationVersionLabel: 'Versione applicazione',
        registrationNameLabel: 'Nome',
        registrationEmailLabel: 'Email',
        registrationPasswordLabel: 'Password',
    }
});