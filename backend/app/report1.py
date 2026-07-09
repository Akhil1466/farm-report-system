import pandas as pd

def generate_report1(df):
    """
    First Report
    Division Wise Summary
    """

    report = (
        df.groupby("Division", dropna=False)
        .agg(
            Total_Farms=("Farm Name", "count"),
            Total_Housed_Birds=("Housed Birds", "sum"),
            Total_Mortality=("Mortality", "sum"),
            Total_Sales=("Sales", "sum"),
            Total_Closing_Birds=("Closing Birds", "sum"),
        )
        .reset_index()
    )

    return report