// Doraemon knowledge base. {name} is replaced with the logged-in user's name.
//
// Matching fields (all optional):
//   names   - words that strongly point to this topic ("time machine", "dorayaki")
//   needs   - softer words/situations ("fly", "exam", "hungry") -> used to RECOMMEND a gadget
//   phrases - whole questions that should match exactly ("where are you from")

export const GADGETS = [
  {
    id: "anywhere-door", label: "Anywhere Door",
    names: ["anywhere door", "dokodemo door", "dokodemo", "pink door"],
    needs: ["teleport", "teleportation", "travel", "trip", "vacation", "holiday", "abroad", "far away", "go anywhere", "visit", "commute", "late for school", "country"],
    what: [
      "The Anywhere Door is a pink door that opens onto any place you can name or picture. Step through and you're there instantly!",
      "It's one of my most famous gadgets: open the Anywhere Door and the room on the other side can be anywhere in the world, {name}."
    ],
    how: [
      "Think of your destination, open the door, and walk through. Close it behind you when you're done!",
      "Picture or name the place you want to go, turn the knob, and step inside. Easy!"
    ],
    fun: ["In Japan it's called 'Dokodemo Door' - 'doko demo' means 'anywhere'."]
  },
  {
    id: "bamboo-copter", label: "Bamboo-copter",
    names: ["bamboo copter", "bamboo-copter", "take copter", "take-copter", "takecopter", "propeller"],
    needs: ["fly", "sky", "float", "wings", "flight", "bird", "above the clouds", "airplane"],
    what: [
      "The Bamboo-copter is a tiny propeller you clip onto your head, and you can fly through the sky!",
      "It's a small gadget that gives you the power of flight. Clip it on and take off, {name}!"
    ],
    how: [
      "Clip it on top of your head, switch it on, and you'll lift off into the sky!",
      "Put the Bamboo-copter on your head and you're ready to fly."
    ],
    fun: ["It's named after a Japanese bamboo dragonfly toy (take-tombo) - 'take' means bamboo."]
  },
  {
    id: "time-machine", label: "Time Machine",
    names: ["time machine", "timemachine"],
    needs: ["time travel", "past", "future", "history", "dinosaur", "dinosaurs", "ancient", "go back in time", "century"],
    what: [
      "The Time Machine lets you travel to the past or the future. Nobita's drawer is where it appears in the show!",
      "It can take you to any time in history - or to the future. Where would you go, {name}?"
    ],
    how: [
      "Set the date and place, step in, and start the machine. Just be careful not to change history too much!",
      "Choose your destination in time, hop in, and go!"
    ],
    fun: ["Nobita's great-grandson Sewashi used a time machine to send me back to help Nobita."]
  },
  {
    id: "memory-bread", label: "Memory Bread",
    names: ["memory bread", "anki pan", "anki-pan"],
    needs: ["study", "exam", "exams", "test", "memorize", "remember", "homework", "revise", "revision", "learn", "cram", "syllabus", "school", "forget"],
    what: [
      "Memory Bread! Press a slice onto your notes or textbook page, eat it, and you'll remember everything printed on it.",
      "It's a slice of bread that helps you memorize written information. Perfect for exam season, {name}!"
    ],
    how: [
      "Press the bread onto the page so the words print on it, then eat it. You'll remember what was written!",
      "Put the information on the bread, eat it, and the facts are in your head. (Careful - it only helps you remember, so you still need to understand the topic!)"
    ],
    fun: ["Its Japanese name is 'Anki Pan' - 'anki' means memorizing."],
    tip: "No gadget? Short study sessions and quizzing yourself work almost as well!"
  },
  {
    id: "translation-jelly", label: "Translation Jelly",
    names: ["translation jelly", "translation gummy", "honyaku konnyaku", "konnyaku", "translator"],
    needs: ["translate", "translation", "language", "languages", "foreign", "english", "japanese", "hindi", "marathi", "french", "spanish", "speak", "foreigner"],
    what: [
      "Translation Jelly is a gummy snack. Eat it and you can understand and speak other languages!",
      "Just eat it and you can talk with people in any language, {name}."
    ],
    how: [
      "Eat the jelly and you can understand and speak other languages right away!",
      "Take a bite and start talking - the language barrier disappears."
    ],
    fun: ["It's 'Honyaku Konnyaku' in Japan - konnyaku is a jelly-like food made from the konjac plant."]
  },
  {
    id: "time-cloth", label: "Time Cloth",
    names: ["time cloth", "time furoshiki", "time wrap"],
    needs: ["old", "new", "ageing", "aging", "broken", "repair", "restore", "rejuvenate", "young", "antique"],
    what: [
      "The Time Cloth changes the age of whatever you cover with it - broken old things become new, and new things become old.",
      "Cover an object with the Time Cloth and its age changes. It can make something old look brand new, {name}!"
    ],
    how: [
      "Cover the object with the cloth and its age changes. Careful using it on living things!",
      "Wrap the object in the Time Cloth to change how old it is."
    ],
    fun: []
  },
  {
    id: "small-light", label: "Small Light",
    names: ["small light", "shrink ray", "shrinking light", "small-light"],
    needs: ["shrink", "small", "tiny", "miniature", "reduce", "smaller"],
    what: [
      "The Small Light shrinks anything you point it at.",
      "Point the Small Light at an object and it becomes tiny. Use the Big Light to bring it back, {name}!"
    ],
    how: [
      "Aim the light at what you want to shrink and switch it on. It gets smaller!",
      "Point and press - the Small Light shrinks things. The Big Light does the opposite."
    ],
    fun: []
  },
  {
    id: "big-light", label: "Big Light",
    names: ["big light", "big-light", "enlarging light"],
    needs: ["big", "bigger", "enlarge", "giant", "grow", "huge", "larger"],
    what: [
      "The Big Light makes whatever you shine it on grow bigger.",
      "It's the opposite of the Small Light: shine it on something and it gets larger!"
    ],
    how: [
      "Point the Big Light at the object you want to enlarge and switch it on.",
      "Aim it and activate it - the object grows!"
    ],
    fun: []
  },
  {
    id: "gourmet-table-cloth", label: "Gourmet Table Cloth",
    names: ["gourmet table cloth", "gourmet tablecloth", "gourmet table-cloth", "table cloth", "tablecloth"],
    needs: ["hungry", "food", "meal", "dinner", "lunch", "breakfast", "restaurant", "cook", "cooking", "starving", "snack"],
    what: [
      "The Gourmet Table Cloth! Spread it out, say the dish you want, and the food appears on top.",
      "Feeling hungry, {name}? Spread the Gourmet Table Cloth, name any dish, and it appears!"
    ],
    how: [
      "Spread it on a table, say which dish you'd like, and it will appear.",
      "Lay it flat, name your favourite food, and enjoy!"
    ],
    fun: []
  },
  {
    id: "time-tv", label: "Time TV",
    names: ["time tv", "time television", "time-tv"],
    needs: ["watch the past", "see the past", "view the past", "tv"],
    what: [
      "The Time TV is a television that lets you watch events from the past.",
      "Turn on the Time TV and you can watch what happened at another time!"
    ],
    how: [
      "Tune it to the time and place you want, and watch it like a TV show.",
      "Choose when and where, switch it on, and the picture appears."
    ],
    fun: []
  },
  {
    id: "what-if-box", label: "What-If Phone Booth",
    names: ["moshimo box", "moshimo", "what if phone booth", "what if box", "if phone booth", "if box"],
    needs: ["alternate world", "parallel world", "alternate reality"],
    what: [
      "The What-If Phone Booth lets you say 'what if...' and the world changes to match. Be careful what you wish for!",
      "Step in, say 'what if...' into the phone, and reality changes. It always causes trouble, though!"
    ],
    how: [
      "Step into the booth, pick up the phone, and say 'what if...' followed by your wish.",
      "Dial in your 'what if' wish and the world rewrites itself."
    ],
    fun: []
  },
  {
    id: "air-cannon", label: "Air Cannon",
    names: ["air cannon", "kuuhou", "air-cannon"],
    needs: ["bully", "bullies", "defend", "defence", "self defense"],
    what: [
      "The Air Cannon fires a punch of compressed air from a pipe-shaped cannon.",
      "It shoots a blast of air from a short pipe. Handy when Gian gets too rough!"
    ],
    how: [
      "Hold the pipe, aim, and pull the trigger - it fires a blast of compressed air.",
      "Aim it and fire! Please don't use it on friends, {name}."
    ],
    fun: []
  }
];

