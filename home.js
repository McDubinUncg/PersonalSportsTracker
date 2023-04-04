const APIs = {
    nfl: 'http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams',
}
let currentSport = 'nfl'

// Create a single supabase client for interacting with your database
var supabase = supabase.createClient('https://iujbfqjzhlvhvgmhtirj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1amJmcWp6aGx2aHZnbWh0aXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA1Mzk5MjksImV4cCI6MTk5NjExNTkyOX0.tPY7ueHWHgU9GoPuShRc4evIoyK9P6XXN0BEIeYNzYI')

async function getTeams(sport) {
    try {
        const response = await fetch(APIs[sport]);
        const data = await response.json();
        return data['sports'][0]['leagues'][0]['teams'];
    } catch (error) {
        console.error(error);
    }
}

async function getFavoriteTeams(userId, sport) {
    const teams = await getTeams(sport);

    const { data, error } = await supabase.from('favorites').select().eq('userId', userId).eq('sport', sport);

    if (error) {
        console.log(error);
        return teams;
    } else {
        return teams.filter((team) => {
            return data.some((item) => {
                return item.teamId === team.team.id
            })
        });
    }

    

}

function getListItem(links, name, id) {
    const filterTo = ["Clubhouse", "Roster", "Statistics", "Schedule"] 

    const linksHtml = links.filter((link) => {
        return filterTo.includes(link.text)
    }).map((link) => {
      return `<a class="hide id-${id}" href="${link.href}">${link.text}</a>`
    }).join('')

    const buttonHtml = `<button type="button" class="textButton" href="#" onclick="showLinks('${id}')">${name}</button>`
    const saveFavoriteHtml = `<button type="button" class="textButton" href="#" onclick="saveFavorite(${id})">Save To Favorites</button>`

    return `
    ${buttonHtml}
    ${saveFavoriteHtml}
    ${linksHtml}
    `
}

async function saveFavorite(id) {
    // database.saveFavorite(id, sport)
    const { error } =  await supabase.from("favorites").insert({userId: "test", teamId: id, sport: "nfl"}) 
    console.log(error)
}

function createTeamList(teams) {
    const teamList = document.getElementById('team-list');
    teamList.innerHTML = "";
    teams.forEach(team => {
        const listItem = document.createElement('li');
        listItem.innerHTML = getListItem(team.team.links, team.team.displayName, team.team.id);
        listItem.classList.add('list-group-item');
        teamList.appendChild(listItem);
    });
}

function filterTeamList(teams, query) {
    return teams.filter((team) => {
        return team.team.displayName.toLowerCase().includes(query.toLowerCase())
    })
}

function showLinks(id) {
    const links = document.querySelectorAll(`.id-${id}`)
    links.forEach((link) => {
        if (link.classList.contains('show')) {
            link.classList.replace('show', 'hide')
        } else {
            link.classList.replace('hide', 'show')
        }
    })
}

window.addEventListener('load', async () => {
    const currentUserId = 'test';
    const currentSport = 'nfl'

    const teams = await getFavoriteTeams(currentUserId, currentSport);

    console.log(teams);
    createTeamList(teams);

    const searchBar = document.getElementById('searchBar');
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', function() {
        const filteredTeamList = filterTeamList(teams, searchBar.value);
        createTeamList(filteredTeamList);
    });
});