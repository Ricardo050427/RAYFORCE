import json
import pandas as pd

# Load scraping progress
with open('progreso_scraping.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Load original names
df = pd.read_excel('PRODUCTOS ACTIVOS.xlsx', header=None)
df = df.iloc[1:]
df.columns = ['Index', 'SKU', 'Nombre']
df['SKU'] = df['SKU'].astype(str).str.strip()

# Compare names
print("=" * 100)
print("COMPARACION: Nombre de fabrica vs Nombre publico de Truper")
print("=" * 100)

count = 0
for _, row in df.iterrows():
    sku = row['SKU']
    nombre_fabrica = row['Nombre']
    if sku in data and data[sku].get('found'):
        truper_desc = data[sku].get('truper_description', '')
        if truper_desc and truper_desc != nombre_fabrica:
            count += 1
            if count <= 15:
                print(f"\nSKU: {sku}")
                print(f"  Fabrica: {nombre_fabrica}")
                print(f"  Truper:  {truper_desc}")

print(f"\n\nTotal con nombre publico de Truper diferente: {count}")
print(f"Total encontrados en Truper: {sum(1 for v in data.values() if v.get('found'))}")
