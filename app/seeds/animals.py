from app.models import db, Animal, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta

from random import randint, choice

age_choices = ["Baby", "Young", "Adult", "Senior"]
size_choices = ["Small", "Medium", "Large", "Extra Large"]
gender_choices = ["Male", "Female"]
bool_choices = [True, False]

dog_breeds = ["Black Labrador Retriever", "Border Collie", "Pit Bull", "Husky", "Dachshund"]

female_dog_names = ["Lola", "Coco", "Bella", "Sadie", "Roxy"]
female_dog_desc = [
"This spunky and affectionate pup has a lively spirit that brightens up any room. She loves to play fetch in the park, and her tail wags with excitement whenever she sees her favorite toy. With a heart full of love, she enjoys snuggling up with her human companions, bringing warmth and joy to their lives.",
"Meet the epitome of elegance and grace. This sophisticated female dog carries herself with poise and charm, making heads turn wherever she goes. Her regal demeanor is matched by her intelligence and quick learning ability. She enjoys leisurely walks, exploring the world around her with a sense of curiosity.",
"Playful and intelligent, this furry friend is always up for a new adventure. Her boundless energy keeps everyone on their toes, and she's ever ready to try out new tricks. She's a social butterfly, delighting in the company of both humans and other dogs. Her inquisitive nature leads her to explore every nook and cranny of her surroundings.",
"Gaze into her soulful eyes and feel your heart melt. This gentle and loyal companion has an unbreakable bond with her human family. She's a calm presence, offering comfort during both happy and challenging times. She relishes quiet moments, cherishing every second spent snuggled up in a cozy spot.",
"If there's a party, you can bet she's the life of it! Full of energy and enthusiasm, this lively female dog brings joy and laughter to everyone around her. She loves to run, play, and engage in games that keep her engaged and entertained. With her playful antics, she keeps the atmosphere vibrant and fun-filled."
]

male_dog_names = ["Max", "Buddy", "Charlie", "Rocky", "Duke"]
male_dog_desc = [
"This pup is full of energy and loves to play fetch in the park. He's an adventurous and curious companion, always eager to explore the world around him. With a wagging tail and a big heart, he brings joy and happiness to his human family.",
"Meet the epitome of loyalty and affection. This furry friend is deeply devoted to his human companions, making them feel loved and cherished every day. He enjoys long walks and snuggling up for cuddles, creating a strong bond with those he holds dear.",
"Playful and intelligent, this canine buddy is a quick learner and enjoys engaging in mental challenges. He's social and friendly, making friends wherever he goes. His infectious enthusiasm brings smiles to the faces of everyone he meets.",
"Gaze into his soulful eyes and feel an instant connection. This gentle and calm pup has a soothing presence, providing comfort and solace to those around him. He's the perfect companion for peaceful moments and is always ready to lend a listening ear.",
"If there's a party, you can bet he's the life of it! This spirited and lively pup has an abundance of energy and a playful personality. He loves outdoor adventures and enjoys the company of both humans and other dogs. With his charisma, he steals hearts wherever he goes."
]

