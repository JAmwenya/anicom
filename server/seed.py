# server/seed.py

import random
import datetime
from server.utils.db import db
from server.app import create_app
from server.models.user import User
from server.models.vote import Vote
from server.models.anime import Anime
from server.models.episode import Episode
from server.models.content import Content
from werkzeug.security import generate_password_hash


# Initialize the app using the create_app function
app = create_app(config_name="development")

# Sample user data with diverse names and realistic emails
user_data = [
    {"username": "JohnDoe", "email": "johndoe@gmail.com", "password": "password123"},
    {
        "username": "JaneSmith",
        "email": "janesmith@yahoo.com",
        "password": "password123",
    },
    {
        "username": "AkiraYamada",
        "email": "akira.yamada@gmail.com",
        "password": "password123",
    },
    {
        "username": "TomohiroKato",
        "email": "tomohiro.kato@gmail.com",
        "password": "password123",
    },
    {
        "username": "SakuraTakahashi",
        "email": "sakura.takahashi@gmail.com",
        "password": "password123",
    },
    {
        "username": "HiroshiTanaka",
        "email": "hiroshi.tanaka@gmail.com",
        "password": "password123",
    },
    {
        "username": "MiyukiSato",
        "email": "miyuki.sato@yahoo.com",
        "password": "password123",
    },
    {
        "username": "YukiFujita",
        "email": "yuki.fujita@gmail.com",
        "password": "password123",
    },
    {
        "username": "ReiKobayashi",
        "email": "rei.kobayashi@gmail.com",
        "password": "password123",
    },
    {
        "username": "HarutoNakamura",
        "email": "haruto.nakamura@gmail.com",
        "password": "password123",
    },
    {
        "username": "EmiMatsumoto",
        "email": "emi.matsumoto@yahoo.com",
        "password": "password123",
    },
    {
        "username": "RyoIshikawa",
        "email": "ryo.ishikawa@gmail.com",
        "password": "password123",
    },
    {
        "username": "ChikaSakai",
        "email": "chika.sakai@yahoo.com",
        "password": "password123",
    },
    {"username": "KaitoOno", "email": "kaito.ono@gmail.com", "password": "password123"},
    {
        "username": "NaokoShimizu",
        "email": "naoko.shimizu@gmail.com",
        "password": "password123",
    },
]

# Anime data with different genres and detailed descriptions
anime_data = [
    {
        "title": "Attack on Titan",
        "description": "A dark fantasy world where humanity is on the brink of extinction, surrounded by giant walls to protect them from Titans, terrifying humanoid creatures. The story follows Eren Yeager, whose journey for vengeance drives him to join the Scout Regiment and fight the Titans.",
        "genre": "Action, Thriller",
        "release_date": datetime.date(2013, 4, 7),
        "image": "/assets/anime-images/attack-on-titan.jpg",
    },
    {
        "title": "Steins;Gate",
        "description": "A gripping sci-fi thriller centered around a group of friends who accidentally discover time travel. As they meddle with time, they risk altering reality itself, with tragic consequences for their lives.",
        "genre": "Sci-Fi, Psychological",
        "release_date": datetime.date(2011, 4, 6),
        "image": "/assets/anime-images/steins-gate.jpg",
    },
    {
        "title": "One Punch Man",
        "description": "Saitama, a superhero, can defeat any opponent with just one punch. However, he struggles with the lack of challenge in his life and seeks a worthy opponent. This satirical take on the superhero genre explores themes of loneliness and existential crisis.",
        "genre": "Comedy, Action",
        "release_date": datetime.date(2015, 10, 5),
        "image": "/assets/anime-images/one-punch-man.jpg",
    },
    {
        "title": "Fullmetal Alchemist: Brotherhood",
        "description": "Two brothers, Edward and Alphonse Elric, use alchemy to try to bring their mother back to life, but their actions lead to disastrous consequences. They set out on a quest to find the Philosopher's Stone to restore their bodies.",
        "genre": "Action, Adventure, Fantasy",
        "release_date": datetime.date(2009, 4, 5),
        "image": "/assets/anime-images/fullmetal-alchemist-brotherhood.jpg",
    },
    {
        "title": "Death Note",
        "description": "A high school student named Light Yagami discovers a mysterious notebook that allows him to kill anyone whose name he writes in it. As he takes on the role of a vigilante, a cat-and-mouse game ensues with a genius detective named L.",
        "genre": "Thriller, Psychological",
        "release_date": datetime.date(2006, 10, 3),
        "image": "/assets/anime-images/death-note.jpg",
    },
    {
        "title": "Naruto",
        "description": "Naruto Uzumaki, a young ninja with dreams of becoming the strongest ninja and leader of his village, the Hokage, faces various challenges and enemies, while also dealing with the burden of the powerful Nine-Tails Fox sealed within him.",
        "genre": "Action, Adventure, Fantasy",
        "release_date": datetime.date(2002, 10, 3),
        "image": "/assets/anime-images/naruto.jpg",
    },
    {
        "title": "One Piece",
        "description": "Monkey D. Luffy, a young pirate with the ability to stretch his body like rubber, embarks on an adventure to find the legendary treasure known as the One Piece, and become the King of the Pirates.",
        "genre": "Adventure, Action, Fantasy",
        "release_date": datetime.date(1999, 10, 20),
        "image": "/assets/anime-images/one-piece.jpg",
    },
    {
        "title": "Dragon Ball Z",
        "description": "The saga continues as Goku, now an adult, faces off against the mightiest foes in the universe, including the tyrant Frieza and the powerful Androids. A story of heroism, friendship, and endless battles ensues.",
        "genre": "Action, Adventure, Martial Arts",
        "release_date": datetime.date(1989, 4, 26),
        "image": "/assets/anime-images/dragon-ball-z.jpg",
    },
    {
        "title": "Demon Slayer: Kimetsu no Yaiba",
        "description": "Tanjiro Kamado, a kind-hearted boy, becomes a demon slayer after his family is slaughtered by demons and his sister, Nezuko, is turned into one. He sets out on a quest to defeat demons and find a cure for his sister.",
        "genre": "Action, Supernatural, Drama",
        "release_date": datetime.date(2019, 4, 6),
        "image": "/assets/anime-images/demon-slayer.jpg",
    },
    {
        "title": "Cowboy Bebop",
        "description": "Set in the year 2071, this space-western follows a group of bounty hunters, known as 'cowboys,' as they chase criminals across the galaxy. With strong influences from jazz and noir, it explores themes of loneliness and redemption.",
        "genre": "Sci-Fi, Action, Neo-Noir",
        "release_date": datetime.date(1998, 4, 3),
        "image": "/assets/anime-images/cowboy-bebop.jpg",
    },
]