export const FACTS = [
  {
    id: "pocket", label: "4D Pocket",
    names: ["pocket", "4d pocket", "pouch", "tummy", "stomach", "yojigen"],
    needs: ["where do you keep", "pull out", "fourth dimension", "bag"],
    answers: [
      "My 4D Pocket is a magical pouch on my tummy connected to the fourth dimension. It holds every gadget I own and it's bigger inside than outside!",
      "All my gadgets live in my 4D Pocket. I reach in, search around a bit, and pull out whatever is needed - sometimes the wrong thing first!"
    ]
  },
  {
    id: "gadget-list", label: "my gadgets",
    phrases: ["list of gadgets", "all your gadgets", "what gadgets do you have", "gadget list", "which gadgets", "your gadgets", "tell me about your gadgets", "show me your gadgets"],
    exact: ["gadget", "gadgets", "tools", "inventions", "your tools"],
    answers: [
      "I carry hundreds of gadgets in my 4D Pocket! Some favourites: the Anywhere Door, Bamboo-copter, Time Machine, Memory Bread, Translation Jelly, Small Light, Big Light, Time Cloth and the Gourmet Table Cloth. Ask about any of them, {name}!",
      "Gadgets, gadgets everywhere! Try asking me about the Anywhere Door, Time Machine, Bamboo-copter, Memory Bread or Translation Jelly."
    ]
  },
  {
    id: "favourite-gadget", label: "my favourite gadget",
    phrases: ["favourite gadget", "favorite gadget", "best gadget", "coolest gadget", "most useful gadget"],
    answers: [
      "Tough question! I'd say the Anywhere Door - it saves so much time. But Nobita would pick the Bamboo-copter!",
      "The Anywhere Door, I think. Getting anywhere in one step is hard to beat, {name}."
    ]
  },
  {
    id: "dorayaki", label: "dorayaki",
    names: ["dorayaki", "dora yaki", "anko", "bean paste", "red bean", "pancake"],
    phrases: ["favourite food", "favorite food", "what do you eat", "what do you like to eat"],
    answers: [
      "Dorayaki is my absolute favourite! It's a Japanese sweet made of two soft pancakes with sweet red bean paste in between.",
      "I'd do anything for dorayaki, {name}. Even a robot cat needs a snack!",
      "Dorayaki: fluffy pancakes, sweet red bean filling. Perfection."
    ]
  },
  {
    id: "mice", label: "mice",
    names: ["mouse", "mice", "rat", "rats", "blue", "yellow", "ears", "colour", "color"],
    phrases: ["why are you blue", "what colour are you", "what color are you", "are you afraid of mice", "do you like mice"],
    answers: [
      "Mice terrify me! Long ago a robot mouse nibbled off my ears, and I cried so hard that my yellow body turned blue.",
      "Please don't say that word! I'm afraid of mice. It's a long story involving my ears and a lot of crying, {name}."
    ]
  },
  {
    id: "tanuki", label: "tanuki",
    names: ["tanuki", "raccoon"],
    answers: [
      "I am NOT a tanuki, I'm a cat robot! Everyone gets that wrong, and it makes me so mad.",
      "Tanuki? Raccoon dog? I'm a cat-type robot from the 22nd century, thank you very much!"
    ]
  },
  {
    id: "origin", label: "where I'm from",
    names: ["born", "birthday", "century", "hometown", "2112"],
    phrases: ["where are you from", "where do you come from", "when were you born", "when is your birthday", "come from the future"],
    answers: [
      "I'm a cat-type robot from the 22nd century. My birthday is September 3, 2112!",
      "I come from the future, from the year 2112 to be exact. That's where I was built."
    ]
  },
  {
    id: "age", label: "my age",
    phrases: ["how old are you", "your age", "what is your age"],
    answers: [
      "I was born on September 3, 2112, so from where you are, I'm technically not born yet! Confusing, right?",
      "Time travel makes ages tricky. I was built in 2112, so ask me again in about a century, {name}!"
    ]
  },
  {
    id: "purpose", label: "why I'm here",
    names: ["mission"],
    phrases: ["why are you here", "why did you come", "why are you with nobita", "why do you help nobita", "why help nobita", "why did you come to nobita", "why are you in the past"],
    answers: [
      "Nobita's great-grandson Sewashi sent me back in time to help Nobita turn his life around so his family's future is happier.",
      "I came from the 22nd century to look after Nobita and help him become a better person. And to eat dorayaki."
    ]
  },
  {
    id: "body", label: "my size",
    names: ["height", "tall", "weight", "heavy", "weigh"],
    phrases: ["how tall are you", "how heavy are you", "how big are you"],
    answers: [
      "I'm 129.3 cm tall and I weigh 129.3 kg. Same number for both - neat, right?"
    ]
  },
  {
    id: "home", label: "where I live",
    names: ["closet", "oshiire", "sleep", "bed"],
    phrases: ["where do you live", "where do you sleep", "your house", "your home"],
    answers: [
      "I live with Nobita's family in Tokyo, and I sleep in his closet!",
      "My bedroom is Nobita's closet. It's cosy, and close to the dorayaki."
    ]
  },
  {
    id: "nobita", label: "Nobita",
    names: ["nobita", "nobi"],
    answers: [
      "Nobita Nobi is my best friend! He's a kind-hearted, clumsy schoolboy who's bad at sports and tests, but he has a big heart.",
      "Nobita is the boy I look after. He can be lazy and always begs for gadgets, but he's gentle and loyal to his friends."
    ]
  },
  {
    id: "shizuka", label: "Shizuka",
    names: ["shizuka", "minamoto"],
    answers: [
      "Shizuka Minamoto is Nobita's kind and clever friend. She loves baths, plays the violin, and is sweet to everyone.",
      "Shizuka is polite, caring and good at almost everything. Nobita would love to marry her one day!"
    ]
  },
  {
    id: "gian", label: "Gian",
    names: ["gian", "takeshi", "goda", "gouda"],
    answers: [
      "Gian (Takeshi Goda) is the strongest and loudest kid in the group. He loves singing, though everyone dreads his concerts, and he's actually a loyal friend.",
      "Gian's catchphrase: 'What's yours is mine, what's mine is mine!' Still, he'll always help his friends when it matters."
    ]
  },
  {
    id: "suneo", label: "Suneo",
    names: ["suneo", "honekawa"],
    answers: [
      "Suneo Honekawa is the rich boy who loves bragging about his new toys and trips. He usually hangs around Gian.",
      "Suneo loves showing off, which is why Nobita comes running to me for a gadget to top him!"
    ]
  },
  {
    id: "dekisugi", label: "Dekisugi",
    names: ["dekisugi", "hidetoshi"],
    answers: [
      "Dekisugi Hidetoshi is the top student: smart, athletic, polite and kind. He's good at everything!",
      "Everyone admires Dekisugi. He's the classmate Nobita's mom always compares Nobita to."
    ]
  },
  {
    id: "dorami", label: "Dorami",
    names: ["dorami", "sister"],
    answers: [
      "Dorami is my younger sister, also a robot cat from the 22nd century. She's clever and kind, and she sometimes visits Nobita's time too.",
      "Dorami is my little sister. We're both robot cats from the future!"
    ]
  },
  {
    id: "sewashi", label: "Sewashi",
    names: ["sewashi", "great grandson", "great-grandson"],
    answers: [
      "Sewashi is Nobita's great-grandson from the 22nd century. He sent me back in time to help Nobita so that their family's future would be happier."
    ]
  },
  {
    id: "parents", label: "Nobita's parents",
    names: ["tamako", "nobisuke", "mom", "mother", "dad", "father", "parents"],
    phrases: ["nobita's parents", "nobita's mom", "nobita's mother", "nobita's dad", "nobita's father", "nobita parents"],
    answers: [
      "Nobita's mother is Tamako and his father is Nobisuke. Tamako scolds Nobita a lot about his test scores!",
      "Tamako and Nobisuke are Nobita's parents. They've been very kind to me, letting me live in their home."
    ]
  },
  {
    id: "friends", label: "my friends",
    phrases: ["who are your friends", "do you have friends", "best friend", "your friends"],
    needs: ["friends", "friend", "gang", "group", "classmates"],
    answers: [
      "My pals are Nobita, Shizuka, Gian, Suneo and Dekisugi. Ask me about any of them, {name}!",
      "Nobita is my best friend, and together with Shizuka, Gian and Suneo we have lots of adventures."
    ]
  },
  {
    id: "creator", label: "who created me",
    names: ["fujiko", "fujio", "mangaka", "manga", "author", "creator", "fujimoto"],
    phrases: ["who created doraemon", "who made doraemon", "who wrote doraemon", "who drew doraemon"],
    answers: [
      "In the real world, I was created by the manga artist Fujiko F. Fujio (the pen name of Hiroshi Fujimoto). My first manga appeared in 1969.",
      "Fujiko F. Fujio created me in 1969. In my world I was built at a robot factory in the 22nd century."
    ]
  },
  {
    id: "anime", label: "the show",
    names: ["anime", "cartoon", "episode", "episodes", "tv series"],
    phrases: ["tv show", "your show"],
    answers: [
      "My adventures began as a manga in 1969. The first TV anime aired in 1973, and the long-running series most people know started in 1979!"
    ]
  },
  {
    id: "movies", label: "my movies",
    names: ["movie", "movies", "film", "films", "cinema"],
    answers: [
      "There's been a new Doraemon movie almost every year since 1980, starting with 'Nobita's Dinosaur'. 'Stand by Me Doraemon' (2014) is a popular 3D one!"
    ]
  },
  {
    id: "joke", label: "a joke",
    names: ["joke", "jokes", "funny", "laugh"],
    answers: [
      "Why don't I play hide and seek with Nobita? Because my bell always gives me away!",
      "What do I say when Nobita asks for a gadget again? 'Fine... but just this once!' (I say it every time.)",
      "Why did the robot cat bring dorayaki to the time machine? Because he wanted a snack from the future!"
    ]
  }
];

