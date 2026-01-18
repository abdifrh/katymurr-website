-- Initial data to populate the database
-- Run this after creating the schema
-- This contains real content from katymurr.com

-- Insert testimonials/references
INSERT INTO "references" (name, position, institution, testimonial, language, featured) VALUES
('David Largey', 'Investment Analyst', 'Family Office in Geneva', 'Parfait ! Ayant eu passablement de profs différents, je peux dire que Katy est clairement parmi les meilleures profs d''anglais. Je la recommande vivement à toutes mes connaissances qui voudraient suivre des cours d''anglais. Katy a su cibler quelques-unes de mes faiblesses qui m''handicapaient et que je n''avais pas remarquées mais qui, finalement, étaient faciles à améliorer avec les bonnes méthodes. Nous avons traduit ensemble mon CV en anglais, et ceci ajouté à mon nouveau niveau d''anglais m''a permis de me présenter en toute confiance à des entretiens d''embauche en anglais dans quelques-unes des plus belles sociétés financières de la place genevoise.', 'fr', true),
('Aslan Khabliev', 'CEO', 'Skytec Group Ltd', 'Katy is an outstanding teacher who empowers her pupils. She is charismatic, creative and clearly committed to her students'' well-being. Her lessons are well-organised and she focuses on the different skills (speaking and pronunciation, reading and comprehension, listening, grammar). Katy uses a wide variety of teaching material to make the lessons interesting (books, videos, cards, games). I was particularly impressed with her ability to adapt to different individual styles of learning. Katy has my highest recommendation!', 'en', true),
('Sandrine Grept', 'Founding Doctor', 'SGL Esthétique, Geneva', 'Grâce à sa méthode basée sur la conversation, l''écoute de podcasts, la lecture d''articles scientifiques, les exercices dans les livres, j''ai pu améliorer mon anglais très rapidement. Merci infiniment à Katy!!!', 'fr', true),
('Soazic Grassiot', 'Founder', 'Favilla, Geneva', 'Katy est une personne dynamique, curieuse et travailleuse. Elle sait écouter les besoins de son élève et s''adapter à chacun. Son leadership permet à Katy de mener à bien un projet. Sa maîtrise de l''anglais fait que sa qualité d''enseignent est excellente. Je recommande vivement Katy.', 'fr', true),
('Auguste Velay', 'Analyst', 'Fund Management Company', 'Parfait ! Katy est une professeure très compétente. Elle s''adapte au rythme de travail de chacun de ses élèves. Ses cours sont très intéressants, motivants et leur variété permet de progresser efficacement dans l''apprentissage de la langue.', 'fr', true);

-- Insert blog categories
INSERT INTO blog_categories (name, slug, language, description) VALUES
('English Coaching', 'english-coaching', 'en', 'Articles about English coaching and language learning'),
('Conference Interpreting', 'conference-interpreting', 'en', 'Insights on conference interpreting'),
('Writing', 'writing', 'en', 'Writing tips and techniques'),
('Coaching en anglais', 'coaching-en-anglais', 'fr', 'Articles sur le coaching en anglais et l''apprentissage des langues'),
('Interprétation de conférence', 'interpretation-de-conference', 'fr', 'Réflexions sur l''interprétation de conférence'),
('Écriture', 'ecriture', 'fr', 'Conseils et techniques d''écriture');

-- Note: You can add initial blog posts, pages, etc. here as needed

