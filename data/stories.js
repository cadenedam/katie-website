const dateQuestions = [
    {
        id: "start",
        text: "Do you want to go out or stay in?",
        options: [
            { text: "Go Out", value: "out" },
            { text: "Stay In", value: "in" }
        ]
    },
    {
        id: "out_activity",
        text: "What kind of outing do you want?",
        dependsOn: { questionId: "start", value: "out" },
        options: [
            { text: "Restaurant/Drink", value: "drink" },
            { text: "Fun Activity", value: "activity" },
            { text: "Explore/Walk", value: "explore" }
        ]
    },
    {
        id: "stay_activity",
        text: "What kind of cozy date do you want?",
        dependsOn: { questionId: "start", value: "in" },
        options: [
            { text: "Watch TV", value: "movies" },
            { text: "Cook together", value: "cook" },
            { text: "Games", value: "games" }
        ]
    },
    {
        id: "drink_type",
        text: "What are you in the mood for?",
        dependsOn: { questionId: "out_activity", value: "drink" },
        options: [
            { text: "Coffee", value: "coffee" },
            { text: "Cocktails", value: "cocktails" },
            { text: "Food", value: "food" }
        ]
    },
    {
        id: "activity_type",
        text: "What activity sounds fun?",
        dependsOn: { questionId: "out_activity", value: "activity" },
        options: [
            { text: "Sports (e.g. bowling, mini-golf)", value: "sports" },
            { text: "Creative (e.g. painting, pottery)", value: "creative" },
            { text: "Music/Dance (e.g. concert)", value: "music" }
        ]
    },
    {
        id: "explore_type",
        text: "What kind of exploration?",
        dependsOn: { questionId: "out_activity", value: "explore" },
        options: [
            { text: "Walk", value: "walk"},
            { text: "Find new bars/cafes", value: "bars"},
            { text: "Hike", value: "hike"}
        ]
    },
    {
        id: "movies_type",
        text: "What kind of TV shows or movies?",
        dependsOn: { questionId: "stay_activity", value: "movies" },
        options: [
            { text: "Lighthearted (iasip, south park)", value: "lighthearted" },
            { text: "New shows", value: "new" },
            { text: "Horror/Action movie", value: "horror" }
        ]
    },
    {
        id: "cook_type",
        text: "What should we cook?",
        dependsOn: { questionId: "stay_activity", value: "cook" },
        options: [
            { text: "Bake something sweet", value: "bake" },
            { text: "Make a fancy dinner", value: "fancy" },
            { text: "Try a new recipe", value: "newRec" }
        ]
    },
    {
        id: "games_type",
        text: "What games should we play?",
        dependsOn: { questionId: "stay_activity", value: "games" },
        options: [
            { text: "Phone games (auto pets, gamepigeon)", value: "phone"},
            { text: "Computer games (stardew, minecraft)", value: "computer"},
            { text: "Board games (monopoly, etc.)", value: "board"}
        ]
    },
];

const activitySuggestions = {
    sports: [
        "Go to a vikings game",
        "Topgolf",
        "Bowling",
        "Mini-golf",
        "Paddleboarding"
    ],
    creative: [
        "Pottery class",
        "Painting & Sip",
        "Escape room",
        "Museum visit"
    ],
    music: [
        "Live concert",
        "Karaoke night",
        "Jazz club",
        "Live band at a bar"
    ],
    walk:[
        "Walk to Pryes",
        "Walk around a lake",
        "Walk with Janice",
        "Walk somewhere new"
    ],
    bars: [
        "Cuzzy's",
        "Whitey's Old Town Saloon",
        "Maison Margaux",
        "FRGMNT Coffee",
        "Fairgrounds Coffee"
    ],
    hike: [
        "Minnehaha Falls",
        "Fort Snelling",
        "Bde Maka Ska Loop",
        "Lake Nokomis"
    ],
    coffee: [
        "FRGMNT Coffee",
        "Fairgrounds Coffee",
        "In The Loop",
        "Spyhouse Coffee"
    ],
    cocktails: [
        "Cobble Social House",
        "Flora Room",
        "BERLIN",
        "Hewing Rooftop"
    ],
    food: [
        "The Loop",
        "Graze Food Hall",
        "112 Eatery",
        "Porzana"
    ],
    lighthearted: [
        "It's Always Sunny in Philadelphia",
        "South Park",
        "Arrested Development",
        "Community"
    ],
    new: [
        "Murderbot",
        "Prime Target",
        "Task",
        "Adolescence",
        "The Hunting Party"
    ],
    horror: [
        "It follows",
        "The Witch",
        "Oldboy",
        "The Invisible Man"
    ],
    bake: [
        "Chocolate chip cookies",
        "Brownies",
        "Cupcakes",
        "Cake pops"
    ],
    fancy: [
        "Mushroom risotto",
        "Lobster ravioli",
        "Seared Salmon",
        "Creme Brulee"
    ],
    newRec: [
        "Detroit-Style pan pizza",
        "Stuffed pretzel bites",
        "Sushi",
        "Mochi ice cream"
    ],
    phone: [
        "Super Auto Pets",
        "GamePigeon",
        "Roblox",
        "Stardew Valley"
    ],
    computer: [
        "Stardew Valley",
        "Minecraft",
        "Keep Talking and Nobody Explodes",
        "We Were Here",
        "It Takes Two"
    ],
    board: [
        "Monopoly",
        "Chess",
        "Sushi Go!",
        "Hive"
    ]
}