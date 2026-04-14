import pandas as pd

# Define the file paths / Define las rutas de los archivos
# Change these names to your actual file names / Cambia estos nombres por tus archivos reales
ruta_mvp = 'mvp_woocommerce.csv'
ruta_comercial = 'productos_rayforce.xlsx' 
ruta_contpaqi = 'inventario.csv'   

try:
    # Load the data into dataframes / Cargar los datos en dataframes
    print("Loading files... / Cargando archivos...")
    df_mvp = pd.read_csv(ruta_mvp)
    df_comercial = pd.read_excel(ruta_comercial)
    df_contpaqi = pd.read_csv(ruta_contpaqi)

    # Standardize the code columns to text to avoid matching errors / Estandarizar las columnas de código a texto para evitar errores de coincidencia
    # This removes hidden spaces / Esto elimina espacios ocultos
    df_mvp['SKU'] = df_mvp['SKU'].astype(str).str.strip()
    df_comercial['SKU'] = df_comercial['SKU'].astype(str).str.strip()
    df_contpaqi['SKU'] = df_contpaqi['SKU'].astype(str).str.strip()

    # Merge MVP with Commercial data (to get Name and Description) / Unir MVP con datos Comerciales (para traer Nombre y Descripción)
    print("Merging names and descriptions... / Uniendo nombres y descripciones...")
    df_mvp = df_mvp.drop(columns=['Name', 'Description', 'Regular price'], errors='ignore')
    df_final = pd.merge(df_mvp, df_comercial[['SKU', 'Name', 'Description']], 
                        on='SKU', how='left')

    # Merge the result with CONTPAQi data (to get the Price) / Unir el resultado con datos de CONTPAQi (para traer el Precio)
    print("Merging prices... / Uniendo precios...")
    df_final = pd.merge(df_final, df_contpaqi[['SKU', 'Precio_Publico']], 
                        on='SKU', how='left')

    # Assign the merged values to the official WooCommerce columns / Asignar los valores unidos a las columnas oficiales de WooCommerce
    df_final['Regular price'] = df_final['Precio_Publico']

    # Define the exact columns needed for the final CSV / Definir las columnas exactas necesarias para el CSV final
    columnas_woocommerce = [
        'SKU', 'Name', 'Description', 'Regular price', 
        'Categories', 'Images', 
        'Attribute 1 name', 'Attribute 1 value(s)', 
        'Attribute 2 name', 'Attribute 2 value(s)'
    ]
    
    # Filter only the needed columns / Filtrar solo las columnas necesarias
    df_final = df_final[columnas_woocommerce]

    # Replace empty 'NaN' values with empty text / Reemplazar valores vacíos 'NaN' con texto vacío
    df_final = df_final.fillna('')

    # Save the final result ready for upload / Guardar el resultado final listo para subir
    output_name = 'woocommerce_listo_para_subir.csv'
    df_final.to_csv(output_name, index=False, encoding='utf-8')
    
    print(f"Success! File saved as: {output_name} / ¡Éxito! Archivo guardado como: {output_name}")

except Exception as e:
    # Print any error that occurs / Imprimir cualquier error que ocurra
    print(f"An error occurred: {e} / Ocurrió un error: {e}")