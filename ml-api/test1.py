import pandas as pd
df = pd.read_csv("new_pcos.csv")
print(df['PCOS'].value_counts())
