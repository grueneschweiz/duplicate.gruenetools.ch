import { Trans, useTranslation } from 'react-i18next'

export default function Footer() {
  const { t, i18n } = useTranslation()

  const orgLink =
    i18n.language === 'fr' ? 'https://verts.ch' : 'https://gruene.ch'
  const privacyLink =
    i18n.language === 'fr'
      ? 'https://verts.ch/protection-des-donnees'
      : 'https://gruene.ch/datenschutz'
  const email = i18n.language === 'fr' ? 'verts@verts.ch' : 'gruene@gruene.ch'

  return (
    <footer
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '1em',
        fontSize: '0.8em',
        lineHeight: '1.4em',
        color: 'var(--color-text-muted)',
      }}
    >
      <div
        style={{
          marginTop: '1em',
          display: 'flex',
          gap: '2em',
          alignItems: 'end',
          textAlign: 'left',
        }}
      >
        <a href={orgLink} target='_blank' rel='noreferrer'>
          <img
            style={{ width: '25vw', maxWidth: '200px', opacity: 0.9 }}
            src='/gruene-les-vert-e-s_vector-green.svg'
            alt='Logo'
          />
        </a>
        <p>
          <strong>
            <a
              href={orgLink}
              target='_blank'
              rel='noreferrer'
              style={{ textDecoration: 'underline', fontWeight: 700 }}
            >
              {t('footer/orgName')}
            </a>
          </strong>
          <br />
          Waisenhausplatz 21
          <br />
          3011 Bern
          <br />
          <br />
          <a
            className='muted-link'
            href={`mailto:${email}`}
            target='_blank'
            rel='noreferrer'
          >
            {email}
          </a>
        </p>
      </div>
      <p>
        <a
          href={privacyLink}
          target='_blank'
          rel='noreferrer'
          className='muted-link'
        >
          {t('footer/privacy')}
        </a>
        <br />
        <Trans i18nKey='footer/imprint'>
          {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
          <a
            href={orgLink}
            target='_blank'
            rel='noreferrer'
            className='muted-link'
          />
        </Trans>
        <br />
        <Trans i18nKey='footer/license'>
          {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
          <a
            href='https://github.com/grueneschweiz/duplicates.gruenetools.ch'
            target='_blank'
            rel='noreferrer'
            className='muted-link'
          />
        </Trans>
      </p>
    </footer>
  )
}
