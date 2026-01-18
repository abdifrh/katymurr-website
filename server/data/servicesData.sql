-- Initial services data for Katy Murr website
-- Run this in your Supabase SQL editor after creating the services table
-- This script uses ON CONFLICT to update existing services or insert new ones

-- English Coaching Courses
INSERT INTO services (slug, title, subtitle, description, content, language, order_index, published, meta_title, meta_description, meta_keywords) VALUES
(
  'english-coaching',
  'English Coaching Courses',
  'English Language Business Coaching',
  'Personalized English language coaching tailored to your needs and goals.',
  '{
    "sections": [
      {
        "type": "steps",
        "title": "Your Journey",
        "steps": [
          {
            "title": "Assess your English language skills",
            "description": "We start with a comprehensive assessment to understand your current level and goals."
          },
          {
            "title": "Get in touch to discuss your project",
            "description": "Contact me to discuss your specific needs and how we can work together."
          },
          {
            "title": "Begin your personal programme",
            "description": "Start your tailored coaching programme designed specifically for you."
          },
          {
            "title": "Consolidate & revise skills quarterly for medium-term course",
            "description": "Regular check-ins and skill consolidation to ensure continuous progress."
          },
          {
            "title": "Complete your programme and achieve your immediate goals",
            "description": "Reach your objectives with focused, personalized coaching."
          },
          {
            "title": "Contact me at any point in the future for follow-up sessions",
            "description": "Ongoing support available whenever you need it."
          }
        ]
      },
      {
        "type": "text",
        "title": "Course Options",
        "content": "All courses and lessons are available as intensive, short-term courses or medium-term courses. Courses are available for businesses, corporate groups, private individuals and students."
      },
      {
        "type": "roi",
        "title": "What's the ROI?",
        "value": "100% efficiency: personalised, bespoke courses to achieve your goals",
        "items": [
          "100% efficiency: personalised, bespoke courses to achieve your goals",
          "100% ease: courses fit your timetable and existing commitments",
          "100% enjoyment: invest in your professional and personal growth"
        ]
      },
      {
        "type": "cta",
        "title": "Ready to improve your communication?",
        "content": "Get in touch to discuss your project and start your personalized English coaching journey."
      }
    ]
  }'::jsonb,
  'en',
  1,
  true,
  'English Coaching Courses - Katy Murr',
  'Personalized English language business coaching tailored to your needs. Intensive, short-term, or medium-term courses available.',
  'English coaching, business English, language training, personalized coaching, English courses'
),
(
  'english-coaching',
  'Cours de Coaching en Anglais',
  'Coaching en Anglais des Affaires',
  'Coaching en anglais personnalisé adapté à vos besoins et objectifs.',
  '{
    "sections": [
      {
        "type": "steps",
        "title": "Votre Parcours",
        "steps": [
          {
            "title": "Évaluez vos compétences en anglais",
            "description": "Nous commençons par une évaluation complète pour comprendre votre niveau actuel et vos objectifs."
          },
          {
            "title": "Contactez-moi pour discuter de votre projet",
            "description": "Contactez-moi pour discuter de vos besoins spécifiques et de la façon dont nous pouvons travailler ensemble."
          },
          {
            "title": "Commencez votre programme personnel",
            "description": "Démarrez votre programme de coaching personnalisé conçu spécifiquement pour vous."
          },
          {
            "title": "Consolidez et révisez vos compétences trimestriellement pour les cours à moyen terme",
            "description": "Points de contrôle réguliers et consolidation des compétences pour assurer une progression continue."
          },
          {
            "title": "Terminez votre programme et atteignez vos objectifs immédiats",
            "description": "Atteignez vos objectifs avec un coaching ciblé et personnalisé."
          },
          {
            "title": "Contactez-moi à tout moment pour des sessions de suivi",
            "description": "Support continu disponible chaque fois que vous en avez besoin."
          }
        ]
      },
      {
        "type": "text",
        "title": "Options de Cours",
        "content": "Tous les cours et leçons sont disponibles en cours intensifs, cours à court terme ou cours à moyen terme. Les cours sont disponibles pour les entreprises, les groupes d'entreprises, les particuliers et les étudiants."
      },
      {
        "type": "roi",
        "title": "Quel est le retour sur investissement ?",
        "value": "100% d'efficacité : cours personnalisés et sur mesure pour atteindre vos objectifs",
        "items": [
          "100% d'efficacité : cours personnalisés et sur mesure pour atteindre vos objectifs",
          "100% de facilité : les cours s'adaptent à votre emploi du temps et à vos engagements existants",
          "100% de plaisir : investissez dans votre croissance professionnelle et personnelle"
        ]
      },
      {
        "type": "cta",
        "title": "Prêt à améliorer votre communication ?",
        "content": "Contactez-moi pour discuter de votre projet et commencer votre parcours de coaching en anglais personnalisé."
      }
    ]
  }'::jsonb,
  'fr',
  1,
  true,
  'Cours de Coaching en Anglais - Katy Murr',
  'Coaching en anglais des affaires personnalisé adapté à vos besoins. Cours intensifs, à court terme ou à moyen terme disponibles.',
  'coaching anglais, anglais des affaires, formation linguistique, coaching personnalisé, cours d''anglais'
);

