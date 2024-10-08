// FETCHING HEADER AND FOOTER
document.addEventListener('DOMContentLoaded', function() {
    // header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;

            // To make the header sticky and fixed
            window.addEventListener("scroll", function() {
                const selectHeader = document.querySelector("#header.fixed-top");
                const container =  document.querySelector("#header + div") || document.querySelector("#header + section");

                if (selectHeader && container) {
                    if (window.scrollY > 100) {
                        selectHeader.classList.add("sticked");
                        // container.style.marginTop = '240px'; // adjust container margin-top so that it won't be blocked on the first scroll
                    } else {
                        selectHeader.classList.remove("sticked");
                        // container.style.marginTop = "0"; // reset margin-top
                    }
                }
            });

            // Call updateTime() after the new content is loaded
            updateTime();
            
            // Optionally, set up the interval for continuous updates
            setInterval(updateTime, 1000);
        })
        .catch(error => console.error('Error loading header:', error));

    // footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
    
    AOS.init();
    fetchTopReleases();
    fetchLatestReleases();
    fetchTenPressReleases('business-press-releases');
    fetchTenPressReleases('communication-press-releases');
    fetchTenPressReleases('financial-press-releases');
    fetchTenPressReleases('healthcare-press-releases');
    fetchTenPressReleases('industrial-press-releases');
    fetchTenPressReleases('lifestyle-press-releases');
    fetchTenPressReleases('sustainability-press-releases');
    fetchTenPressReleases('technology-press-releases');
    fetchTenPressReleases('cryptocurrency-press-releases');
});

// TIMEZONES
function updateTime() {
    const localDate = getLocalDate();
    document.getElementById('current-date').textContent = localDate;

    const mumbaiTime = getTimePerTimezone('Asia/Kolkata');
    document.getElementById('mumbai').textContent = mumbaiTime;

    const bangkokTime = getTimePerTimezone('Asia/Bangkok');
    document.getElementById('bangkok').textContent = bangkokTime;

    const singaporeTime = getTimePerTimezone('Asia/Singapore');
    document.getElementById('singapore').textContent = singaporeTime;

    const hongkongTime = getTimePerTimezone('Asia/Hong_Kong');
    document.getElementById('hongkong').textContent = hongkongTime;

    const tokyoTime = getTimePerTimezone('Asia/Tokyo')
    document.getElementById('tokyo').textContent = tokyoTime;

    const sydneyTime = getTimePerTimezone('Australia/Sydney')
    document.getElementById('sydney').textContent = sydneyTime;
}

function getLocalDate(){
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return currentDate.toLocaleDateString(undefined, options);
}

function getTimePerTimezone(timeZone) {
    const options = { hour: '2-digit', minute: '2-digit', hour12: false};
    return new Date().toLocaleTimeString('en-US', { timeZone: timeZone, ...options });
}

// CAROUSEL
function fetchTopReleases() {
    const apiEndpoint = 'https://www.acnnewswire.com/acnnewswireapi/api/v1/News/AllNews'; 

    fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Response was NOT OK');
            }
            return response.json();
        })
        .then(data => {
            const topPressReleases = data.slice(0,3); // Get 3 press releases

            for (let i = 0; i < topPressReleases.length; i++) {
                document.getElementById(`press-release-image-${i+1}`).src = topPressReleases[i]?.photo[0]?.bigImage ?? '../Assets/placeholder.png';
                document.getElementById(`press-release-image-${i+1}`).alt = topPressReleases[i]?.headline;
                document.getElementById(`press-release-header-${i+1}`).innerHTML = topPressReleases[i]?.headline;
                document.getElementById(`press-release-summary-${i+1}`).innerHTML = topPressReleases[i]?.description.split(/(?<=[.!?])\s/)[0];
                document.getElementById(`press-release-link-${i+1}`).href = `../HTML/press-release-page-api.html?id=${i}`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// LATEST RELEASES
function fetchLatestReleases() {
    const apiEndpoint = 'https://www.acnnewswire.com/acnnewswireapi/api/v1/News/AllNews'; 

    fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Response was NOT OK');
            }
            return response.json();
        })
        .then(data => {
            const lastestPressReleases = data.slice(0,5); // Get 5 press releases

            for (let i = 0; i < lastestPressReleases.length; i++) {
                document.getElementById(`latest-release-image-${i+1}`).src = lastestPressReleases[i]?.photo[0]?.bigImage ?? '../Assets/placeholder.png';
                document.getElementById(`latest-release-image-${i+1}`).alt = lastestPressReleases[i]?.headline;
                document.getElementById(`latest-release-header-${i+1}`).innerHTML = lastestPressReleases[i]?.headline;
                document.getElementById(`latest-release-header-${i+1}`).href = `../HTML/press-release-page-api.html?id=${i}`;

                let latestReleaseSectors = lastestPressReleases[i].sector;
                latestReleaseSectors = latestReleaseSectors.map(sector => sector.toUpperCase());
                document.getElementById(`latest-release-sector-${i+1}`).innerHTML = latestReleaseSectors.join(' &bull; ') ?? 'SAMPLE SECTOR';
                document.getElementById(`latest-release-date-${i+1}`).innerHTML = lastestPressReleases[i].dateTime;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// LATEST 10 BUSINESS PRESS RELEASES
function fetchTenPressReleases(element) {
    const apiEndpoint = 'https://www.acnnewswire.com/acnnewswireapi/api/v1/News/AllNews'; // can have a condition to checker for the sector

    fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Response was NOT OK');
            }
            return response.json();
        })
        .then(data => {
            const lastestTenPressReleases = data.slice(0,10); // Get 10 press releases

            const prContainer = document.getElementById(element);
            
            lastestTenPressReleases.forEach(function(pr, i) {
                let pressReleaseDiv = document.createElement('div');
                pressReleaseDiv.classList.add('news-item', 'w-100');
    
                let pressReleaseImg = document.createElement('img');
                pressReleaseImg.src = pr?.photo[0]?.bigImage ?? '../Assets/placeholder.png'
                pressReleaseImg.classList.add('card-img-top', 'img-fluid', 'rounded-0');
                pressReleaseImg.alt = pr.headline;
    
                let pressReleaseContent = document.createElement('div');
                pressReleaseContent.classList.add('event-item-desc', 'd-flex', 'flex-column', 'gap-2', 'pt-4');
    
                let pressReleaseTitle = document.createElement('a');
                pressReleaseTitle.classList.add('card-label', 'card-label-main');
                pressReleaseTitle.innerHTML = pr.headline;
                pressReleaseTitle.href = `../HTML/press-release-page-api.html?id=${i}`;
    
                let pressReleaseSector = document.createElement('p');
                pressReleaseSector.classList.add('card-sub-label');
                let sectors = pr.sector;
                sectors = sectors.map(sector => sector.toUpperCase());
                pressReleaseSector.innerHTML = sectors[0] ?? 'SAMPLE SECTOR';
    
                let pressReleaseDate = document.createElement('p');
                pressReleaseDate.classList.add('card-date');
                pressReleaseDate.innerHTML = pr.dateTime;
    
                pressReleaseContent.appendChild(pressReleaseTitle);
                pressReleaseContent.appendChild(pressReleaseSector);
                pressReleaseContent.appendChild(pressReleaseDate);
    
                pressReleaseDiv.appendChild(pressReleaseImg);
                pressReleaseDiv.appendChild(pressReleaseContent);
    
                prContainer.appendChild(pressReleaseDiv);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}