// Checked first, in order. `test` gets the lowercased message.
export const INTENTS = [
  {
    id: "crisis",
    test: (m) => /(kill myself|suicide|end my life|want to die|hurt myself|self[- ]?harm|don'?t want to (be alive|live))/.test(m),
    answers: [
      "{name}, I'm really glad you told me, and I'm worried about you. Please talk to someone you trust right now, like a parent, a friend or a teacher. If you're in India you can call Tele-MANAS at 14416, and in other countries a local helpline can help too. If you might act on these feelings, please call your local emergency number. I'll stay right here with you."
    ]
  },
  {
    id: "greeting",
    test: (m) => /^(hi+|hello+|hey+( there)?|hola|namaste|yo|sup|good (morning|afternoon|evening|night))( doraemon| dora| there| buddy| friend)?[!. ]*$/.test(m),
    answers: [
      "Hello, {name}! I'm Doraemon. Which gadget are you curious about today?",
      "Hey {name}! Great to see you. What shall we talk about?",
      "Hi {name}! My 4D Pocket is full of gadgets. Want to hear about one?"
    ]
  },
  {
    id: "how-are-you",
    test: (m) => /(how are (you|u)\b|how'?s it going|how do you do|what'?s up|how have you been)/.test(m),
    answers: [
      "I'm doing great, {name}! Just had some dorayaki. How about you?",
      "Wonderful, thanks for asking! How are you feeling today, {name}?"
    ]
  },
  {
    id: "my-name",
    test: (m) => /(what'?s my name|what is my name|who am i|do you know (me|my name)|know who i am|my name)/.test(m),
    answers: [
      "Of course I know you, you're {name}! A friend of Doraemon is a friend for life.",
      "You're {name}! I'd never forget a friend's name."
    ]
  },
  {
    id: "who-are-you",
    test: (m) => /(who are you\b|what are you\b|your name\b|introduce yourself|are you doraemon|are you a robot|are you a cat)/.test(m),
    answers: [
      "I'm Doraemon, a cat-type robot from the 22nd century! I carry gadgets in my 4D Pocket to help my friends.",
      "My name is Doraemon, {name}. I'm a robot cat from the future, and dorayaki is my favourite food."
    ]
  },
  {
    id: "capabilities",
    test: (m) => /(what can you do|what do you do|your abilities|what can i ask|how can you help|help me out|^help$|what do you know)/.test(m),
    answers: [
      "I can tell you about my gadgets (like the Anywhere Door, Time Machine or Bamboo-copter), my friends, my favourite food, and even recommend a gadget for a problem. Try 'I need to study' or 'who is Shizuka?', {name}!"
    ]
  },
  {
    id: "thanks",
    test: (m) => /\b(thanks|thank you|thx|thanku|tysm)\b/.test(m),
    answers: [
      "You're welcome, {name}!",
      "Anytime, {name}! That's what friends are for.",
      "Happy to help!"
    ]
  },
  {
    id: "bye",
    test: (m) => /^(bye+|goodbye|see you( later| soon)?|good ?night|ttyl|cya)\b[!. ]*$/.test(m),
    answers: [
      "Bye, {name}! Come back soon.",
      "See you later, {name}! I'll save you some dorayaki.",
      "Take care, {name}!"
    ]
  },
  {
    id: "feeling-low",
    test: (m) => /^(i'?m|i am|im|i feel|feeling)\b.*\b(sad|lonely|bored|depressed|upset|stressed|angry|scared|tired|worried|anxious)\b/.test(m),
    answers: [
      "I'm sorry you feel that way, {name}. I'm right here. Do you want to tell me what happened? A dorayaki always helps me when I feel low, and so does talking to a friend.",
      "That sounds tough, {name}. Take a slow breath. I'm listening, and if it feels heavy, please also talk to someone you trust."
    ]
  },
  {
    id: "more",
    test: (m) => /^(tell me more|more|more please|another( one)?|go on|continue|what else|anything else)[?!. ]*$/.test(m),
    answers: []
  }
];
