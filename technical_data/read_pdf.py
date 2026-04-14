import pymupdf

doc = pymupdf.open('DOCUMENTO DE ESPECIFICACIONES (1).pdf')
with open('especificaciones.txt', 'w', encoding='utf-8') as f:
    for page in doc:
        f.write(page.get_text())
        f.write('\n\n---PAGE BREAK---\n\n')
print("Saved to especificaciones.txt")