-- Conference Interpreting
INSERT INTO services (slug, title, subtitle, description, content, language, order_index, published, meta_title, meta_description, meta_keywords) VALUES
(
  'conference-interpreting',
  'Conference Interpreting',
  'Full simultaneous and consecutive interpreting services',
  'I hold an MA in Conference Interpreting from the Faculty of Translation and Interpreting at the University of Geneva.',
  '{
    "sections": [
      {
        "type": "text",
        "title": "Professional Qualifications",
        "content": "I hold an MA in Conference Interpreting from the Faculty of Translation and Interpreting at the University of Geneva."
      },
      {
        "type": "text",
        "title": "Services",
        "content": "I work with companies, institutions and organisations so they can focus on the matter at hand. I am based in Geneva, Switzerland and available for missions abroad."
      },
      {
        "type": "list",
        "title": "Language Combinations",
        "items": [
          "French and German into English",
          "From English into French",
          "Other language regimes can be arranged with colleagues upon request"
        ]
      },
      {
        "type": "list",
        "title": "Event Types",
        "items": [
          "Business meetings",
          "Lunch talks",
          "Negotiations",
          "Arbitration hearings",
          "And many more"
        ]
      },
      {
        "type": "cta",
        "title": "Get in touch to ensure your upcoming event runs smoothly",
        "content": "Contact me to discuss your interpreting needs and ensure seamless communication at your event."
      }
    ]
  }'::jsonb,
  'en',
  2,
  true,
  'Conference Interpreting Services - Katy Murr',
  'Professional conference interpreting services. MA in Conference Interpreting from FTI UNIGE. Simultaneous and consecutive interpreting available.',
  'conference interpreting, simultaneous interpreting, consecutive interpreting, Geneva interpreter, professional interpreter'
),
(
  'conference-interpreting',
  'Interprétation de Conférence',
  'Services complets d''interprétation simultanée et consécutive',
  'Je détiens un Master en Interprétation de Conférence de la Faculté de Traduction et d''Interprétation de l''Université de Genève.',
  '{
    "sections": [
      {
        "type": "text",
        "title": "Qualifications Professionnelles",
        "content": "Je détiens un Master en Interprétation de Conférence de la Faculté de Traduction et d''Interprétation de l''Université de Genève."
      },
      {
        "type": "text",
        "title": "Services",
        "content": "Je travaille avec des entreprises, des institutions et des organisations afin qu''elles puissent se concentrer sur la question en cours. Je suis basée à Genève, en Suisse, et disponible pour des missions à l''étranger."
      },
      {
        "type": "list",
        "title": "Combinaisons Linguistiques",
        "items": [
          "Français et allemand vers l''anglais",
          "De l''anglais vers le français",
          "D''autres régimes linguistiques peuvent être organisés avec des collègues sur demande"
        ]
      },
      {
        "type": "list",
        "title": "Types d''Événements",
        "items": [
          "Réunions d''affaires",
          "Conférences-déjeuners",
          "Négociations",
          "Audiences d''arbitrage",
          "Et bien plus encore"
        ]
      },
      {
        "type": "cta",
        "title": "Contactez-moi pour garantir le bon déroulement de votre prochain événement",
        "content": "Contactez-moi pour discuter de vos besoins en interprétation et assurer une communication fluide lors de votre événement."
      }
    ]
  }'::jsonb,
  'fr',
  2,
  true,
  'Services d''Interprétation de Conférence - Katy Murr',
  'Services professionnels d''interprétation de conférence. Master en Interprétation de Conférence de la FTI UNIGE. Interprétation simultanée et consécutive disponibles.',
  'interprétation de conférence, interprétation simultanée, interprétation consécutive, interprète Genève, interprète professionnel'
);

