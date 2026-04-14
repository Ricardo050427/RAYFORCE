import pandas as pd
import requests
from bs4 import BeautifulSoup
import time
import re
import os
import json

# ============================================================
# CONFIG
# ============================================================
INPUT_FILE = 'PRODUCTOS ACTIVOS.xlsx'
OUTPUT_FILE = 'woocommerce_final.xlsx'
PROGRESS_FILE = 'progreso_scraping.json'
BASE_SEARCH_URL = 'https://www.truper.com/BancoContenidoDigital/index.php?r=site/search&Productos[clave]='
BASE_IMAGE_URL = 'https://www.truper.com/media/import/imagenes/'

# How many seconds to wait between requests (be respectful to the server)
DELAY_BETWEEN_REQUESTS = 0.5

# ============================================================
# LOAD INPUT DATA
# ============================================================
print("=" * 60)
print("EXTRACTOR DE DATOS DE TRUPER PARA WOOCOMMERCE")
print("=" * 60)

# Read the Excel - header is in row 1 (0-indexed), data starts at row 2
df_input = pd.read_excel(INPUT_FILE, header=None)
# Row 0 has column headers: "Producto" (SKU) and "Nombre" (Name)
# Skip the first row which is the header
df_input = df_input.iloc[1:]  # skip header row
df_input.columns = ['Index', 'SKU', 'Nombre']
df_input['SKU'] = df_input['SKU'].astype(str).str.strip()
df_input['Nombre'] = df_input['Nombre'].astype(str).str.strip()

total_products = len(df_input)
print(f"\nTotal productos a procesar: {total_products}")

# ============================================================
# LOAD PREVIOUS PROGRESS (if any)
# ============================================================
progress = {}
if os.path.exists(PROGRESS_FILE):
    with open(PROGRESS_FILE, 'r', encoding='utf-8') as f:
        progress = json.load(f)
    print(f"Progreso anterior encontrado: {len(progress)} SKUs ya procesados")

# ============================================================
# SCRAPING FUNCTION
# ============================================================
session = requests.Session()
session.headers.update({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
})


def extract_product_data(sku):
    """Search for a SKU on Truper's catalog and extract description + image URLs."""
    url = BASE_SEARCH_URL + sku
    
    try:
        response = session.get(url, timeout=15)
        response.raise_for_status()
    except requests.RequestException as e:
        return {'found': False, 'error': str(e)}
    
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Check if there are results
    no_results = soup.find(string=re.compile(r'No se encontr', re.IGNORECASE))
    if no_results:
        return {'found': False, 'error': 'No encontrado en Truper'}
    
    # Find all product cards/items
    # Each product appears as: Código:{code} | Clave:{key} with description and images
    result = {
        'found': False,
        'description': '',
        'clave': '',
        'image_urls': [],
        'truper_description': ''
    }
    
    # Look for the exact SKU match
    # The page shows results with "Código:XXXXX" text
    codigo_elements = soup.find_all(string=re.compile(rf'C.digo:\s*{re.escape(sku)}', re.IGNORECASE))
    
    if not codigo_elements:
        # Try finding by data attributes or other patterns
        # Sometimes the code is in a specific element
        all_text = soup.get_text()
        if sku not in all_text:
            return {'found': False, 'error': 'SKU no encontrado en resultados'}
    
    # Extract image URLs from the page
    # Images are typically in <img> tags with src pointing to truper.com/media/import/imagenes/
    img_tags = soup.find_all('img')
    image_urls = []
    
    for img in img_tags:
        src = img.get('src', '')
        if '/media/import/imagenes/' in src:
            # Clean the URL - remove any thumbnail sizing parameters
            full_url = src
            if not full_url.startswith('http'):
                full_url = 'https://www.truper.com' + full_url
            # Skip if duplicate
            if full_url not in image_urls:
                image_urls.append(full_url)
    
    # Also check for data-src or lazy-loaded images
    for img in img_tags:
        src = img.get('data-src', '') or img.get('data-original', '')
        if src and '/media/import/imagenes/' in src:
            full_url = src
            if not full_url.startswith('http'):
                full_url = 'https://www.truper.com' + full_url
            if full_url not in image_urls:
                image_urls.append(full_url)
    
    # Extract the clave (key) and description
    # Pattern: "Código:100172 | Clave:ST-424"
    clave_match = re.search(r'Clave:\s*([A-Za-z0-9\-/]+)', soup.get_text())
    clave = clave_match.group(1) if clave_match else ''
    
    # Extract product description from the page
    # The description appears near the Código/Clave text
    desc_text = ''
    
    # Look for description in structured elements
    # Typically in <p>, <span>, or <div> near the product info
    product_divs = soup.find_all(['div', 'p', 'span', 'h4', 'h3', 'h2'])
    for elem in product_divs:
        text = elem.get_text(strip=True)
        # Look for the description that's typically after Clave info
        # It's usually a multi-word product description
        if clave and clave in text:
            # Get the next sibling or parent text
            parent = elem.parent
            if parent:
                siblings = parent.find_all(['p', 'span', 'div', 'h4'])
                for sib in siblings:
                    sib_text = sib.get_text(strip=True)
                    if len(sib_text) > 15 and 'Código' not in sib_text and 'Clave' not in sib_text:
                        desc_text = sib_text
                        break
    
    # If we didn't find a description in structured elements, try alt text
    if not desc_text:
        for img in img_tags:
            alt = img.get('alt', '').strip()
            if alt and len(alt) > 10 and sku in str(soup):
                desc_text = alt
                break
    
    # Try to get description from title attributes
    if not desc_text:
        title_elements = soup.find_all(attrs={'title': True})
        for elem in title_elements:
            title = elem.get('title', '').strip()
            if title and len(title) > 10 and 'Código' not in title:
                desc_text = title
                break
    
    if image_urls or clave:
        result['found'] = True
        result['clave'] = clave
        result['truper_description'] = desc_text
        result['image_urls'] = image_urls
    
    return result


