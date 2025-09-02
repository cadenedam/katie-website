const memoriesData = [
    {
        id: 1,
        date: '2022-09-01',
        title: 'First Encounter',
        description: 'This is the first picture I have with you! We were stuck next to each other as too many people packed onto the bleachers.',
        image: 'images/memories/football1.jpg',
        category: '',
        details: 'I still remember thinking you were cute, but also feeling very awkward because we had to smoosh together. I also remember it being very hot, and we lost, so just an uncomfortable game on all fronts but standing next to you made it better!',
        location: 'Ross-Ade Stadium'
    },
    {
        id: 2,
        date: '2022-09-25',
        title: 'Walks!',
        description: 'After we initially met we started to talk more and go on walks together, like to IM games!',
        image: 'images/memories/Walks2.jpg',
        category: '',
        details: 'I loved walking around everywhere with you and grabbing like dominoes and splitting it at the IM fields while we watch our friends play.',
        location: 'IM Fields'
    },
    {
        id: 3,
        date: '2022-10-01',
        title: 'Wendys',
        description: 'This is from that time we walked alllll the way to wendys late at night for frostys.',
        image: 'images/memories/Wendys3.jpg',
        category: '',
        details: 'First of all this is probably one of my favorite pictures of us, and the first of many frostys together!',
        location: 'Wendys'
    },
    {
        id: 4,
        date: '2022-10-04',
        title: 'Sushi',
        description: 'We started getting smart and dumping all our saved meal points into infinite sushi each week.',
        image: 'images/memories/Sushi4.jpg',
        category: '',
        details: 'Getting sushi at the end of each week practically became a routine, it was so fun walking to get food together and then bringing it back to watch south park or something.',
        location: 'Sushi Boss'
    },
    {
        id: 5,
        date: '2022-10-10',
        title: 'Chicago Bean',
        description: 'Our first real date! We stayed near Sam McPherson and explored all of Chicago.',
        image: 'images/memories/Chicago5.jpg',
        category: '',
        details: 'I have so many great pictures of this trip, we explored pretty much everything and ate delicious food!',
        location: 'Chicago Bean'
    },
    {
        id: 6,
        date: '2022-10-30',
        title: 'Perry & Doof',
        description: 'We decided to pull up in style for our first Halloween together, one of my favorite costumes.',
        image: 'images/memories/HalloweenFreshman6.PNG',
        category: '',
        details: 'It was super fun each year doing joint costumes! We got to match and look cool together, I think my only issue was when we werent together nobody knew who I was...',
        location: 'Triangle Function Room'
    },
    {
        id: 7,
        date: '2022-11-11',
        title: 'Birthday',
        description: 'Bear celebrated my birthday with me in my dorm!',
        image: 'images/memories/Birthday7.jpg',
        category: '',
        details: 'We got delicious cookies and had a whole celebration of beardom, and took a horrible picture of me.',
        location: 'The Moon'
    },
    {
        id: 8,
        date: '2023-03-04',
        title: 'Spring Formal',
        description: 'Another outing for bearkind! And our first formal together out in French Lick.',
        image: 'images/memories/SpringFormal8.jpg',
        category: '',
        details: 'This was our first trip together with friends, and it was a blast. There were funny moments like cards against humanity, and plenty of weird moments like the joey room situation.',
        location: 'French Lick, IN'
    },
    {
        id: 9,
        date: '2023-06-24',
        title: 'Texas Visit',
        description: 'My first trip to Texas! You took me around to all the best places.',
        image: 'images/memories/Texas9.jpg',
        category: '',
        details: 'Everything was so much fun visiting you, we got to go to the zoo, drive in movie, huge food halls, and whataburger!',
        location: 'Texas'
    },
    {
        id: 10,
        date: '2023-08-17',
        title: 'Minnesota Visit',
        description: 'You returned the favor and flew to Minnesota towards the end of Summer.',
        image: 'images/memories/Minnesota10.jpg',
        category: '',
        details: 'Your first experience in Minnesota was great, especially in the late Summer being near the lakes!',
        location: 'Minnesota'
    },
    {
        id: 11,
        date: '2023-08-21',
        title: 'First Sophomore Day',
        description: 'Our mandatory first day of school picture for our parents sophomore year.',
        image: 'images/memories/FirstSophomore11.jpg',
        category: '',
        details: 'This was when we were with all of Stacys for pretty much the last time! Also shortly after our long drive from MN to IN.',
        location: 'Frieda Hall'
    },
    {
        id: 12,
        date: '2023-08-21',
        title: 'Lego Bonsai',
        description: 'Freshly built lego bonsai tree shortly after we moved in.',
        image: 'images/memories/Bonsai12.jpg',
        category: '',
        details: 'This was the first step to my original plan of having the zen corner (before Josh kicked Chinese Takeout), and I love it and it still sits on my shelf!',
        location: 'Triangle Fraternity'
    },
    {
        id: 13,
        date: '2023-09-16',
        title: 'Happy Family',
        description: 'Mandatory picture including child, with our special family shirts on.',
        image: 'images/memories/Child13.jpg',
        category: '',
        details: 'I still love wearing those shirts around randomly, just another beautiful joint bear costume.',
        location: 'Triangle Fraternity'
    },
    {
        id: 14,
        date: '2023-09-21',
        title: 'Barn Dance',
        description: 'Our first barn dance together, I got to meet all your Pi Phi friends too!',
        image: 'images/memories/BearFormal14.jpg',
        category: '',
        details: 'The main thing I remember from this night was thinking that it would be so much better if we could drink lol.',
        location: 'Barn in Indiana'
    },
    {
        id: 15,
        date: '2023-10-14',
        title: 'Greek Function',
        description: 'We got all dressed up and looking nice for greek function, just to not even get in.',
        image: 'images/memories/Function15.jpg',
        category: '',
        details: 'Even though we didnt get into the function this is another of my favorite pictures of us so at least we got that out of it!',
        location: 'Triangle Fraternity'
    },
    {
        id: 16,
        date: '2023-10-17',
        title: 'Movies',
        description: 'One of our first movies together down at Purdue.',
        image: 'images/memories/Movies16.jpg',
        category: '',
        details: 'I loved going to all the movies with you! We had a great deal going, and saw tons of good movies here over the years.',
        location: 'Movie Theater in Lafayette'
    },
    {
        id: 17,
        date: '2023-10-17',
        title: 'Bear Anniversary',
        description: 'Professional pictures for our anniversary!',
        image: 'images/memories/AnniversaryPics17.jpg',
        category: '',
        details: 'It was so much fun taking these, and they turned out really well! I love your committment to organize the photos, we can treasure them together forever.',
        location: 'West Lafayette, IN'
    },
    {
        id: 18,
        date: '2023-10-25',
        title: 'Bear Family',
        description: 'Family of bears with James!',
        image: 'images/memories/BearFamily18.jpg',
        category: '',
        details: 'This was a great night, we took our son to Applebees and you got a huge drink and we bonded!',
        location: 'Triangle Fraternity'
    },
    {
        id: 19,
        date: '2023-10-28',
        title: 'Evan Art',
        description: 'This was before the Halloween function, you painted on Evans abs.',
        image: 'images/memories/Evan19.jpg',
        category: '',
        details: 'I remember you doing a great job, but you had your work cut out for you with Evan lol.',
        location: 'Triangle Fraternity'
    },
    {
        id: 20,
        date: '2023-10-28',
        title: 'Sophomore Halloween',
        description: 'Joint costume from Blade Runner!',
        image: 'images/memories/HalloweenSophomore20.jpg',
        category: '',
        details: 'We planned this for forever, even went shopping at multiple stores, and I think it turned out pretty good! You also did a great job on the makeup on my face to make me look beat up.',
        location: 'Triangle Fraternity'
    },
    {
        id: 21,
        date: '2023-11-04',
        title: 'Michigan',
        description: 'Trip to Michigan to visit Colin.',
        image: 'images/memories/Michigan21.jpg',
        category: '',
        details: 'It was crazy going to their football game, the huge stadium made it an intense vibe. We also got to see Oscar and his sister, and meet Colin and his roommates!',
        location: 'Ann Arbor, Michigan'
    },
    {
        id: 22,
        date: '2024-02-11',
        title: 'Poker',
        description: 'Bear playing poker in Room 0.',
        image: 'images/memories/Poker22.jpg',
        category: '',
        details: 'I had to include a picture of poker, this is before the bar was built and you have a massive amount of chips in front of you.',
        location: 'Triangle Fraternity'
    },
    {
        id: 23,
        date: '2024-03-22',
        title: 'Pie',
        description: 'A beautiful picture post-pie.',
        image: 'images/memories/Pie23.jpg',
        category: '',
        details: 'It was fun getting to watch you go through all your sorority events, especially when I get to throw a pie at your face.',
        location: 'Pi Beta Phi'
    },
    {
        id: 24,
        date: '2024-06-21',
        title: 'Morgan Wallen',
        description: 'Morgan Wallen concert in MN!',
        image: 'images/memories/MorganWallen24.jpg',
        category: '',
        details: 'What a coincidence that he was playing in Minneapolis over the Summer, it was a great reason to allure bear, and lots of fun!',
        location: 'US Bank Stadium'
    },
    {
        id: 25,
        date: '2024-09-06',
        title: 'Mike.',
        description: 'Mike. concert in Chicago!',
        image: 'images/memories/Mike25.jpg',
        category: '',
        details: 'If I remember correctly I dont think I was even able to keep this a surprise from you, but still a great weekend exploring Chicago on our own!',
        location: 'Chicago'
    },
    {
        id: 26,
        date: '2024-10-05',
        title: 'Canada Formal',
        description: 'Fall formal in Windsor at Caesars Palace.',
        image: 'images/memories/FormalCanada26.jpg',
        category: '',
        details: 'Finally you were able to come to Canada since it didnt overlap with rush! We got to explore another country together and witness our friends do crazy things.',
        location: 'Windsor, Ontario'
    },
    {
        id: 27,
        date: '2024-10-26',
        title: 'Snoop Dogg',
        description: 'One of our best costumes, Snoop Dogg and his joint roller.',
        image: 'images/memories/Snoop27.JPG',
        category: '',
        details: 'We did a great job at finding a fantastic costume all at walmart basically. I still have the cane and robe, I think I will wear it around the house sometimes.',
        location: 'Triangle Fraternity'
    },
    {
        id: 28,
        date: '2025-03-16',
        title: 'Spring Break Junior',
        description: 'Makeshift bed at Jacobs house in Chicago.',
        image: 'images/memories/SpringBreakJunior28.jpg',
        category: '',
        details: 'This trip was too much stress, but still amazing! No matter where we were (Jacobs couch), everything was a blast with you.',
        location: 'Glenview, IL'
    },
    {
        id: 29,
        date: '2025-03-20',
        title: 'Bar Rescue',
        description: 'Dr. Philgoods bar featured on Bar Rescue in Florida.',
        image: 'images/memories/Bar29.jpg',
        category: '',
        details: 'This one bar provided so many stories for us to tell about spring break, and taking Sam there was definitely the right decision.',
        location: 'Dr. Philgoods in Florida'
    },
    {
        id: 30,
        date: '2025-05-18',
        title: 'Graduate',
        description: 'You graduated!!!',
        image: 'images/memories/Graduate30.jpg',
        category: '',
        details: 'Senior week and graduation was so melancholic, it was so much fun spending the whole week with you and doing random things, going to the tap, and playing games! I felt so proud of you when you walked across the stage at graduation, and going to the Tap with Anish and your parents was a blast!',
        location: 'Purdue University'
    },
    {
        id: 31,
        date: '2025-06-16',
        title: 'Puttery',
        description: 'Mini golf at the Puttery in North Loop.',
        image: 'images/memories/Puttery31.jpg',
        category: '',
        details: 'Back in Minneapolis we spent the whole Summer exploring and trying out new places! It was so so fun finding bars and restaurants to try together.',
        location: 'Minneapolis, MN'
    },
    {
        id: 32,
        date: '2025-08-10',
        title: 'Janice',
        description: 'Our cutest child.',
        image: 'images/memories/Janice32.jpg',
        category: '',
        details: 'For the finale I have to showcase the newest addition to our beautiful family, Jan! She is the best puppy and I cant wait to graduate and live with you and Jan full time, we will be the best family!',
        location: 'Edina, MN'
    }
];