# Episode data with detailed descriptions
episode_data = [
    {
        "title": "To You, In 2000 Years: The Fall of Shiganshina",
        "description": "The first episode sets the tone for the series, introducing the world of Titans, their terrifying abilities, and the tragic backstory of humanity's fall. We follow Eren Yeager, Mikasa, and Armin as they experience the horrors of the Titans first-hand.",
        "anime_id": 1,  # Attack on Titan
        "episode_number": 1,
        "rating": 4.7,
    },
    {
        "title": "The Time Traveler’s Dilemma",
        "description": "The characters discover the first steps in manipulating time and how it can have life-changing consequences. This episode sets up the psychological struggle between personal desires and moral responsibility.",
        "anime_id": 2,  # Steins;Gate
        "episode_number": 1,
        "rating": 4.8,
    },
    {
        "title": "The Strongest Hero",
        "description": "Saitama faces off with a new enemy, but the real battle is within himself. The episode shows his emotional struggle with his overwhelming power and his longing for a real challenge.",
        "anime_id": 3,  # One Punch Man
        "episode_number": 1,
        "rating": 4.5,
    },
    {
        "title": "Fullmetal Alchemist",
        "description": "Edward and Alphonse Elric attempt a forbidden alchemy ritual to bring their mother back, but the consequences are devastating. The episode introduces the rules of alchemy and sets up their quest for the Philosopher’s Stone.",
        "anime_id": 4,  # Fullmetal Alchemist: Brotherhood
        "episode_number": 1,
        "rating": 4.9,
    },
    {
        "title": "The Birth of a New World",
        "description": "Light Yagami discovers the power of the Death Note, and as he tests its limits, the world is about to change forever. A psychological battle between good and evil begins.",
        "anime_id": 5,  # Death Note
        "episode_number": 1,
        "rating": 5.0,
    },
    {
        "title": "The Last Ninja Standing",
        "description": "Naruto’s first mission as a ninja leads to a confrontation with a deadly adversary. With his goal of becoming Hokage in mind, Naruto begins his journey of self-discovery and learning the true meaning of friendship and loyalty.",
        "anime_id": 6,  # Naruto
        "episode_number": 1,
        "rating": 4.6,
    },
    {
        "title": "A Pirate's Promise",
        "description": "Monkey D. Luffy sets sail to find the legendary treasure known as the One Piece. Along the way, he forms bonds with his first crew members and starts to learn about the larger world that awaits him.",
        "anime_id": 7,  # One Piece
        "episode_number": 1,
        "rating": 4.8,
    },
    {
        "title": "A New Beginning",
        "description": "Goku returns after an unexpected battle and meets new enemies from outer space. The episode sets up the larger stakes as Z fighters prepare for the toughest challenges ahead.",
        "anime_id": 8,  # Dragon Ball Z
        "episode_number": 1,
        "rating": 4.9,
    },
    {
        "title": "The Demon Slayer's Oath",
        "description": "Tanjiro swears to avenge his family’s death by slaying demons and finds a way to protect his sister Nezuko from her transformation into a demon. This episode marks the beginning of a tragic yet determined journey.",
        "anime_id": 9,  # Demon Slayer: Kimetsu no Yaiba
        "episode_number": 1,
        "rating": 4.9,
    },
    # Cowboy Bebop
    {
        "title": "Asteroid Blues",
        "description": "Spike Spiegel and Jet Black are bounty hunters aboard the Bebop, chasing down a fugitive named Asimov Solensan. This episode introduces the series' signature mix of sci-fi action and character-driven storytelling, setting the tone for the wild adventures ahead.",
        "anime_id": 10,
        "episode_number": 1,
        "rating": 4.8,
    },
    # Attack on Titan, Episode 2
    {
        "title": "The Last Stand at Shiganshina",
        "description": "As the Titans breach Wall Maria, the remaining soldiers are forced into a desperate battle to protect humanity’s last stronghold. Eren, Mikasa, and Armin discover just how dangerous the Titans are, facing a terrifying enemy for the first time.",
        "anime_id": 1,  # Attack on Titan
        "episode_number": 2,
        "rating": 4.9,
    },
    # Steins;Gate, Episode 2
    {
        "title": "The Butterfly Effect",
        "description": "Rintarou and his friends begin experimenting with their time machine, but each action seems to have unexpected consequences. The lines between friend and foe blur as they realize they’re not the only ones trying to manipulate time.",
        "anime_id": 2,  # Steins;Gate
        "episode_number": 2,
        "rating": 4.8,
    },
    # One Punch Man, Episode 2
    {
        "title": "The Hero Association",
        "description": "Saitama gets an invitation to join the Hero Association, but his overwhelming strength makes him feel out of place. As he faces heroes with various powers, he realizes that being a hero isn't as easy as it seems.",
        "anime_id": 3,  # One Punch Man
        "episode_number": 2,
        "rating": 4.6,
    },
    # Fullmetal Alchemist: Brotherhood, Episode 2
    {
        "title": "The First Day of Training",
        "description": "Edward and Alphonse start their journey to find the Philosopher’s Stone. Along the way, they encounter a former state alchemist and uncover the true cost of alchemy. The brothers' bond is tested as they face their first major challenge.",
        "anime_id": 4,  # Fullmetal Alchemist: Brotherhood
        "episode_number": 2,
        "rating": 4.9,
    },
    # Death Note, Episode 2
    {
        "title": "The Battle of Wits",
        "description": "Light’s first steps in using the Death Note lead to a series of confrontations with the police. As he plays his game of cat and mouse, L begins to suspect that Light may be more dangerous than anyone anticipated.",
        "anime_id": 5,  # Death Note
        "episode_number": 2,
        "rating": 5.0,
    },
    # Naruto, Episode 2
    {
        "title": "The Will of Fire",
        "description": "Naruto and Sasuke’s bond strengthens as they face their first dangerous mission together. They must defend a village from a hidden threat, and Naruto begins to understand the true meaning of being a ninja.",
        "anime_id": 6,  # Naruto
        "episode_number": 2,
        "rating": 4.8,
    },
    # One Piece, Episode 2
    {
        "title": "The Great Swordsman Zoro",
        "description": "Luffy teams up with the famous swordsman Roronoa Zoro, but not without challenges. Zoro’s past as a bounty hunter comes back to haunt him as they both face off against a corrupt marine officer.",
        "anime_id": 7,  # One Piece
        "episode_number": 2,
        "rating": 4.8,
    },
    # Dragon Ball Z, Episode 2
    {
        "title": "The Great Race",
        "description": "Goku and his newfound allies continue their journey to find the Dragon Balls, facing new foes and challenges. Along the way, Goku races against the deadly Tien and his friends as they battle for control of the Dragon Balls.",
        "anime_id": 8,  # Dragon Ball Z
        "episode_number": 2,
        "rating": 4.9,
    },
    # Demon Slayer: Kimetsu no Yaiba, Episode 2
    {
        "title": "The Flame of Determination",
        "description": "Tanjiro begins his intense training to become a Demon Slayer under the tutelage of his master, learning the art of breathing techniques. His determination to protect his sister Nezuko from the demon curse grows as he masters the sword.",
        "anime_id": 9,  # Demon Slayer: Kimetsu no Yaiba
        "episode_number": 2,
        "rating": 4.9,
    },
    # Cowboy Bebop Episode 2
    {
        "title": "Stray Dog Strut",
        "description": "Spike and Jet are tasked with capturing a fugitive named Katerina, who is involved in a dangerous arms deal. The episode highlights the duo's contrasting personalities, with Spike's laid-back approach clashing with Jet's more serious nature.",
        "anime_id": 10,
        "episode_number": 2,
        "rating": 4.6,
    },
    # Attack on Titan, Episode 3
    {
        "title": "The Titan's Rage",
        "description": "As the Survey Corps begins their offensive, the soldiers face an even greater challenge in the form of the Armored Titan. Eren's resolve is put to the test as he grapples with his own abilities and the brutal nature of the fight.",
        "anime_id": 1,  # Attack on Titan
        "episode_number": 3,
        "rating": 4.9,
    },
    # Steins;Gate, Episode 3
    {
        "title": "The Accelerator's Dilemma",
        "description": "As Rintarou and his friends uncover more about the mysterious phone microwave, they begin to understand its power. But with this knowledge comes a dangerous pursuit by other forces, setting off a deadly game of manipulation and deceit.",
        "anime_id": 2,  # Steins;Gate
        "episode_number": 3,
        "rating": 4.8,
    },
    # One Punch Man, Episode 3
    {
        "title": "The Hero Association's Challenges",
        "description": "Saitama faces more challenges as the Hero Association tests his abilities. Despite his overwhelming power, he must navigate the politics and infighting within the organization, realizing that being a hero comes with far more responsibility than he ever imagined.",
        "anime_id": 3,  # One Punch Man
        "episode_number": 3,
        "rating": 4.6,
    },
    # Fullmetal Alchemist: Brotherhood, Episode 3
    {
        "title": "The Philosopher's Stone",
        "description": "Edward and Alphonse begin their search for the elusive Philosopher's Stone, encountering new characters and dark secrets along the way. As they dive deeper into the mysteries surrounding the stone, they find themselves facing dangerous foes.",
        "anime_id": 4,  # Fullmetal Alchemist: Brotherhood
        "episode_number": 3,
        "rating": 4.9,
    },
    # Death Note, Episode 3
    {
        "title": "The Power Struggle",
        "description": "Light faces his greatest adversary yet: L. As the two engage in a psychological battle of wits, Light starts to realize that L is more than just a detective – he's a threat to everything Light has worked for.",
        "anime_id": 5,  # Death Note
        "episode_number": 3,
        "rating": 5.0,
    },
    # Naruto, Episode 3
    {
        "title": "The Path of a Ninja",
        "description": "Naruto’s training intensifies as he faces a new adversary in the form of a rival ninja. As he learns more about the hardships and expectations of being a ninja, Naruto begins to understand what it truly means to protect those he cares about.",
        "anime_id": 6,  # Naruto
        "episode_number": 3,
        "rating": 4.8,
    },
    # One Piece, Episode 3
    {
        "title": "The First Battle",
        "description": "Luffy and Zoro face off against a notorious pirate crew as they continue their journey to find the One Piece. Along the way, Luffy forms stronger bonds with his crew, learning the true meaning of friendship and loyalty.",
        "anime_id": 7,  # One Piece
        "episode_number": 3,
        "rating": 4.8,
    },
    # Dragon Ball Z, Episode 3
    {
        "title": "The Great Saiyaman's Rise",
        "description": "Goku’s fight against new enemies continues as the Z Fighters face off against more powerful foes. The episode focuses on Gohan, who is training to become a new hero in the wake of his father’s actions.",
        "anime_id": 8,  # Dragon Ball Z
        "episode_number": 3,
        "rating": 4.9,
    },
    # Demon Slayer: Kimetsu no Yaiba, Episode 3
    {
        "title": "The Demon Slayer’s Resolve",
        "description": "Tanjiro and his comrades face their first major challenge as they venture into the mountains to hunt a deadly demon. As they battle for survival, Tanjiro learns to trust his new abilities and his instincts.",
        "anime_id": 9,  # Demon Slayer: Kimetsu no Yaiba
        "episode_number": 3,
        "rating": 4.9,
    },
    # Cowboy Bebop Episode 3
    {
        "title": "Honky Tonk Women",
        "description": "Spike and Jet track down a bounty involving a femme fatale named Faye Valentine, who has a history with a group of criminals. The episode dives into Faye's mysterious past, and we see the complexities of her character unfold.",
        "anime_id": 10,
        "episode_number": 3,
        "rating": 4.7,
    },
    # Attack on Titan, Episode 4
    {
        "title": "The Titan’s Reign",
        "description": "Eren Yeager, now a member of the Scout Regiment, faces an internal conflict as he learns more about the Titans. The battle rages on as humanity pushes back against the terrifying creatures, and Eren's secret power begins to reveal itself.",
        "anime_id": 1,  # Attack on Titan
        "episode_number": 4,
        "rating": 5.0,
    },
    # Steins;Gate, Episode 4
    {
        "title": "The Butterfly Effect",
        "description": "Rintarou’s attempts to change the past become more complicated as the effects of time travel start to manifest in unintended ways. He must navigate through a maze of choices, while the danger of altering time increases exponentially.",
        "anime_id": 2,  # Steins;Gate
        "episode_number": 4,
        "rating": 4.9,
    },
    # One Punch Man, Episode 4
    {
        "title": "The Hero Association's Test",
        "description": "Saitama faces a series of tests to officially join the Hero Association, but his overwhelming strength continues to overshadow the other applicants. Despite his powers, Saitama is faced with the social challenges of being a hero.",
        "anime_id": 3,  # One Punch Man
        "episode_number": 4,
        "rating": 4.7,
    },
    # Fullmetal Alchemist: Brotherhood, Episode 4
    {
        "title": "The Truth of Alchemy",
        "description": "Edward and Alphonse Elric uncover more secrets about the Philosopher’s Stone, which leads them down a path filled with dark revelations. They must confront the terrifying truth behind alchemy and its forbidden origins.",
        "anime_id": 4,  # Fullmetal Alchemist: Brotherhood
        "episode_number": 4,
        "rating": 5.0,
    },
    # Death Note, Episode 4
    {
        "title": "The Battle of Wits",
        "description": "Light and L engage in a fierce battle of intellect as they start to unravel each other’s secrets. As the stakes rise, Light must use every ounce of his cunning to stay one step ahead of L, while L grows ever closer to discovering the truth.",
        "anime_id": 5,  # Death Note
        "episode_number": 4,
        "rating": 5.0,
    },
    # Naruto, Episode 4
    {
        "title": "The First Test",
        "description": "Naruto’s skills are put to the test during the first major ninja exam. He must prove his worth to his fellow ninja and face a series of obstacles that will shape his future and his quest to become the strongest Hokage.",
        "anime_id": 6,  # Naruto
        "episode_number": 4,
        "rating": 4.7,
    },
    # One Piece, Episode 4
    {
        "title": "The Pirate’s Dream",
        "description": "Luffy and his crew face their first major pirate challenge. As they work together to overcome obstacles, they begin to understand what it truly means to be a pirate and what is at stake in their quest for the One Piece.",
        "anime_id": 7,  # One Piece
        "episode_number": 4,
        "rating": 4.9,
    },
    # Dragon Ball Z, Episode 4
    {
        "title": "The Saiyan Legacy",
        "description": "Goku’s enemies from the Saiyan race arrive, and the Z fighters must prepare for the most intense battle of their lives. Goku unlocks new powers, but it becomes clear that the stakes are higher than ever before.",
        "anime_id": 8,  # Dragon Ball Z
        "episode_number": 4,
        "rating": 5.0,
    },
    # Demon Slayer: Kimetsu no Yaiba, Episode 4
    {
        "title": "The Demon’s Lair",
        "description": "Tanjiro and his friends venture deeper into the mountains to confront a powerful demon. The intensity of the battle tests their skills and resolve, as Tanjiro faces his greatest challenge yet.",
        "anime_id": 9,  # Demon Slayer: Kimetsu no Yaiba
        "episode_number": 4,
        "rating": 5.0,
    },
    # Cowboy Bebop Episode 4
    {
        "title": "Gateway Shuffle",
        "description": "The Bebop crew hunts down a fugitive named Gira, a criminal who has stolen valuable technology. This episode delves deeper into the motivations and backstories of Spike and Jet, and the moral complexities they face in their bounty hunting careers.",
        "anime_id": 10,
        "episode_number": 4,
        "rating": 4.5,
    },
]