# ============================================================
# MAIN SCRAPING LOOP
# ============================================================
print("\nIniciando extracción de datos...")
print("-" * 60)

results = []
found_count = 0
not_found_count = 0
error_count = 0

for idx, row in df_input.iterrows():
    sku = row['SKU']
    nombre = row['Nombre']
    current_num = len(results) + 1
    
    # Check if already processed
    if sku in progress:
        data = progress[sku]
        results.append({
            'sku': sku,
            'nombre': nombre,
            **data
        })
        if data.get('found'):
            found_count += 1
        else:
            not_found_count += 1
        
        if current_num % 100 == 0:
            print(f"  [{current_num}/{total_products}] (cached) SKU {sku}")
        continue
    
    # Scrape from Truper
    data = extract_product_data(sku)
    
    # Save to progress
    progress[sku] = data
    
    results.append({
        'sku': sku,
        'nombre': nombre,
        **data
    })
    
    if data.get('found'):
        found_count += 1
        status = f"[OK] Encontrado (Clave: {data.get('clave', '?')}, {len(data.get('image_urls', []))} imgs)"
    else:
        not_found_count += 1
        status = f"[--] {data.get('error', 'No encontrado')}"
    
    # Print progress every product
    if current_num % 25 == 0 or current_num <= 5:
        print(f"  [{current_num}/{total_products}] SKU {sku} -> {status}")
    
    # Save progress every 50 products
    if current_num % 50 == 0:
        with open(PROGRESS_FILE, 'w', encoding='utf-8') as f:
            json.dump(progress, f, ensure_ascii=False, indent=2)
        print(f"  -> Progreso guardado ({current_num}/{total_products})")
    
    time.sleep(DELAY_BETWEEN_REQUESTS)

# Save final progress
with open(PROGRESS_FILE, 'w', encoding='utf-8') as f:
    json.dump(progress, f, ensure_ascii=False, indent=2)

print(f"\n{'=' * 60}")
print(f"RESULTADOS DEL SCRAPING:")
print(f"  Encontrados en Truper: {found_count}")
print(f"  No encontrados:        {not_found_count}")
print(f"  Total procesados:      {len(results)}")
print(f"{'=' * 60}")

# ============================================================
# BUILD WOOCOMMERCE EXCEL
# ============================================================
print("\nGenerando archivo WooCommerce...")

woo_rows = []
for r in results:
    sku = r['sku']
    nombre = r['nombre']
    
    # For description: use Truper's if available, otherwise generate from name
    description = r.get('truper_description', '') if r.get('found') else ''
    if not description or description == 'nan':
        description = nombre  # Use the product name as fallback description
    
    # For images: join URLs with comma (WooCommerce format)
    image_urls = r.get('image_urls', []) if r.get('found') else []
    images_str = ', '.join(image_urls) if image_urls else ''
    
    woo_rows.append({
        'SKU': sku,
        'Name': nombre if nombre != 'nan' else '',
        'Description': description if description != 'nan' else '',
        'Regular price': '',  # We don't have price data from Truper
        'Categories': '',
        'Images': images_str,
        'Attribute 1 name': 'Marca',
        'Attribute 1 value(s)': '',
        'Attribute 2 name': 'Medida',
        'Attribute 2 value(s)': ''
    })

df_woo = pd.DataFrame(woo_rows)

# Save to Excel
df_woo.to_excel(OUTPUT_FILE, index=False, engine='openpyxl')

# Also save a CSV version
df_woo.to_csv('woocommerce_final.csv', index=False, encoding='utf-8')

# Print stats
with_images = sum(1 for r in woo_rows if r['Images'])
with_desc = sum(1 for r in woo_rows if r['Description'] and r['Description'] != r['Name'])

print(f"\n{'=' * 60}")
print(f"ARCHIVO GENERADO: {OUTPUT_FILE}")
print(f"  Total productos:       {len(woo_rows)}")
print(f"  Con imágenes de Truper: {with_images}")
print(f"  Con descripción Truper: {with_desc}")
print(f"{'=' * 60}")
print("\n¡Listo! El archivo está preparado para importar a WooCommerce.")
