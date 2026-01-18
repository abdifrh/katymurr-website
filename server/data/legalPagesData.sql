-- Insert Legal Pages (Privacy Policy, Terms of Service, Legal Notice, Cookie Policy)
-- English versions

INSERT INTO pages (slug, title, content, language, meta_title, meta_description) VALUES
(
  'privacy-policy',
  'Privacy Policy',
  '<h2>Information We Collect</h2>
  <p>We collect information that you provide directly to us, such as when you fill out a contact form or subscribe to our newsletter.</p>
  
  <h2>How We Use Your Information</h2>
  <p>We use the information we collect to respond to your inquiries, send you newsletters, and improve our services.</p>
  
  <h2>Data Protection</h2>
  <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
  
  <h2>Your Rights</h2>
  <p>You have the right to access, modify, or delete your personal information at any time. Please contact us to exercise these rights.</p>
  
  <h2>Contact</h2>
  <p>For any questions regarding this privacy policy, please contact us at contact@katymurr.com</p>',
  'en',
  'Privacy Policy - Katy Murr',
  'Privacy policy and data protection information for katymurr.com'
),
(
  'terms-of-service',
  'Terms of Service',
  '<h2>Acceptance of Terms</h2>
  <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
  
  <h2>Use License</h2>
  <p>Permission is granted to temporarily download one copy of the materials on this website for personal, non-commercial transitory viewing only.</p>
  
  <h2>Services</h2>
  <p>Our services include English coaching, conference interpreting, and writing services. All services are subject to availability and individual agreements.</p>
  
  <h2>Limitations</h2>
  <p>In no event shall Katy Murr or its suppliers be liable for any damages arising out of the use or inability to use the materials on this website.</p>
  
  <h2>Revisions</h2>
  <p>Katy Murr may revise these terms of service at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>',
  'en',
  'Terms of Service - Katy Murr',
  'Terms and conditions for using katymurr.com'
),
(
  'legal-notice',
  'Legal Notice',
  '<h2>Publisher</h2>
  <p><strong>Katy Murr</strong><br />
  Registered Company Number: CHE-365.506.039<br />
  Email: <a href="mailto:contact@katymurr.com">contact@katymurr.com</a></p>
  
  <h2>Hosting</h2>
  <p>This website is hosted on a VPS server. For technical inquiries, please contact the website administrator.</p>
  
  <h2>Intellectual Property</h2>
  <p>All content on this website, including text, images, and graphics, is the property of Katy Murr and is protected by copyright laws.</p>
  
  <h2>Contact</h2>
  <p>For any questions or concerns, please contact us at <a href="mailto:contact@katymurr.com">contact@katymurr.com</a></p>',
  'en',
  'Legal Notice - Katy Murr',
  'Legal notice and company information for katymurr.com'
),
(
  'cookie-policy',
  'Cookie Policy',
  '<h2>What Are Cookies</h2>
  <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.</p>
  
  <h2>How We Use Cookies</h2>
  <p>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. We only use essential cookies that are necessary for the website to function properly.</p>
  
  <h2>Types of Cookies We Use</h2>
  <ul>
    <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function and cannot be switched off.</li>
    <li><strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with our website.</li>
    <li><strong>Preference Cookies:</strong> These cookies remember your preferences, such as language selection.</li>
  </ul>
  
  <h2>Managing Cookies</h2>
  <p>You can control and manage cookies in your browser settings. However, disabling cookies may affect the functionality of this website.</p>
  
  <h2>Contact</h2>
  <p>If you have any questions about our use of cookies, please contact us at contact@katymurr.com</p>',
  'en',
  'Cookie Policy - Katy Murr',
  'Cookie policy and information about cookie usage on katymurr.com'
)
ON CONFLICT (slug, language) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description;

-- French versions