# Vote data with ratings from 1 to 5
vote_data = [
    {
        "user_id": random.randint(1, 15),
        "episode_id": random.randint(1, len(episode_data)),
        "anime_id": None,
        "vote": random.randint(1, 5),
    }
    for _ in range(1, 16)
]

# Content data with different content types (review, fan art, article)
content_data = [
    # Attack on Titan, Review
    {
        "title": "The Fall of Shiganshina: A Deep Dive into the Opening Episode",
        "body": "Attack on Titan's opening episode perfectly sets the stage for the dark, thrilling world of Titans. With powerful character development and intense action sequences, this episode pulls you right into the despair of humanity's struggle for survival.",
        "content_type": "review",
        "user_id": random.randint(1, 15),
        "anime_id": 1,
    },
    # Steins;Gate, Fan Art
    {
        "title": "Rintarou Okabe and the Time Travel Paradox: A Fan Art Exploration",
        "body": "This fan art captures the conflicted genius of Rintarou Okabe, the protagonist of Steins;Gate. His journey through time, filled with personal sacrifices and complex emotions, is visually stunning in this artwork.",
        "content_type": "fan art",
        "user_id": random.randint(1, 15),
        "anime_id": 2,
    },
    # One Punch Man, Article
    {
        "title": "One Punch Man: The Secret Behind Saitama's Overpowered Nature",
        "body": "Saitama’s power is unmatched, but is there more to his character than just his overwhelming strength? In this article, we delve into Saitama's internal struggles and his quest for a real challenge, making him a character unlike any other in anime.",
        "content_type": "article",
        "user_id": random.randint(1, 15),
        "anime_id": 3,
    },
    # Fullmetal Alchemist: Brotherhood, Review
    {
        "title": "Fullmetal Alchemist: Brotherhood - The Elrics' Tragic Journey for Redemption",
        "body": "This review of Fullmetal Alchemist: Brotherhood examines the Elric brothers' heart-wrenching quest for the Philosopher’s Stone. Their journey of self-discovery and redemption is a standout feature of the series.",
        "content_type": "review",
        "user_id": random.randint(1, 15),
        "anime_id": 4,
    },
    # Death Note, Article
    {
        "title": "Light vs. L: The Ultimate Battle of Wits in Death Note",
        "body": "Light Yagami and L engage in one of the most thrilling psychological battles in anime. In this article, we analyze their strategies, motivations, and the philosophical clash between good and evil.",
        "content_type": "article",
        "user_id": random.randint(1, 15),
        "anime_id": 5,
    },
    # Naruto, Fan Art
    {
        "title": "Naruto’s Determination: A Fan Art Celebration of His Journey",
        "body": "This fan art showcases Naruto’s growth from an outcast to a powerful ninja determined to become Hokage. The artwork beautifully depicts his emotional journey and unwavering spirit.",
        "content_type": "fan art",
        "user_id": random.randint(1, 15),
        "anime_id": 6,
    },
    # One Piece, Article
    {
        "title": "The Pirate King’s Journey: A Look into the Life of Monkey D. Luffy",
        "body": "Luffy’s journey to becoming the Pirate King is one of freedom, adventure, and camaraderie. This article explores the deeper themes of One Piece, focusing on Luffy’s unshakable belief in his dream and his crew.",
        "content_type": "article",
        "user_id": random.randint(1, 15),
        "anime_id": 7,
    },
    # Dragon Ball Z, Review
    {
        "title": "Dragon Ball Z: The Epic Return of Goku",
        "body": "Dragon Ball Z marks the return of Goku, setting the stage for battles that will shape the future of the universe. This review explores the action-packed moments and the emotional growth of Goku and his friends.",
        "content_type": "review",
        "user_id": random.randint(1, 15),
        "anime_id": 8,
    },
    # Demon Slayer: Kimetsu no Yaiba, Fan Art
    {
        "title": "Tanjiro’s Resolve: A Fan Art Tribute to His Determination",
        "body": "Tanjiro’s journey is filled with heartbreak and hope. This fan art celebrates his resolve and his journey to protect his sister Nezuko, as well as his relentless fight against the demons that threaten his world.",
        "content_type": "fan art",
        "user_id": 13,
        "anime_id": 9,
    },
    #  Cowboy Bebop, Article
    {
        "title": "The Bounty Hunter’s Code: A Deep Dive into Spike Spiegel",
        "body": "An article exploring Spike Spiegel's complex character. We analyze his motivations, his past as a member of the Red Dragon Syndicate, and how his philosophy of 'live fast, die young' shapes his decisions throughout the series.",
        "content_type": "article",
        "user_id": random.randint(1, 15),
        "anime_id": 10,
    },
    # Attack on Titan, Episode 2, Fan Theory
    {
        "title": "The Secret Behind the Titans",
        "body": "A fan theory on the origins of the Titans in Attack on Titan. This episode dives into potential hidden truths behind their existence and the mysterious forces that drive them.",
        "content_type": "fan theory",
        "user_id": random.randint(1, 15),
        "anime_id": 1,
    },
    # Steins;Gate, Episode 2, Article
    {
        "title": "The Paradox of Time Travel",
        "body": "In this article, we analyze the implications of time travel in Steins;Gate, particularly focusing on the concept of causality and the butterfly effect as seen in the series.",
        "content_type": "article",
        "user_id": random.randint(1, 15),
        "anime_id": 2,
    },
    # One Punch Man, Episode 2, Review
    {
        "title": "Saitama's Unwavering Journey",
        "body": "In this review, we delve deeper into Saitama’s character arc, exploring his internal struggles with loneliness and the emotional depth that his invincibility hides.",
        "content_type": "review",
        "user_id": random.randint(1, 15),
        "anime_id": 3,
    },
    # Fullmetal Alchemist: Brotherhood, Episode 2, Article
    {
        "title": "The Elrics' Sacrifice: A Deep Dive",
        "body": "An article exploring the philosophical and moral implications of the Elric brothers’ actions in their quest for the Philosopher’s Stone. What is the true cost of alchemy?",
        "content_type": "article",
        "user_id": random.randint(1, 15),
        "anime_id": 4,
    },
    # Death Note, Episode 2, Fan Theory
    {
        "title": "Light Yagami’s Master Plan",
        "body": "This fan theory explores Light Yagami’s deeper motivations and whether he truly believes he is doing the world a favor, or if his obsession with justice is clouding his judgment.",
        "content_type": "fan theory",
        "user_id": random.randint(1, 15),
        "anime_id": 5,
    },
    # Naruto, Episode 2, Fan Art
    {
        "title": "Naruto’s First True Challenge",
        "body": "This fan art depicts Naruto’s first major ninja battle, showcasing his fiery determination and the powerful friendships that will carry him through his journey.",
        "content_type": "fan art",
        "user_id": random.randint(1, 15),
        "anime_id": 6,
    },
    # One Piece, Episode 2, Fan Theory
    {
        "title": "Luffy’s Quest for the One Piece: A Deeper Look",
        "body": "In this fan theory, we discuss the real meaning behind Luffy’s quest for the One Piece and explore what it means to become the Pirate King beyond treasure.",
        "content_type": "fan theory",
        "user_id": random.randint(1, 15),
        "anime_id": 7,
    },
    # Dragon Ball Z, Episode 2, Article
    {
        "title": "Vegeta’s Rivalry with Goku: A Turning Point",
        "body": "An article exploring the complex rivalry between Vegeta and Goku in Dragon Ball Z, including their personal growth and the bonds that form as a result of their competition.",
        "content_type": "article",
        "user_id": random.randint(1, 15),
        "anime_id": 8,
    },
    # Demon Slayer: Kimetsu no Yaiba, Episode 2, Article
    {
        "title": "Tanjiro’s Unyielding Will to Protect",
        "body": "An article exploring the emotional depth behind Tanjiro’s journey in Demon Slayer. His vow to protect his sister Nezuko and avenge his family sets him on an unrelenting path of self-discovery.",
        "content_type": "article",
        "user_id": random.randint(1, 15),
        "anime_id": 9,
    },
    #  Cowboy Bebop, Episode 2, Fan Theory
    {
        "title": "Faye Valentine: The Enigmatic Femme Fatale",
        "body": "A fan theory speculating about Faye Valentine’s mysterious past. What if her memory loss was not just a result of her cryogenic sleep but also tied to a deeper conspiracy involving the people she trusted?",
        "content_type": "fan theory",
        "user_id": random.randint(1, 15),
        "anime_id": 10,
    },
    # Attack on Titan, Episode 2, Article
    {
        "title": "The Military’s Role in Attack on Titan",
        "body": "This article breaks down the role of the military within the walls, focusing on the strategic importance of the Scouts, Garrison, and Military Police as humanity faces its toughest enemy yet.",
        "content_type": "article",
        "user_id": random.randint(1, 15),
        "anime_id": 1,
    },
    # Steins;Gate, Episode 2, Review
    {
        "title": "The Struggle with Time",
        "body": "A review focusing on how Steins;Gate handles the mechanics of time travel, the paradoxes that arise, and the emotional weight it brings to the characters.",
        "content_type": "review",
        "user_id": random.randint(1, 15),
        "anime_id": 2,
    },
    # One Punch Man, Episode 2, Fan Art
    {
        "title": "Saitama’s Emotional Struggles",
        "body": "This fan art captures the loneliness of Saitama despite his overwhelming power. The artwork represents his inner conflict and desire for a real challenge.",
        "content_type": "fan art",
        "user_id": random.randint(1, 15),
        "anime_id": 3,
    },
    # Fullmetal Alchemist: Brotherhood, Episode 2, Fan Theory
    {
        "title": "What If the Elric Brothers Could Bring Back Their Mother?",
        "body": "A fan theory exploring what would have happened if the Elric brothers had succeeded in their attempt to resurrect their mother, exploring the possible consequences in their world.",
        "content_type": "fan theory",
        "user_id": random.randint(1, 15),
        "anime_id": 4,
    },
    # Death Note, Episode 2, Review
    {
        "title": "Light vs. L: The Battle Begins",
        "body": "In this review, we analyze the psychological duel between Light Yagami and L, exploring the intricate mind games and moral questions that define their rivalry.",
        "content_type": "review",
        "user_id": random.randint(1, 15),
        "anime_id": 5,
    },
    # Naruto, Episode 2, Fan Theory
    {
        "title": "The True Power of the Nine-Tails",
        "body": "This fan theory delves into the history of Naruto’s Nine-Tails, examining whether Naruto can truly control its power and what it means for his journey as a ninja.",
        "content_type": "fan theory",
        "user_id": random.randint(1, 15),
        "anime_id": 6,
    },
    # One Piece, Episode 2, Review
    {
        "title": "Luffy’s Commitment to His Crew",
        "body": "A review of Luffy’s development as a leader in One Piece, focusing on how he forms his crew and the unbreakable bond of friendship they share as they embark on their journey to find the One Piece.",
        "content_type": "review",
        "user_id": random.randint(1, 15),
        "anime_id": 7,
    },
    # Dragon Ball Z, Episode 2, Fan Art
    {
        "title": "Vegeta’s First Encounter with Goku",
        "body": "A fan art piece depicting the legendary battle between Vegeta and Goku. This artwork captures the intensity of their rivalry and their contrasting personalities as they face off in combat.",
        "content_type": "fan art",
        "user_id": random.randint(1, 15),
        "anime_id": 8,
    },
    # Demon Slayer: Kimetsu no Yaiba, Episode 2, Fan Theory
    {
        "title": "The Origins of Nezuko’s Demon Curse",
        "body": "A fan theory that explores possible origins of Nezuko’s demon transformation, proposing theories based on ancient demon lore and the mysteries of the demon world.",
        "content_type": "fan theory",
        "user_id": random.randint(1, 15),
        "anime_id": 9,
    },
    # Attack on Titan, Episode 3, Review
    {
        "title": "The Tragedy of Shiganshina",
        "body": "This review dives into the aftermath of the fall of Shiganshina and the emotional toll it takes on the characters. We analyze the themes of loss, vengeance, and humanity’s resilience.",
        "content_type": "review",
        "user_id": random.randint(1, 15),
        "anime_id": 1,
    },
    # Steins;Gate, Episode 3, Fan Theory
    {
        "title": "The Butterfly Effect in Steins;Gate",
        "body": "A fan theory that explores the butterfly effect and its implications within the timeline of Steins;Gate. Could small changes have led to an alternate outcome?",
        "content_type": "fan theory",
        "user_id": random.randint(1, 15),
        "anime_id": 2,
    },
    # One Punch Man, Episode 3, Article
    {
        "title": "Saitama’s Struggle with Finding Meaning",
        "body": "An article analyzing Saitama’s struggle for meaning in a world where he can defeat anyone with a single punch. We explore his philosophical and emotional journey in the series.",
        "content_type": "article",
        "user_id": random.randint(1, 15),
        "anime_id": 3,
    },
    # Fullmetal Alchemist: Brotherhood, Episode 3, Article
    {
        "title": "The Philosopher’s Stone and Its Corrupting Power",
        "body": "An article exploring the philosophical implications of the Philosopher’s Stone in Fullmetal Alchemist: Brotherhood. How does the pursuit of this power shape the Elric brothers?",
        "content_type": "article",
        "user_id": random.randint(1, 15),
        "anime_id": 4,
    },
    # Death Note, Episode 3, Fan Theory
    {
        "title": "Could L Be Using a Death Note?",
        "body": "A fan theory proposing that L might have access to a Death Note, analyzing the psychological battle between Light and L in this mind game.",
        "content_type": "fan theory",
        "user_id": random.randint(1, 15),
        "anime_id": 5,
    },
    # Naruto, Episode 3, Review
    {
        "title": "Naruto’s Journey to Becoming Hokage",
        "body": "A review focusing on Naruto’s growth in this episode. We analyze his determination to become Hokage and his first step toward understanding the true meaning of strength and leadership.",
        "content_type": "review",
        "user_id": random.randint(1, 15),
        "anime_id": 6,
    },
    # One Piece, Episode 3, Article
    {
        "title": "The Importance of the Straw Hat",
        "body": "An article exploring the symbolic importance of Luffy’s straw hat, looking at how it represents his bond with Shanks and his determination to become the Pirate King.",
        "content_type": "article",
        "user_id": random.randint(1, 15),
        "anime_id": 7,
    },
    # Dragon Ball Z, Episode 3, Fan Art
    {
        "title": "Vegeta’s Pride and the Saiyan Legacy",
        "body": "A fan art piece depicting Vegeta’s struggle with his pride and his fight to surpass Goku. The art captures the conflict and power struggle within Vegeta’s character.",
        "content_type": "fan art",
        "user_id": random.randint(1, 15),
        "anime_id": 8,
    },
    # Demon Slayer: Kimetsu no Yaiba, Episode 3, Article
    {
        "title": "The Art of Demon Slaying",
        "body": "An article delving into the techniques and training required for Demon Slayer corps members, specifically Tanjiro’s journey in learning the Water Breathing techniques.",
        "content_type": "article",
        "user_id": random.randint(1, 15),
        "anime_id": 9,
    },
    # Attack on Titan, Episode 4, Review
    {
        "title": "Eren’s Struggle for Freedom",
        "body": "A review analyzing Eren’s emotional growth in episode 4. We explore his intense desire for freedom and his battle against both Titans and the world’s oppressive systems.",
        "content_type": "review",
        "user_id": random.randint(1, 15),
        "anime_id": 1,
    },
    # Steins;Gate, Episode 4, Fan Theory
    {
        "title": "The Concept of Time in Steins;Gate",
        "body": "A fan theory that delves into the deeper aspects of time manipulation in Steins;Gate. Could there be hidden rules about time that the characters haven’t discovered yet?",
        "content_type": "fan theory",
        "user_id": random.randint(1, 15),
        "anime_id": 2,
    },
    # One Punch Man, Episode 4, Article
    {
        "title": "Saitama's Existential Crisis",
        "body": "An article exploring Saitama's internal conflict as a hero who is bored of easy victories. We examine his longing for a real challenge and the consequences of his overwhelming strength.",
        "content_type": "article",
        "user_id": random.randint(1, 15),
        "anime_id": 3,
    },
    # Fullmetal Alchemist: Brotherhood, Episode 4, Fan Theory
    {
        "title": "The Truth About the Philosopher’s Stone",
        "body": "A fan theory that speculates the true nature of the Philosopher’s Stone. Is it truly the key to eternal life, or is there a darker secret hidden behind its powers?",
        "content_type": "fan theory",
        "user_id": random.randint(1, 15),
        "anime_id": 4,
    },
    # Death Note, Episode 4, Article
    {
        "title": "Light vs. L: A Battle of Minds",
        "body": "An article examining the strategic battle between Light and L, focusing on their mind games and how each of them uses their intelligence as a weapon in their fight for dominance.",
        "content_type": "article",
        "user_id": random.randint(1, 15),
        "anime_id": 5,
    },
    # Naruto, Episode 4, Fan Theory
    {
        "title": "The Hidden Power of Naruto’s Parents",
        "body": "A fan theory about the possible hidden powers of Naruto’s parents. Could they have left him with more than just the Nine-Tails, potentially setting the stage for his future role as Hokage?",
        "content_type": "fan theory",
        "user_id": random.randint(1, 15),
        "anime_id": 6,
    },
    # One Piece, Episode 4, Article
    {
        "title": "Luffy's Will and His Dream of the One Piece",
        "body": "An article analyzing Luffy’s unbreakable will and how it shapes his journey to find the One Piece. We explore how his belief in friendship and loyalty pushes him forward.",
        "content_type": "article",
        "user_id": random.randint(1, 15),
        "anime_id": 7,
    },
    # Dragon Ball Z, Episode 4, Fan Art
    {
        "title": "Vegeta vs. Goku: The Ultimate Rivalry",
        "body": "A fan art depiction of the intense rivalry between Vegeta and Goku, capturing the tension and competitiveness between the two Saiyan warriors as they face off.",
        "content_type": "fan art",
        "user_id": random.randint(1, 15),
        "anime_id": 8,
    },
    # Demon Slayer: Kimetsu no Yaiba, Episode 4, Article
    {
        "title": "The Heart of a Demon Slayer",
        "body": "An article focusing on Tanjiro’s growth as a Demon Slayer. We dive into his training, his understanding of the Water Breathing techniques, and how his resolve to protect Nezuko shapes his journey.",
        "content_type": "article",
        "user_id": random.randint(1, 15),
        "anime_id": 9,
    },
    #  Cowboy Bebop
    #  Cowboy Bebop
    {
        "title": "Cowboy Bebop: A Jazz-infused Sci-Fi Masterpiece",
        "body": "A review of *Cowboy Bebop*, focusing on the series’ seamless integration of jazz music with its sci-fi narrative. We explore how the soundtrack, composed by Yoko Kanno, elevates the emotional impact of the show and reflects the characters’ journeys.",
        "content_type": "review",
        "user_id": random.randint(1, 15),
        "anime_id": 10,
    },
    {
        "title": "The Bebop Crew in Fan Art: Capturing the Spirit of the Show",
        "body": "A collection of fan art inspired by *Cowboy Bebop*, showcasing iconic scenes and characters like Spike, Faye, Jet, and Ein. The artwork captures the unique blend of action, emotion, and style that defines the series.",
        "content_type": "fan art",
        "user_id": random.randint(1, 15),
        "anime_id": 10,
    },
]