-- Translation & Proofreading
INSERT INTO services (slug, title, subtitle, description, content, language, order_index, published, meta_title, meta_description, meta_keywords) VALUES
(
  'translation-proofreading',
  'Translation & Proofreading',
  'All work is proofread by a second proofreader to ensure 100% quality control.',
  'Translation from French & German into English. Benefit from the skills of an experienced translator.',
  '{
    "sections": [
      {
        "type": "text",
        "title": "Translation",
        "content": "Translation from French & German into English. Benefit from the skills of an experienced translator."
      },
      {
        "type": "text",
        "title": "Proofreading",
        "content": "Need another pair of eyes? Proofreading adds the polishing touch and ensures your content is ready to go live."
      },
      {
        "type": "text",
        "title": "Quality Assurance",
        "content": "All work is proofread by a second proofreader to ensure 100% quality control."
      },
      {
        "type": "cta",
        "title": "Time to communicate better. Get a free quote within 48 hrs.",
        "content": "Contact me to discuss your translation or proofreading needs and receive a free quote within 48 hours."
      }
    ]
  }'::jsonb,
  'en',
  3,
  true,
  'Translation & Proofreading Services - Katy Murr',
  'Professional translation from French & German into English. Proofreading services with 100% quality control. Free quote within 48 hours.',
  'translation, proofreading, French to English, German to English, document translation, quality control'
),
(
  'translation-proofreading',
  'Traduction & Correction',
  'Tous les travaux sont relus par un deuxième correcteur pour garantir un contrôle qualité à 100%.',
  'Traduction du français et de l''allemand vers l''anglais. Bénéficiez des compétences d''une traductrice expérimentée.',
  '{
    "sections": [
      {
        "type": "text",
        "title": "Traduction",
        "content": "Traduction du français et de l''allemand vers l''anglais. Bénéficiez des compétences d''une traductrice expérimentée."
      },
      {
        "type": "text",
        "title": "Correction",
        "content": "Besoin d''un autre regard ? La correction ajoute la touche finale et garantit que votre contenu est prêt à être publié."
      },
      {
        "type": "text",
        "title": "Assurance Qualité",
        "content": "Tous les travaux sont relus par un deuxième correcteur pour garantir un contrôle qualité à 100%."
      },
      {
        "type": "cta",
        "title": "Il est temps de mieux communiquer. Obtenez un devis gratuit sous 48h.",
        "content": "Contactez-moi pour discuter de vos besoins en traduction ou correction et recevez un devis gratuit sous 48 heures."
      }
    ]
  }'::jsonb,
  'fr',
  3,
  true,
  'Services de Traduction & Correction - Katy Murr',
  'Traduction professionnelle du français et de l''allemand vers l''anglais. Services de correction avec contrôle qualité à 100%. Devis gratuit sous 48 heures.',
  'traduction, correction, français vers anglais, allemand vers anglais, traduction de documents, contrôle qualité'
);

-- Creative Solutions & Copywriting
INSERT INTO services (slug, title, subtitle, description, content, language, order_index, published, meta_title, meta_description, meta_keywords) VALUES
(
  'creative-solutions',
  'Creative Solutions & Copywriting',
  'Content Creation, Copywriting & Copyediting',
  'I''ve got it… Website content, social media marketing, blog entries, corporate newsletters, press releases, speeches ready for the podium.',
  '{
    "sections": [
      {
        "type": "text",
        "title": "What I Offer",
        "content": "I''ve got it… Website content, social media marketing, blog entries, corporate newsletters, press releases, speeches ready for the podium. What you need, written in your voice, delivered before the deadline."
      },
      {
        "type": "text",
        "title": "First Impressions Matter",
        "content": "Sink? Swim? Fly? First impressions make a difference. A world of a difference, especially as face-to-face meetings are a no-go now."
      },
      {
        "type": "text",
        "title": "The Winning Value",
        "content": "Let me help you put your best foot forward the first time. Add value. Reduce stress."
      },
      {
        "type": "text",
        "title": "Quality Assurance",
        "content": "All work is proofread by a second proofreader to ensure 100% quality control."
      },
      {
        "type": "cta",
        "title": "Get in touch",
        "content": "Contact me to discuss your content creation, copywriting, or copyediting needs."
      }
    ]
  }'::jsonb,
  'en',
  4,
  true,
  'Creative Solutions & Copywriting - Katy Murr',
  'Professional content creation, copywriting, and copyediting services. Website content, social media, blog entries, newsletters, press releases, and speeches.',
  'copywriting, content creation, copyediting, website content, social media marketing, blog writing, corporate communications'
),
(
  'creative-solutions',
  'Solutions Créatives & Rédaction',
  'Création de Contenu, Rédaction Publicitaire & Correction',
  'J''ai ce qu''il vous faut… Contenu de site web, marketing sur les réseaux sociaux, articles de blog, newsletters d''entreprise, communiqués de presse, discours prêts pour la tribune.',
  '{
    "sections": [
      {
        "type": "text",
        "title": "Ce que j''offre",
        "content": "J''ai ce qu''il vous faut… Contenu de site web, marketing sur les réseaux sociaux, articles de blog, newsletters d''entreprise, communiqués de presse, discours prêts pour la tribune. Ce dont vous avez besoin, écrit dans votre voix, livré avant la date limite."
      },
      {
        "type": "text",
        "title": "Les Premières Impressions Comptent",
        "content": "Couler ? Nager ? Voler ? Les premières impressions font la différence. Une différence énorme, surtout maintenant que les réunions en face à face ne sont plus possibles."
      },
      {
        "type": "text",
        "title": "La Valeur Gagnante",
        "content": "Laissez-moi vous aider à donner le meilleur de vous-même dès la première fois. Ajoutez de la valeur. Réduisez le stress."
      },
      {
        "type": "text",
        "title": "Assurance Qualité",
        "content": "Tous les travaux sont relus par un deuxième correcteur pour garantir un contrôle qualité à 100%."
      },
      {
        "type": "cta",
        "title": "Contactez-moi",
        "content": "Contactez-moi pour discuter de vos besoins en création de contenu, rédaction publicitaire ou correction."
      }
    ]
  }'::jsonb,
  'fr',
  4,
  true,
  'Solutions Créatives & Rédaction - Katy Murr',
  'Services professionnels de création de contenu, rédaction publicitaire et correction. Contenu de site web, réseaux sociaux, articles de blog, newsletters, communiqués de presse et discours.',
  'rédaction publicitaire, création de contenu, correction, contenu de site web, marketing sur les réseaux sociaux, rédaction de blog, communications d''entreprise'
);

