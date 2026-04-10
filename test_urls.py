import requests

urls = [
    'https://www.truper.com/media/import/imagenes/REP-NM-10X.jpg',
    'https://www.truper.com/media/import/imagenes/DILF-450.jpg',
    'https://www.truper.com/media/import/imagenes/MAN-30X3-4XX.jpg'
]

for u in urls:
    r = requests.head(u, allow_redirects=True)
    name = u.split('/')[-1]
    print(f'{name}: {r.status_code}')
