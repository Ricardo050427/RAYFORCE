lines = open('.env', 'r').readlines()
url = key = secret = ''
for l in lines:
    if l.startswith('WOO_URL'):
        url = l.split('=', 1)[1].strip()
    elif l.startswith('WOO_KEY'):
        key = l.split('=', 1)[1].strip()
    elif l.startswith('WOO_SECRET'):
        secret = l.split('=', 1)[1].strip()

with open('rayforce-frontend/.env.local', 'w') as f:
    f.write(f"""NEXT_PUBLIC_WOO_URL={url}
WOO_KEY={key}
WOO_SECRET={secret}

NEXT_PUBLIC_WHATSAPP=526622151020
NEXT_PUBLIC_EMAIL=ventas2@rayforce.com.mx
NEXT_PUBLIC_PHONE=6622151020
NEXT_PUBLIC_ADDRESS=Campeche 250, Col San Benito, C.P. 83190, Hermosillo Sonora, Mexico
""")
print("Created .env.local")