-- Writing
INSERT INTO services (slug, title, subtitle, description, content, language, order_index, published, meta_title, meta_description, meta_keywords) VALUES
(
  'writing',
  'Writing',
  'Create.',
  'My greatest love has always been the English language. From an early age, I loved devouring books at my local library and writing poems, stories and articles, and I continue to read and write on a regular basis.',
  '{
    "sections": [
      {
        "type": "text",
        "title": "My Passion",
        "content": "My greatest love has always been the English language. From an early age, I loved devouring books at my local library and writing poems, stories and articles, and I continue to read and write on a regular basis."
      },
      {
        "type": "text",
        "title": "Published Work",
        "content": "Some of my fiction and non-fiction has been featured in national UK broadsheets, literary magazines, as well as local newspapers and magazines. A few of those titles include The Independent, Manchester Evening News and Emagazine. For example, articles published include 10 Days at Eton College, Emagazine, Brand."
      },
      {
        "type": "cta",
        "title": "Let''s Create Together",
        "content": "Whether you need fiction or non-fiction writing, I can help bring your ideas to life with compelling prose."
      }
    ]
  }'::jsonb,
  'en',
  5,
  true,
  'Writing Services - Katy Murr',
  'Professional writing services for fiction and non-fiction. Published in The Independent, Manchester Evening News, and Emagazine.',
  'writing, fiction writing, non-fiction writing, creative writing, professional writing, published author'
),
(
  'writing',
  'Écriture',
  'Créer.',
  'Mon plus grand amour a toujours été la langue anglaise. Dès mon plus jeune âge, j''ai adoré dévorer des livres dans ma bibliothèque locale et écrire des poèmes, des histoires et des articles, et je continue à lire et écrire régulièrement.',
  '{
    "sections": [
      {
        "type": "text",
        "title": "Ma Passion",
        "content": "Mon plus grand amour a toujours été la langue anglaise. Dès mon plus jeune âge, j''ai adoré dévorer des livres dans ma bibliothèque locale et écrire des poèmes, des histoires et des articles, et je continue à lire et écrire régulièrement."
      },
      {
        "type": "text",
        "title": "Travaux Publiés",
        "content": "Certains de mes écrits de fiction et de non-fiction ont été publiés dans des journaux nationaux britanniques, des magazines littéraires, ainsi que des journaux et magazines locaux. Quelques-uns de ces titres incluent The Independent, Manchester Evening News et Emagazine. Par exemple, les articles publiés incluent 10 Days at Eton College, Emagazine, Brand."
      },
      {
        "type": "cta",
        "title": "Créons Ensemble",
        "content": "Que vous ayez besoin d''écriture de fiction ou de non-fiction, je peux vous aider à donner vie à vos idées avec une prose convaincante."
      }
    ]
  }'::jsonb,
  'fr',
  5,
  true,
  'Services d''Écriture - Katy Murr',
  'Services d''écriture professionnels pour la fiction et la non-fiction. Publié dans The Independent, Manchester Evening News et Emagazine.',
  'écriture, écriture de fiction, écriture de non-fiction, écriture créative, écriture professionnelle, auteur publié'
)
ON CONFLICT (slug, language) 
DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  order_index = EXCLUDED.order_index,
  published = EXCLUDED.published,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  meta_keywords = EXCLUDED.meta_keywords,
  updated_at = NOW();

