export default function PrivacidadPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-12) 0', maxWidth: '800px' }}>
      <h1 className="section-title" style={{ marginBottom: 'var(--space-6)' }}>Aviso de Privacidad</h1>
      <div style={{ lineHeight: 'var(--line-height-relaxed)', color: 'var(--color-text-secondary)' }}>
        <p style={{ marginBottom: 'var(--space-4)' }}>
          En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares...
        </p>
        <p style={{ marginBottom: 'var(--space-4)' }}>
          (Este es un documento de ejemplo para el Aviso de Privacidad. Debe ser reemplazado con el documento legal oficial de la empresa).
        </p>
      </div>
    </div>
  );
}