# Create seed function
def seed_database():
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()

        # Seed users
        for data in user_data:
            user = User(
                username=data["username"],
                email=data["email"],
                password_hash=generate_password_hash(data["password"]),
            )
            db.session.add(user)

        # Seed anime
        for data in anime_data:
            anime = Anime(
                title=data["title"],
                description=data["description"],
                genre=data["genre"],
                release_date=data["release_date"],
                image=data["image"],
            )
            db.session.add(anime)

        # Seed episodes
        for data in episode_data:
            episode = Episode(
                title=data["title"],
                description=data["description"],
                anime_id=data["anime_id"],
                episode_number=data["episode_number"],
                rating=data["rating"],
            )
            db.session.add(episode)

        # Seed votes
        for data in vote_data:
            episode = db.session.get(
                Episode, data["episode_id"]
            )
            if episode:
                data["anime_id"] = episode.anime_id
                
        for data in vote_data:
            vote = Vote(
                user_id=data["user_id"],
                anime_id=data["anime_id"],
                episode_id=data["episode_id"],
                vote=data["vote"],
            )
            db.session.add(vote)

        # Seed content
        for data in content_data:
            content = Content(
                title=data["title"],
                body=data["body"],
                content_type=data["content_type"],
                user_id=data["user_id"],
                anime_id=data["anime_id"],
            )
            db.session.add(content)

        # Commit all data to the database
        db.session.commit()
        print("Database seeded successfully!")


if __name__ == "__main__":
    seed_database()
