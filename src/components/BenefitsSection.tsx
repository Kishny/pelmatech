// Real photos supplied 2026-08-14, replacing the generic "placeholder
// asset - replace before launch" scaffold graphics.
import clockLamp from '@/assets/clock-lamp.jpg'
import pills from '@/assets/pills.jpg'
import waitlist from '@/assets/waitlist.jpg'
import { AnimatedHeading } from '@/components/AnimatedHeading'
import { AnimatedText } from '@/components/AnimatedText'
import { MaskedImage } from '@/components/MaskedImage'
import { useTranslation } from '@/i18n/LanguageContext'

// Images and layout (reversed) stay local (not translated); number/title/
// body text comes from t.benefits.cards, matched by array index.
const CARD_IMAGES = [clockLamp, pills, waitlist]
const CARD_REVERSED = [false, true, false]

/**
 * PROTECTED SECTION — card order (including the reversed middle card)
 * and the exact gradient-line grid treatment must not change. The
 * intro copy below is protected original text; do not correct it even
 * though it references artists/music on a healthcare site.
 */
export function BenefitsSection() {
  const t = useTranslation()
  const CARDS = t.benefits.cards.map((card, i) => ({
    ...card,
    img: CARD_IMAGES[i],
    reversed: CARD_REVERSED[i],
  }))
  return (
    <section className="py-32 px-8 md:px-12 bg-surface">
      <div className="mb-24 grid grid-cols-12 gap-12">
        <div className="col-span-12 md:col-span-7">
          <AnimatedHeading as="h2" className="text-5xl md:text-6xl font-medium leading-[1.05]">
            {t.benefits.headingLine1}
            <br />
            {t.benefits.headingLine2}
          </AnimatedHeading>
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9">
          <AnimatedText className="text-base text-muted-foreground leading-relaxed">
            {t.benefits.intro}
          </AnimatedText>
        </div>
      </div>

      <div
        className="relative grid grid-cols-1 md:grid-cols-3"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.45) 1px, transparent 1px)',
          backgroundSize: '1px 100%, 1px 100%',
          backgroundPosition: '33.3333% 0, 66.6666% 0',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(255,255,255,0.45) 20%, rgba(255,255,255,0.45) 80%, transparent)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(255,255,255,0.45) 20%, rgba(255,255,255,0.45) 80%, transparent)',
          }}
        />

        {CARDS.map((card) => (
          <div
            key={card.number}
            className={`flex flex-col gap-6 px-8 py-12 ${card.reversed ? 'md:flex-col-reverse' : ''}`}
          >
            <MaskedImage
              src={card.img}
              alt={card.title}
              className="aspect-[4/3] w-full bg-muted"
            />
            <div>
              <div className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                {card.number}
              </div>
              <h3 className="mt-3 text-2xl font-medium">{card.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {card.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
