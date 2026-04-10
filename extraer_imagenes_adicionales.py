import json
import pandas as pd
import requests
import time
import os

# ============================================================
# CONFIG
# ============================================================
PROGRESS_FILE = 'progreso_scraping.json'
IMAGES_PROGRESS = 'progreso_imagenes.json'
OUTPUT_FILE = 'woocommerce_final.xlsx'
BASE_IMAGE_URL = 'https://www.truper.com/media/import/imagenes/'

# All known suffixes for additional images on Truper
IMAGE_SUFFIXES = [
    '',        # Main product image (no suffix)
    '+CR1',    # Close-up / recortada
    '+D1',     # Detail 1
    '+D2',     # Detail 2
    '+D3',     # Detail 3
    '+D4',     # Detail 4
    '+D5',     # Detail 5
    '+D6',     # Detail 6
    '+EI1',    # Empaque individual 1
    '+EI2',    # Empaque individual 2
    '+EIND1',  # Empaque inner/display 1
    '+EIND2',  # Empaque inner/display 2
    '+EM1',    # Empaque master 1
    '+EM2',    # Empaque master 2
    '+E1',     # Empaque 1
    '+E2',     # Empaque 2
    '+FC1',    # Foto en contexto / uso 1
    '+FC2',    # Foto en contexto / uso 2
    '+FC3',    # Foto en contexto / uso 3
]

# ============================================================
# LOAD DATA
# ============================================================
print("=" * 70)
print("EXTRACTOR DE IMAGENES ADICIONALES DE TRUPER")
print("=" * 70)

# Load scraping progress (has the 'clave' for each SKU)
with open(PROGRESS_FILE, 'r', encoding='utf-8') as f:
    scraping_data = json.load(f)

# Load the WooCommerce file
df = pd.read_excel(OUTPUT_FILE)

# Get all found products with their claves
found_products = {}
for sku, data in scraping_data.items():
    if data.get('found') and data.get('clave'):
        found_products[sku] = data['clave']

print(f"Productos con clave Truper: {len(found_products)}")

# ============================================================
# LOAD PREVIOUS IMAGE PROGRESS
# ============================================================
image_progress = {}
if os.path.exists(IMAGES_PROGRESS):
    with open(IMAGES_PROGRESS, 'r', encoding='utf-8') as f:
        image_progress = json.load(f)
    print(f"Progreso anterior: {len(image_progress)} SKUs ya verificados")

# ============================================================
# CHECK ALL IMAGE VARIANTS
# ============================================================
session = requests.Session()
session.headers.update({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
})

total = len(found_products)
processed = 0

print(f"\nVerificando imagenes adicionales para {total} productos...")
print("-" * 70)

for sku, clave in found_products.items():
    processed += 1
    
    # Skip if already processed
    if sku in image_progress:
        if processed % 100 == 0:
            print(f"  [{processed}/{total}] (cached) SKU {sku}")
        continue
    
    # Test each suffix
    valid_urls = []
    for suffix in IMAGE_SUFFIXES:
        url = f"{BASE_IMAGE_URL}{clave}{suffix}.jpg"
        try:
            resp = session.head(url, timeout=5, allow_redirects=True)
            if resp.status_code == 200:
                # Verify it's actually an image (not an error page)
                content_type = resp.headers.get('Content-Type', '')
                if 'image' in content_type or resp.status_code == 200:
                    valid_urls.append(url)
        except requests.RequestException:
            pass
    
    image_progress[sku] = valid_urls
    
    # Print progress
    if processed % 25 == 0 or processed <= 3:
        print(f"  [{processed}/{total}] SKU {sku} (Clave: {clave}) -> {len(valid_urls)} imagenes")
    
    # Save every 50
    if processed % 50 == 0:
        with open(IMAGES_PROGRESS, 'w', encoding='utf-8') as f:
            json.dump(image_progress, f, ensure_ascii=False, indent=2)
        print(f"  -> Progreso guardado ({processed}/{total})")
    
    # Small delay to be respectful
    time.sleep(0.15)

# Save final progress
with open(IMAGES_PROGRESS, 'w', encoding='utf-8') as f:
    json.dump(image_progress, f, ensure_ascii=False, indent=2)

# ============================================================
# UPDATE WOOCOMMERCE FILE
# ============================================================
print(f"\n{'=' * 70}")
print("Actualizando archivo WooCommerce con todas las imagenes...")

stats = {'1': 0, '2': 0, '3': 0, '4': 0, '5+': 0}

for idx, row in df.iterrows():
    sku = str(row['SKU']).strip()
    if sku in image_progress and image_progress[sku]:
        urls = image_progress[sku]
        df.at[idx, 'Images'] = ', '.join(urls)
        
        count = len(urls)
        if count == 1: stats['1'] += 1
        elif count == 2: stats['2'] += 1
        elif count == 3: stats['3'] += 1
        elif count == 4: stats['4'] += 1
        else: stats['5+'] += 1

# Save
df.to_excel(OUTPUT_FILE, index=False, engine='openpyxl')
df.to_csv('woocommerce_final.csv', index=False, encoding='utf-8')

# Report
print(f"\n{'=' * 70}")
print("RESULTADO FINAL:")
print(f"{'=' * 70}")
total_with_images = sum(1 for sku in image_progress if image_progress[sku])
total_images = sum(len(urls) for urls in image_progress.values())
print(f"  Productos con imagenes: {total_with_images}")
print(f"  Total imagenes encontradas: {total_images}")
print(f"  Promedio por producto: {total_images/max(total_with_images,1):.1f}")
print(f"\n  Distribucion:")
for k, v in stats.items():
    print(f"    {k} imagen(es): {v} productos")
print(f"\nArchivos actualizados!")