rabbit_breeds = ["Bunny Rabbit", "Jersey Wooly", "Lionhead", "Netherland Dwarf", "American", "Bunny Rabbit", "Jersey Wooly", "Lionhead", "Netherland Dwarf", "American"]
rabbit_names = ["Thumper","Clover","Cottontail","Snowball","Flopsy","Peter","Hazel","Cotton","Bun-Bun","Willow"]
rabbit_desc = [
    "Meet the adorable fluffy bunny! This playful and inquisitive rabbit is always on the lookout for new adventures. With its soft fur and cute twitching nose, it's hard to resist falling in love with this little explorer. Whether hopping around the garden or snuggling up for a cuddle, this rabbit's gentle and affectionate nature will warm your heart.",
    "Introducing the clever and mischievous rabbit! With a keen intellect and a playful spirit, this furry friend is always up to something exciting. Whether it's solving little puzzles or finding hidden treats, this rabbit's curiosity knows no bounds. But don't worry, underneath that mischievous exterior lies a heart of gold, ready to share love and affection with its human companions.",
    "Say hello to the sweet and friendly rabbit! This lovable companion is a master at making friends, both with humans and fellow animals alike. Its gentle and kind nature makes it the perfect cuddle buddy, and you can always count on this rabbit to brighten your day with its charming personality. Whether it's exploring new places or lounging in a cozy corner, this rabbit is always ready for some fun.",
    "Behold the energetic whirlwind! This lively rabbit is a bundle of joy, constantly zooming around with boundless energy. Whether it's racing through tunnels, playing with toys, or just being its goofy self, this rabbit's playful antics are sure to bring a smile to your face. But when it's time to wind down, this little ball of energy also enjoys relaxing cuddle sessions with its favorite humans.",
    "Meet the calm and observant rabbit. With a serene demeanor and a watchful eye, this rabbit is always aware of its surroundings. It enjoys quiet moments, taking in the beauty of nature and the comfort of its home. This rabbit's peaceful presence is a soothing balm to anyone seeking a moment of tranquility. Yet, it's always up for some gentle play and a warm snuggle when the mood strikes.",
    "Introducing the charming companion! This rabbit's magnetic personality draws people in with ease. Its friendly and sociable nature makes it a delight to be around, and it thrives on human interaction and companionship. Whether it's bonding over shared activities or simply enjoying each other's company, this rabbit's company is a gift that keeps on giving.",
    "Say hello to the little explorer! With a curious spirit and a thirst for knowledge, this rabbit is always on a quest to uncover the mysteries of its world. It delights in investigating new sights and smells, and its inquisitive nature will keep you entertained for hours. When it's not on its grand adventures, this rabbit enjoys quiet moments of reflection, savoring the wonders of the world around it.",
    "Introducing the independent spirit! This rabbit is a self-reliant and confident individual, content in its own company while also enjoying the companionship of its humans. With a touch of mysterious allure, this rabbit's enigmatic nature will keep you intrigued. And when it chooses to share its affection, you'll feel incredibly special to have earned the trust of this charming friend.",
    "Meet the cuddle enthusiast! This affectionate rabbit is a master at snuggling and enjoys nothing more than cozying up with its loved ones. Its loving nature makes it a great companion, always ready to offer comfort and warmth. This rabbit's soft and gentle heart shines through in every interaction, reminding you of the joy and tenderness that comes with having a furry friend by your side.",
    "Say hello to the social butterfly! This rabbit is a natural charmer, effortlessly making friends wherever it goes. Its outgoing personality and warm demeanor make it a popular guest at any gathering. Whether it's playdates with fellow rabbits or spending quality time with its human family, this rabbit thrives on social interactions and will fill your life with happiness and laughter.",
]

small_creature_breeds = ["Hamster", "Ferret", "Guinea Pig", "Mouse", "Rat", "Hamster", "Ferret", "Guinea Pig", "Mouse", "Rat"]
small_creature_names = ["Peanut","Whiskers","Nibbles","Cocoa","Snuggles","Hazel","Chester","Pumpkin","Biscuit","Squeaky"]
small_creature_desc = [
    "A playful and curious hamster, always busy exploring its surroundings and stuffing its cheeks with food.",
    "An affectionate and intelligent ferret, with boundless energy and a mischievous nature.",
    "A gentle and sociable guinea pig, known for its cheerful squeaks and love for fresh veggies.",
    "A tiny and agile mouse, with a keen sense of smell and a talent for squeezing through small spaces.",
    "An intelligent and social rat, forming strong bonds with its rat pack and enjoying interactive toys.",
    "A busy and energetic hamster, running on its wheel and building intricate nests with bedding.",
    "A clever and inquisitive ferret, always on the lookout for new adventures and games to play.",
    "A docile and gentle guinea pig, enjoying the company of its human friends and fellow guinea pigs.",
    "A quick and nimble mouse, darting around with lightning speed and possessing impressive agility.",
    "A smart and curious rat, always exploring its environment and learning new tricks with ease.",
]



def random_date(start, end):
    """Generate a random datetime between `start` and `end` which
    should be datetime objects"""
    random_date = start + timedelta(
        # Get a random amount of seconds between `start` and `end`
        seconds = randint(0, int((end - start).total_seconds())),
    )
    return random_date