INSERT INTO pages (slug, title, content, language, meta_title, meta_description) VALUES
(
  'privacy-policy',
  'Politique de Confidentialité',
  '<h2>Informations que nous collectons</h2>
  <p>Nous collectons les informations que vous nous fournissez directement, par exemple lorsque vous remplissez un formulaire de contact ou vous abonnez à notre newsletter.</p>
  
  <h2>Comment nous utilisons vos informations</h2>
  <p>Nous utilisons les informations collectées pour répondre à vos demandes, vous envoyer des newsletters et améliorer nos services.</p>
  
  <h2>Protection des données</h2>
  <p>Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre l''accès non autorisé, l''altération, la divulgation ou la destruction.</p>
  
  <h2>Vos droits</h2>
  <p>Vous avez le droit d''accéder, de modifier ou de supprimer vos informations personnelles à tout moment. Veuillez nous contacter pour exercer ces droits.</p>
  
  <h2>Contact</h2>
  <p>Pour toute question concernant cette politique de confidentialité, veuillez nous contacter à contact@katymurr.com</p>',
  'fr',
  'Politique de Confidentialité - Katy Murr',
  'Politique de confidentialité et informations sur la protection des données pour katymurr.com'
),
(
  'terms-of-service',
  'Conditions d''Utilisation',
  '<h2>Acceptation des conditions</h2>
  <p>En accédant et en utilisant ce site web, vous acceptez et convenez d''être lié par les termes et dispositions de cet accord.</p>
  
  <h2>Licence d''utilisation</h2>
  <p>L''autorisation est accordée de télécharger temporairement une copie des matériaux sur ce site web uniquement pour un visionnement personnel, non commercial et transitoire.</p>
  
  <h2>Services</h2>
  <p>Nos services comprennent le coaching en anglais, l''interprétation de conférence et les services d''écriture. Tous les services sont soumis à la disponibilité et à des accords individuels.</p>
  
  <h2>Limitations</h2>
  <p>En aucun cas Katy Murr ou ses fournisseurs ne seront responsables des dommages résultant de l''utilisation ou de l''impossibilité d''utiliser les matériaux sur ce site web.</p>
  
  <h2>Révisions</h2>
  <p>Katy Murr peut réviser ces conditions d''utilisation à tout moment sans préavis. En utilisant ce site web, vous acceptez d''être lié par la version actuelle de ces conditions d''utilisation.</p>',
  'fr',
  'Conditions d''Utilisation - Katy Murr',
  'Conditions d''utilisation pour katymurr.com'
),
(
  'legal-notice',
  'Mentions Légales',
  '<h2>Éditeur</h2>
  <p><strong>Katy Murr</strong><br />
  Numéro d''entreprise enregistré : CHE-365.506.039<br />
  Email : <a href="mailto:contact@katymurr.com">contact@katymurr.com</a></p>
  
  <h2>Hébergement</h2>
  <p>Ce site web est hébergé sur un serveur VPS. Pour les questions techniques, veuillez contacter l''administrateur du site web.</p>
  
  <h2>Propriété Intellectuelle</h2>
  <p>Tout le contenu de ce site web, y compris les textes, images et graphiques, est la propriété de Katy Murr et est protégé par les lois sur le droit d''auteur.</p>
  
  <h2>Contact</h2>
  <p>Pour toute question ou préoccupation, veuillez nous contacter à <a href="mailto:contact@katymurr.com">contact@katymurr.com</a></p>',
  'fr',
  'Mentions Légales - Katy Murr',
  'Mentions légales et informations sur l''entreprise pour katymurr.com'
),
(
  'cookie-policy',
  'Politique des Cookies',
  '<h2>Qu''est-ce qu''un Cookie</h2>
  <p>Les cookies sont de petits fichiers texte qui sont placés sur votre ordinateur ou appareil mobile lorsque vous visitez un site web. Ils sont largement utilisés pour rendre les sites web plus efficaces et fournir des informations aux propriétaires de sites web.</p>
  
  <h2>Comment nous utilisons les cookies</h2>
  <p>Nous utilisons des cookies pour améliorer votre expérience de navigation, analyser le trafic du site et personnaliser le contenu. Nous n''utilisons que des cookies essentiels nécessaires au bon fonctionnement du site web.</p>
  
  <h2>Types de cookies que nous utilisons</h2>
  <ul>
    <li><strong>Cookies essentiels :</strong> Ces cookies sont nécessaires au fonctionnement du site web et ne peuvent pas être désactivés.</li>
    <li><strong>Cookies d''analyse :</strong> Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site web.</li>
    <li><strong>Cookies de préférence :</strong> Ces cookies mémorisent vos préférences, telles que la sélection de la langue.</li>
  </ul>
  
  <h2>Gestion des cookies</h2>
  <p>Vous pouvez contrôler et gérer les cookies dans les paramètres de votre navigateur. Cependant, la désactivation des cookies peut affecter le fonctionnement de ce site web.</p>
  
  <h2>Contact</h2>
  <p>Si vous avez des questions sur notre utilisation des cookies, veuillez nous contacter à contact@katymurr.com</p>',
  'fr',
  'Politique des Cookies - Katy Murr',
  'Politique des cookies et informations sur l''utilisation des cookies sur katymurr.com'
)
ON CONFLICT (slug, language) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description;

