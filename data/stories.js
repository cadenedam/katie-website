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
    creative: [],
    music: [],
    walk:[],
    bars: [],
    hike: [],
    coffee: [],
    cocktails: [],
    food: [],
    lighthearted: [],
    new: [],
    horror: [],
    bake: [],
    fancy: [],
    newRec: [],
    phone: [],
    computer: [],
    board: []
}