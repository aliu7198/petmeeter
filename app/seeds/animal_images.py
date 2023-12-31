from app.models import db, Animal, AnimalImage, environment, SCHEMA
from sqlalchemy.sql import text
from random import shuffle

image_urls = {
    "Black Labrador Retriever": [
        "https://images.unsplash.com/photo-1602941953280-ea523175bcfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBsYWJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1564665348269-dcea9031b228?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxhY2slMjBsYWJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1516383074327-ac4841225abf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmxhY2slMjBsYWJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
        ],
    "Border Collie": [
        "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9yZGVyJTIwY29sbGllfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1593270379182-fe1b1f6d67e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9yZGVyJTIwY29sbGllfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1511732782465-412b656f2291?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJvcmRlciUyMGNvbGxpZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
        ],
    "Pit Bull": [
        "https://images.unsplash.com/photo-1604606363386-dd3f2357ad87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl0JTIwYnVsbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1604606370896-41bfdc2626d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGl0JTIwYnVsbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
        ],
    "Husky": [
        "https://images.unsplash.com/photo-1585072857532-4bffcc57aaee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGh1c2t5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1616567214738-22fc0c6332b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aHVza3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGh1c2t5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
        ],
    "Dachshund": [
        "https://images.unsplash.com/photo-1618265341355-d0e2d1fdf26b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGFjaHNodW5kfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGFjaHNodW5kfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1556796879-160fd67614ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRhY2hzaHVuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
        ],
    "Bunny Rabbit": ["https://cdn.discordapp.com/attachments/1118675490870399017/1130966602532278300/1.png"],
    "Jersey Wooly": ["https://cdn.discordapp.com/attachments/1118675490870399017/1130967225302536302/1.png"],
    "Lionhead": ["https://cdn.discordapp.com/attachments/1118675490870399017/1130967769953869864/1.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1130967770264244224/2.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1130967770587213995/4.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1130967771061166163/5.png"],
    "Netherland Dwarf": ["https://cdn.discordapp.com/attachments/1118675490870399017/1130968286302056509/1.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1130968286578872350/2.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1130968286897655868/3.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1130968287228989590/5.png"],
    "American": ["https://cdn.discordapp.com/attachments/1118675490870399017/1130969142724407366/1.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1130969143013810276/2.png"],
    "Hamster": ["https://cdn.discordapp.com/attachments/1118675490870399017/1130974797837389965/1.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1130974798105804860/2.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1130974798374260906/3.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1130974798684618762/4.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1130974798986625195/6.png"],
    "Ferret": ["https://cdn.discordapp.com/attachments/1118675490870399017/1130976857647480872/1.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1130976857983041677/2.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1130976858872217620/5.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1130976859325218846/4.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1130976858498932766/3.png"],
    "Mouse": ["https://cdn.discordapp.com/attachments/1118675490870399017/1130975727861370990/5.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1130975728171745291/1.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1130975729815916655/2.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1130975730692534312/4.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1130975731485245440/6.png"],
    "Rat": ["https://cdn.discordapp.com/attachments/1118675490870399017/1130976458219733064/1.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1130976458559455292/1.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1130976458836283423/1.png"],
    "Guinea Pig": ["https://cdn.discordapp.com/attachments/1118675490870399017/1130982556146356326/2.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1130982556544798770/1.png"],
    "Donkey": ["https://cdn.discordapp.com/attachments/1118675490870399017/1131326005794066505/2.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1131326006158950591/1.png"],
    "Quarterhorse": ["https://cdn.discordapp.com/attachments/1118675490870399017/1131327533460242492/1.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1131327533737058394/2.png"],
    "Arabian": ["https://cdn.discordapp.com/attachments/1118675490870399017/1131326547454857270/2.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1131326547735887923/1.png"],
    "Appaloosa": ["https://cdn.discordapp.com/attachments/1118675490870399017/1131326905136713758/4.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1131326905413546207/2.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1131326905740697610/3.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1131326906113986570/1.png"],
    "Pony": ["https://cdn.discordapp.com/attachments/1118675490870399017/1131329808496853042/4.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1131329808836608050/1.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1131329809163747408/2.png", "https://media.discordapp.net/attachments/1118675490870399017/1131329809415409804/3.png?width=447&height=671"],
    "Macaw": ["https://cdn.discordapp.com/attachments/1131347400909389844/1131353543484379146/1.png", "https://cdn.discordapp.com/attachments/1131347400909389844/1131353543958347786/2.png", "https://cdn.discordapp.com/attachments/1131347400909389844/1131353544327434352/6.png", "https://cdn.discordapp.com/attachments/1131347400909389844/1131353544667181056/4.png"],
    "Cockatoo": ["https://cdn.discordapp.com/attachments/1118675490870399017/1131354071173959791/1.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1131354071475945534/2.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1131354071794720808/3.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1131354072121872405/5.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1131354072444829876/6.png"],
    "Chicken": ["https://images.unsplash.com/photo-1612170153139-6f881ff067e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80", "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", "https://images.unsplash.com/photo-1569396327972-6231a5b05ea8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=989&q=80"],
    "Parakeet": ["https://images.unsplash.com/photo-1592348846067-0139af80c390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", "https://images.unsplash.com/photo-1560595643-90bb555b2eaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80", "https://images.unsplash.com/photo-1566468161976-52453dddfd69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"],
    "Pigeon": ["https://cdn.discordapp.com/attachments/1118675490870399017/1131356333124362313/1.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1131356333426343997/2.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1131356333753516092/3.png"],
    "Gecko": ["https://cdn.discordapp.com/attachments/1118675490870399017/1131360870342086726/1.png", "https://media.discordapp.net/attachments/1118675490870399017/1131360870635675778/2.png", "https://media.discordapp.net/attachments/1118675490870399017/1131360870899912804/3.png"],
    "Bearded Dragon": ["https://cdn.discordapp.com/attachments/1118675490870399017/1131361618622685294/3.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1131361618958241832/1.png", "https://media.discordapp.net/attachments/1118675490870399017/1131361619247644703/5.png", "https://media.discordapp.net/attachments/1118675490870399017/1131361619541237840/6.png", "https://media.discordapp.net/attachments/1118675490870399017/1131361619826462761/4.png"],
    "Frog": ["https://images.unsplash.com/photo-1559253664-ca249d4608c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80", "https://images.unsplash.com/photo-1551189014-fe516aed0e9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=886&q=80", "https://images.unsplash.com/photo-1550853123-b81beb0b1449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1034&q=80"],
    "Ball Python": ["https://cdn.discordapp.com/attachments/1118675490870399017/1131363136411291658/1.png", "https://media.discordapp.net/attachments/1118675490870399017/1131363136675528955/2.png", "https://media.discordapp.net/attachments/1118675490870399017/1131363136964923523/4.png"],
    "Turtle": ["https://cdn.discordapp.com/attachments/1118675490870399017/1131364505012666378/1.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1131364505369190440/2.png", "https://cdn.discordapp.com/attachments/1118675490870399017/1131364505662787654/3.png"]
}

