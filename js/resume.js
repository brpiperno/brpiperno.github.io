// Converts a .json file into a vertical timeline using Bootstrap 5
const json_resume_path = './assets/resume.json';
let timeline = document.getElementById('timeline-container');
if (typeof(timeline) == 'undefined' || timeline == null) {
    console.error("Could not find work column element by ID!");
}
const cardHeight = 170; //card height in pixels

let work_col = document.getElementById('timeline-col-1');
if (typeof(work_col) == 'undefined' || work_col == null) {
    console.error("Could not find work column element by ID!");
}
let degree_col = document.getElementById('timeline-col-2');
if (typeof(work_col) == 'undefined' || work_col == null) {
    console.error("Could not find degree column element by ID!");
}
let project_col = document.getElementById('timeline-col-3');
if (typeof(work_col) == 'undefined' || work_col == null) {
    console.error("Could not find project column element by ID!");
}


function fetchResume(path) {
    return fetch(path)
        .then(response => {
            if (response.ok) return response.json();
            else {
                throw new Error('Failed to load JSON: ${response.status} ${response.statusText}');
            }
        }).then(data => data.resume || data)
        .catch(error => {
            console.error(error);
            return [];
        });
}


function createTimelineCard(event) {
    let card = document.createElement('div');
    card.className = 'timeline-card card ' + event.type;

    let card_title = document.createElement('h5');
    card_title.className = 'card-title';
    card_title.innerText = event.title;
    card.style.position = 'absolute';
    if (event.link) {
        let linkWrapper = document.createElement('a');
        linkWrapper.href = event.link;
        linkWrapper.appendChild(card_title);
        card.appendChild(linkWrapper);
    } else {
        card.appendChild(card_title);
    }


    let card_subtitle = document.createElement('h6');
    card_subtitle.className = 'card-subtitle mb-2 text-muted';
    let cardSubtitleText = event.org;
    if (event.location) cardSubtitleText += ` | ${event.location}`;
    if (event.start) cardSubtitleText += ` | ${event.start}`;
    if (event.end && event.end != event.start) cardSubtitleText += ` to ${event.end}`;
    card_subtitle.innerText = cardSubtitleText;
    card.appendChild(card_subtitle);


    const cardBody = document.createElement('p');
    cardBody.className = 'card-text';
    cardBody.innerText = event.description;
    card.appendChild(cardBody);
    return card;
}


function renderTimeline(resume) {
    let latestYear = Math.max(...resume.map(ev => ev.end));
    let earliestYear = Math.min(...resume.map(ev => ev.start));


    //set timeline container height
    let columnHeight = cardHeight * Math.max(1, latestYear - earliestYear);
    timeline.style.height = columnHeight + "px";
    //console.log(`latestYear = ${latestYear}, earliestYear = ${earliestYear} timeline height: ${timeline.style.height}`);


    //sort by end year and render each project
    resume.sort((a, b) => a.start - b.start).reverse().forEach(ev => {
        //console.log(`event: ${ev.title} start: ${ev.start} end: ${ev.end}`);
        let card = createTimelineCard(ev);
        card.style.marginTop = cardHeight * (latestYear - ev.end) + "px";
        //card.style.maxHeight = Math.max(cardHeight, (1+ev.end-ev.start) * cardHeight) + "px";
        //console.log(`setting marginTop = ${card.style.marginTop}, height = ${card.style.height}`);
        if (ev.type == "work") {
            work_col.appendChild(card);
        } else if (ev.type == "education") { //give degrees more rom

            degree_col.appendChild(card);
        } else { //academic projects
            project_col.appendChild(card);
        }
    });
}

fetchResume(json_resume_path)
    .then(resume => renderTimeline(resume, timeline))
    .catch(error => console.error(error));