def seed_animals():
    cat1 = Animal(
        owner_id = 1,
        type = 'Cat',
        name = 'Mack Truck',
        age = 'Young',
        gender = 'Male',
        size = 'Large',
        primary_breed = 'Domestic Short Hair',
        color = 'Black & White / Tuxedo',
        house_trained = True,
        vaccinated = True,
        fixed = True,
        good_with_cats = True,
        good_with_dogs = True,
        description = "Meet Mack Truck, the charming and mischievous male cat with a personality that is impossible to ignore. With his sleek fur and captivating eyes, he exudes an undeniable charisma that draws you in. This feline fellow is known for his playful nature, always ready to pounce on his favorite toys or engage in a spirited game of chase. Mack is also a social butterfly, delighting in the company of humans and other pets alike. Whether it's curling up beside you for a cozy snuggle session or entertaining you with his acrobatic antics, Mack is sure to bring joy and laughter to your home. Mack is a true sweetheart who will steal your heart with his endearing charm and boundless affection. Adopt this lovable male cat today and experience the joy of having Mack as your forever companion.",
        adoption_fee = 120.00,
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,6,1))
    )

    cat2 = Animal(
        owner_id = 2,
        type = 'Cat',
        name = 'Catniss Everqueen',
        age = 'Senior',
        gender = 'Female',
        size = 'Medium',
        primary_breed = 'Domestic Short Hair',
        color = 'Calico',
        house_trained = True,
        vaccinated = True,
        fixed = True,
        good_with_cats = True,
        description = "Catniss is middle aged lady that has been with us since October. She came in with her babies and wasn't super happy around people, so she went to one of the shelter's experienced fosters to raise her babies and see if she could learn to enjoy living with people. Catniss raised her babies and was a great mother, as she also learned what is was to live in a loving home. All of her little ones were adopted into wonderful homes, and she has still remained in foster care waiting for the perfect understanding forever home. She is not a jump in your lap cat, but enjoys cohabitating and makes a great indoor mouser. She likes to relax around you on the couch or in a window, just at a distance. Catniss is not mean or aggressive, she just never learned that people can be nice, but is making great progress and starting to really come around with continued patience and work she will continue to make progress with attention.",
        adoption_fee = 80.00,
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,6,1))
    )

    cat3 = Animal(
        owner_id = 5,
        type = 'Cat',
        name = 'Fuzzbucket',
        age = 'Baby',
        gender = 'Female',
        size = 'Small',
        primary_breed = 'Maine Coon',
        secondary_breed = "Domestic Long Hair",
        color = 'Gray / Blue / Silver',
        house_trained = True,
        vaccinated = True,
        fixed = True,
        good_with_cats = True,
        good_with_dogs = True,
        good_with_children = True,
        description = "Introducing Fuzzbucket, the adorable female Maine Coon kitten with an abundance of fluff and charm! With her playful antics and irresistible fluffy coat, Fuzzbucket is sure to melt hearts wherever she goes. This little ball of fur is known for her mischievous nature and boundless energy. From chasing her favorite toys to scaling the highest heights, Fuzzbucket's adventurous spirit knows no bounds. But don't let her playful nature fool you—underneath all that fluff, she's a sweet and affectionate companion. Fuzzbucket loves snuggling up in your lap for some cozy cuddles and gentle strokes. Her expressive eyes and gentle purrs will make you fall head over heels for her in no time. As a Maine Coon, Fuzzbucket will grow into a majestic beauty, with her tufted ears and large paws adding to her charm. If you're ready to embark on a lifelong journey of joy and fluffy companionship, bring Fuzzbucket home and let the laughter and love fill your days. Adopt this delightful Maine Coon kitten and watch as she brings endless smiles and warmth to your heart.",
        adoption_fee = 150.00,
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,6,1))
    )

    cat4 = Animal(
        owner_id = 4,
        type = 'Cat',
        name = 'Chungus',
        age = 'Adult',
        gender = 'Male',
        size = 'Extra Large',
        primary_breed = 'Domestic Short Hair',
        color = 'Tabby (Brown / Chocolate)',
        house_trained = True,
        fixed = True,
        good_with_cats = True,
        good_with_dogs = True,
        good_with_children = True,
        description = "Meet Chungus, the larger-than-life male cat with a personality that matches his impressive size. With his commanding presence and gentle demeanor, Chungus is truly a cat of grand proportions. This big boy has a heart to match, as he's known for his loving nature and affectionate ways. Despite his size, Chungus is a gentle giant who adores curling up in your lap for some quality cuddle time. His soft, plush fur and deep rumbling purrs will instantly put you at ease. Chungus is also a fan of leisurely strolls and lounging in the sun, showcasing his majestic presence. Don't let his size fool you - he's a graceful and agile feline, capable of elegant leaps and impressive feats of playfulness. Chungus has a knack for capturing everyone's attention with his undeniable charm and magnetic personality. If you're looking for a devoted companion and a furry friend who knows how to make a grand entrance, Chungus is the perfect match. Bring this larger-than-life cat home and experience the joy of having Chungus as your forever feline companion.",
        adoption_fee = 100.00,
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,6,1))
    )


    dog1 = Animal(
        owner_id = 4,
        type = 'Dog',
        name = 'Odie',
        age = 'Baby',
        gender = 'Male',
        size = 'Large',
        primary_breed = 'American Foxhound',
        secondary_breed = 'Beagle',
        color = 'Tricolor (Brown, Black, & White)',
        house_trained = True,
        vaccinated = True,
        fixed = True,
        good_with_cats = True,
        good_with_dogs = True,
        good_with_children = True,
        good_with_other_animals = True,
        description = "Introducing Odie, the adorable male puppy who will steal your heart with his playful and lovable nature. With his floppy ears, wagging tail, and a perpetually wagging tongue, Odie is a bundle of pure joy and happiness. This little furball is always ready for adventure and can turn the simplest activities into an exciting game. Whether it's chasing after a ball, exploring new scents, or frolicking in the grass, Odie's boundless energy is contagious. His expressive eyes are filled with curiosity and a genuine eagerness to discover the world around him. Odie has a heart full of love and is quick to shower you with wet kisses and cuddles, always seeking your attention and affection. His playful antics and goofy personality will keep you entertained and bring endless laughter to your home. Odie is not just a puppy; he's a loyal companion who will grow into a faithful and devoted friend for life. If you're ready for a lifetime of wagging tails and unconditional love, adopt Odie and embark on a wonderful journey filled with happiness and puppy adventures.",
        adoption_fee = 675.00,
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,6,1))
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
        good_with_cats = True,
        good_with_dogs = True,
        good_with_children = True,
        description = "If you're looking for a gentle giant, this is your boy. Thor loves nothing more than to be with his people, wherever they are. Every car ride is a new adventure, and if you're a homebody that loves to lounge, that's exactly where you'll find this hunk. If he's not right with you, best believe he's not far away, lounging on the couch or upside down on a dog bed, living his best and most comfortable life. Look at this guy, he's just a big ol' lug. He's got that rottie smile, those tender eyes, and a winning personality to boot. Scary dog privileges is only a perception that others have when it comes to this hunk of love; unless you're a fly, you've got nothing to fear when Thor is near. All he wants is love, and a soft place to sleep. Your feet will do nicely if there's nothing else available.",
        adoption_fee = 500.00,
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,6,1))
    )

    dog3 = Animal(
        owner_id = 2,
        type = 'Dog',
        name = 'Honey',
        age = 'Senior',
        gender = 'Female',
        size = 'Small',
        primary_breed = 'Chihuahua',
        secondary_breed = 'Unknown',
        house_trained = True,
        vaccinated = True,
        fixed = True,
        special_needs = True,
        good_with_cats = True,
        good_with_dogs = True,
        description = "Meet Honey, the sweet and endearing elderly Chihuahua who will warm your heart with her gentle spirit and undeniable charm. She is seeking a retirement home with no steps and where she can live out her golden years in peace. Despite her age and vision impairment, Honey possesses a spirit that shines bright. With her adorable button nose and soft, honey-colored coat, she's simply irresistible. A loving and patient family who can provide her with a balanced diet and support her weight loss goals will be the perfect match for Honey. \n If you're looking to make a difference in the life of a senior dog and provide a nurturing environment for a furry friend in need, Honey is waiting for you. Open your heart and home to this precious Chihuahua, and experience the immeasurable joy and unconditional love that comes with caring for an elderly companion like Honey.",
        adoption_fee = 300.00,
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,6,1))
    )

    dog4 = Animal(
        owner_id = 3,
        type = 'Dog',
        name = 'Pattie',
        age = 'Young',
        gender = 'Female',
        size = 'Large',
        primary_breed = 'Pit Bull Terrier',
        secondary_breed = 'Unknown',
        color = 'White / Cream, Black',
        house_trained = True,
        vaccinated = True,
        fixed = True,
        good_with_cats = True,
        good_with_dogs = True,
        good_with_children = True,
        good_with_other_animals = True,
        description = "Introducing Pattie, the energetic and lovable young female Pit Bull Terrier mix who will capture your heart with her playful spirit and affectionate nature. With her sleek coat and expressive eyes, Pattie is a true beauty. She exudes boundless energy and enthusiasm, always ready for a fun adventure or a game of fetch in the park. Pattie loves being active and enjoys long walks and outdoor activities that allow her to stretch her legs and explore her surroundings. Despite her energetic nature, Pattie has a gentle and loving side. She adores human companionship and is known for her cuddling skills, always seeking to snuggle up beside you and shower you with affectionate kisses. Pattie is a quick learner and thrives on positive reinforcement, making her an ideal candidate for obedience training and further bonding with her new family. She is also great with children and has a friendly disposition towards other dogs. If you're looking for a devoted and fun-loving companion to join your family, Pattie is the perfect match. Bring this young Pit Bull Terrier mix home and experience the joy and love she'll bring to your life.",
        adoption_fee = 375.00,
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,6,1))
    )

    rabbit1 = Animal(
        owner_id = 2,
        type = 'Rabbit',
        name = 'Mirko',
        age = 'Adult',
        gender = 'Female',
        size = 'Medium',
        primary_breed = 'English Spot Mix',
        color = 'White, Tan',
        description = "Meet Mirko, the adorable and independent female rabbit who prefers a calm and serene environment. With her beautiful fur and captivating presence, Mirko is a true gem. While she may not be the best fit for households with young children, she thrives in a quiet and peaceful setting. Mirko enjoys exploring her surroundings and indulging in her favorite treats. She appreciates gentle interactions and prefers to observe from a cozy spot. Mirko's independent nature makes her a low-maintenance companion who appreciates her own space and personal time. If you're seeking a rabbit companion for a tranquil and adult-oriented home, Mirko is the perfect match. Embrace her unique personality and give her the loving and understanding environment she deserves. Adopt Mirko and experience the joy of having a charming and independent rabbit companion by your side.",
        adoption_fee = 25.00,
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,6,1))
    )

    turtle1 = Animal(
        owner_id = 3,
        type = 'Scales, Fins, & Other',
        name = 'Donatello',
        age = 'Adult',
        gender = 'Male',
        size = 'Medium',
        primary_breed = 'Red-Eared Slider',
        color = 'Brown, Black, Yellow',
        description = "Introducing Donatello, the magnificent turtle with a shell as unique as his name. Donatello is a fascinating and captivating reptile who will bring a touch of wonder to your home. With his sleek, scaly body and vibrant shell, he is truly a sight to behold. Donatello is a creature of serenity and grace, often seen leisurely exploring his surroundings or basking in the warmth of his habitat. He has a wise and calm demeanor that adds to his mystique. Donatello appreciates a well-maintained and spacious tank that allows him to roam and swim freely. As an omnivorous turtle, he enjoys a varied diet that includes a mix of vegetables, fruits, and protein. Donatello is a low-maintenance companion, but he thrives on a consistent routine and proper care. Observing his slow and deliberate movements can be both calming and fascinating, reminding us of the beauty of nature's creatures. If you're looking to add a unique and enchanting touch to your home, Donatello is the perfect choice. Embrace the wonder of this remarkable turtle and embark on an extraordinary journey of companionship.",
        adoption_fee = 1.00,
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,6,1))
    )

    cat5 = Animal(
        owner_id = 6,
        type = 'Cat',
        name = 'Millie',
        age = 'Young',
        gender = 'Female',
        size = 'Medium',
        primary_breed = 'Domestic Short Hair',
        color = 'Tortoiseshell',
        house_trained = True,
        fixed = True,
        good_with_cats = True,
        description = "Meet Millie, the spirited tortoiseshell adventure cat with a captivating coat of black, orange, and brown. Millie's zest for exploration is unmatched as she fearlessly climbs trees, leaps with agility, and chases after fluttering butterflies. With a loving and affectionate nature, she forms unbreakable bonds with her human companions. Millie's sense of adventure extends to the great outdoors, making her an ideal candidate for leashed walks and supervised explorations. Her playful demeanor and mischievous antics will keep you entertained, while her loving presence fills every moment with joy. If you're ready for an extraordinary journey filled with love and thrilling escapades, Millie is the perfect feline companion for you.",
        adoption_fee = 150.00,
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,6,1))
    )

    cat6 = Animal(
        owner_id = 7,
        type = 'Cat',
        name = 'Wanda Maximoff',
        age = 'Young',
        gender = 'Female',
        size = 'Medium',
        primary_breed = 'Sphynx',
        color = 'Pink',
        house_trained = True,
        fixed = True,
        good_with_cats = True,
        description = "Introducing Wanda Maximoff, the enchanting pink sphynx cat that is as unique as her name suggests. With her hairless coat and striking pink hue, Wanda is a mesmerizing feline companion that will capture your heart. Her captivating gaze reveals a world of mystery and intelligence, as if she possesses hidden powers. Despite her regal appearance, Wanda is a gentle and affectionate companion, always seeking warmth and snuggles. Her playful nature and boundless energy will keep you entertained, as she effortlessly leaps and bounds with grace. Wanda Maximoff is not just a cat; she is a true marvel that will bring endless joy and a touch of magic into your life.",
        adoption_fee = 150.00,
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,6,1))
    )

    cat7 = Animal(
        owner_id = 7,
        type = 'Cat',
        name = 'Yoda Hoang',
        age = 'Adult',
        gender = 'Male',
        size = 'Medium',
        primary_breed = 'Sphynx',
        color = 'Brown',
        house_trained = True,
        fixed = True,
        good_with_cats = True,
        description = "Meet Yoda, the wise and intriguing brown sphynx cat. With his hairless coat and unique appearance, Yoda captures attention wherever he goes. His soulful eyes seem to hold ancient wisdom, as if he possesses the secrets of the universe. Despite his mysterious aura, Yoda has a gentle and affectionate nature. He loves to curl up in your lap, offering comfort and companionship. Yoda's playful spirit shines through as he gracefully explores his surroundings, his agile movements reminiscent of a mystical creature. This extraordinary feline companion is not just a cat, but a wise sage and loyal friend who will bring a touch of magic and tranquility to your life. Embrace the enchantment of Yoda's presence and embark on a unique journey of companionship and enlightenment.",
        adoption_fee = 150.00,
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,6,1))
    )

    dog5 = Animal(
        owner_id = 7,
        type = 'Dog',
        name = 'Charles',
        age = 'Adult',
        gender = 'Male',
        size = 'Small',
        primary_breed = 'Pomeranian',
        color = 'Golden',
        house_trained = True,
        vaccinated = True,
        good_with_cats = True,
        good_with_dogs = True,
        good_with_children = True,
        good_with_other_animals = True,
        description = "Meet Charles, the adventurous Pomeranian who has traveled the world in search of thrilling experiences. With his fluffy golden coat and playful demeanor, Charles captivates hearts wherever he goes. From exploring nature trails to conquering agility courses, he fearlessly embraces every adventure. Despite his small size, Charles possesses a big personality and an infectious joie de vivre. Whether he's making new friends at the dog park or captivating audiences with his playful antics, Charles brings joy and excitement to every moment. Join Charles on his globe-trotting adventures and create cherished memories with this spirited and well-traveled companion.",
        adoption_fee = 1500.00,
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,6,1))
    )

    cat8 = Animal(
        owner_id = 8,
        type = 'Cat',
        name = 'Greyson',
        age = 'Baby',
        gender = 'Male',
        size = 'Small',
        primary_breed = 'Domestic Short Hair',
        color = 'Grey, White',
        house_trained = True,
        vaccinated = True,
        fixed = True,
        good_with_cats = True,
        description = "Meet Greyson, the enchanting grey kitten with endearing white socks. With his velvety soft fur, ranging in delicate shades of grey, he's a sight to behold. Greyson's captivating appearance, highlighted by his charming white paws, instantly draws attention and melts hearts. His inquisitive nature, gentle demeanor, and playful spirit make him an irresistible delight. Greyson's bright eyes and perky ears add to his undeniable cuteness. He loves cuddles, exploring his surroundings, and playing with toys. This little feline brings joy and happiness to anyone lucky enough to have him.",
        adoption_fee = 120.00,
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,6,1))
    )

    cat9 = Animal(
        owner_id = 9,
        type = 'Cat',
        name = 'Ham',
        age = 'Adult',
        gender = 'Male',
        size = 'Large',
        primary_breed = 'Domestic Short Hair',
        color = 'Orange, White',
        house_trained = True,
        vaccinated = True,
        fixed = True,
        description = "Meet Ham, a 4 year old cat who sports a vibrant orange and white coat that matches his mischievous personality perfectly. With a twinkle in his eyes and a sly demeanor, he keeps his human companions on their toes. Whether he's playfully pouncing on toys or seeking out hidden treasures, Ham's mischievous charm and playful energy are contagious. Yet, beneath his antics, he possesses a gentle and affectionate side, seeking warm laps and cuddles. With his intelligence and curiosity, Ham brings endless laughter and surprises, brightening each day with his mischievous spirit and undeniable charm.",
        adoption_fee = 120.00,
        created_at = random_date(datetime(2022, 1, 1), datetime(2023,6,1))
    )

    pets = [cat1, cat2, cat3, cat4, dog1, dog2, dog3, dog4, rabbit1, turtle1, cat5, cat6, cat7, dog5, cat8, cat9]

    [db.session.add(pet) for pet in pets]

    for i in range(0, len(female_dog_names)):
        newDog = Animal(
            owner_id = randint(1, 5),
            type = 'Dog',
            name = female_dog_names[i],
            age = choice(age_choices),
            gender = "Female",
            size = choice(size_choices),
            primary_breed = dog_breeds[i],
            house_trained = choice(bool_choices),
            vaccinated = choice(bool_choices),
            fixed = choice(bool_choices),
            good_with_cats = choice(bool_choices),
            good_with_dogs = choice(bool_choices),
            good_with_children = choice(bool_choices),
            good_with_other_animals = choice(bool_choices),
            special_needs = choice(bool_choices),
            description = female_dog_desc[i],
            adoption_fee = randint(100, 1000),
            created_at = random_date(datetime(2021, 1, 1), datetime(2022,1,1))
        )

        db.session.add(newDog)

    for i in range(0, len(male_dog_names)):
        newDog = Animal(
            owner_id = randint(1, 5),
            type = 'Dog',
            name = male_dog_names[i],
            age = choice(age_choices),
            gender = "Male",
            size = choice(size_choices),
            primary_breed = dog_breeds[i],
            house_trained = choice(bool_choices),
            vaccinated = choice(bool_choices),
            fixed = choice(bool_choices),
            good_with_cats = choice(bool_choices),
            good_with_dogs = choice(bool_choices),
            good_with_children = choice(bool_choices),
            good_with_other_animals = choice(bool_choices),
            special_needs = choice(bool_choices),
            description = male_dog_desc[i],
            adoption_fee = randint(100, 1000),
            created_at = random_date(datetime(2021, 1, 1), datetime(2022,1,1))
        )

        db.session.add(newDog)

    for i in range(0, len(rabbit_names)):
        newRabbit = Animal(
            owner_id = randint(3, 5),
            type = 'Rabbit',
            name = rabbit_names[i],
            age = choice(age_choices),
            gender = choice(gender_choices),
            size = choice(size_choices),
            primary_breed = rabbit_breeds[i],
            good_with_cats = choice(bool_choices),
            good_with_dogs = choice(bool_choices),
            good_with_children = choice(bool_choices),
            good_with_other_animals = choice(bool_choices),
            description = rabbit_desc[i],
            adoption_fee = randint(10, 100),
            created_at = random_date(datetime(2021, 1, 1), datetime(2022,1,1))
        )

        db.session.add(newRabbit)

    for i in range(0, len(small_creature_names)):
        newRabbit = Animal(
            owner_id = randint(3, 5),
            type = 'Small & Furry',
            name = small_creature_names[i],
            age = choice(age_choices),
            gender = choice(gender_choices),
            size = choice(size_choices),
            primary_breed = small_creature_breeds[i],
            good_with_cats = choice(bool_choices),
            good_with_dogs = choice(bool_choices),
            good_with_children = choice(bool_choices),
            good_with_other_animals = choice(bool_choices),
            description = small_creature_desc[i],
            adoption_fee = randint(10, 50),
            created_at = random_date(datetime(2021, 1, 1), datetime(2022,1,1))
        )

        db.session.add(newRabbit)



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
