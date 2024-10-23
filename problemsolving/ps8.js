const array = [
    "Aaron", "Abigail", "Adam", "Adrian", "Aiden", "Alex", "Alexander", "Alice", "Alicia", "Amanda",
    "Amber", "Amy", "Andrew", "Angela", "Anna", "Anthony", "Ariana", "Ashley", "Austin", "Barbara",
    "Ben", "Beth", "Blake", "Brandon", "Brenda", "Brian", "Brittany", "Brooke", "Bruce", "Caitlin",
    "Caleb", "Cameron", "Carl", "Carlos", "Carmen", "Caroline", "Carter", "Casey", "Catherine", "Charles",
    "Charlotte", "Chloe", "Chris", "Christian", "Christina", "Christopher", "Cindy", "Claire", "Clara", "Cole",
    "Connor", "Courtney", "Craig", "Daniel", "David", "Deborah", "Derek", "Diana", "Dylan", "Edward",
    "Eleanor", "Elena", "Elijah", "Elizabeth", "Ella", "Emily", "Emma", "Eric", "Ethan", "Evan",
    "Evelyn", "Faith", "Finn", "Fiona", "Gabriel", "Gavin", "George", "Grace", "Gregory", "Hailey",
    "Hannah", "Harper", "Heather", "Henry", "Isaac", "Isabel", "Isabella", "Isaiah", "Jack", "Jackson",
    "Jacob", "James", "Jamie", "Jared", "Jason", "Jasmine", "Jeffrey", "Jennifer", "Jessica", "Jill",
    "Jimmy", "Joan", "John", "Jonathan", "Jordan", "Joseph", "Joshua", "Julia", "Julian", "Justin",
    "Karen", "Katherine", "Katie", "Kayla", "Keith", "Kelly", "Kenneth", "Kevin", "Kimberly", "Kirsten",
    "Kyle", "Landon", "Laura", "Lauren", "Liam", "Lillian", "Lily", "Logan", "Lucas", "Luke",
    "Maddison", "Madeline", "Madison", "Makayla", "Maria", "Mark", "Mary", "Matthew", "Megan", "Melissa",
    "Michael", "Micheal", "Michelle", "Mila", "Miley", "Morgan", "Nathan", "Nathaniel", "Nicholas", "Nicole",
    "Noah", "Nolan", "Oliver", "Olivia", "Owen", "Paige", "Pamela", "Patrick", "Paul", "Peter",
    "Peyton", "Rachel", "Rebecca", "Richard", "Riley", "Robert", "Ryan", "Samantha", "Samuel", "Sandra",
    "Sara", "Sarah", "Savannah", "Scott", "Sean", "Sebastian", "Shane", "Shawn", "Sierra", "Sophia",
    "Sophie", "Spencer", "Stephanie", "Stephen", "Steve", "Steven", "Sydney", "Taylor", "Thomas", "Tiffany",
    "Timothy", "Tyler", "Valerie", "Vanessa", "Victoria", "Violet", "Vincent", "Virginia", "Walter", "Wendy",
    "William", "Willow", "Xander", "Zachary", "Zoe", "Abby", "Adalyn", "Alana", "Alexa", "Alfred",
    "Alyssa", "Anastasia", "Andrea", "Andy", "Angel", "Angelina", "Angelo", "April", "Archer", "Aria",
    "Arianna", "Armando", "Arthur", "Aubrey", "Aurora", "Autumn", "Axel", "Ayden", "Bailey", "Beatrice",
    "Beckett", "Bethany", "Billy", "Blaire", "Brady", "Braxton", "Brayden", "Brianna", "Brock", "Brody",
    "Bryan", "Byron", "Cadence", "Caden", "Caitlyn", "Calvin", "Candice", "Carly", "Carson", "Cassandra",
    "Cassidy", "Cedric", "Chad", "Chance", "Chase", "Cheyenne", "Chloe", "Christy", "Clarence", "Claudia",
    "Clay", "Clifford", "Colby", "Colin", "Colton", "Cora", "Dakota", "Damian", "Damon", "Daphne",
    "Darcy", "Darren", "Darryl", "Davis", "Dean", "Deanna", "Delaney", "Delilah", "Dennis", "Desmond",
    "Destiny", "Devin", "Devon", "Diana", "Dominic", "Donna", "Donovan", "Doris", "Douglas", "Drew",
    "Duncan", "Dwayne", "Dylan", "Easton", "Eden", "Edgar", "Edith", "Eduardo", "Elias", "Elise",
    "Eliza", "Elliot", "Elliott", "Emerson", "Emery", "Emmanuel", "Enzo", "Esteban", "Esther", "Ethan",
    "Eva", "Evan", "Everett", "Ezra", "Faith", "Felicity", "Felix", "Finn", "Fiona", "Frances",
    "Frank", "Franklin", "Frederick", "Gabriella", "Gabrielle", "Gage", "Garrett", "Gavin", "Gemma", "Genevieve",
    "Georgia", "Gerald", "Gianna", "Gideon", "Gilbert", "Gina", "Giselle", "Gloria", "Grace", "Gracie",
    "Grant", "Greg", "Griffin", "Gwen", "Hadley", "Hailey", "Hank", "Hanna", "Harley", "Harrison",
    "Harvey", "Hattie", "Hayden", "Hazel", "Heath", "Heather", "Hector", "Henry", "Holly", "Hope",
    "Howard", "Hudson", "Hunter", "Ian", "Imogen", "Irene", "Iris", "Isaac", "Isabelle", "Ivy",
    "Jack", "Jacob", "Jade", "Jaden", "Jake", "Jameson", "Jane", "Jasper", "Jay", "Jayce",
    "Jayden", "Jean", "Jeff", "Jenna", "Jeremiah", "Jeremy", "Jerome", "Jerry", "Jesse", "Jessica",
    "Jesus", "Jill", "Jillian", "Jim", "Jimmy", "Joan", "Joanna", "Jocelyn", "Joe", "Joel",
    "Joey", "John", "Johnny", "Jon", "Jonah", "Jonathan", "Jordan", "Jordyn", "Josephine", "Josiah",
    "Joy", "Joyce", "Judah", "Jude", "Julia", "Julian", "Julie", "June", "Justin", "Kade",
    "Kai", "Kaiden", "Kaleb", "Kara", "Karen", "Karina", "Karl", "Katelyn", "Kathleen", "Kathy",
    "Katie", "Kayden", "Kaylee", "Keegan", "Keith", "Kelsey", "Kendall", "Kennedy", "Kenny", "Kevin",
    "Kim", "Kira", "Kirk", "Krista", "Kristen", "Kristin", "Kylie", "Lacey", "Laila", "Lance",
    "Landon", "Lara", "Laura", "Lauren", "Lawrence", "Leah", "Leo", "Leon", "Leonardo", "Leslie",
    "Levi", "Liam", "Lila", "Lily", "Lincoln", "Linda", "Lindsay", "Lisa", "Logan", "Louis",
    "Lucas", "Lucia", "Lucy", "Luis", "Luke", "Luna", "Lydia", "Mackenzie", "Macy", "Maddox",
    "Madeline", "Madelyn", "Madison", "Maggie", "Makayla", "Malachi", "Malcolm", "Mallory", "Mandy", "Manuel",
    "Mara", "Marcus", "Margaret", "Maria", "Mariah", "Mariam", "Marilyn", "Mario", "Marshall", "Martin",
    "Mary", "Mason", "Matthew", "Max", "Maxwell", "Maya", "Megan", "Melanie", "Melissa", "Melody",
    "Michael", "Michelle", "Miguel", "Mila", "Miles", "Molly", "Monica", "Morgan", "Nancy", "Naomi",
    "Natalie", "Nathan", "Nathaniel", "Nia", "Nicholas", "Nicole", "Nina", "Noah", "Nolan", "Nora",
   
]
 
function arrSort(array) {
    return array.sort().reverse();
}
const sortedNames = arrSort(array)
console.log(sortedNames);

  


