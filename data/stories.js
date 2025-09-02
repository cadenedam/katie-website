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
        text: "What kind of drinks?",
        dependsOn: { questionId: "out_activity", value: "drink" },
        options: [
            { text: "Coffee", value: "coffee" },
            { text: "Cocktails", value: "cocktails" },
            { text: "Tea", value: "tea" }
        ]
    },
    {
        id: ,
        text: ,
        dependsOn: ,
        options: []
    },
    {
        id: ,
        text: ,
        dependsOn: ,
        options: []
    },
    {
        id: ,
        text: ,
        dependsOn: ,
        options: []
    },
    {
        id: ,
        text: ,
        dependsOn: ,
        options: []
    },
    {
        id: ,
        text: ,
        dependsOn: ,
        options: []
    },
];