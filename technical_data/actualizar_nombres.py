import json
import pandas as pd

# Load scraping progress with Truper public names
with open('progreso_scraping.json', 'r', encoding='utf-8') as f:
    truper_data = json.load(f)

# Load the current WooCommerce file
df = pd.read_excel('woocommerce_final.xlsx')

print("=" * 70)
print("ACTUALIZANDO NOMBRES DE FABRICA -> NOMBRES PUBLICOS DE TRUPER")
print("=" * 70)

updated_count = 0

for idx, row in df.iterrows():
    sku = str(row['SKU']).strip()
    
    if sku in truper_data and truper_data[sku].get('found'):
        truper_name = truper_data[sku].get('truper_description', '')
        
        if truper_name and truper_name.strip():
            old_name = row['Name']
            df.at[idx, 'Name'] = truper_name
            updated_count += 1

# Save updated file
df.to_excel('woocommerce_final.xlsx', index=False, engine='openpyxl')
df.to_csv('woocommerce_final.csv', index=False, encoding='utf-8')

print(f"\nNombres actualizados: {updated_count} de {len(df)}")
print(f"Nombres sin cambio (no estan en Truper): {len(df) - updated_count}")
print(f"\nArchivos guardados:")
print(f"  - woocommerce_final.xlsx")
print(f"  - woocommerce_final.csv")

# Show some examples
print(f"\n{'=' * 70}")
print("EJEMPLOS DE NOMBRES ACTUALIZADOS:")
print(f"{'=' * 70}")
for idx, row in df.head(10).iterrows():
    sku = str(row['SKU']).strip()
    if sku in truper_data and truper_data[sku].get('found'):
        print(f"\n  SKU {sku}:")
        print(f"    Nombre: {row['Name']}")
