from app.models import db, Animal, environment, SCHEMA
from sqlalchemy.sql import text


def seed_animals():
    cat1 = Animal(
        owner_id = 4,
        type = 'Cat',
        name = 'Mack Truck',
        age = 'Young',
        gender = 'Male',
        size = 'Large',
        primary_breed = 'Domestic Short Hair',
        color = 'Black & White / Tuxedo',
        characteristics = 'Friendly, Affectionate, Playful, Loyal, Funny, Curious',
        coat_length = "Short",
        house_trained = True,
        vaccinated = True,
        fixed = True,
        good_with = 'Other cats, dogs',
        description = "Meet Mack Truck, the charming and mischievous male cat with a personality that is impossible to ignore. With his sleek fur and captivating eyes, he exudes an undeniable charisma that draws you in. This feline fellow is known for his playful nature, always ready to pounce on his favorite toys or engage in a spirited game of chase. Mack is also a social butterfly, delighting in the company of humans and other pets alike. Whether it's curling up beside you for a cozy snuggle session or entertaining you with his acrobatic antics, Mack is sure to bring joy and laughter to your home. Mack is a true sweetheart who will steal your heart with his endearing charm and boundless affection. Adopt this lovable male cat today and experience the joy of having Mack as your forever companion.",
        adoption_fee = 120.00,
    )

    cat2 = Animal(
        owner_id = 5,
        type = 'Cat',
        name = 'Catniss Everqueen',
        age = 'Senior',
        gender = 'Female',
        size = 'Medium',
        primary_breed = 'Domestic Short Hair',
        color = 'Calico',
        characteristics = 'Smart, Independent, Curious, Couch potato, Dignified, Quiet',
        coat_length = "Short",
        house_trained = True,
        vaccinated = True,
        fixed = True,
        good_with = 'Other cats',
        description = "Catniss is middle aged lady that has been with us since October. She came in with her babies and wasn't super happy around people, so she went to one of the shelter's experienced fosters to raise her babies and see if she could learn to enjoy living with people. Catniss raised her babies and was a great mother, as she also learned what is was to live in a loving home. All of her little ones were adopted into wonderful homes, and she has still remained in foster care waiting for the perfect understanding forever home. She is not a jump in your lap cat, but enjoys cohabitating and makes a great indoor mouser. She likes to relax around you on the couch or in a window, just at a distance. Catniss is not mean or aggressive, she just never learned that people can be nice, but is making great progress and starting to really come around with continued patience and work she will continue to make progress with attention.",
        adoption_fee = 80.00
    )

    cat3 = Animal(
        owner_id = 6,
        type = 'Cat',
        name = 'Fuzzbucket',
        age = 'Kitten',
        gender = 'Female',
        size = 'Small',
        primary_breed = 'Maine Coon',
        secondary_breed = "Domestic Long Hair",
        color = 'Gray / Blue / Silver',
        coat_length = "Long",
        house_trained = True,
        vaccinated = True,
        fixed = True,
        good_with = 'Other cats, dogs, children',
        description = "Introducing Fuzzbucket, the adorable female Maine Coon kitten with an abundance of fluff and charm! With her playful antics and irresistible fluffy coat, Fuzzbucket is sure to melt hearts wherever she goes. This little ball of fur is known for her mischievous nature and boundless energy. From chasing her favorite toys to scaling the highest heights, Fuzzbucket's adventurous spirit knows no bounds. But don't let her playful nature fool you—underneath all that fluff, she's a sweet and affectionate companion. Fuzzbucket loves snuggling up in your lap for some cozy cuddles and gentle strokes. Her expressive eyes and gentle purrs will make you fall head over heels for her in no time. As a Maine Coon, Fuzzbucket will grow into a majestic beauty, with her tufted ears and large paws adding to her charm. If you're ready to embark on a lifelong journey of joy and fluffy companionship, bring Fuzzbucket home and let the laughter and love fill your days. Adopt this delightful Maine Coon kitten and watch as she brings endless smiles and warmth to your heart.",
        adoption_fee = 150.00
    )

    cat4 = Animal(
        owner_id = 6,
        type = 'Cat',
        name = 'Chungus',
        age = 'Adult',
        gender = 'Male',
        size = 'Extra Large',
        primary_breed = 'Domestic Short Hair',
        color = 'Tabby (Brown / Chocolate)',
        coat_length = "Short",
        house_trained = True,
        fixed = True,
        good_with = 'Other cats, dogs, children',
        description = "Meet Chungus, the larger-than-life male cat with a personality that matches his impressive size. With his commanding presence and gentle demeanor, Chungus is truly a cat of grand proportions. This big boy has a heart to match, as he's known for his loving nature and affectionate ways. Despite his size, Chungus is a gentle giant who adores curling up in your lap for some quality cuddle time. His soft, plush fur and deep rumbling purrs will instantly put you at ease. Chungus is also a fan of leisurely strolls and lounging in the sun, showcasing his majestic presence. Don't let his size fool you - he's a graceful and agile feline, capable of elegant leaps and impressive feats of playfulness. Chungus has a knack for capturing everyone's attention with his undeniable charm and magnetic personality. If you're looking for a devoted companion and a furry friend who knows how to make a grand entrance, Chungus is the perfect match. Bring this larger-than-life cat home and experience the joy of having Chungus as your forever feline companion.",
        adoption_fee = 100.00
    )

    dog1 = Animal(
        owner_id = 4,
        type = 'Dog',
        name = 'Odie',
        age = 'Puppy',
        gender = 'Male',
        size = 'Large',
        primary_breed = 'American Foxhound',
        secondary_breed = 'Beagle',
        color = 'Tricolor (Brown, Black, & White), Red / Chestnut / Orange',
        characteristics = 'Friendly, Affectionate, Loyal, Gentle, Playful, Smart, Brave, Curious, Funny, Athletic, Couch potato, Loves kisses',
        coat_length = "Short",
        house_trained = True,
        vaccinated = True,
        fixed = True,
        good_with = 'Other dogs, cats, children, other animals',
        description = "Introducing Odie, the adorable male puppy who will steal your heart with his playful and lovable nature. With his floppy ears, wagging tail, and a perpetually wagging tongue, Odie is a bundle of pure joy and happiness. This little furball is always ready for adventure and can turn the simplest activities into an exciting game. Whether it's chasing after a ball, exploring new scents, or frolicking in the grass, Odie's boundless energy is contagious. His expressive eyes are filled with curiosity and a genuine eagerness to discover the world around him. Odie has a heart full of love and is quick to shower you with wet kisses and cuddles, always seeking your attention and affection. His playful antics and goofy personality will keep you entertained and bring endless laughter to your home. Odie is not just a puppy; he's a loyal companion who will grow into a faithful and devoted friend for life. If you're ready for a lifetime of wagging tails and unconditional love, adopt Odie and embark on a wonderful journey filled with happiness and puppy adventures.",
        adoption_fee = 675.00,
    )

    dog2 = Animal(
        owner_id = 5,
        type = 'Dog',
        name = 'Thor',
        age = 'Adult',
        gender = 'Male',
        size = 'Large',
        primary_breed = 'Rottweiler',
        secondary_breed = 'Boxer',
        house_trained = True,
        vaccinated = True,
        fixed = True,
        good_with = 'Other dogs, cats, children',
        description = "If you're looking for a gentle giant, this is your boy. Thor loves nothing more than to be with his people, wherever they are. Every car ride is a new adventure, and if you're a homebody that loves to lounge, that's exactly where you'll find this hunk. If he's not right with you, best believe he's not far away, lounging on the couch or upside down on a dog bed, living his best and most comfortable life. Look at this guy he's just a big ol' Thor. He's got that rottie smile, those tender eyes, and a winning personality to boot. Scary dog privileges is only a perception that others have when it comes to this hunk of love; unless you're a fly, you've got nothing to fear when Thor is near. All he wants is love, and a soft place to sleep. Your feet will do nicely if there's nothing else available.",
        adoption_fee = 500.00,
    )

    dog3 = Animal(
        owner_id = 5,
        type = 'Dog',
        name = 'Honey',
        age = 'Adult',
        gender = 'Female',
        size = 'Small',
        primary_breed = 'Chihuahua',
        secondary_breed = 'Unknown',
        house_trained = True,
        vaccinated = True,
        fixed = True,
        special_needs = True,
        good_with = 'Other dogs, cats',
        description = "Meet Honey, the sweet and endearing elderly Chihuahua who will warm your heart with her gentle spirit and undeniable charm. She is seeking a retirement home with no steps and where she can live out her golden years in peace. Despite her age and vision impairment, Honey possesses a spirit that shines bright. With her adorable button nose and soft, honey-colored coat, she's simply irresistible. A loving and patient family who can provide her with a balanced diet and support her weight loss goals will be the perfect match for Honey. \n If you're looking to make a difference in the life of a senior dog and provide a nurturing environment for a furry friend in need, Honey is waiting for you. Open your heart and home to this precious Chihuahua, and experience the immeasurable joy and unconditional love that comes with caring for an elderly companion like Honey.",
        adoption_fee = 300.00,
    )

    dog4 = Animal(
        owner_id = 6,
        type = 'Dog',
        name = 'Pattie',
        age = 'Young',
        gender = 'Female',
        size = 'Large',
        primary_breed = 'Pit Bull Terrier',
        secondary_breed = 'Unknown',
        color = 'White / Cream, Black',
        characteristics = 'Friendly, Affectionate, Loyal, Gentle, Playful, Smart, Quiet, Athletic, Funny, Curious, Couch potato, Loves kisses',
        coat_length = "Short",
        house_trained = True,
        vaccinated = True,
        fixed = True,
        good_with = 'Other dogs, cats, children, other animals',
        description = "Introducing Pattie, the energetic and lovable young female Pit Bull Terrier mix who will capture your heart with her playful spirit and affectionate nature. With her sleek coat and expressive eyes, Pattie is a true beauty. She exudes boundless energy and enthusiasm, always ready for a fun adventure or a game of fetch in the park. Pattie loves being active and enjoys long walks and outdoor activities that allow her to stretch her legs and explore her surroundings. Despite her energetic nature, Pattie has a gentle and loving side. She adores human companionship and is known for her cuddling skills, always seeking to snuggle up beside you and shower you with affectionate kisses. Pattie is a quick learner and thrives on positive reinforcement, making her an ideal candidate for obedience training and further bonding with her new family. She is also great with children and has a friendly disposition towards other dogs. If you're looking for a devoted and fun-loving companion to join your family, Pattie is the perfect match. Bring this young Pit Bull Terrier mix home and experience the joy and love she'll bring to your life.",
        adoption_fee = 375.00,
    )

    rabbit1 = Animal(
        owner_id = 6,
        type = 'Rabbit',
        name = 'Mirko',
        age = 'Adult',
        gender = 'Female',
        size = 'Medium',
        primary_breed = 'English Spot Mix',
        color = 'White, Tan',
        coat_length = "Short",
        description = "Meet Mirko, the adorable and independent female rabbit who prefers a calm and serene environment. With her beautiful fur and captivating presence, Mirko is a true gem. While she may not be the best fit for households with young children, she thrives in a quiet and peaceful setting. Mirko enjoys exploring her surroundings and indulging in her favorite treats. She appreciates gentle interactions and prefers to observe from a cozy spot. Mirko's independent nature makes her a low-maintenance companion who appreciates her own space and personal time. If you're seeking a rabbit companion for a tranquil and adult-oriented home, Mirko is the perfect match. Embrace her unique personality and give her the loving and understanding environment she deserves. Adopt Mirko and experience the joy of having a charming and independent rabbit companion by your side.",
        adoption_fee = 25.00,
    )

    turtle1 = Animal(
        owner_id = 6,
        type = 'Scales, Fins, & Other',
        name = 'Donatello',
        age = 'Adult',
        gender = 'Male',
        size = 'Medium',
        primary_breed = 'Red-Eared Slider',
        color = 'Brown, Black, Yellow',
        description = "Introducing Donatello, the magnificent turtle with a shell as unique as his name. Donatello is a fascinating and captivating reptile who will bring a touch of wonder to your home. With his sleek, scaly body and vibrant shell, he is truly a sight to behold. Donatello is a creature of serenity and grace, often seen leisurely exploring his surroundings or basking in the warmth of his habitat. He has a wise and calm demeanor that adds to his mystique. Donatello appreciates a well-maintained and spacious tank that allows him to roam and swim freely. As an omnivorous turtle, he enjoys a varied diet that includes a mix of vegetables, fruits, and protein. Donatello is a low-maintenance companion, but he thrives on a consistent routine and proper care. Observing his slow and deliberate movements can be both calming and fascinating, reminding us of the beauty of nature's creatures. If you're looking to add a unique and enchanting touch to your home, Donatello is the perfect choice. Embrace the wonder of this remarkable turtle and embark on an extraordinary journey of companionship.",
        adoption_fee = 1.00,
    )


    pets = [cat1, cat2, cat3, cat4, dog1, dog2, dog3, dog4, rabbit1, turtle1]

    [db.session.add(pet) for pet in pets]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_animals():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.animals RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM animals"))

    db.session.commit()