def seed_animal_images():
    image1 = AnimalImage(
        animal_id = 1,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675737583550524/mack1.jpg'
    )

    image2 = AnimalImage(
        animal_id = 1,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675737906532492/mack2.jpg'
    )

    image3 = AnimalImage(
        animal_id = 1,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675738170757160/mack3.jpg'
    )

    image4 = AnimalImage(
        animal_id = 1,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675738476937226/mack4.jpg'
    )

    image5 = AnimalImage(
        animal_id = 1,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675737281564672/mack5.jpg'
    )

    image6 = AnimalImage(
        animal_id = 2,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675541738926120/catniss1.jpg'
    )

    image7 = AnimalImage(
        animal_id = 2,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675541466292294/catniss2.jpg'
    )

    image8 = AnimalImage(
        animal_id = 3,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675697544740925/fuzzbucket1.jpg'
    )

    image9 = AnimalImage(
        animal_id = 3,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675698316492933/fuzzbucket3.jpg'
    )

    image10 = AnimalImage(
        animal_id = 3,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675698769473546/fuzzbucket4.jpg'
    )

    image11 = AnimalImage(
        animal_id = 3,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675697972551702/fuzzbucket2.jpg'
    )

    image12 = AnimalImage(
        animal_id = 3,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675697217577000/fuzzbucket5.jpg'
    )

    image13 = AnimalImage(
        animal_id = 4,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675584340475954/chungus1.jpg'
    )

    image14 = AnimalImage(
        animal_id = 4,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675584680218684/chungus2.jpg'
    )

    image15 = AnimalImage(
        animal_id = 4,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675583866511410/chungus3.jpg'
    )

    image16 = AnimalImage(
        animal_id = 5,
        image_url = 'https://media.discordapp.net/attachments/1118675490870399017/1118675807150289026/odie1.jpg'
    )

    image17 = AnimalImage(
        animal_id = 5,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675807397740704/odie2.jpg'
    )

    image18 = AnimalImage(
        animal_id = 5,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675806844100680/odie5.jpg'
    )

    image19 = AnimalImage(
        animal_id = 5,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675807976566925/odie4.jpg'
    )

    image20 = AnimalImage(
        animal_id = 5,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675807687155833/odie3.jpg'
    )

    image21 = AnimalImage(
        animal_id = 6,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675850469056633/thor1.jpg'
    )

    image22 = AnimalImage(
        animal_id = 6,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675850095755264/thor2.jpg'
    )

    image23 = AnimalImage(
        animal_id = 7,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675703970402334/honey1.jpg'
    )

    image24 = AnimalImage(
        animal_id = 7,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675704259817602/honey2.jpg'
    )

    image25 = AnimalImage(
        animal_id = 7,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675703689388142/honey3.jpg'
    )

    image26 = AnimalImage(
        animal_id = 8,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675831707942912/pattie1.jpg'
    )

    image27 = AnimalImage(
        animal_id = 8,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675832051867718/pattie2.jpg'
    )

    image28 = AnimalImage(
        animal_id = 8,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675832471293962/pattie3.jpg'
    )

    image29 = AnimalImage(
        animal_id = 8,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675831305281536/pattie5.jpg'
    )

    image30 = AnimalImage(
        animal_id = 8,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675832991399966/pattie4.jpg'
    )

    image31 = AnimalImage(
        animal_id = 9,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675770559172779/mirko1.jpg'
    )

    image32 = AnimalImage(
        animal_id = 9,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675770198478960/mirko4.jpg'
    )

    image33 = AnimalImage(
        animal_id = 9,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675771347718214/mirko3.jpg'
    )

    image34 = AnimalImage(
        animal_id = 9,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675771024752731/mirko2.jpg'
    )

    image35 = AnimalImage(
        animal_id = 10,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675633778729021/donatello1.jpg'
    )

    image36 = AnimalImage(
        animal_id = 10,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675634063949934/donatello2.jpg'
    )
    image37 = AnimalImage(
        animal_id = 10,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675634382712902/donatello3.jpg'
    )
    image38 = AnimalImage(
        animal_id = 10,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675634693087272/donatello4.jpg'
    )

    image39 = AnimalImage(
        animal_id = 10,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1118675633048928286/donatello5.jpg'
    )

    image40 = AnimalImage(
        animal_id = 11,
        image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1107553001960378428/IMG_2981.jpg'
    )

    image41 = AnimalImage(
        animal_id = 11,
        image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1107553003201888326/IMG_3710.jpg'
    )

    image42 = AnimalImage(
        animal_id = 11,
        image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1107553002258169896/IMG_2938.jpg'
    )

    image43 = AnimalImage(
        animal_id = 11,
        image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1107553002535002223/IMG_3347.jpg'
    )

    image44 = AnimalImage(
        animal_id = 11,
        image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1107553002878930974/IMG_3674.jpg'
    )

    image45 = AnimalImage(
        animal_id = 12,
        image_url = 'https://media.discordapp.net/attachments/1093738810501763073/1121890700045320342/IMG_1466.jpg?width=503&height=671'
    )

    image46 = AnimalImage(
        animal_id = 12,
        image_url = 'https://cdn.discordapp.com/attachments/1093738810501763073/1121890703044255834/321A8B08-9502-400E-B513-17504310648D.jpg'
    )

    image47 = AnimalImage(
        animal_id = 12,
        image_url = 'https://cdn.discordapp.com/attachments/1093738810501763073/1121890701605621772/68762913685__01B9F937-376D-47C0-8FEC-3A711BF487F9.jpg'
    )

    image48 = AnimalImage(
        animal_id = 12,
        image_url = 'https://cdn.discordapp.com/attachments/1093738810501763073/1121890700749963264/IMG_9968.jpg'
    )

    image49 = AnimalImage(
        animal_id = 12,
        image_url = 'https://cdn.discordapp.com/attachments/1093738810501763073/1121891226963161199/70408194541__9CF8AF78-061F-45F0-8F2F-1E18100BCF12.jpg'
    )

    image50 = AnimalImage(
        animal_id = 13,
        image_url = 'https://cdn.discordapp.com/attachments/1093738810501763073/1121890703522398228/IMG_6620.jpg'
    )

    image51 = AnimalImage(
        animal_id = 13,
        image_url = 'https://cdn.discordapp.com/attachments/1093738810501763073/1121890701177790474/68817205935__6A608920-F1C7-4083-A4A3-7315C2E09B03.jpg'
    )

    image52 = AnimalImage(
        animal_id = 13,
        image_url = 'https://cdn.discordapp.com/attachments/1093738810501763073/1121890702012457081/IMG_8306.jpg'
    )

    image53 = AnimalImage(
        animal_id = 13,
        image_url = 'https://cdn.discordapp.com/attachments/1093738810501763073/1121890702406733885/IMG_8606.jpg'
    )

    image54 = AnimalImage(
        animal_id = 13,
        image_url = 'https://cdn.discordapp.com/attachments/1093738810501763073/1121890700397650030/IMG_0833.png'
    )

    image55 = AnimalImage(
        animal_id = 14,
        image_url = 'https://cdn.discordapp.com/attachments/1124483811032440873/1124484181100089364/IMG_3447.jpeg'
    )

    image56 = AnimalImage(
        animal_id = 14,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1125992080452366369/IMG_3329.png'
    )

    image57 = AnimalImage(
        animal_id = 14,
        image_url = 'https://cdn.discordapp.com/attachments/1124483811032440873/1124485196000014416/IMG_1756.jpeg'
    )

    image58 = AnimalImage(
        animal_id = 14,
        image_url = 'https://cdn.discordapp.com/attachments/1124483811032440873/1124484557551439902/322d48b3-fe11-4153-a5b7-7e2b697a4587.jpeg'
    )

    image59 = AnimalImage(
        animal_id = 14,
        image_url = 'https://cdn.discordapp.com/attachments/1124483811032440873/1124484975383818280/IMG_0564.jpeg'
    )

    image60 = AnimalImage(
        animal_id = 15,
        image_url = 'https://cdn.discordapp.com/attachments/1093694077058428929/1126575396524130314/IMG_8561.jpg'
    )

    image61 = AnimalImage(
        animal_id = 15,
        image_url = 'https://cdn.discordapp.com/attachments/1093694077058428929/1126575396192792576/IMG_8570.jpg'
    )

    image62 = AnimalImage(
        animal_id = 15,
        image_url = 'https://cdn.discordapp.com/attachments/1093694077058428929/1126575395119038564/IMG_8600.jpg'
    )

    image63 = AnimalImage(
        animal_id = 15,
        image_url = 'https://cdn.discordapp.com/attachments/1093694077058428929/1126575397014884383/IMG_8601.jpg'
    )

    image64 = AnimalImage(
        animal_id = 15,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1128344716094734497/greyson.png'
    )

    image65 = AnimalImage(
        animal_id = 16,
        image_url = 'https://cdn.discordapp.com/attachments/1128742248385884162/1128743237587324968/69463815502__079DE828-4E4E-4636-A6F3-3318DFCAD337.jpg'
    )

    image66 = AnimalImage(
        animal_id = 16,
        image_url = 'https://cdn.discordapp.com/attachments/1128742248385884162/1128743236987531285/IMG_0282.jpg'
    )

    image67 = AnimalImage(
        animal_id = 16,
        image_url = 'https://cdn.discordapp.com/attachments/1128742248385884162/1128743238363262996/IMG_6624.jpg'
    )

    image68 = AnimalImage(
        animal_id = 16,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1128744496486695042/image.png'
    )

    image69 = AnimalImage(
        animal_id = 16,
        image_url = 'https://cdn.discordapp.com/attachments/1118675490870399017/1128743069987115028/image.png'
    )

    images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16, image17, image18,image19,image20,image21,image22,image23,image24,image25,image26,image27,image28,image29,image30,image31,image32,image33,image34,image35,image36,image37,image38,image39,image40,image41,image42,image43,image44, image45,image46,image47,image48,image49,image50,image51,image52,image53,image54,image55,image56,image57,image58,image59,image60, image61,image62,image63,image64,image65,image66,image67,image68,image69]

    [db.session.add(image) for image in images]

    otherAnimals = Animal.query.filter(Animal.id > 16).all()

    for animal in otherAnimals:
        urls = image_urls[animal.primary_breed]
        shuffle(urls)
        for url in urls:
            newImage = AnimalImage(
                animal_id = animal.id,
                image_url = url
            )

            db.session.add(newImage)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_animal_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.animal_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM animal_images"))

    db.session.commit()
